import { baseApi } from './baseApi';
import { API_ENDPOINTS } from '../constants/api';

export interface ToggleBookmarkRequest {
  item_id: any;
}

export interface ToggleBookmarkResponse {
  success: boolean;
  message?: string;
  data?: { bookmarked?: boolean };
}

export interface BookmarkItem {
  id: number;
  item: {
    id: number;
    name: string;
    category_id: string;
    sub_category_id: string;
    price: string | null;
    description: string;
    image: string;
    type: 'Video' | 'Audio';
    embed_code: string;
    optional_image: string | null;
    optional_image2: string | null;
    pdf: string | null;
    authors: string;
    keywords: string;
    is_free_list: string | null;
    created_at: string;
    updated_at: string;
    status: number;
    slug: string;
    play_url: string;
  };
  is_bookmarked: boolean;
}

export interface BookmarksResponse {
  success: boolean;
  message: string;
  data: {
    bookmarks: BookmarkItem[];
  };
}

export const bookmarksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleBookmark: builder.mutation<ToggleBookmarkResponse, ToggleBookmarkRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.BOOKMARKS.TOGGLE,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Bookmarks'],
    }),
    getBookmarks: builder.query<BookmarksResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.BOOKMARKS.LIST,
        method: 'GET',
      }),
      providesTags: ['Bookmarks'],
    }),
  }),
});

export const { useToggleBookmarkMutation, useGetBookmarksQuery } = bookmarksApi;
