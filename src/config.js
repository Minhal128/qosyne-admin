// Configuration for different environments
const environments = {
    development: {
        baseUrl: "https://qosynebackend.vercel.app/api",
    },
    production: {
        baseUrl: "https://qosynebackend.vercel.app/api",
    },
    fallback: {
        baseUrl: "https://qosynebackend.vercel.app/api",
    }
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://qosynebackend.vercel.app/api',
  ENDPOINTS: {
    TRANSACTIONS: '/payment/admin/transactions',
    TRANSACTION_STATS: '/payment/admin/transactions/stats',
    CHANGE_STATUS: '/payment/change-status',
    GET_ALL_USERS: '/user/get-all-users'
  }
};

// Set the current environment
// Change this to 'development' for local development
// Change this to 'production' for production deployment
// Change this to 'fallback' to use the old backend
const currentEnvironment = 'development';

const config = {
    ...environments[currentEnvironment],
    environment: currentEnvironment,
    // Add fallback URL for error handling
    fallbackUrl: environments.fallback.baseUrl
};

export default config
