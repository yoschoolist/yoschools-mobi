import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

// ========== ENUMS ==========
export enum ComparisonCategory {
  ACADEMIC = 'ACADEMIC',
  DEMOGRAPHICS = 'DEMOGRAPHICS',
  EXTRACURRICULAR = 'EXTRACURRICULAR',
  FACILITIES = 'FACILITIES',
  FINANCIAL = 'FINANCIAL',
  GENERAL = 'GENERAL',
  LOCATION = 'LOCATION',
  RATINGS = 'RATINGS',
  SPORTS = 'SPORTS'
}

export enum CriteriaDataType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  DATE = 'DATE',
  PERCENTAGE = 'PERCENTAGE',
  CURRENCY = 'CURRENCY',
  RATING = 'RATING'
}

// ========== TYPES ==========
export interface CreateComparisonCriteriaInput {
  name: string;
  description?: string;
  category: ComparisonCategory;
  dataType: CriteriaDataType;
  calculationMethod?: string;
  displayOrder: number;
  isDefault?: boolean;
  isActive?: boolean;
  format?: string;
  unit?: string;
  listingField?: string;
}

export interface UpdateComparisonCriteriaInput {
  name?: string;
  description?: string;
  category?: ComparisonCategory;
  dataType?: CriteriaDataType;
  calculationMethod?: string;
  displayOrder?: number;
  isDefault?: boolean;
  isActive?: boolean;
  format?: string;
  unit?: string;
  listingField?: string;
}

export interface CreateComparisonListInput {
  name: string;
  description?: string;
  isDefault?: boolean;
  maxItems?: number;
}

export interface UpdateComparisonListInput {
  name?: string;
  description?: string;
  isDefault?: boolean;
  maxItems?: number;
}

export interface AddComparisonItemInput {
  comparisonListId: string;
  listingId: string;
  notes?: string;
  position?: number;
}

export interface UpdateComparisonItemInput {
  notes?: string;
  position?: number;
}

export interface ComparisonFilterInput {
  search?: string;
  category?: ComparisonCategory;
  dataType?: CriteriaDataType;
  isDefault?: boolean;
  isActive?: boolean;
  listingField?: string;
}

export interface ComparisonSortInput {
  name?: 'asc' | 'desc';
  displayOrder?: 'asc' | 'desc';
  createdAt?: 'asc' | 'desc';
  updatedAt?: 'asc' | 'desc';
}

export interface ComparisonCriteria {
  id: string;
  name: string;
  description?: string;
  category: ComparisonCategory;
  dataType: CriteriaDataType;
  calculationMethod?: string;
  displayOrder: number;
  isDefault: boolean;
  isActive: boolean;
  format?: string;
  unit?: string;
  listingField?: string;
  createdAt: string;
  updatedAt: string;
  scores?: ComparisonScore[];
}

export interface ComparisonList {
  id: string;
  name: string;
  description?: string;
  isDefault: boolean;
  maxItems: number;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
  items?: ComparisonItem[];
  createdBy?: { id: string; name: string; email: string };
}

export interface ComparisonItem {
  id: string;
  comparisonListId: string;
  listingId: string;
  notes?: string;
  position: number;
  createdAt: string;
  updatedAt: string;
  listing?: {
    id: string;
    name: string;
    slug: string;
    imageUrl?: string;
    averageRating?: number;
    reviewCount?: number;
  };
}

export interface ComparisonScore {
  id: string;
  criteriaId: string;
  listing1Id: string;
  listing2Id: string;
  score1?: number;
  score2?: number;
  difference?: number;
  percentageDiff?: number;
  winner?: string;
  calculatedAt: string;
  validUntil?: string;
  criteria?: ComparisonCriteria;
  listing1?: { id: string; name: string; slug: string };
  listing2?: { id: string; name: string; slug: string };
}

export interface ComparisonResult {
  id: string;
  criteria: ComparisonCriteria[];
  listings: any[];
  scores: ComparisonScore[];
  analytics?: ComparisonAnalytics;
  createdAt: string;
}

export interface ComparisonAnalytics {
  id: string;
  country?: string;
  referer?: string;
  userAgent?: string;
  userId?: string;
  viewCount: number;
  lastViewed: string;
  createdAt: string;
  updatedAt: string;
}

export interface ComparisonResponse {
  criteria: ComparisonCriteria[];
  total: number;
  hasMore: boolean;
}

export interface ComparisonListResponse {
  comparisonLists: ComparisonList[];
  total: number;
  hasMore: boolean;
}

export interface ComparisonStats {
  totalCriteria: number;
  activeCriteria: number;
  defaultCriteria: number;
  totalComparisonLists: number;
  totalComparisons: number;
  averageViewsPerComparison: number;
  criteriaByCategory: { category: ComparisonCategory; count: number }[];
}

// ========== FRAGMENTS ==========
const COMPARISON_CRITERIA_FRAGMENT = gql`
  fragment ComparisonCriteriaFragment on ComparisonCriteria {
    id
    name
    description
    category
    dataType
    calculationMethod
    displayOrder
    isDefault
    isActive
    format
    unit
    listingField
    createdAt
    updatedAt
  }
`;

