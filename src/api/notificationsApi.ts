import { baseApi } from './baseApi';
import { API_ENDPOINTS } from '../constants/api';

export interface NotificationItem {
  id: number;
  title: string;
  description: string;
  [key: string]: unknown;
}

export interface NotificationsResponse {
  success: boolean;
  message: string;
  data: {
    notifications: NotificationItem[];
  };
}

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationsResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.NOTIFICATIONS.LIST,
        method: 'GET',
      }),
      providesTags: ['Notification'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
} = notificationsApi;
