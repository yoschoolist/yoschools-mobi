import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

// ========== ENUMS ==========
export enum BursaryType {
  FULL_SCHOLARSHIP = 'FULL_SCHOLARSHIP',
  PARTIAL_SCHOLARSHIP = 'PARTIAL_SCHOLARSHIP',
  BURSARY = 'BURSARY',
  GRANT = 'GRANT',
  LOAN = 'LOAN',
  WORK_STUDY = 'WORK_STUDY'
}

export enum BursaryCategory {
  ACADEMIC_MERIT = 'ACADEMIC_MERIT',
  FINANCIAL_NEED = 'FINANCIAL_NEED',
  SPORTS = 'SPORTS',
  ARTS = 'ARTS',
  MUSIC = 'MUSIC',
  LEADERSHIP = 'LEADERSHIP',
  COMMUNITY_SERVICE = 'COMMUNITY_SERVICE',
  MINORITY = 'MINORITY',
  DISABILITY = 'DISABILITY',
  ORPHAN = 'ORPHAN',
  REGIONAL = 'REGIONAL',
  SUBJECT_SPECIFIC = 'SUBJECT_SPECIFIC'
}

export enum CoverageType {
  TUITION_ONLY = 'TUITION_ONLY',
  TUITION_AND_ACCOMMODATION = 'TUITION_AND_ACCOMMODATION',
  FULL_EXPENSES = 'FULL_EXPENSES',
  PARTIAL_EXPENSES = 'PARTIAL_EXPENSES',
  FIXED_AMOUNT = 'FIXED_AMOUNT'
}

export enum Gender { MALE = 'MALE', FEMALE = 'FEMALE', OTHER = 'OTHER' }

// ========== TYPES ==========
export interface Bursary {
  id: string;
  name: string;
  description?: string;
  type: BursaryType;
  category: BursaryCategory[];
  coverageType: CoverageType;
  coverageAmount?: number;
  coveragePercent?: number;
  maxAmount?: number;
  minGrade?: number;
  maxAge?: number;
  minAge?: number;
  genderRestriction?: Gender;
  nationalityRestriction?: string;
  maxHouseholdIncome?: number;
  requiresFinancialNeed: boolean;
  academicRequirements?: string;
  requiredDocuments: string[];
  applicationDeadline?: string;
  applicationStartDate?: string;
  applicationProcess?: string;
  contactEmail?: string;
  contactPhone?: string;
  applicationUrl?: string;
  numberOfAwards?: number;
  renewalPossible: boolean;
  renewalCriteria?: string;
  duration?: number;
  isActive: boolean;
  lastVerified?: string;
  createdAt: string;
  updatedAt: string;
  listingId: string;
  listing: { id: string; name: string; slug: string; currency: string; owner: { id: string; firstName?: string; lastName?: string; email: string; profile?: { name?: string; avatar?: string } } };
  formattedCoverageAmount?: string;
  formattedMaxAmount?: string;
  formattedMaxHouseholdIncome?: string;
  applicationStatus?: string;
  daysUntilDeadline?: number;
  eligibilitySummary?: string;
  coverageSummary?: string;
}

export interface BursaryFiltersInput {
  search?: string;
  type?: BursaryType;
  categories?: BursaryCategory[];
  coverageType?: CoverageType;
  listingId?: string;
  isActive?: boolean;
  requiresFinancialNeed?: boolean;
  renewalPossible?: boolean;
  genderRestriction?: Gender;
  nationalityRestriction?: string;
  minCoverageAmount?: number;
  maxCoverageAmount?: number;
  minCoveragePercent?: number;
  maxCoveragePercent?: number;
  minAge?: number;
  maxAge?: number;
  minGrade?: number;
  applicationDeadlineFrom?: string;
  applicationDeadlineTo?: string;
  applicationStartDateFrom?: string;
  applicationStartDateTo?: string;
  createdAtFrom?: string;
  createdAtTo?: string;
}

