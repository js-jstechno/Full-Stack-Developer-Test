import {
  STATUS_CODES,
  movieCreationRequiredFields,
  cookieAttributeForJwtToken,
  possibleMovieUpdateFields,
  userUpdateFields
} from '../helpers/constants.js';
import { AppError } from '../helpers/error.js';
import { isAvailable, sendResponse } from '../helpers/utils.js';
import { AuthModel } from '../models/auth.model.js';
import { UserModel } from '../models/user.model.js';
import multer from 'multer';
export class UserController {
  /**
   * @description
   * the controller method to fetch all movies for a particular user
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   * @returns the array of movies for the user
   */
  
  static async getAllMovies(req, res, next) {
    try {
      const movies = await UserModel.getAllMovies();

      if (!movies.length) return next(new AppError('No movie found', STATUS_CODES.NOT_FOUND));

      return sendResponse(res, STATUS_CODES.OK, 'All movies fetched successfully', movies);
    } catch (error) {
      return next(
        new AppError(
          error.message || 'Internal Server Error',
          error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
          error.response || error
        )
      );
    }
  }

  /**
   * @description
   * the controller method to create a movie for a particular user
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   * @returns the created movie for the user
   */
  static async createMovie(req, res, next) {
    const { body: requestBody } = req;
    // console.log(requestBody,"requestBody=");
    // console.log(res.locals.user.id,"res.locals.user.id");
    requestBody.userId = res.locals.user.id;
    // console.log(requestBody.userId,"requestBody.userId==");
    const allFieldsArePresent = isAvailable(requestBody, Object.values(movieCreationRequiredFields));

    if (!allFieldsArePresent) return next(new AppError('Some fields are missing', STATUS_CODES.BAD_REQUEST));

    const { title, description, userId ,image } = requestBody;
    
    console.log(title, description, userId,image,"title, description, userId");
    try {
      const movieCreateResult = await UserModel.createMovie(title, description, userId, image);

      return sendResponse(res, STATUS_CODES.SUCCESSFULLY_CREATED, 'Movie created successfully', {
        id: movieCreateResult.insertId,
        title,
        description,
        userId,
        image
      });
    } catch (error) {
      return next(
        new AppError(
          error.message || 'Internal Server Error',
          error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
          error.response || error
        )
      );
    }
  }

  /**
   * @description
   * the controller method to fetch the movie corresponding to a movie id
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   * @returns the movie fetched from the database
   */
  static async getMovieById(req, res, next) {
    const movieId = req.params.id;

    try {
      const movie = await UserModel.getMovieById(movieId);

      if (!movie) return next(new AppError(`Movie with id ${movieId} not found`, STATUS_CODES.NOT_FOUND));

      return sendResponse(res, STATUS_CODES.OK, `Movie with id ${movieId} fetched successfully`, movie);
    } catch (error) {
      return next(
        new AppError(
          error.message || 'Internal Server Error',
          error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
          error.response || error
        )
      );
    }
  }

  /**
   * @description
   * the controller method to update some attributes of a movie corresponding to an id
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   */
  static async updateMovie(req, res, next) {
    const { body: requestBody } = req;
    console.log(requestBody,'requestBody');
    const fieldsToBeUpdatedExist = isAvailable(requestBody, Object.values(possibleMovieUpdateFields), false);

    if (!fieldsToBeUpdatedExist) return next(new AppError('Fields to be updated does not exist', STATUS_CODES.BAD_REQUEST));

    const movieId = req.params.id;

    try {
      const movieToBeUpdated = await UserModel.getMovieById(movieId);

      if (!movieToBeUpdated) return next(new AppError(`Movie with id ${movieId} not found`, STATUS_CODES.NOT_FOUND));

      if (movieToBeUpdated.userId !== res.locals.user.id) return next(new AppError('You are not authorized', STATUS_CODES.FORBIDDEN));

      const updateMovieResult = await UserModel.updateMovie(requestBody, movieId);

       movieToBeUpdated = await UserModel.getMovieById(movieId);

      if (updateMovieResult.affectedRows) return sendResponse(res, STATUS_CODES.OK, `Movie with id ${movieId} updated successfully`,movieToBeUpdated);
      return next(new AppError(`Movie with id ${movieId} could not be updated`, STATUS_CODES.BAD_REQUEST));
    } catch (error) {
      return next(
        new AppError(
          error.message || 'Internal Server Error',
          error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
          error.response || error
        )
      );
    }
  }

