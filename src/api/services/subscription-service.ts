import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

// ========== TYPES ==========
export enum SubscriptionPlan { BASIC = 'BASIC', STANDARD = 'STANDARD', ULTIMATE = 'ULTIMATE' }
export enum SubscriptionStatus { ACTIVE = 'ACTIVE', PENDING = 'PENDING', CANCELLED = 'CANCELLED', EXPIRED = 'EXPIRED', SUSPENDED = 'SUSPENDED' }

export interface SubscriptionPrice { id: string; currency: string; price: number; isActive: boolean; isDefault: boolean; createdAt: string; updatedAt: string }

export interface SubscriptionPlanConfig {
  id: string;
  planType: SubscriptionPlan;
  name: string;
  description?: string;
  duration: number;
  features: string[];
  isActive: boolean;
  prices: SubscriptionPrice[];
  createdAt: string;
  updatedAt: string;
}

export interface UserSubscription {
  id: string;
  planType: SubscriptionPlan;
  status: SubscriptionStatus;
  amount: number;
  currency: string;
  startDate: string;
  endDate: string;
  paymentMethod?: string;
  externalId?: string;
  userId: string;
  listingId?: string;
  createdAt: string;
  updatedAt: string;
  daysRemaining: number;
  isActive: boolean;
  planInfo?: SubscriptionPlanConfig;
}

export interface CreateSubscriptionInput { planType: SubscriptionPlan; listingId?: string; currency: string; paymentMethod: string }
export interface UpdateSubscriptionInput { id: string; planType?: SubscriptionPlan; status?: SubscriptionStatus }
export interface SubscriptionFilterInput { userId?: string; listingId?: string; planType?: SubscriptionPlan; status?: SubscriptionStatus }
export interface SubscriptionStatsResponse { totalSubscriptions: number; activeSubscriptions: number; expiredSubscriptions: number; totalRevenue: number; monthlyStats: Array<{ month: string; subscriptions: number; revenue: number }> }
export interface PaymentLinkResponse { paymentLink: string; reference: string; subscriptionId: string }

// ========== FRAGMENTS ==========
const SUBSCRIPTION_FRAGMENT = gql`
  fragment SubscriptionFragment on UserSubscription {
    id planType status amount currency startDate endDate paymentMethod externalId userId listingId createdAt updatedAt daysRemaining isActive
    planInfo { id planType name description duration features isActive prices { id currency price isActive isDefault createdAt updatedAt } createdAt updatedAt }
  }
`;

// ========== QUERIES ==========
const GET_SUBSCRIPTIONS_QUERY = gql`
  ${SUBSCRIPTION_FRAGMENT}
  query GetSubscriptions($filter: SubscriptionFilterInput) { getAllSubscriptions(filter: $filter) { ...SubscriptionFragment } }
`;

const GET_USER_SUBSCRIPTIONS_QUERY = gql`
  ${SUBSCRIPTION_FRAGMENT}
  query GetUserSubscriptions($filter: SubscriptionFilterInput) { getUserSubscriptions(filter: $filter) { ...SubscriptionFragment } }
`;

const GET_SUBSCRIPTION_BY_ID_QUERY = gql`
  ${SUBSCRIPTION_FRAGMENT}
  query GetSubscriptionById($id: String!) { getSubscription(id: $id) { ...SubscriptionFragment } }
`;

const GET_SUBSCRIPTION_STATS_QUERY = gql`
  query GetSubscriptionStats { getGlobalSubscriptionStats { totalSubscriptions activeSubscriptions expiredSubscriptions totalRevenue monthlyStats { month subscriptions revenue } } }
`;

// ========== MUTATIONS ==========
const CREATE_SUBSCRIPTION_MUTATION = gql`
  mutation CreateSubscription($input: CreateSubscriptionInput!) { createSubscription(input: $input) { paymentLink reference subscriptionId } }
`;

const UPDATE_SUBSCRIPTION_MUTATION = gql`
  ${SUBSCRIPTION_FRAGMENT}
  mutation UpdateSubscription($input: UpdateSubscriptionInput!) { updateSubscription(input: $input) { ...SubscriptionFragment } }
`;

const CANCEL_SUBSCRIPTION_MUTATION = gql`
  ${SUBSCRIPTION_FRAGMENT}
  mutation CancelSubscription($id: String!) { cancelSubscription(id: $id) { ...SubscriptionFragment } }
`;

const RENEW_SUBSCRIPTION_MUTATION = gql`
  ${SUBSCRIPTION_FRAGMENT}
  mutation RenewSubscription($id: String!) { renewSubscription(id: $id) { ...SubscriptionFragment } }
`;

