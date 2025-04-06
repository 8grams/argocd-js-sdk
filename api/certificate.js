import BaseService from './base-service.js';

/**
 * Certificate Service
 * @class
 * @extends BaseService
 */
class CertificateService extends BaseService {
  /**
   * List all available repository certificates
   * @param {Object} [params] - Query parameters
   * @param {string} [params.hostNamePattern] - A file-glob pattern (not regex) to match against the host name
   * @param {string} [params.certType] - The type of the certificate (https or ssh)
   * @param {string} [params.certSubType] - The sub type of the certificate (ssh-rsa, ssh-dss, ecdsa-sha2-nistp256, ...)
   * @returns {Promise<Object>} List of certificates
   */
  async listCertificates(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.hostNamePattern) queryParams.append('hostNamePattern', params.hostNamePattern);
    if (params.certType) queryParams.append('certType', params.certType);
    if (params.certSubType) queryParams.append('certSubType', params.certSubType);

    return this._request('GET', `/api/v1/certificates?${queryParams.toString()}`);
  }

  /**
   * Create one or more repository certificates in the server's configuration
   * @param {Object} certificate - Certificate configuration
   * @returns {Promise<Object>} Created certificate
   */
  async createCertificate(certificate) {
    return this._request('POST', '/api/v1/certificates', {
      body: JSON.stringify(certificate)
    });
  }

  /**
   * Delete the specified repository certificate from the configuration
   * @param {string} hostNamePattern - A file-glob pattern (not regex) to match against the host name
   * @param {string} certType - The type of the certificate (https or ssh)
   * @param {string} certSubType - The sub type of the certificate (ssh-rsa, ssh-dss, ecdsa-sha2-nistp256, ...)
   * @returns {Promise<Object>} Empty response
   */
  async deleteCertificate(hostNamePattern, certType, certSubType) {
    const queryParams = new URLSearchParams();
    queryParams.append('hostNamePattern', hostNamePattern);
    queryParams.append('certType', certType);
    queryParams.append('certSubType', certSubType);

    return this._request('DELETE', `/api/v1/certificates?${queryParams.toString()}`);
  }
}

export default CertificateService; 