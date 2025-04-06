import BaseService from './base-service.js';

/**
 * User Service
 * @class
 * @extends BaseService
 */
class UserService extends BaseService {
  /**
   * List returns list of users
   * @returns {Promise<Object>} List of users
   */
  async listUsers() {
    return this._request('GET', '/api/v1/users');
  }

  /**
   * Get returns a user by name
   * @param {string} name - The user name
   * @returns {Promise<Object>} User details
   */
  async getUser(name) {
    return this._request('GET', `/api/v1/users/${name}`);
  }

  /**
   * Create creates a user
   * @param {Object} user - User configuration
   * @returns {Promise<Object>} Created user
   */
  async createUser(user) {
    return this._request('POST', '/api/v1/users', {
      body: JSON.stringify(user)
    });
  }

  /**
   * Update updates a user
   * @param {string} name - The user name
   * @param {Object} user - Updated user configuration
   * @returns {Promise<Object>} Updated user
   */
  async updateUser(name, user) {
    return this._request('PUT', `/api/v1/users/${name}`, {
      body: JSON.stringify(user)
    });
  }

  /**
   * Delete deletes a user
   * @param {string} name - The user name
   * @returns {Promise<Object>} Empty response
   */
  async deleteUser(name) {
    return this._request('DELETE', `/api/v1/users/${name}`);
  }
}

export default UserService; 