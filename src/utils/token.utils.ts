/**
 * Token Storage Utilities
 * Purpose: Secure, simple token management
 * Philosophy: Minimal, focused, secure
 */

// Token storage keys - consistent and simple
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  TOKEN_EXPIRES_AT: 'token_expires_at',
  USER_DATA: 'user_data',
} as const;

/**
 * Store authentication tokens securely
 */
export const storeTokens = (accessToken: string, refreshToken: string, expiresIn: number): void => {
  try {
    // Access token in localStorage (short-lived)
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    
    // Refresh token in localStorage (we'll enhance security later if needed)
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    
    // Calculate and store expiration time
    const expiresAt = Date.now() + (expiresIn * 1000);
    localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRES_AT, expiresAt.toString());
    
  } catch (error) {
    console.error('Failed to store tokens:', error);
  }
};

/**
 * Get stored access token
 */
export const getAccessToken = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  } catch (error) {
    console.error('Failed to get access token:', error);
    return null;
  }
};

/**
 * Get stored refresh token
 */
export const getRefreshToken = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  } catch (error) {
    console.error('Failed to get refresh token:', error);
    return null;
  }
};

/**
 * Check if access token is expired or about to expire
 * Returns true if token expires in less than 5 minutes
 */
export const isTokenExpired = (): boolean => {
  try {
    const expiresAt = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRES_AT);
    if (!expiresAt) return true;
    
    const expireTime = parseInt(expiresAt, 10);
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
    
    return now >= (expireTime - fiveMinutes);
  } catch (error) {
    console.error('Failed to check token expiration:', error);
    return true;
  }
};

/**
 * Store user data
 */
export const storeUserData = (userData: any): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  } catch (error) {
    console.error('Failed to store user data:', error);
  }
};

/**
 * Get stored user data
 */
export const getUserData = (): any | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to get user data:', error);
    return null;
  }
};

/**
 * Clear all authentication data
 */
export const clearAuthData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRES_AT);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  } catch (error) {
    console.error('Failed to clear auth data:', error);
  }
};

/**
 * Check if user is authenticated (has valid tokens)
 */
export const isAuthenticated = (): boolean => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  
  // Need at least a refresh token to be considered authenticated
  return !!(accessToken || refreshToken);
};