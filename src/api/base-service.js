/**
 * Base Service class for ArgoCD API services
 * @class
 */
class BaseService {
  /**
   * Create a new BaseService instance
   * @param {Object} config - Configuration object
   * @param {string} config.baseUrl - Base URL of the ArgoCD server
   * @param {string} config.token - Authentication token
   */
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.token = config.token;
  }

  /**
   * Make an HTTP request to the ArgoCD API
   * @protected
   * @param {string} method - HTTP method
   * @param {string} path - API path
   * @param {Object} [options] - Request options
   * @returns {Promise<Response>}
   */
  async _request(method, path, options = {}) {
    const url = new URL(path, this.baseUrl);
    const headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      ...options.headers
    };

    const response = await fetch(url, {
      method,
      headers,
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export default BaseService; 