import {baseApi} from './baseApi';
import {API_ENDPOINTS} from '../constants/api';

/**
 * News API slice
 * Handles news-related endpoints
 */

// News Item Interface
export interface NewsItem {
  id: number;
  name: string;
  description: string;
  image: string | null;
  date: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  status: number;
  slug: string;
  is_top_story: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// News List Response
export interface NewsListResponse {
  success: boolean;
  message: string;
  data: {
    news: NewsItem[];
  };
}

// News Detail Response
export interface NewsDetailResponse {
  success: boolean;
  message: string;
  data: {
    news: NewsItem;
  };
}

/**
 * News API slice
 */
export const newsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // Get news listing
    getNewsList: builder.query<NewsListResponse, void>({
      query: () => {
        console.log('[NewsAPI] Get news list request');
        return {
          url: API_ENDPOINTS.NEWS.LIST,
          method: 'GET',
        };
      },
      providesTags: ['News'],
    }),

    // Get news details by slug
    getNewsDetail: builder.query<NewsDetailResponse, string>({
      query: (slug) => {
        console.log('[NewsAPI] Get news detail request for slug:', slug);
        return {
          url: API_ENDPOINTS.NEWS.DETAIL(slug),
          method: 'GET',
        };
      },
      providesTags: (result, error, slug) => [{type: 'News', id: slug}],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetNewsListQuery,
  useLazyGetNewsListQuery,
  useGetNewsDetailQuery,
  useLazyGetNewsDetailQuery,
} = newsApi;
