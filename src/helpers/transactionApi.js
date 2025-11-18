/**
 * Transaction Monitoring API Service
 * Handles all API calls related to transaction monitoring
 */

import { API_CONFIG } from '../config.js';

class TransactionAPI {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.baseUrl = API_CONFIG.BASE_URL; // For backward compatibility
  }

  /**
   * Simple fetch API method
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Fetch options
   * @returns {Promise<Object>} API response
   */
  async fetchAPI(endpoint, options = {}) {
    try {
      console.log(`🔄 Fetching: ${this.baseURL}${endpoint}`);
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ Success:`, data);
      return data;
    } catch (error) {
      console.error(`❌ API call failed:`, error);
      throw error;
    }
  }

  /**
   * Try API call with fallback support (legacy)
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Fetch options
   * @returns {Promise<Object>} API response
   */
  async fetchWithFallback(endpoint, options = {}) {
    return this.fetchAPI(endpoint, options);
  }

  /**
   * Get all transactions with filtering and pagination
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number (default: 1)
   * @param {number} params.limit - Items per page (default: 25)
   * @param {string} params.status - Filter by status
   * @param {string} params.provider - Filter by provider
   * @param {number} params.userId - Filter by user ID
   * @param {string} params.startDate - Filter from date
   * @param {string} params.endDate - Filter to date
   * @returns {Promise<Object>} API response with transactions and pagination
   */
  async getAllTransactions(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Handle both object and individual parameters
      if (typeof params === 'object') {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, value.toString());
          }
        });
      }

      const endpoint = `${API_CONFIG.ENDPOINTS.TRANSACTIONS}?${queryParams}`;
      console.log('🔄 Calling getAllTransactions with endpoint:', endpoint);
      const result = await this.fetchAPI(endpoint);
      console.log('✅ getAllTransactions result:', result);
      return result;
    } catch (error) {
      console.error('❌ getAllTransactions error:', error);
      throw error; // Let the error bubble up so we can see what's wrong
    }
  }

  /**
   * Get transaction statistics
   * @param {Object} params - Query parameters
   * @param {string} params.startDate - Start date for stats
   * @param {string} params.endDate - End date for stats
   * @param {string} params.provider - Filter by provider
   * @returns {Promise<Object>} API response with statistics
   */
  async getTransactionStats(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });

      const endpoint = `${API_CONFIG.ENDPOINTS.TRANSACTION_STATS}${queryParams.toString() ? `?${queryParams}` : ''}`;
      console.log('🔄 Calling getTransactionStats with endpoint:', endpoint);
      const result = await this.fetchAPI(endpoint);
      console.log('✅ getTransactionStats result:', result);
      return result;
    } catch (error) {
      console.error('❌ getTransactionStats error:', error);
      throw error; // Let the error bubble up so we can see what's wrong
    }
  }

  /**
   * Legacy method for backward compatibility
   * @deprecated Use updateTransactionStatus instead
   */
  async changeTransactionStatus(transactionId, status) {
    try {
      const response = await fetch(`${this.baseUrl}/payment/change-status/${transactionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error changing transaction status (legacy):', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const transactionAPI = new TransactionAPI();
export default transactionAPI;

// Export the class as well for testing purposes
export { TransactionAPI };
