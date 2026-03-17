import { baseApi } from './baseApi';
import { API_ENDPOINTS } from '../constants/api';

/**
 * FAQ Item Interface
 */
export interface FaqItem {
  id: number;
  slug: string;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  status: number;
}

/**
 * FAQ API Response
 */
export interface FaqResponse {
  success: boolean;
  message: string;
  data: {
    faq_list: FaqItem[];
    first_faq_show: number;
  };
}

/**
 * FAQ API slice
 * Handles FAQ-related endpoints
 */
export const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaqList: builder.query<FaqResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.HOME.FAQ,
        method: 'GET',
      }),
      providesTags: ['FAQ'],
    }),
  }),
});

export const { useGetFaqListQuery, useLazyGetFaqListQuery } = faqApi;
