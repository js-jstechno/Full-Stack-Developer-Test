import { UserController } from '../controllers/user.controller.js';
import { AuthMiddlewares } from '../middlewares/auth.middleware.js';

// routes responsible for user management
export const userRoutes = (app) => {
  app
    .route('/users/:id')
    .get(AuthMiddlewares.checkAuth, UserController.getUserById)
    .patch(AuthMiddlewares.checkAuth, UserController.updateUser)
    .delete(AuthMiddlewares.checkAuth, UserController.deleteUser);
};
