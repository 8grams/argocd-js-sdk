import BaseService from './base-service.js';

/**
 * Account Service
 * @class
 * @extends BaseService
 */
class AccountService extends BaseService {
  /**
   * Create a new AccountService instance
   * @param {Object} config - Configuration object
   * @param {string} config.baseUrl - Base URL of the ArgoCD server
   * @param {string} config.token - Authentication token
   */
  constructor(config) {
    super(config);
    this.baseUrl = config.baseUrl;
    this.token = config.token;
  }

  /**
   * ListAccounts returns the list of accounts
   * @returns {Promise<Object>} List of accounts
   */
  async listAccounts() {
    return this._request('GET', '/api/v1/account');
  }

  /**
   * CanI checks if the current account has permission to perform an action
   * @param {string} resource - Resource name
   * @param {string} action - Action name
   * @param {string} subresource - Subresource name
   * @returns {Promise<Object>} Permission check response
   */
  async canI(resource, action, subresource) {
    return this._request('GET', `/api/v1/account/can-i/${resource}/${action}/${subresource}`);
  }

  /**
   * UpdatePassword updates an account's password to a new value
   * @param {Object} request - Update password request
   * @param {string} request.currentPassword - Current password
   * @param {string} request.newPassword - New password
   * @returns {Promise<Object>} Update password response
   */
  async updatePassword(request) {
    return this._request('PUT', '/api/v1/account/password', {
      body: JSON.stringify(request)
    });
  }

  /**
   * GetAccount returns an account
   * @param {string} name - Account name
   * @returns {Promise<Object>} Account details
   */
  async getAccount(name) {
    return this._request('GET', `/api/v1/account/${name}`);
  }

  /**
   * CreateToken creates a token
   * @param {string} name - Account name
   * @param {Object} request - Create token request
   * @returns {Promise<Object>} Create token response
   */
  async createToken(name, request) {
    return this._request('POST', `/api/v1/account/${name}/token`, {
      body: JSON.stringify(request)
    });
  }

  /**
   * DeleteToken deletes a token
   * @param {string} name - Account name
   * @param {string} id - Token ID
   * @returns {Promise<Object>} Empty response
   */
  async deleteToken(name, id) {
    return this._request('DELETE', `/api/v1/account/${name}/token/${id}`);
  }
}

export default AccountService; 