// ========== SERVICE FUNCTIONS ==========
export async function getSubscriptions(filter?: SubscriptionFilterInput, accessToken?: string): Promise<UserSubscription[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_SUBSCRIPTIONS_QUERY, variables: { filter }, context, errorPolicy: 'all' });
  return (data?.getAllSubscriptions || []) as UserSubscription[];
}

export async function getUserSubscriptions(filter?: SubscriptionFilterInput, accessToken?: string): Promise<UserSubscription[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_USER_SUBSCRIPTIONS_QUERY, variables: { filter }, context, errorPolicy: 'all' });
  return (data?.getUserSubscriptions || []) as UserSubscription[];
}

export async function getSubscriptionById(id: string, accessToken?: string): Promise<UserSubscription | null> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_SUBSCRIPTION_BY_ID_QUERY, variables: { id }, context, errorPolicy: 'all' });
  return (data?.getSubscription || null) as UserSubscription | null;
}

export async function getSubscriptionStats(accessToken?: string): Promise<SubscriptionStatsResponse> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_SUBSCRIPTION_STATS_QUERY, context, errorPolicy: 'all' });
  return data?.getGlobalSubscriptionStats as SubscriptionStatsResponse;
}

export async function createSubscription(input: CreateSubscriptionInput, accessToken?: string): Promise<PaymentLinkResponse> {
  const { data } = await apolloClient.mutate({ mutation: CREATE_SUBSCRIPTION_MUTATION, variables: { input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.createSubscription as PaymentLinkResponse;
}

export async function updateSubscription(input: UpdateSubscriptionInput, accessToken?: string): Promise<UserSubscription> {
  const { data } = await apolloClient.mutate({ mutation: UPDATE_SUBSCRIPTION_MUTATION, variables: { input }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.updateSubscription as UserSubscription;
}

export async function cancelSubscription(id: string, accessToken?: string): Promise<UserSubscription> {
  const { data } = await apolloClient.mutate({ mutation: CANCEL_SUBSCRIPTION_MUTATION, variables: { id }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.cancelSubscription as UserSubscription;
}

export async function renewSubscription(id: string, accessToken?: string): Promise<UserSubscription> {
  const { data } = await apolloClient.mutate({ mutation: RENEW_SUBSCRIPTION_MUTATION, variables: { id }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.renewSubscription as UserSubscription;
}

// ========== HELPERS ==========
export function calculateDaysRemaining(endDate: string): number { const end = new Date(endDate); const now = new Date(); const diffTime = end.getTime() - now.getTime(); const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); return Math.max(0, diffDays); }
export function isSubscriptionActive(status: SubscriptionStatus, endDate: string): boolean { return status === SubscriptionStatus.ACTIVE && new Date(endDate) > new Date(); }
export function getSubscriptionStatusColor(status: SubscriptionStatus): string { switch (status) { case SubscriptionStatus.ACTIVE: return 'bg-green-100 text-green-800'; case SubscriptionStatus.PENDING: return 'bg-yellow-100 text-yellow-800'; case SubscriptionStatus.CANCELLED: return 'bg-red-100 text-red-800'; case SubscriptionStatus.EXPIRED: return 'bg-gray-100 text-gray-800'; case SubscriptionStatus.SUSPENDED: return 'bg-orange-100 text-orange-800'; default: return 'bg-gray-100 text-gray-800'; } }
export function getPlanColor(plan: SubscriptionPlan): string { switch (plan) { case SubscriptionPlan.BASIC: return 'bg-blue-100 text-blue-800'; case SubscriptionPlan.STANDARD: return 'bg-purple-100 text-purple-800'; case SubscriptionPlan.ULTIMATE: return 'bg-indigo-100 text-indigo-800'; default: return 'bg-gray-100 text-gray-800'; } }
export function getDefaultPrice(planConfig: SubscriptionPlanConfig): number | null { const def = planConfig.prices.find(p => p.isDefault); return def ? def.price : null; }
export function getDefaultCurrency(planConfig: SubscriptionPlanConfig): string | null { const def = planConfig.prices.find(p => p.isDefault); return def ? def.currency : null; }
export function getPriceByCurrency(planConfig: SubscriptionPlanConfig, currency: string): number | null { const price = planConfig.prices.find(p => p.currency === currency && p.isActive); return price ? price.price : null; }
export function hasCurrencySupport(planConfig: SubscriptionPlanConfig, currency: string): boolean { return planConfig.prices.some(p => p.currency === currency && p.isActive); }
export function getSupportedCurrencies(planConfig: SubscriptionPlanConfig): string[] { return planConfig.prices.filter(p => p.isActive).map(p => p.currency).sort((a, b) => { const def = planConfig.prices.find(p => p.isDefault); if (def) { if (a === def.currency) return -1; if (b === def.currency) return 1; } return a.localeCompare(b); }); }


