import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

export enum SubscriptionPlan { BASIC = 'BASIC', STANDARD = 'STANDARD', ULTIMATE = 'ULTIMATE' }

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

export interface PlanConfigStats {
  planType: SubscriptionPlan;
  name: string;
  totalSubscriptions: number;
  activeSubscriptions: number;
  totalRevenue: number;
  currencyBreakdown: Array<{ currency: string; subscriptions: number; revenue: number }>;
}

export interface CreateSubscriptionPlanConfigInput {
  planType: SubscriptionPlan;
  name: string;
  description?: string;
  duration: number;
  features: string[];
  prices: Array<{ currency: string; price: number; isDefault?: boolean; isActive?: boolean }>;
  isActive?: boolean;
}

export interface SubscriptionPlanConfigInput extends CreateSubscriptionPlanConfigInput {}

const SUBSCRIPTION_PLAN_CONFIG_FRAGMENT = gql`
  fragment SubscriptionPlanConfigFragment on SubscriptionPlanConfig {
    id planType name description duration features isActive
    prices { id currency price isActive isDefault createdAt updatedAt }
    createdAt updatedAt
  }
`;

const GET_PLAN_CONFIGURATIONS_QUERY = gql`
  ${SUBSCRIPTION_PLAN_CONFIG_FRAGMENT}
  query GetPlanConfigurations { getPlanConfigurations { ...SubscriptionPlanConfigFragment } }
`;

const GET_PLAN_CONFIGURATIONS_WITH_STATS_QUERY = gql`
  query GetPlanConfigurationsWithStats {
    getPlanConfigurationsWithStats {
      planType name totalSubscriptions activeSubscriptions totalRevenue currencyBreakdown { currency subscriptions revenue }
    }
  }
`;

const GET_PLAN_CONFIG_BY_CURRENCY_QUERY = gql`
  ${SUBSCRIPTION_PLAN_CONFIG_FRAGMENT}
  query GetPlanConfigByCurrency($planType: SubscriptionPlan!, $currency: String!) { getPlanConfigByCurrency(planType: $planType, currency: $currency) { ...SubscriptionPlanConfigFragment } }
`;

const GET_PLAN_CONFIG_WITH_DEFAULT_PRICE_QUERY = gql`
  ${SUBSCRIPTION_PLAN_CONFIG_FRAGMENT}
  query GetPlanConfigWithDefaultPrice($planType: SubscriptionPlan!) { getPlanConfigWithDefaultPrice(planType: $planType) { ...SubscriptionPlanConfigFragment } }
`;

const UPSERT_PLAN_CONFIGURATION_MUTATION = gql`
  ${SUBSCRIPTION_PLAN_CONFIG_FRAGMENT}
  mutation UpsertPlanConfiguration($planConfig: SubscriptionPlanConfigInput!) { upsertPlanConfiguration(planConfig: $planConfig) { ...SubscriptionPlanConfigFragment } }
`;

export async function getPlanConfigurations(accessToken?: string): Promise<SubscriptionPlanConfig[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_PLAN_CONFIGURATIONS_QUERY, context, errorPolicy: 'all' });
  return (data?.getPlanConfigurations || []) as SubscriptionPlanConfig[];
}

export async function getPlanConfigurationsWithStats(accessToken?: string): Promise<PlanConfigStats[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_PLAN_CONFIGURATIONS_WITH_STATS_QUERY, context, errorPolicy: 'all' });
  return (data?.getPlanConfigurationsWithStats || []) as PlanConfigStats[];
}

export async function getPlanConfigByCurrency(planType: SubscriptionPlan, currency: string, accessToken?: string): Promise<SubscriptionPlanConfig | null> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_PLAN_CONFIG_BY_CURRENCY_QUERY, variables: { planType, currency }, context, errorPolicy: 'all' });
  return (data?.getPlanConfigByCurrency || null) as SubscriptionPlanConfig | null;
}

export async function getPlanConfigWithDefaultPrice(planType: SubscriptionPlan, accessToken?: string): Promise<SubscriptionPlanConfig | null> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_PLAN_CONFIG_WITH_DEFAULT_PRICE_QUERY, variables: { planType }, context, errorPolicy: 'all' });
  return (data?.getPlanConfigWithDefaultPrice || null) as SubscriptionPlanConfig | null;
}

export async function upsertPlanConfiguration(planConfig: CreateSubscriptionPlanConfigInput, accessToken?: string): Promise<SubscriptionPlanConfig> {
  const { data } = await apolloClient.mutate({ mutation: UPSERT_PLAN_CONFIGURATION_MUTATION, variables: { planConfig }, context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}, errorPolicy: 'all' });
  return data?.upsertPlanConfiguration as SubscriptionPlanConfig;
}

// Helpers (mirroring admin)
export function getDefaultPrice(planConfig: SubscriptionPlanConfig): number | null { const def = planConfig.prices.find(p => p.isDefault); return def ? def.price : null; }
export function getDefaultCurrency(planConfig: SubscriptionPlanConfig): string | null { const def = planConfig.prices.find(p => p.isDefault); return def ? def.currency : null; }
export function getPriceByCurrency(planConfig: SubscriptionPlanConfig, currency: string): number | null { const price = planConfig.prices.find(p => p.currency === currency && p.isActive); return price ? price.price : null; }
export function hasCurrencySupport(planConfig: SubscriptionPlanConfig, currency: string): boolean { return planConfig.prices.some(p => p.currency === currency && p.isActive); }
export function getSupportedCurrencies(planConfig: SubscriptionPlanConfig): string[] { return planConfig.prices.filter(p => p.isActive).map(p => p.currency).sort((a, b) => { const def = planConfig.prices.find(p => p.isDefault); if (def) { if (a === def.currency) return -1; if (b === def.currency) return 1; } return a.localeCompare(b); }); }
export function isPlanActive(planConfig: SubscriptionPlanConfig): boolean { return planConfig.isActive; }
export function getPlanFeatures(planConfig: SubscriptionPlanConfig): string[] { return planConfig.features || []; }
export function getPlanDuration(planConfig: SubscriptionPlanConfig): number { return planConfig.duration; }
export function getPlanType(planConfig: SubscriptionPlanConfig): SubscriptionPlan { return planConfig.planType; }
export function getPlanName(planConfig: SubscriptionPlanConfig): string { return planConfig.name; }
export function getPlanDescription(planConfig: SubscriptionPlanConfig): string | undefined { return planConfig.description; }
export function getActivePrices(planConfig: SubscriptionPlanConfig) { return planConfig.prices.filter(price => price.isActive); }
export function getDefaultPriceInfo(planConfig: SubscriptionPlanConfig) { return planConfig.prices.find(price => price.isDefault); }
export function formatPrice(price: number, currency: string): string { return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase(), minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price); }
export function getPlanDisplayName(planType: SubscriptionPlan): string { switch (planType) { case SubscriptionPlan.BASIC: return 'Basic'; case SubscriptionPlan.STANDARD: return 'Standard'; case SubscriptionPlan.ULTIMATE: return 'Ultimate'; default: return 'Unknown'; } }
export function getPlanColor(planType: SubscriptionPlan): string { switch (planType) { case SubscriptionPlan.BASIC: return 'bg-blue-100 text-blue-800'; case SubscriptionPlan.STANDARD: return 'bg-purple-100 text-purple-800'; case SubscriptionPlan.ULTIMATE: return 'bg-indigo-100 text-indigo-800'; default: return 'bg-gray-100 text-gray-800'; } }


