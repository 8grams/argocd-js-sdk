import BaseService from '../base-service.js';

// Mock fetch
global.fetch = jest.fn();

describe('BaseService', () => {
  let service;
  const config = {
    baseUrl: 'https://argocd.example.com',
    token: 'test-token'
  };

  beforeEach(() => {
    service = new BaseService(config);
    fetch.mockClear();
  });

  describe('_request', () => {
    it('should make a GET request with correct headers', async () => {
      const mockResponse = { message: 'success' };
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const response = await service._request('GET', '/api/v1/test');

      expect(fetch).toHaveBeenCalledWith('https://argocd.example.com/api/v1/test', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.token}`,
          'Content-Type': 'application/json'
        }
      });
      expect(response).toEqual(mockResponse);
    });

    it('should make a POST request with body', async () => {
      const mockResponse = { message: 'success' };
      const requestBody = { test: 'data' };
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const response = await service._request('POST', '/api/v1/test', {
        body: JSON.stringify(requestBody)
      });

      expect(fetch).toHaveBeenCalledWith('https://argocd.example.com/api/v1/test', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      expect(response).toEqual(mockResponse);
    });

    it('should handle errors correctly', async () => {
      const errorResponse = {
        ok: false,
        status: 404,
        json: () => Promise.resolve({ message: 'Not found' })
      };
      fetch.mockResolvedValue(errorResponse);

      await expect(service._request('GET', '/api/v1/test'))
        .rejects
        .toThrow('Request failed with status code 404: Not found');
    });
  });
}); 