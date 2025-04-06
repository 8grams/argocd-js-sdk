import BaseService from './base-service.js';

/**
 * Project Service
 * @class
 * @extends BaseService
 */
class ProjectService extends BaseService {
  /**
   * List returns list of projects
   * @param {Object} [params] - Query parameters
   * @param {string} [params.name] - The project name to filter projects
   * @returns {Promise<Object>} List of projects
   */
  async listProjects(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.name) queryParams.append('name', params.name);

    return this._request('GET', `/api/v1/projects?${queryParams.toString()}`);
  }

  /**
   * Create creates a project
   * @param {Object} project - Project configuration
   * @returns {Promise<Object>} Created project
   */
  async createProject(project) {
    return this._request('POST', '/api/v1/projects', {
      body: JSON.stringify(project)
    });
  }

  /**
   * Get returns a project by name
   * @param {string} name - The project name
   * @returns {Promise<Object>} Project details
   */
  async getProject(name) {
    return this._request('GET', `/api/v1/projects/${name}`);
  }

  /**
   * Update updates a project
   * @param {string} name - The project name
   * @param {Object} project - Updated project configuration
   * @returns {Promise<Object>} Updated project
   */
  async updateProject(name, project) {
    return this._request('PUT', `/api/v1/projects/${name}`, {
      body: JSON.stringify(project)
    });
  }

  /**
   * Delete deletes a project
   * @param {string} name - The project name
   * @returns {Promise<Object>} Empty response
   */
  async deleteProject(name) {
    return this._request('DELETE', `/api/v1/projects/${name}`);
  }

  /**
   * GetDetailedProject returns a project that include project, global project and scoped resources by name
   * @param {string} name - The project name
   * @returns {Promise<Object>} Detailed project information
   */
  async getDetailedProject(name) {
    return this._request('GET', `/api/v1/projects/${name}/detailed`);
  }

  /**
   * GetSyncWindowsState returns true if there are any active sync windows
   * @param {string} name - The project name
   * @returns {Promise<Object>} Sync windows state
   */
  async getSyncWindowsState(name) {
    return this._request('GET', `/api/v1/projects/${name}/syncwindows`);
  }

  /**
   * GetGlobalProjects returns list of global projects
   * @returns {Promise<Object>} List of global projects
   */
  async getGlobalProjects() {
    return this._request('GET', '/api/v1/projects/global');
  }

  /**
   * GetProjectEvents returns list of project events
   * @param {string} name - The project name
   * @returns {Promise<Object>} List of project events
   */
  async getProjectEvents(name) {
    return this._request('GET', `/api/v1/projects/${name}/events`);
  }
}

export default ProjectService; 