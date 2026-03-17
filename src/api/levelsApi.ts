import { baseApi } from './baseApi';
import { API_ENDPOINTS } from '../constants/api';

/**
 * Level item from levels/level1 API
 */
export interface LevelItem {
  id: number;
  name: string;
  slug: string;
  further_levels_exists: number;
}

export interface Level1Response {
  success: boolean;
  message: string;
  data: {
    levels: LevelItem[];
  };
}

/** Level1 parent info in level2 response */
export interface Level1Info {
  id: number;
  parent_id: number;
  total_childs: number;
  name: string;
  image: string | null;
  created_at: string;
  updated_at: string;
  status: number;
  slug: string;
  sort_order: number;
}

export interface Level2Response {
  success: boolean;
  message: string;
  data: {
    level1: Level1Info;
    levels: LevelItem[];
  };
}

/** Level2 parent info in level3 response (same shape as Level1Info) */
export type Level2Info = Level1Info;

/** Level item in level3 response (full row, no further_levels_exists) */
export interface Level3LevelItem {
  id: number;
  parent_id: number;
  total_childs: number;
  name: string;
  image: string | null;
  created_at: string;
  updated_at: string;
  status: number;
  slug: string;
  sort_order: number;
}

export interface Level3Response {
  success: boolean;
  message: string;
  data: {
    level1: Level1Info;
    level2: Level2Info;
    levels: Level3LevelItem[];
  };
}

export type Level3Params = { slug1: string; slug2: string };

/** Level item row from levelitems API */
export interface LevelItemRow {
  id: number;
  name: string;
  level_id: number;
  sub_level_id: number;
  sub_sub_level_id: number;
  description: string | null;
  image: string | null;
  full_address: string | null;
  phone: string | null;
  email: string | null;
  uri: string | null;
  direction: string | null;
  created_at: string;
  updated_at: string;
  status: number;
  slug: string;
  latitude: number | null;
  longitude: number | null;
  sort_order: number;
}

export interface LevelItemsResponse {
  success: boolean;
  message: string;
  data: {
    title: string;
    page_title: string;
    level1: Level1Info | null;
    level2: Level1Info | null;
    level3: Level1Info | null;
    items: LevelItemRow[];
  };
}

/** slug1 required; slug2/slug3 optional for levelitems/:slug1, /:slug1/:slug2, /:slug1/:slug2/:slug3 */
export type LevelItemsParams =
  | { slug1: string }
  | { slug1: string; slug2: string }
  | { slug1: string; slug2: string; slug3: string };

function getLevelItemsUrl(params: LevelItemsParams): string {
  if ('slug3' in params && params.slug3) {
    return API_ENDPOINTS.LEVEL_ITEMS.BY_SLUG1_SLUG2_SLUG3(params.slug1, params.slug2, params.slug3);
  }
  if ('slug2' in params && params.slug2) {
    return API_ENDPOINTS.LEVEL_ITEMS.BY_SLUG1_SLUG2(params.slug1, params.slug2);
  }
  return API_ENDPOINTS.LEVEL_ITEMS.BY_SLUG1(params.slug1);
}

export const levelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLevel1: builder.query<Level1Response, void>({
      query: () => ({
        url: API_ENDPOINTS.LEVELS.LEVEL1,
        method: 'GET',
      }),
      providesTags: ['Levels'],
    }),
    getLevel2: builder.query<Level2Response, string>({
      query: (slug) => ({
        url: API_ENDPOINTS.LEVELS.LEVEL2(slug),
        method: 'GET',
      }),
      providesTags: (_, __, slug) => [{ type: 'Levels', id: `level2-${slug}` }],
    }),
    getLevel3: builder.query<Level3Response, Level3Params>({
      query: ({ slug1, slug2 }) => ({
        url: API_ENDPOINTS.LEVELS.LEVEL3(slug1, slug2),
        method: 'GET',
      }),
      providesTags: (_, __, { slug1, slug2 }) => [{ type: 'Levels', id: `level3-${slug1}-${slug2}` }],
    }),
    getLevelItems: builder.query<LevelItemsResponse, LevelItemsParams>({
      query: (params) => ({
        url: getLevelItemsUrl(params),
        method: 'GET',
      }),
      providesTags: (_, __, params) => [
        {
          type: 'Levels',
          id:
            'slug3' in params && params.slug3
              ? `items-${params.slug1}-${params.slug2}-${params.slug3}`
              : 'slug2' in params && params.slug2
                ? `items-${params.slug1}-${params.slug2}`
                : `items-${params.slug1}`,
        },
      ],
    }),
  }),
});

export const {
  useGetLevel1Query,
  useLazyGetLevel1Query,
  useGetLevel2Query,
  useLazyGetLevel2Query,
  useGetLevel3Query,
  useLazyGetLevel3Query,
  useGetLevelItemsQuery,
  useLazyGetLevelItemsQuery,
} = levelsApi;
