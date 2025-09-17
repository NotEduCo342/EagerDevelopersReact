import React, { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';
import { authService } from '../services/auth.service';
import { getUserMessage } from '../utils/error.utils';
import type { User } from '../types';

// Authentication state interface - simple and focused
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Action types - everything we need, nothing we don't
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' };

// Context interface - clean and minimal
interface AuthContextType extends AuthState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (username: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  checkAuth: () => Promise<void>;
}

// Initial state - everything starts clean
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Reducer - handles all state changes in one place
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    
    default:
      return state;
  }
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component - lightweight and focused
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already authenticated on app start
  useEffect(() => {
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string, rememberMe?: boolean): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const response = await authService.login({ email, password, rememberMe });
      dispatch({ type: 'AUTH_SUCCESS', payload: response.user });
    } catch (error: any) {
      const message = getUserMessage(error);
      dispatch({ type: 'AUTH_ERROR', payload: message });
      throw error; // Re-throw for component-level handling
    }
  };

  // Register function
  const register = async (username: string, email: string, password: string, confirmPassword: string): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const response = await authService.register({ username, email, password, confirmPassword });
      dispatch({ type: 'AUTH_SUCCESS', payload: response.user });
    } catch (error: any) {
      const message = getUserMessage(error);
      dispatch({ type: 'AUTH_ERROR', payload: message });
      throw error; // Re-throw for component-level handling
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } catch (error) {
      console.warn('Logout request failed, but clearing local state:', error);
    } finally {
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  // Check authentication status
  const checkAuth = async (): Promise<void> => {
    if (!authService.isAuthenticated()) {
      return;
    }

    dispatch({ type: 'AUTH_START' });
    
    try {
      const user = await authService.getCurrentUser();
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error: any) {
      console.warn('Auth check failed:', error);
      dispatch({ type: 'AUTH_LOGOUT' });
      // Clear tokens if they're invalid
      await authService.logout();
    }
  };

  // Clear error function
  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Context value - everything components need
  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context - with proper error handling
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Export the context for advanced use cases
export { AuthContext };