import {baseApi} from './baseApi';
import {API_ENDPOINTS} from '../constants/api';

/**
 * Subscription API slice
 * Handles subscription-related endpoints
 */

// Subscription Plan Interface
export interface SubscriptionPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  category_id: string;
  duration: string;
  status: number;
  slug: string;
  stripe_product_id: string;
  created_at: string;
  updated_at: string;
  is_trial_plan: number;
  plan_icon: string;
  banner_images: string;
  ipad_banner_images: string | null;
}

// User Current Plan Interface
export interface UserCurrentPlan {
  id: number;
  slug: string;
  user_id: number;
  plan_id: number;
  plan_name: string;
  plan_price: string;
  plan_description: string;
  plan_category_id: string | null;
  plan_duration: string;
  created_at: string;
  updated_at: string;
  is_trial_plan: number;
  status: number;
  paid_amount: string;
  start_date: string;
  end_date: string;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  stripe_plan_id: string | null;
  transaction_id: string;
  transaction_data: string;
  transaction_ip: string;
  stripe_item_id: string | null;
  current_period_start: string;
  current_period_end: string;
  is_webhook_entry: string;
}

// Browse Other Plans Response
export interface BrowseOtherPlansResponse {
  success: boolean;
  message: string;
  data: {
    plans: SubscriptionPlan[];
    plans_categories: Record<string, string[]>;
    user_current_plan: UserCurrentPlan | null;
    durations: Record<string, string>;
  };
}

// Purchase Plan Response
export interface PurchasePlanResponse {
  success: boolean;
  message: string;
  data: {
    checkout_url: string;
    session_id: string;
  };
}

// My Subscription Response
export interface MySubscriptionResponse {
  success: boolean;
  message: string;
  data: {
    subscription: UserCurrentPlan;
    discount?: {
      name: string;
      value: string;
      amount: string;
    } | null;
  };
}

/**
 * Subscription API slice
 */
export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // Browse other subscription plans
    browseOtherPlans: builder.query<BrowseOtherPlansResponse, void>({
      query: () => {
        console.log('[SubscriptionAPI] Browse other plans request');
        return {
          url: API_ENDPOINTS.SUBSCRIPTION.BROWSE_OTHER_PLANS,
          method: 'GET',
        };
      },
      providesTags: ['Subscription'],
    }),
    // Purchase a subscription plan
    purchasePlan: builder.mutation<PurchasePlanResponse, string>({
      query: (slug) => {
        console.log('[SubscriptionAPI] Purchase plan request for slug:', slug);
        return {
          url: API_ENDPOINTS.SUBSCRIPTION.PURCHASE_PLAN(slug),
          method: 'POST',
        };
      },
      invalidatesTags: ['Subscription'],
    }),
    // Get my subscription details
    getMySubscription: builder.query<MySubscriptionResponse, void>({
      query: () => {
        console.log('[SubscriptionAPI] Get my subscription request');
        return {
          url: API_ENDPOINTS.SUBSCRIPTION.ME,
          method: 'GET',
        };
      },
      providesTags: ['Subscription'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useBrowseOtherPlansQuery,
  useLazyBrowseOtherPlansQuery,
  usePurchasePlanMutation,
  useGetMySubscriptionQuery,
  useLazyGetMySubscriptionQuery,
} = subscriptionApi;