const COMPARISON_ITEM_FRAGMENT = gql`
  fragment ComparisonItemFragment on ComparisonItem {
    id
    comparisonListId
    listingId
    notes
    position
    createdAt
    updatedAt
    listing { id name slug imageUrl averageRating reviewCount }
  }
`;

const COMPARISON_LIST_FRAGMENT = gql`
  fragment ComparisonListFragment on ComparisonList {
    id
    name
    description
    isDefault
    maxItems
    itemCount
    createdAt
    updatedAt
    createdBy { id name email }
    items { ...ComparisonItemFragment }
  }
`;

const COMPARISON_SCORE_FRAGMENT = gql`
  fragment ComparisonScoreFragment on ComparisonScore {
    id
    criteriaId
    listing1Id
    listing2Id
    score1
    score2
    difference
    percentageDiff
    winner
    calculatedAt
    validUntil
    criteria { ...ComparisonCriteriaFragment }
    listing1 { id name slug }
    listing2 { id name slug }
  }
`;

const COMPARISON_RESULT_FRAGMENT = gql`
  fragment ComparisonResultFragment on ComparisonResult {
    id
    criteria { ...ComparisonCriteriaFragment }
    listings { id name slug imageUrl averageRating reviewCount }
    scores { ...ComparisonScoreFragment }
    analytics { id country referer userAgent userId viewCount lastViewed createdAt updatedAt }
    createdAt
  }
`;

// ========== QUERIES ==========
const GET_COMPARISON_CRITERIA_QUERY = gql`
  ${COMPARISON_CRITERIA_FRAGMENT}
  query GetComparisonCriteria($filters: ComparisonFiltersInput) {
    getComparisonCriteria(filters: $filters) { ...ComparisonCriteriaFragment }
  }
`;

const GET_COMPARISON_LISTS_QUERY = gql`
  ${COMPARISON_LIST_FRAGMENT}
  query GetComparisonLists($filters: ComparisonListFiltersInput, $pagination: PaginationInput, $sort: ComparisonSortInput) {
    getComparisonLists(filters: $filters, pagination: $pagination, sort: $sort) {
      comparisonLists { ...ComparisonListFragment }
      total
      hasMore
    }
  }
`;

const GET_COMPARISON_LIST_QUERY = gql`
  ${COMPARISON_LIST_FRAGMENT}
  query GetComparisonList($id: ID!) { getComparisonList(id: $id) { ...ComparisonListFragment } }
`;

const GET_COMPARE_LISTINGS_QUERY = gql`
  ${COMPARISON_RESULT_FRAGMENT}
  query GetCompareListings($criteriaIds: [ID!], $listingIds: [ID!]!) {
    getCompareListings(criteriaIds: $criteriaIds, listingIds: $listingIds) { ...ComparisonResultFragment }
  }
`;

const GET_ALL_COMPARISON_ANALYTICS_QUERY = gql`
  query GetAllComparisonAnalytics {
    getAllComparisonAnalytics { id country referer userAgent userId viewCount lastViewed createdAt updatedAt }
  }
`;

// ========== MUTATIONS ==========
const CREATE_COMPARISON_CRITERIA_MUTATION = gql`
  ${COMPARISON_CRITERIA_FRAGMENT}
  mutation CreateComparisonCriteria($input: CreateComparisonCriteriaInput!) {
    createComparisonCriteria(input: $input) { ...ComparisonCriteriaFragment }
  }
`;

const UPDATE_COMPARISON_CRITERIA_MUTATION = gql`
  ${COMPARISON_CRITERIA_FRAGMENT}
  mutation UpdateComparisonCriteria($id: ID!, $input: UpdateComparisonCriteriaInput!) {
    updateComparisonCriteria(id: $id, input: $input) { ...ComparisonCriteriaFragment }
  }
`;

const DELETE_COMPARISON_CRITERIA_MUTATION = gql`
  mutation DeleteComparisonCriteria($id: ID!) { deleteComparisonCriteria(id: $id) }
`;

const CREATE_COMPARISON_LIST_MUTATION = gql`
  ${COMPARISON_LIST_FRAGMENT}
  mutation CreateComparisonList($input: CreateComparisonListInput!) {
    createComparisonList(input: $input) { ...ComparisonListFragment }
  }
`;

const UPDATE_COMPARISON_LIST_MUTATION = gql`
  ${COMPARISON_LIST_FRAGMENT}
  mutation UpdateComparisonList($id: ID!, $input: UpdateComparisonListInput!) {
    updateComparisonList(id: $id, input: $input) { ...ComparisonListFragment }
  }
`;

const DELETE_COMPARISON_LIST_MUTATION = gql`
  mutation DeleteComparisonList($id: ID!) { deleteComparisonList(id: $id) }
`;