export interface PaginationInput { page?: number; limit?: number; skip?: number; take?: number }

export interface BursarySortInput {
  field: 'NAME' | 'TYPE' | 'COVERAGE_TYPE' | 'COVERAGE_AMOUNT' | 'COVERAGE_PERCENT' | 'APPLICATION_DEADLINE' | 'APPLICATION_START_DATE' | 'CREATED_AT' | 'UPDATED_AT' | 'NUMBER_OF_AWARDS' | 'DURATION';
  order: 'ASC' | 'DESC';
}

export interface CreateBursaryInput {
  name: string;
  description?: string;
  type: BursaryType;
  category: BursaryCategory[];
  coverageType: CoverageType;
  coverageAmount?: number;
  coveragePercent?: number;
  maxAmount?: number;
  minGrade?: number;
  maxAge?: number;
  minAge?: number;
  genderRestriction?: Gender;
  nationalityRestriction?: string;
  maxHouseholdIncome?: number;
  requiresFinancialNeed: boolean;
  academicRequirements?: string;
  requiredDocuments: string[];
  applicationDeadline?: string;
  applicationStartDate?: string;
  applicationProcess?: string;
  contactEmail?: string;
  contactPhone?: string;
  applicationUrl?: string;
  numberOfAwards?: number;
  renewalPossible: boolean;
  renewalCriteria?: string;
  duration?: number;
  isActive: boolean;
  lastVerified?: string;
  listingId: string;
}

export interface UpdateBursaryInput extends Partial<CreateBursaryInput> {}

export interface BursariesResponse {
  edges: { node: Bursary; cursor: string }[];
  pageInfo: { hasNextPage: boolean; hasPreviousPage: boolean; startCursor: string; endCursor: string };
  totalCount: number;
}

export interface BursaryAnalyticsResponse {
  totalBursaries: number;
  activeBursaries: number;
  fullScholarships: number;
  partialScholarships: number;
  bursaries: number;
  grants: number;
  loans: number;
  workStudyPrograms: number;
  typeDistribution: { type: BursaryType; count: number; percentage: number; totalCoverageAmount: number }[];
  categoryDistribution: { category: BursaryCategory; count: number; percentage: number }[];
  topBursaries: { id: string; name: string; type: BursaryType; coverageAmount: number; coveragePercent: number; listing: { id: string; name: string; slug: string } }[];
}

// ========== FRAGMENT ==========
const BURSARY_FRAGMENT = gql`
  fragment BursaryFragment on Bursary {
    id
    name
    description
    type
    category
    coverageType
    coverageAmount
    coveragePercent
    maxAmount
    minGrade
    maxAge
    minAge
    genderRestriction
    nationalityRestriction
    maxHouseholdIncome
    requiresFinancialNeed
    academicRequirements
    requiredDocuments
    applicationDeadline
    applicationStartDate
    applicationProcess
    contactEmail
    contactPhone
    applicationUrl
    numberOfAwards
    renewalPossible
    renewalCriteria
    duration
    isActive
    lastVerified
    createdAt
    updatedAt
    listingId
    listing { id name slug currency owner { id firstName lastName email profile { name avatar } } }
    formattedCoverageAmount
    formattedMaxAmount
    formattedMaxHouseholdIncome
    applicationStatus
    daysUntilDeadline
    eligibilitySummary
    coverageSummary
  }
`;

// ========== QUERIES ==========
const GET_BURSARIES_QUERY = gql`
  ${BURSARY_FRAGMENT}
  query GetBursaries($where: BursaryWhereInput, $orderBy: BursaryOrderByInput, $skip: Int, $take: Int) {
    getBursaries(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {
      edges { node { ...BursaryFragment } cursor }
      pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
      totalCount
    }
  }
`;

const GET_BURSARY_QUERY = gql`
  ${BURSARY_FRAGMENT}
  query GetBursary($id: ID!) { getBursary(id: $id) { ...BursaryFragment } }
`;