  /**
   * @description
   * the controller method to delete a movie corresponding to an id
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   */
  static async deleteMovie(req, res, next) {
    const movieId = req.params.id;

    try {
      const movieToBeDeleted = await UserModel.getMovieById(movieId);

      if (!movieToBeDeleted) return next(new AppError(`Movie with id ${movieId} not found`, STATUS_CODES.NOT_FOUND));

      if (movieToBeDeleted.userId !== res.locals.user.id) return next(new AppError('You are not authorized', STATUS_CODES.FORBIDDEN));

      const deleteMovieResult = await UserModel.deleteMovie(movieId);

      if (deleteMovieResult.affectedRows) return sendResponse(res, STATUS_CODES.OK, `Movie with id ${movieId} deleted successfully`);
      return next(new AppError(`Movie with id ${movieId} could not be deleted`, STATUS_CODES.BAD_REQUEST));
    } catch (error) {
      return next(
        new AppError(
          error.message || 'Internal Server Error',
          error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
          error.response || error
        )
      );
    }
  }

  /**
   * @description
   * the controller method to fetch a user corresponding to an id
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   * @returns the user fetched from the database
   */
  static async getUserById(req, res, next) {
    const userId = req.params.id;

    try {
      const user = await AuthModel.findUserByAttribute('id', userId);

      if (!user) return next(new AppError(`User with id ${userId} does not exist`, STATUS_CODES.NOT_FOUND));

      if (user.id !== res.locals.user.id) return next(new AppError('You are not authorized', STATUS_CODES.FORBIDDEN));

      return sendResponse(res, STATUS_CODES.OK, `User with id ${userId} fetched successfully`, {
        id: user.id,
        username: user.username
      });
    } catch (error) {
      return next(
        new AppError(
          error.message || 'Internal Server Error',
          error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
          error.response || error
        )
      );
    }
  }

  /**
   * @description
   * the controller method to update some attributes of a user corresponding to an id
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   */
  static async updateUser(req, res, next) {
    const { body: requestBody } = req;

    const fieldsToBeUpdatedExist = isAvailable(requestBody, Object.values(userUpdateFields), false);

    if (!fieldsToBeUpdatedExist) return next(new AppError('Fields to be updated does not exist', STATUS_CODES.BAD_REQUEST));

    const userId = req.params.id;

    try {
      const user = await AuthModel.findUserByAttribute('id', userId);

      if (!user) return next(new AppError(`User with id ${userId} does not exist`, STATUS_CODES.NOT_FOUND));

      if (user.id !== res.locals.user.id) return next(new AppError('You are not authorized', STATUS_CODES.FORBIDDEN));

      const updateUserResult = await UserModel.updateUser(requestBody, userId);

      if (updateUserResult.affectedRows) return sendResponse(res, STATUS_CODES.OK, `User with id ${userId} updated successfully`);
      return next(new AppError(`User with id ${userId} could not be updated`, STATUS_CODES.BAD_REQUEST));
    } catch (error) {
      return next(
        new AppError(
          error.message || 'Internal Server Error',
          error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
          error.response || error
        )
      );
    }
  }

  /**
   * @description
   * the controller method to delete a user corresponding to an id
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next middleware function in the application’s request-response cycle
   */
  static async deleteUser(req, res, next) {
    const userId = req.params.id;

    try {
      const user = await AuthModel.findUserByAttribute('id', userId);

      if (!user) return next(new AppError(`User with id ${userId} does not exist`, STATUS_CODES.NOT_FOUND));

      if (user.id !== res.locals.user.id) return next(new AppError('You are not authorized', STATUS_CODES.FORBIDDEN));

      const deleteUserResult = await UserModel.deleteUser(userId);

      if (deleteUserResult.affectedRows) {
        res.clearCookie(cookieAttributeForJwtToken); // on deleting the user, the auth token must be deleted from cookie as well
        return sendResponse(res, STATUS_CODES.OK, `User with id ${userId} deleted successfully`);
      }
      return next(new AppError(`User with id ${userId} could not be deleted`, STATUS_CODES.BAD_REQUEST));
    } catch (error) {
      return next(
        new AppError(
          error.message || 'Internal Server Error',
          error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
          error.response || error
        )
      );
    }
  }
}