const ADD_COMPARISON_ITEM_MUTATION = gql`
  ${COMPARISON_ITEM_FRAGMENT}
  mutation AddComparisonItem($input: AddComparisonItemInput!) { addComparisonItem(input: $input) { ...ComparisonItemFragment } }
`;

const UPDATE_COMPARISON_ITEM_MUTATION = gql`
  ${COMPARISON_ITEM_FRAGMENT}
  mutation UpdateComparisonItem($id: ID!, $input: UpdateComparisonItemInput!) {
    updateComparisonItem(id: $id, input: $input) { ...ComparisonItemFragment }
  }
`;

const REMOVE_COMPARISON_ITEM_MUTATION = gql`
  mutation RemoveComparisonItem($id: ID!) { removeComparisonItem(id: $id) }
`;

// ========== SERVICE FUNCTIONS ==========
export async function getComparisonCriteria(filters?: ComparisonFilterInput, accessToken?: string): Promise<ComparisonCriteria[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_COMPARISON_CRITERIA_QUERY, variables: { filters }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  if (!data?.getComparisonCriteria) throw new Error("Failed to fetch comparison criteria");
  return data.getComparisonCriteria as ComparisonCriteria[];
}

export async function getComparisonLists(filters?: any, pagination?: { page?: number; limit?: number }, sort?: ComparisonSortInput, accessToken?: string): Promise<ComparisonListResponse> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_COMPARISON_LISTS_QUERY, variables: { filters, pagination, sort }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  if (!data?.getComparisonLists) throw new Error("Failed to fetch comparison lists");
  return data.getComparisonLists as ComparisonListResponse;
}

export async function getComparisonList(id: string, accessToken?: string): Promise<ComparisonList> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_COMPARISON_LIST_QUERY, variables: { id }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  if (!data?.getComparisonList) throw new Error("Comparison list not found");
  return data.getComparisonList as ComparisonList;
}

export async function getCompareListings(criteriaIds: string[], listingIds: string[], accessToken?: string): Promise<ComparisonResult> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({ query: GET_COMPARE_LISTINGS_QUERY, variables: { criteriaIds, listingIds }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
  if (!data?.getCompareListings) throw new Error("Failed to compare listings");
  return data.getCompareListings as ComparisonResult;
}

export async function createComparisonCriteria(input: CreateComparisonCriteriaInput, accessToken: string): Promise<ComparisonCriteria> {
  const { data } = await apolloClient.mutate({ mutation: CREATE_COMPARISON_CRITERIA_MUTATION, variables: { input }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
  if (!data?.createComparisonCriteria) throw new Error("Failed to create comparison criteria");
  return data.createComparisonCriteria as ComparisonCriteria;
}

export async function updateComparisonCriteria(id: string, input: UpdateComparisonCriteriaInput, accessToken: string): Promise<ComparisonCriteria> {
  const { data } = await apolloClient.mutate({ mutation: UPDATE_COMPARISON_CRITERIA_MUTATION, variables: { id, input }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
  if (!data?.updateComparisonCriteria) throw new Error("Failed to update comparison criteria");
  return data.updateComparisonCriteria as ComparisonCriteria;
}

export async function deleteComparisonCriteria(id: string, accessToken: string): Promise<boolean> {
  const { data } = await apolloClient.mutate({ mutation: DELETE_COMPARISON_CRITERIA_MUTATION, variables: { id }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
  return data?.deleteComparisonCriteria === true;
}

export async function createComparisonList(input: CreateComparisonListInput, accessToken: string): Promise<ComparisonList> {
  const { data } = await apolloClient.mutate({ mutation: CREATE_COMPARISON_LIST_MUTATION, variables: { input }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
  if (!data?.createComparisonList) throw new Error("Failed to create comparison list");
  return data.createComparisonList as ComparisonList;
}

export async function addComparisonItem(input: AddComparisonItemInput, accessToken: string): Promise<ComparisonItem> {
  const { data } = await apolloClient.mutate({ mutation: ADD_COMPARISON_ITEM_MUTATION, variables: { input }, context: { headers: { authorization: `Bearer ${accessToken}` } }, errorPolicy: 'all' });
  if (!data?.addComparisonItem) throw new Error("Failed to add comparison item");
  return data.addComparisonItem as ComparisonItem;
}

// ========== UTILITY FUNCTIONS ==========
export async function getDefaultComparisonCriteria(accessToken?: string): Promise<ComparisonCriteria[]> {
  const criteria = await getComparisonCriteria({ isDefault: true, isActive: true }, accessToken);
  return criteria.sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getComparisonCriteriaByCategory(category: ComparisonCategory, accessToken?: string): Promise<ComparisonCriteria[]> {
  const criteria = await getComparisonCriteria({ category, isActive: true }, accessToken);
  return criteria.sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getDefaultComparisonLists(accessToken?: string): Promise<ComparisonList[]> {
  const result = await getComparisonLists({ defaultOnly: true }, { page: 1, limit: 100 }, { name: 'asc' }, accessToken);
  return result.comparisonLists;
}