const GET_BURSARIES_BY_LISTING_QUERY = gql`
  ${BURSARY_FRAGMENT}
  query GetBursariesByListing($listingId: String!) {
    getBursariesByListing(listingId: $listingId) { ...BursaryFragment }
  }
`;

const GET_BURSARY_ANALYTICS_QUERY = gql`
  query GetBursaryAnalytics($input: BursaryAnalyticsInput) {
    getBursaryAnalytics(input: $input) {
      totalBursaries
      activeBursaries
      fullScholarships
      partialScholarships
      bursaries
      grants
      loans
      workStudyPrograms
      typeDistribution { type count percentage totalCoverageAmount }
      categoryDistribution { category count percentage }
      topBursaries { id name type coverageAmount coveragePercent listing { id name slug } }
    }
  }
`;

// ========== MUTATIONS ==========
const CREATE_BURSARY_MUTATION = gql`
  ${BURSARY_FRAGMENT}
  mutation CreateBursary($input: CreateBursaryInput!) { createBursary(input: $input) { ...BursaryFragment } }
`;

const UPDATE_BURSARY_MUTATION = gql`
  ${BURSARY_FRAGMENT}
  mutation UpdateBursary($id: ID!, $input: UpdateBursaryInput!) { updateBursary(id: $id, input: $input) { ...BursaryFragment } }
`;

const DELETE_BURSARY_MUTATION = gql`
  ${BURSARY_FRAGMENT}
  mutation DeleteBursary($id: ID!) { deleteBursary(id: $id) { ...BursaryFragment } }
`;

// ========== SERVICE FUNCTIONS ==========
export async function getBursaries(variables?: { where?: BursaryFiltersInput; orderBy?: BursarySortInput; skip?: number; take?: number }): Promise<BursariesResponse> {
  const { data } = await apolloClient.query({
    query: GET_BURSARIES_QUERY,
    variables,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return data?.getBursaries as BursariesResponse;
}

export async function getBursary(id: string): Promise<Bursary> {
  const { data } = await apolloClient.query({
    query: GET_BURSARY_QUERY,
    variables: { id },
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return data?.getBursary as Bursary;
}

export async function getBursariesByListing(listingId: string): Promise<Bursary[]> {
  const { data } = await apolloClient.query({
    query: GET_BURSARIES_BY_LISTING_QUERY,
    variables: { listingId },
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return (data?.getBursariesByListing || []) as Bursary[];
}

export async function createBursary(input: CreateBursaryInput, accessToken: string): Promise<Bursary> {
  const { data } = await apolloClient.mutate({
    mutation: CREATE_BURSARY_MUTATION,
    variables: { input },
    context: { headers: { authorization: `Bearer ${accessToken}` } },
    errorPolicy: 'all'
  });
  return data?.createBursary as Bursary;
}

export async function updateBursary(id: string, input: UpdateBursaryInput, accessToken: string): Promise<Bursary> {
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_BURSARY_MUTATION,
    variables: { id, input },
    context: { headers: { authorization: `Bearer ${accessToken}` } },
    errorPolicy: 'all'
  });
  return data?.updateBursary as Bursary;
}

export async function deleteBursary(id: string, accessToken: string): Promise<Bursary> {
  const { data } = await apolloClient.mutate({
    mutation: DELETE_BURSARY_MUTATION,
    variables: { id },
    context: { headers: { authorization: `Bearer ${accessToken}` } },
    errorPolicy: 'all'
  });
  return data?.deleteBursary as Bursary;
}

export async function getBursaryAnalytics(input?: any): Promise<BursaryAnalyticsResponse> {
  const { data } = await apolloClient.query({
    query: GET_BURSARY_ANALYTICS_QUERY,
    variables: { input },
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return data?.getBursaryAnalytics as BursaryAnalyticsResponse;
}


