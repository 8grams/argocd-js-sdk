import BaseService from './base-service.js';

/**
 * Repository Service
 * @class
 * @extends BaseService
 */
class RepositoryService extends BaseService {
  /**
   * List returns list of repositories
   * @param {Object} [params] - Query parameters
   * @param {string} [params.repo] - The repository URL to filter repositories
   * @param {boolean} [params.forceRefresh] - Whether to force a refresh
   * @returns {Promise<Object>} List of repositories
   */
  async listRepositories(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.repo) queryParams.append('repo', params.repo);
    if (params.forceRefresh) queryParams.append('forceRefresh', 'true');

    return this._request('GET', `/api/v1/repositories?${queryParams.toString()}`);
  }

  /**
   * Create creates a repository
   * @param {Object} repository - Repository configuration
   * @param {boolean} [upsert] - Whether to update the repository if it already exists
   * @param {boolean} [credsOnly] - Whether to only update credentials
   * @returns {Promise<Object>} Created repository
   */
  async createRepository(repository, upsert = false, credsOnly = false) {
    const queryParams = new URLSearchParams();
    if (upsert) queryParams.append('upsert', 'true');
    if (credsOnly) queryParams.append('credsOnly', 'true');

    return this._request('POST', `/api/v1/repositories?${queryParams.toString()}`, {
      body: JSON.stringify(repository)
    });
  }

  /**
   * Get returns a repository by URL
   * @param {string} repo - The repository URL
   * @param {boolean} [forceRefresh] - Whether to force a refresh
   * @returns {Promise<Object>} Repository details
   */
  async getRepository(repo, forceRefresh = false) {
    const queryParams = new URLSearchParams();
    if (forceRefresh) queryParams.append('forceRefresh', 'true');

    return this._request('GET', `/api/v1/repositories/${repo}?${queryParams.toString()}`);
  }

  /**
   * Update updates a repository
   * @param {string} repo - The repository URL
   * @param {Object} repository - Updated repository configuration
   * @returns {Promise<Object>} Updated repository
   */
  async updateRepository(repo, repository) {
    return this._request('PUT', `/api/v1/repositories/${repo}`, {
      body: JSON.stringify(repository)
    });
  }

  /**
   * Delete deletes a repository
   * @param {string} repo - The repository URL
   * @returns {Promise<Object>} Empty response
   */
  async deleteRepository(repo) {
    return this._request('DELETE', `/api/v1/repositories/${repo}`);
  }

  /**
   * ListApps returns list of apps in the repository
   * @param {string} repo - The repository URL
   * @param {Object} [params] - Query parameters
   * @param {string} [params.revision] - The revision to list apps for
   * @returns {Promise<Object>} List of apps
   */
  async listApps(repo, params = {}) {
    const queryParams = new URLSearchParams();
    if (params.revision) queryParams.append('revision', params.revision);

    return this._request('GET', `/api/v1/repositories/${repo}/apps?${queryParams.toString()}`);
  }

  /**
   * GetAppDetails returns application details by given path
   * @param {string} repo - The repository URL
   * @param {Object} params - Query parameters
   * @param {string} params.path - The path to the application
   * @param {string} [params.revision] - The revision to get app details for
   * @returns {Promise<Object>} Application details
   */
  async getAppDetails(repo, params) {
    const queryParams = new URLSearchParams();
    queryParams.append('path', params.path);
    if (params.revision) queryParams.append('revision', params.revision);

    return this._request('GET', `/api/v1/repositories/${repo}/appdetails?${queryParams.toString()}`);
  }

  /**
   * GetHelmCharts returns list of helm charts in the repository
   * @param {string} repo - The repository URL
   * @returns {Promise<Object>} List of helm charts
   */
  async getHelmCharts(repo) {
    return this._request('GET', `/api/v1/repositories/${repo}/helmcharts`);
  }

  /**
   * ListRefs returns list of refs (branches, tags, etc.) in the repository
   * @param {string} repo - The repository URL
   * @returns {Promise<Object>} List of refs
   */
  async listRefs(repo) {
    return this._request('GET', `/api/v1/repositories/${repo}/refs`);
  }
}

export default RepositoryService; 