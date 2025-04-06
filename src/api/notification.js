import BaseService from './base-service.js';

/**
 * Notification Service
 * @class
 * @extends BaseService
 */
class NotificationService extends BaseService {
  /**
   * List returns list of services
   * @returns {Promise<Object>} List of services
   */
  async listServices() {
    return this._request('GET', '/api/v1/notifications/services');
  }

  /**
   * List returns list of templates
   * @returns {Promise<Object>} List of templates
   */
  async listTemplates() {
    return this._request('GET', '/api/v1/notifications/templates');
  }

  /**
   * List returns list of triggers
   * @returns {Promise<Object>} List of triggers
   */
  async listTriggers() {
    return this._request('GET', '/api/v1/notifications/triggers');
  }
}

export default NotificationService; 