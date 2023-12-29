import { MovieController } from '../controllers/movie.controller.js';
import { AuthMiddlewares } from '../middlewares/auth.middleware.js';

// routes responsible for movie management
export const movieRoutes = (app) => {
  app
    .route('/movies')
    .get(MovieController.getAllMovies)
    .post(AuthMiddlewares.checkAuth, MovieController.createMovie);

  app
    .route('/movies/:id')
    .get(MovieController.getMovieById)
    .patch(AuthMiddlewares.checkAuth, MovieController.updateMovie)   
    .delete(AuthMiddlewares.checkAuth, MovieController.deleteMovie);

};
