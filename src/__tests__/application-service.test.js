import ApplicationService from '../api/application.js';

// Mock fetch
global.fetch = jest.fn();

describe('ApplicationService', () => {
  let service;
  const config = {
    baseUrl: 'https://argocd.example.com',
    token: 'test-token'
  };

  beforeEach(() => {
    service = new ApplicationService(config);
    fetch.mockClear();
  });

  describe('listApplications', () => {
    it('should list applications with default parameters', async () => {
      const mockResponse = { items: [] };
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const response = await service.listApplications();

      expect(fetch).toHaveBeenCalledWith('https://argocd.example.com/api/v1/applications', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.token}`,
          'Content-Type': 'application/json'
        }
      });
      expect(response).toEqual(mockResponse);
    });

    it('should list applications with query parameters', async () => {
      const mockResponse = { items: [] };
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const params = {
        name: 'test-app',
        refresh: 'hard',
        projects: ['default', 'test']
      };

      const response = await service.listApplications(params);

      expect(fetch).toHaveBeenCalledWith('https://argocd.example.com/api/v1/applications?name=test-app&refresh=hard&projects=default&projects=test', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.token}`,
          'Content-Type': 'application/json'
        }
      });
      expect(response).toEqual(mockResponse);
    });
  });

  describe('createApplication', () => {
    it('should create an application', async () => {
      const mockResponse = { metadata: { name: 'test-app' } };
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const application = {
        metadata: {
          name: 'test-app'
        },
        spec: {
          project: 'default',
          source: {
            repoURL: 'https://github.com/example/repo.git'
          }
        }
      };

      const response = await service.createApplication(application);

      expect(fetch).toHaveBeenCalledWith('https://argocd.example.com/api/v1/applications', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(application)
      });
      expect(response).toEqual(mockResponse);
    });

    it('should create an application with upsert and validate options', async () => {
      const mockResponse = { metadata: { name: 'test-app' } };
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const application = {
        metadata: {
          name: 'test-app'
        }
      };

      const response = await service.createApplication(application, true, false);

      expect(fetch).toHaveBeenCalledWith('https://argocd.example.com/api/v1/applications?upsert=true&validate=false', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(application)
      });
      expect(response).toEqual(mockResponse);
    });
  });

  describe('getApplication', () => {
    it('should get an application by name', async () => {
      const mockResponse = { metadata: { name: 'test-app' } };
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const response = await service.getApplication('test-app');

      expect(fetch).toHaveBeenCalledWith('https://argocd.example.com/api/v1/applications/test-app', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.token}`,
          'Content-Type': 'application/json'
        }
      });
      expect(response).toEqual(mockResponse);
    });

    it('should get an application with refresh and project parameters', async () => {
      const mockResponse = { metadata: { name: 'test-app' } };
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const params = {
        refresh: 'hard',
        project: 'default'
      };

      const response = await service.getApplication('test-app', params);

      expect(fetch).toHaveBeenCalledWith('https://argocd.example.com/api/v1/applications/test-app?refresh=hard&project=default', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.token}`,
          'Content-Type': 'application/json'
        }
      });
      expect(response).toEqual(mockResponse);
    });
  });
}); 