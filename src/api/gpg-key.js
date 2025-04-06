import BaseService from './base-service.js';

/**
 * GPG Key Service
 * @class
 * @extends BaseService
 */
class GPGKeyService extends BaseService {
  /**
   * List returns list of GPG public keys from the server configuration
   * @param {Object} [params] - Query parameters
   * @param {string} [params.keyID] - The GPG key ID to query for
   * @returns {Promise<Object>} List of GPG public keys
   */
  async listGPGKeys(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.keyID) queryParams.append('keyID', params.keyID);

    return this._request('GET', `/api/v1/gpgkeys?${queryParams.toString()}`);
  }

  /**
   * Create one or more GPG public keys in the server's configuration
   * @param {Object} key - GPG public key configuration
   * @returns {Promise<Object>} Created GPG public key
   */
  async createGPGKey(key) {
    return this._request('POST', '/api/v1/gpgkeys', {
      body: JSON.stringify(key)
    });
  }

  /**
   * Delete specified GPG public key from the server's configuration
   * @param {string} keyID - The GPG key ID to delete
   * @returns {Promise<Object>} Empty response
   */
  async deleteGPGKey(keyID) {
    return this._request('DELETE', `/api/v1/gpgkeys/${keyID}`);
  }

  /**
   * Get information about specified GPG public key from the server
   * @param {string} keyID - The GPG key ID to get
   * @returns {Promise<Object>} GPG public key details
   */
  async getGPGKey(keyID) {
    return this._request('GET', `/api/v1/gpgkeys/${keyID}`);
  }
}

export default GPGKeyService; 