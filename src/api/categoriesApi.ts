import { baseApi } from './baseApi';
import { API_ENDPOINTS } from '../constants/api';

/**
 * Category / subcategory types for audio categories API
 */

/** Single subcategory item (e.g. when passed as route param `section` to a detail screen) */
export interface SubcategorySection {
  id: number;
  parent_id: number;
  name: string;
  image: string | null;
  category_type: string | null;
  created_at: string;
  updated_at: string;
  status: number;
  slug: string;
  is_top_category: number;
}

export interface AudioSubcategory extends SubcategorySection { }

export interface AudioCategory {
  id: number;
  parent_id: number;
  name: string;
  image: string | null;
  category_type: string;
  created_at: string;
  updated_at: string;
  status: number;
  slug: string;
  is_top_category: number;
  subcategories: AudioSubcategory[];
}

export interface CategoryItem {
  id: number;
  name: string;
  category_id: string;
  sub_category_id: string;
  price: string | null;
  description: string | null;
  image: string | null;
  type: string;
  embed_code: string | null;
  optional_image: string | null;
  optional_image2: string | null;
  pdf: string | null;
  authors: string | null;
  keywords: string | null;
  is_free_list: number | null;
  created_at: string;
  updated_at: string;
  status: number;
  slug: string;
  play_url?: string
}

export interface CategoryItemsResponse {
  success: boolean;
  message: string;
  data: {
    main_category: Omit<AudioCategory, 'subcategories'>;
    sub_category: SubcategorySection;
    items: CategoryItem[];
  };
}

export interface ItemDetailResponse {
  success: boolean;
  message: string;
  data: {
    item: CategoryItem;
    is_bookmarked: boolean;
  };
}

export interface AudioBanner {
  id: number;
  image: string;
  status: number;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface AudioPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  category_id: string;
  duration: string;
  status: number;
  slug: string;
  stripe_product_id: string | null;
  created_at: string;
  updated_at: string;
  is_trial_plan: number;
  plan_icon: string | null;
  banner_images: string;
  ipad_banner_images: string | null;
}

export interface AudioCategoriesResponse {
  success: boolean;
  message: string;
  data: {
    categories: AudioCategory[];
    banners: AudioBanner[];
    plan: AudioPlan;
  };
}

export type CategoryItemsParams = {
  categorySlug: string;
  subcategorySlug: string;
  type: string;
};

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAudioCategories: builder.query<AudioCategoriesResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.CATEGORIES.AUDIO,
        method: 'GET',
      }),
      providesTags: ['Categories'],
    }),
    getVideoCategories: builder.query<AudioCategoriesResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.CATEGORIES.VIDEO,
        method: 'GET',
      }),
      providesTags: ['Categories'],
    }),
    getCategoryItems: builder.query<CategoryItemsResponse, CategoryItemsParams>({
      query: ({ categorySlug, subcategorySlug, type }) => ({
        url: API_ENDPOINTS.CATEGORIES.ITEMS(categorySlug, subcategorySlug, type),
        method: 'GET',
      }),
      providesTags: (_, __, { categorySlug, subcategorySlug, type }) => [
        { type: 'Categories', id: `items-${categorySlug}-${subcategorySlug}-${type}` },
      ],
    }),
    getItemDetail: builder.query<ItemDetailResponse, string>({
      query: (slug) => ({
        url: API_ENDPOINTS.ITEMS.DETAILS(slug),
        method: 'GET',
      }),
      providesTags: (result, error, slug) => [{ type: 'Categories', id: `detail-${slug}` }],
    }),
  }),
});

export const {
  useGetAudioCategoriesQuery,
  useLazyGetAudioCategoriesQuery,
  useGetVideoCategoriesQuery,
  useLazyGetVideoCategoriesQuery,
  useGetCategoryItemsQuery,
  useLazyGetCategoryItemsQuery,
  useGetItemDetailQuery,
  useLazyGetItemDetailQuery,
} = categoriesApi;