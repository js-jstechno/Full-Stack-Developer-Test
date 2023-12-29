import { Database } from '../config/db.config.js';

export class UserModel {
  /**
   * @description
   * the following method updates the user corresponding to a particular id
   * @param {object} targetObj the fields and their corresponding values of the user to be updated
   * @param {number} userId the id of the user
   * @returns the user updation result
   */
  static async updateUser(targetObj, userId) {
    let query = 'UPDATE users SET ';

    Object.entries(targetObj).forEach(([key, value], index) => {
      if (index === Object.keys(targetObj).length - 1) query += `${key} = '${value}' WHERE id = ?`;
      else query += `${key} = '${value}', `;
    });

    const params = [userId];

    const result = await Database.executeQuery(query, params);

    return result;
  }

  /**
   * @description
   * the following method deletes a user corresponding to a particular id
   * @param {number} userId the id of the user
   * @returns the user deletion result
   */
  static async deleteUser(userId) {
    const query = 'DELETE FROM users WHERE id = ?';
    const params = [userId];

    const result = await Database.executeQuery(query, params);

    return result;
  }
}
