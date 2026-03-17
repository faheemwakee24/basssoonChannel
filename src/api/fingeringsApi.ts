import {baseApi} from './baseApi';
import {API_ENDPOINTS} from '../constants/api';

/**
 * Fingerings API slice
 * Handles fingerings-related endpoints
 */

// Fingering Category Interface
export interface FingeringCategory {
  id: number;
  name: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  status: number;
  slug: string;
}

// Fingering Categories Response
export interface FingeringCategoriesResponse {
  success: boolean;
  message: string;
  data: {
    categories: FingeringCategory[];
  };
}

// Fingering Item Interface
export interface FingeringItem {
  id: number;
  slug: string;
  title: string;
  image: string;
  fingeringcategory_id: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
  status: number;
}

// Fingering Category Detail Interface
export interface FingeringCategoryDetail {
  id: number;
  name: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  status: number;
  slug: string;
}

// Fingering Detail Response
export interface FingeringDetailResponse {
  success: boolean;
  message: string;
  data: {
    category: FingeringCategoryDetail;
    fingerings: FingeringItem[];
  };
}

// Additional Image Interface
export interface AdditionalImage {
  id: number;
  slug: string;
  fingering_id: number;
  image: string;
  created_at: string;
}

// Single Fingering Detail Response
export interface SingleFingeringDetailResponse {
  success: boolean;
  message: string;
  data: {
    fingering: FingeringItem;
    additional_images: AdditionalImage[];
  };
}

/**
 * Fingerings API slice
 */
export const fingeringsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // Get fingering categories
    getFingeringCategories: builder.query<FingeringCategoriesResponse, void>({
      query: () => {
        console.log('[FingeringsAPI] Get fingering categories request');
        return {
          url: API_ENDPOINTS.FINGERINGS.CATEGORIES,
          method: 'GET',
        };
      },
      providesTags: ['Fingerings'],
    }),

    // Get fingering details by slug (category with list of fingerings)
    getFingeringDetail: builder.query<FingeringDetailResponse, string>({
      query: (slug) => {
        console.log('[FingeringsAPI] Get fingering detail request for slug:', slug);
        return {
          url: API_ENDPOINTS.FINGERINGS.DETAIL(slug),
          method: 'GET',
        };
      },
      providesTags: (result, error, slug) => [{type: 'Fingerings', id: slug}],
    }),

    // Get single fingering details by slug (with additional images)
    getSingleFingeringDetail: builder.query<SingleFingeringDetailResponse, string>({
      query: (slug) => {
        console.log('[FingeringsAPI] Get single fingering detail request for slug:', slug);
        return {
          url: API_ENDPOINTS.FINGERINGS.FINGERING_DETAIL(slug),
          method: 'GET',
        };
      },
      providesTags: (result, error, slug) => [{type: 'Fingerings', id: `detail-${slug}`}],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetFingeringCategoriesQuery,
  useLazyGetFingeringCategoriesQuery,
  useGetFingeringDetailQuery,
  useLazyGetFingeringDetailQuery,
  useGetSingleFingeringDetailQuery,
  useLazyGetSingleFingeringDetailQuery,
} = fingeringsApi;
