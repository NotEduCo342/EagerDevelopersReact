/**
 * Lightweight API Client
 * Purpose: Clean HTTP client with error handling and token management
 * Philosophy: Simple, focused, performant
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { config } from '@/config';

// Simple error response interface
interface ApiErrorResponse {
  message: string;
  statusCode?: number;
  error?: string;
}

// API client class - focused and lightweight
class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.environment.api.baseUrl,
      timeout: config.environment.api.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor - add auth token if available
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getStoredToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - handle errors gracefully
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiErrorResponse>) => {
        // Let the calling code handle specific errors
        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  // Simple token retrieval
  private getStoredToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Normalize errors for consistent handling
  private normalizeError(error: AxiosError<ApiErrorResponse>) {
    if (error.response?.data) {
      return {
        message: error.response.data.message || 'An error occurred',
        status: error.response.status,
        code: error.response.data.error || 'API_ERROR',
      };
    }

    if (error.request) {
      return {
        message: 'Network error - please check your connection',
        status: 0,
        code: 'NETWORK_ERROR',
      };
    }

    return {
      message: error.message || 'Unknown error occurred',
      status: 0,
      code: 'UNKNOWN_ERROR',
    };
  }

  // Core HTTP methods - simple and focused
  async get<T>(url: string): Promise<T> {
    const response = await this.client.get<T>(url);
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }

  // Specialized method for refresh tokens (uses different auth)
  async postWithRefreshToken<T>(url: string, refreshToken: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(url, data, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    return response.data;
  }
}

// Export singleton instance - clean and simple
export const apiClient = new ApiClient();