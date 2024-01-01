import { MovieController } from '../controllers/movie.controller.js';
import { AuthMiddlewares } from '../middlewares/auth.middleware.js';

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: API for managing movies
 */
// routes responsible for movie management
export const movieRoutes = (app) => {
  

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       '200':
 *         description: A list of movies
 */
  app.route('/movies').get(MovieController.getAllMovies);


  app.route('/movies').post(AuthMiddlewares.checkAuth, MovieController.createMovie);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the movie
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The details of the movie
 *       '404':
 *         description: Movie not found
 */
  app.route('/movies/:id').get(MovieController.getMovieById);
  app.route('/movies/:id').patch(AuthMiddlewares.checkAuth, MovieController.updateMovie);
  app.route('/movies/:id').delete(AuthMiddlewares.checkAuth, MovieController.deleteMovie);

};
