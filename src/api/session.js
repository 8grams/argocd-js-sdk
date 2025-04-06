import BaseService from './base-service.js';

/**
 * Session Service
 * @class
 * @extends BaseService
 */
class SessionService extends BaseService {
  /**
   * Create creates a new session token for authentication
   * @param {Object} session - Session configuration
   * @returns {Promise<Object>} Created session
   */
  async createSession(session) {
    return this._request('POST', '/api/v1/session', {
      body: JSON.stringify(session)
    });
  }

  /**
   * Delete deletes an existing session
   * @returns {Promise<Object>} Empty response
   */
  async deleteSession() {
    return this._request('DELETE', '/api/v1/session');
  }

  /**
   * GetUserInfo returns the current user info
   * @returns {Promise<Object>} Current user info
   */
  async getUserInfo() {
    return this._request('GET', '/api/v1/session/userinfo');
  }
}

export default SessionService; 