// API Configuration
export const API_BASE_URL = 'https://binance-p2p-clone.onrender.com/api';

// Helper function to get auth token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Helper function to get Authorization header
export const getAuthHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Auth API
export const authAPI = {
  signup: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  login: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getCurrentUser: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    return response.json();
  },

  updateProfile: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getUserById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/auth/user/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },
};

// Ads API
export const adsAPI = {
  getAds: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.fiatCurrency) queryParams.append('fiatCurrency', filters.fiatCurrency);
      if (filters.paymentMethod) queryParams.append('paymentMethod', filters.paymentMethod);
      if (filters.minAmount) queryParams.append('minAmount', filters.minAmount);
      if (filters.maxAmount) queryParams.append('maxAmount', filters.maxAmount);
      if (filters.page) queryParams.append('page', filters.page);
      if (filters.limit) queryParams.append('limit', filters.limit);

      const response = await fetch(`${API_BASE_URL}/ads?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('getAds error:', error);
      throw error;
    }
  },

  getAdById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/ads/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  createAd: async (data) => {
    const response = await fetch(`${API_BASE_URL}/ads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  updateAd: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/ads/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  deleteAd: async (id) => {
    const response = await fetch(`${API_BASE_URL}/ads/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    return response.json();
  },

  getMyAds: async () => {
    const response = await fetch(`${API_BASE_URL}/ads/user/my-ads`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    return response.json();
  },
};

// Trades API
export const tradesAPI = {
  createTrade: async (data) => {
    const response = await fetch(`${API_BASE_URL}/trades`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getMyTrades: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);

    const response = await fetch(`${API_BASE_URL}/trades/my-trades?${queryParams}`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    return response.json();
  },

  getTradeById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/trades/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    return response.json();
  },

  updateTradeStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/trades/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ status }),
    });
    return response.json();
  },

  addMessage: async (id, message) => {
    const response = await fetch(`${API_BASE_URL}/trades/${id}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ message }),
    });
    return response.json();
  },

  rateUser: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/trades/${id}/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
