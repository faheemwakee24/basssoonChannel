import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../config/constants';

/**
 * Token Storage Utility
 * Handles storing and retrieving authentication tokens
 */
class TokenStorage {
  /**
   * Get access token from storage
   */
  async getAccessToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('[TokenStorage] Failed to get access token:', error);
      return null;
    }
  }

  /**
   * Set access token in storage
   */
  async setAccessToken(token: string | null): Promise<void> {
    try {
      if (token) {
        await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      }
    } catch (error) {
      console.error('[TokenStorage] Failed to set access token:', error);
    }
  }

  /**
   * Clear access token from storage
   */
  async clearAccessToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('[TokenStorage] Failed to clear access token:', error);
    }
  }
}

// Export singleton instance
export const tokenStorage = new TokenStorage();
