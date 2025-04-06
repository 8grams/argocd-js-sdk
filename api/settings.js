import BaseService from './base-service.js';

/**
 * Settings Service
 * @class
 * @extends BaseService
 */
class SettingsService extends BaseService {
  /**
   * Get returns Argo CD settings
   * @returns {Promise<Object>} Argo CD settings
   */
  async getSettings() {
    return this._request('GET', '/api/v1/settings');
  }
}

export default SettingsService; 