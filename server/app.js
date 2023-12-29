import express from 'express';
import cookieParser from 'cookie-parser';
import {} from 'dotenv/config.js';
import { userRoutes } from './routes/user.routes.js';
import { STATUS_CODES } from './helpers/constants.js';
import { authRoutes } from './routes/auth.routes.js';
import { AppError, handleError } from './helpers/error.js';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { movieRoutes } from './routes/movie.routes.js';
const app = express();

app.use(cors({
  origin: '*'
}));

    // Set up Multer to handle file uploads
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // console.log(file.fieldname,"file.fieldname");
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      },
    });

    const upload = multer({ storage: storage });

    // Serve uploaded files statically
    app.use('/uploads', express.static('uploads'));
    
    // Handle POST requests to /upload
    app.post('/upload', upload.single('image'), (req, res) => {
      // console.log(req.file,"req.file");
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }
    
      const imagePath = `/uploads/${req.file.filename}`;
      res.json({ imagePath });
    });
    // app.listen(port, () => {
    //   console.log(`Server is running on http://localhost:${port}`);
    // });
app.get('/cors', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send({ "msg": "This has CORS enabled 🎈" })
  })
// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
authRoutes(app);
userRoutes(app);
movieRoutes(app);

app.all('*', (req, _, next) => {
  next(new AppError(`Can't find ${req.method} ${req.originalUrl} on this server!`, STATUS_CODES.NOT_FOUND));
});

// centralized error handling
app.use((err, req, res, _) => {
  handleError(err, req, res, _);
});

// running the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
