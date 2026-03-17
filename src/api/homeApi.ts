import { baseApi } from './baseApi';
import { API_ENDPOINTS } from '../constants/api';
import { NewsItem } from './newsApi';

/**
 * Home API slice
 * Handles home-related endpoints
 */

export interface ExerciseItem {
    id: number;
    name: string;
    category_id: string;
    sub_category_id: string;
    price: string | null;
    description: string;
    image: string;
    type: string;
    embed_code: string;
    optional_image: string | null;
    optional_image2: string | null;
    pdf: string | null;
    authors: string;
    keywords: string;
    is_free_list: number;
    created_at: string;
    updated_at: string;
    status: number;
    slug: string;
}

export interface HomeData {
    today_news: NewsItem[];
    top_story: NewsItem;
    other_news: NewsItem[];
    top_category: any;
    top_category_subcategories: any[];
    user_name: string;
    free_exercises: ExerciseItem[];
    last_viewed_item: string;
    bookmarks_list: any;
    user_current_plan: any;
}

export interface HomeResponse {
    success: boolean;
    message: string;
    data: HomeData;
}

export const homeApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getHomeData: builder.query<HomeResponse, void>({
            query: () => ({
                url: API_ENDPOINTS.HOME.DATA,
                method: 'GET',
            }),
            providesTags: ['News'], // Home data often includes news
        }),
    }),
});

export const { useGetHomeDataQuery, useLazyGetHomeDataQuery } = homeApi;
