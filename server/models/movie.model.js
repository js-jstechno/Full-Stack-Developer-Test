import { Database } from '../config/db.config.js';

export class MovieModel {
  /**
   * @description
   * the following method fetches all movies from the database
   * @returns the array of movies fetched from the database
   */
  static async getAllMovies() {
    const query = 'SELECT * FROM movies';

    const movies = await Database.executeQuery(query);

    return movies;
  }

  /**
   * @description
   * the following method fetches the movie corresponding to a particular id
   * @param {number} movieId the id of the movie
   * @returns the movie fetched from the database
   */
  static async getMovieById(movieId) {
    const query = 'SELECT * FROM movies WHERE id = ?';
    const params = [movieId];

    const result = await Database.executeQuery(query, params);

    return result[0];
  }

  /**
   * @description
   * the following method creates a movie for a particular user
   * @param {string} title the title for the movie to be created
   * @param {string} description the description for the movie to be created
   * @param {number} userId the id of the user for whom the movie needs to be created
   * @returns the result of an sql insertion operation
   */
  static async createMovie(title, description, userId,image) {
    const query = 'INSERT INTO movies SET ?';
    const params = { userId, title, description,image };

    const result = await Database.executeQuery(query, params);

    return result;
  }

  /**
   * @description
   * the following method updates the movie corresponding to a particular id
   * @param {object} targetObj the fields and their corresponding values of the movie to be updated
   * @param {number} movieId the id of the movie
   * @returns the movie updation result
   */
  static async updateMovie(targetObj, movieId) {
    let query = 'UPDATE movies SET updated_at = ?, ';
    const currentTime = new Date();
    const params = [currentTime];

    Object.entries(targetObj).forEach(([key, value], index) => {
      if (index === Object.keys(targetObj).length - 1) query += `${key} = '${value}' WHERE id = ?`;
      else query += `${key} = '${value}', `;
    });

    params.push(movieId);

    const result = await Database.executeQuery(query, params);

    return result;
  }

  /**
   * @description
   * the following method deletes a movie corresponding to a particular id
   * @param {number} movieId the id of the movie
   * @returns the movie deletion result
   */
  static async deleteMovie(movieId) {
    const query = 'DELETE FROM movies WHERE id = ?';
    const params = [movieId];

    const result = await Database.executeQuery(query, params);

    return result;
  }

}
