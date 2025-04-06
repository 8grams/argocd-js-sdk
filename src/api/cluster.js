import BaseService from './base-service.js';

/**
 * Cluster Service
 * @class
 * @extends BaseService
 */
class ClusterService extends BaseService {
  /**
   * List returns list of clusters
   * @param {Object} [params] - Query parameters
   * @param {string} [params.server] - The server to filter clusters
   * @param {string} [params.name] - The name to filter clusters
   * @returns {Promise<Object>} List of clusters
   */
  async listClusters(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.server) queryParams.append('server', params.server);
    if (params.name) queryParams.append('name', params.name);

    return this._request('GET', `/api/v1/clusters?${queryParams.toString()}`);
  }

  /**
   * Create creates a cluster
   * @param {Object} cluster - Cluster configuration
   * @param {boolean} [upsert] - Whether to update the cluster if it already exists
   * @returns {Promise<Object>} Created cluster
   */
  async createCluster(cluster, upsert = false) {
    const queryParams = new URLSearchParams();
    if (upsert) queryParams.append('upsert', 'true');

    return this._request('POST', `/api/v1/clusters?${queryParams.toString()}`, {
      body: JSON.stringify(cluster)
    });
  }

  /**
   * Get returns a cluster by server address
   * @param {string} server - The server address of the cluster
   * @returns {Promise<Object>} Cluster details
   */
  async getCluster(server) {
    return this._request('GET', `/api/v1/clusters/${server}`);
  }

  /**
   * Update updates a cluster
   * @param {string} server - The server address of the cluster
   * @param {Object} cluster - Updated cluster configuration
   * @param {Object} [params] - Query parameters
   * @param {boolean} [params.updatedFields] - The fields to update
   * @returns {Promise<Object>} Updated cluster
   */
  async updateCluster(server, cluster, params = {}) {
    const queryParams = new URLSearchParams();
    if (params.updatedFields) queryParams.append('updatedFields', params.updatedFields);

    return this._request('PUT', `/api/v1/clusters/${server}?${queryParams.toString()}`, {
      body: JSON.stringify(cluster)
    });
  }

  /**
   * Delete deletes a cluster
   * @param {string} server - The server address of the cluster
   * @param {Object} [params] - Query parameters
   * @param {string} [params.name] - The name of the cluster
   * @returns {Promise<Object>} Empty response
   */
  async deleteCluster(server, params = {}) {
    const queryParams = new URLSearchParams();
    if (params.name) queryParams.append('name', params.name);

    return this._request('DELETE', `/api/v1/clusters/${server}?${queryParams.toString()}`);
  }

  /**
   * RotateAuth rotates the bearer token used for a cluster
   * @param {string} server - The server address of the cluster
   * @returns {Promise<Object>} Empty response
   */
  async rotateAuth(server) {
    return this._request('POST', `/api/v1/clusters/${server}/rotate-auth`);
  }

  /**
   * InvalidateCache invalidates cluster cache
   * @param {string} server - The server address of the cluster
   * @returns {Promise<Object>} Empty response
   */
  async invalidateCache(server) {
    return this._request('POST', `/api/v1/clusters/${server}/invalidate-cache`);
  }
}

export default ClusterService; 