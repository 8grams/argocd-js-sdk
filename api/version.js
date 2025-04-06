import BaseService from './base-service.js';

/**
 * Version Service
 * @class
 * @extends BaseService
 */
class VersionService extends BaseService {
  /**
   * Get returns Argo CD version
   * @returns {Promise<Object>} Argo CD version
   */
  async getVersion() {
    return this._request('GET', '/api/v1/version');
  }
}

export default VersionService; 