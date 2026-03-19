import { baseApi } from './baseApi';
import { API_ENDPOINTS } from '../constants/api';

export interface NotificationItem {
  id: number;
  title: string;
  description: string;
  is_read?: boolean;
  read?: boolean;
  read_at?: string | null;
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
    markNotificationRead: builder.mutation<
      { success: boolean; message?: string },
      number
    >({
      query: (notificationId) => ({
        url: '/notifications/mark-read',
        method: 'POST',
        body: { notification_id: notificationId },
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
  useMarkNotificationReadMutation,
} = notificationsApi;
