import BaseService from './base-service.js';

/**
 * Application Service
 * @class
 * @extends BaseService
 */
class ApplicationService extends BaseService {
  /**
   * Create a new ApplicationService instance
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
   * List returns list of applications
   * @param {Object} [params] - Query parameters
   * @param {string} [params.name] - The application's name
   * @param {string} [params.refresh] - Forces application reconciliation if set to 'hard'
   * @param {string[]} [params.projects] - The project names to restrict returned list applications
   * @returns {Promise<Object>} List of applications
   */
  async listApplications(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.name) queryParams.append('name', params.name);
    if (params.refresh) queryParams.append('refresh', params.refresh);
    if (params.projects) params.projects.forEach(project => queryParams.append('projects', project));

    return this._request('GET', `/api/v1/applications?${queryParams.toString()}`);
  }

  /**
   * Get returns an application by name
   * @param {string} name - The application's name
   * @param {Object} [params] - Query parameters
   * @param {string} [params.refresh] - Forces application reconciliation if set to 'hard'
   * @param {string} [params.project] - The project name to restrict returned list applications
   * @returns {Promise<Object>} Application details
   */
  async getApplication(name, params = {}) {
    const queryParams = new URLSearchParams();
    if (params.refresh) queryParams.append('refresh', params.refresh);
    if (params.project) queryParams.append('project', params.project);

    return this._request('GET', `/api/v1/applications/${name}?${queryParams.toString()}`);
  }

  /**
   * Create creates an application
   * @param {Object} application - Application configuration
   * @param {boolean} [upsert] - Whether to update the application if it already exists
   * @param {boolean} [validate] - Whether to validate the application configuration
   * @returns {Promise<Object>} Created application
   */
  async createApplication(application, upsert = false, validate = true) {
    const queryParams = new URLSearchParams();
    if (upsert) queryParams.append('upsert', 'true');
    if (!validate) queryParams.append('validate', 'false');

    return this._request('POST', `/api/v1/applications?${queryParams.toString()}`, {
      body: JSON.stringify(application)
    });
  }

  /**
   * Delete deletes an application
   * @param {string} name - The application's name
   * @param {Object} [params] - Query parameters
   * @param {boolean} [params.cascade] - Whether to cascade delete the application
   * @param {string} [params.propagationPolicy] - The propagation policy for deletion
   * @returns {Promise<Object>} Empty response
   */
  async deleteApplication(name, params = {}) {
    const queryParams = new URLSearchParams();
    if (params.cascade) queryParams.append('cascade', 'true');
    if (params.propagationPolicy) queryParams.append('propagationPolicy', params.propagationPolicy);

    return this._request('DELETE', `/api/v1/applications/${name}?${queryParams.toString()}`);
  }

  /**
   * Update updates an application
   * @param {string} name - The application's name
   * @param {Object} application - Updated application configuration
   * @param {boolean} [validate] - Whether to validate the application configuration
   * @returns {Promise<Object>} Updated application
   */
  async updateApplication(name, application, validate = true) {
    const queryParams = new URLSearchParams();
    if (!validate) queryParams.append('validate', 'false');

    return this._request('PUT', `/api/v1/applications/${name}?${queryParams.toString()}`, {
      body: JSON.stringify(application)
    });
  }

  /**
   * Sync syncs an application to its target state
   * @param {string} name - The application's name
   * @param {Object} [params] - Sync parameters
   * @param {boolean} [params.dryRun] - Whether to perform a dry run
   * @param {boolean} [params.prune] - Whether to prune resources
   * @param {string} [params.strategy] - The sync strategy
   * @param {string[]} [params.resources] - The resources to sync
   * @returns {Promise<Object>} Sync result
   */
  async syncApplication(name, params = {}) {
    const queryParams = new URLSearchParams();
    if (params.dryRun) queryParams.append('dryRun', 'true');
    if (params.prune) queryParams.append('prune', 'true');
    if (params.strategy) queryParams.append('strategy', params.strategy);
    if (params.resources) params.resources.forEach(resource => queryParams.append('resources', resource));

    return this._request('POST', `/api/v1/applications/${name}/sync?${queryParams.toString()}`);
  }

  /**
   * GetManifests returns application manifests
   * @param {string} name - The application's name
   * @param {Object} [params] - Query parameters
   * @param {string} [params.revision] - The revision to get manifests for
   * @returns {Promise<Object>} Application manifests
   */
  async getApplicationManifests(name, params = {}) {
    const queryParams = new URLSearchParams();
    if (params.revision) queryParams.append('revision', params.revision);

    return this._request('GET', `/api/v1/applications/${name}/manifests?${queryParams.toString()}`);
  }

  /**
   * GetResource returns single application resource
   * @param {string} name - The application's name
   * @param {Object} params - Resource parameters
   * @param {string} params.namespace - The resource namespace
   * @param {string} params.resourceName - The resource name
   * @param {string} params.version - The resource version
   * @param {string} params.kind - The resource kind
   * @param {string} [params.group] - The resource group
   * @returns {Promise<Object>} Resource details
   */
  async getApplicationResource(name, params) {
    const queryParams = new URLSearchParams();
    queryParams.append('namespace', params.namespace);
    queryParams.append('resourceName', params.resourceName);
    queryParams.append('version', params.version);
    queryParams.append('kind', params.kind);
    if (params.group) queryParams.append('group', params.group);

    return this._request('GET', `/api/v1/applications/${name}/resource?${queryParams.toString()}`);
  }

  /**
   * ListResourceEvents returns a list of event resources
   * @param {string} name - The application's name
   * @param {Object} [params] - Query parameters
   * @param {string} [params.resourceNamespace] - The namespace to filter events
   * @param {string} [params.resourceName] - The resource name to filter events
   * @param {string} [params.resourceUID] - The resource UID to filter events
   * @returns {Promise<Object>} List of events
   */
  async listApplicationEvents(name, params = {}) {
    const queryParams = new URLSearchParams();
    if (params.resourceNamespace) queryParams.append('resourceNamespace', params.resourceNamespace);
    if (params.resourceName) queryParams.append('resourceName', params.resourceName);
    if (params.resourceUID) queryParams.append('resourceUID', params.resourceUID);

    return this._request('GET', `/api/v1/applications/${name}/events?${queryParams.toString()}`);
  }

  /**
   * ListResourceActions returns list of resource actions
   * @param {string} name - The application's name
   * @param {Object} params - Resource parameters
   * @param {string} params.namespace - The resource namespace
   * @param {string} params.resourceName - The resource name
   * @param {string} params.version - The resource version
   * @param {string} params.kind - The resource kind
   * @param {string} [params.group] - The resource group
   * @returns {Promise<Object>} List of resource actions
   */
  async listApplicationResourceActions(name, params) {
    const queryParams = new URLSearchParams();
    queryParams.append('namespace', params.namespace);
    queryParams.append('resourceName', params.resourceName);
    queryParams.append('version', params.version);
    queryParams.append('kind', params.kind);
    if (params.group) queryParams.append('group', params.group);

    return this._request('GET', `/api/v1/applications/${name}/resource/actions?${queryParams.toString()}`);
  }

  /**
   * RunResourceAction run resource action
   * @param {string} name - The application's name
   * @param {Object} params - Resource parameters
   * @param {string} params.namespace - The resource namespace
   * @param {string} params.resourceName - The resource name
   * @param {string} params.version - The resource version
   * @param {string} params.kind - The resource kind
   * @param {string} params.action - The action to run
   * @param {string} [params.group] - The resource group
   * @returns {Promise<Object>} Action result
   */
  async runApplicationResourceAction(name, params) {
    const queryParams = new URLSearchParams();
    queryParams.append('namespace', params.namespace);
    queryParams.append('resourceName', params.resourceName);
    queryParams.append('version', params.version);
    queryParams.append('kind', params.kind);
    queryParams.append('action', params.action);
    if (params.group) queryParams.append('group', params.group);

    return this._request('POST', `/api/v1/applications/${name}/resource/actions?${queryParams.toString()}`);
  }
}

export default ApplicationService; 