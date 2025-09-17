import { apiClient } from './api.client';
import { 
  storeTokens, 
  clearAuthData, 
  getAccessToken as getStoredAccessToken, 
  getRefreshToken as getStoredRefreshToken,
  isAuthenticated as checkAuthentication
} from '../utils/token.utils';
import type { 
  LoginFormValues, 
  RegistrationFormValues,
  LogoutFormValues,
  LoginResponse,
  RegisterResponse,
  User,
  UserSession
} from '../types';

/**
 * Focused authentication service - everything in moderation
 * Handles login, register, logout, and session management
 */
class AuthService {
  /**
   * Authenticate user with email/password
   * Supports remember me for extended session
   */
  async login(credentials: LoginFormValues): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
      
      // Store tokens securely (response is already .data from API client)
      storeTokens(response.access_token, response.refresh_token, 30 * 60); // 30 min default
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  /**
   * Register new user account
   */
  async register(userData: RegistrationFormValues): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>('/auth/register', userData);
      
      // Store tokens securely (response is already .data from API client)
      storeTokens(response.access_token, response.refresh_token, 30 * 60); // 30 min default
      
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  /**
   * Logout current user session
   * Can logout from current device or all devices
   */
  async logout(allDevices: boolean = false): Promise<void> {
    const refreshToken = getStoredRefreshToken();
    
    try {
      if (refreshToken) {
        // Notify backend with proper format (refresh token in header, options in body)
        await apiClient.postWithRefreshToken<{ message: string }>(
          '/auth/logout',
          refreshToken,
          { allDevices }
        );
      }
      // If no refresh token, we still consider it a successful logout
    } catch (error) {
      // Even if backend logout fails, we continue with local cleanup
      console.warn('Backend logout notification failed:', error);
    } finally {
      // Always clear local tokens
      clearAuthData();
    }
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/auth/profile');
    return response;
  }

  /**
   * Get all active sessions for current user
   */
  async getUserSessions(): Promise<UserSession[]> {
    const response = await apiClient.get<UserSession[]>('/auth/sessions');
    return response;
  }

  /**
   * Terminate a specific session
   */
  async terminateSession(sessionId: string): Promise<void> {
    await apiClient.delete(`/auth/sessions/${sessionId}`);
  }

  /**
   * Refresh authentication token
   * Backend expects refresh token in Authorization header
   */
  async refreshToken(): Promise<void> {
    const refreshToken = getStoredRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      // Use specialized method that sends refresh token in Authorization header
      const response = await apiClient.postWithRefreshToken<{ access_token: string; refresh_token: string }>(
        '/auth/refresh',
        refreshToken
      );

      // Update tokens (response is already .data from API client)
      storeTokens(response.access_token, response.refresh_token, 30 * 60);
    } catch (error) {
      // If refresh fails, clear tokens and force re-login
      clearAuthData();
      throw error;
    }
  }

  /**
   * Check if user is currently authenticated
   */
  isAuthenticated(): boolean {
    return checkAuthentication();
  }

  /**
   * Get current access token
   */
  getAccessToken(): string | null {
    return getStoredAccessToken();
  }
}

export const authService = new AuthService();