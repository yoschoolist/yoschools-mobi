import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

// ========== TYPES ==========
export interface CreateTuitionFeeInput {
  academicYear: string;
  amount: number;
  currency: string;
  feeType: FeeType;
  gradeLevel?: string;
  program?: string;
  campusId?: string;
  listingId?: string;
  courseId?: string;
  curriculumId?: string;
  isActive?: boolean;
  description?: string;
  dueDate?: string;
  lateFeeAmount?: number;
  lateFeePercentage?: number;
  installmentCount?: number;
  installmentAmount?: number;
  discountPercentage?: number;
  discountAmount?: number;
  scholarshipAvailable?: boolean;
  paymentMethods?: string[];
  additionalFees?: AdditionalFeeInput[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface UpdateTuitionFeeInput {
  academicYear?: string;
  amount?: number;
  currency?: string;
  feeType?: FeeType;
  gradeLevel?: string;
  program?: string;
  campusId?: string;
  listingId?: string;
  courseId?: string;
  curriculumId?: string;
  isActive?: boolean;
  description?: string;
  dueDate?: string;
  lateFeeAmount?: number;
  lateFeePercentage?: number;
  installmentCount?: number;
  installmentAmount?: number;
  discountPercentage?: number;
  discountAmount?: number;
  scholarshipAvailable?: boolean;
  paymentMethods?: string[];
  additionalFees?: AdditionalFeeInput[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface AdditionalFeeInput {
  name: string;
  amount: number;
  description?: string;
  isRequired?: boolean;
  isRecurring?: boolean;
  frequency?: FeeFrequency;
}

export interface TuitionFeeFilterInput {
  search?: string;
  academicYear?: string;
  feeType?: FeeType;
  isActive?: boolean;
  campusId?: string;
  listingId?: string;
  courseId?: string;
  curriculumId?: string;
  gradeLevel?: string;
  program?: string;
  minAmount?: number;
  maxAmount?: number;
  currency?: string;
  hasDiscount?: boolean;
  scholarshipAvailable?: boolean;
}

export interface TuitionFeeSortInput {
  academicYear?: 'asc' | 'desc';
  amount?: 'asc' | 'desc';
  createdAt?: 'asc' | 'desc';
  updatedAt?: 'asc' | 'desc';
  dueDate?: 'asc' | 'desc';
}

export enum FeeType {
  TUITION = 'TUITION',
  REGISTRATION = 'REGISTRATION',
  TECHNOLOGY = 'TECHNOLOGY',
  LABORATORY = 'LABORATORY',
  LIBRARY = 'LIBRARY',
  SPORTS = 'SPORTS',
  TRANSPORTATION = 'TRANSPORTATION',
  MEALS = 'MEALS',
  UNIFORM = 'UNIFORM',
  BOOKS = 'BOOKS',
  EXCURSION = 'EXCURSION',
  OTHER = 'OTHER'
}

export enum FeeFrequency {
  ONE_TIME = 'ONE_TIME',
  ANNUAL = 'ANNUAL',
  SEMESTER = 'SEMESTER',
  QUARTERLY = 'QUARTERLY',
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY'
}

export interface TuitionFee {
  id: string;
  academicYear: string;
  amount: number;
  currency: string;
  feeType: FeeType;
  gradeLevel?: string;
  program?: string;
  campusId?: string;
  listingId?: string;
  courseId?: string;
  curriculumId?: string;
  isActive: boolean;
  description?: string;
  dueDate?: string;
  lateFeeAmount?: number;
  lateFeePercentage?: number;
  installmentCount?: number;
  installmentAmount?: number;
  discountPercentage?: number;
  discountAmount?: number;
  scholarshipAvailable: boolean;
  paymentMethods: string[];
  additionalFees: AdditionalFee[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  createdAt: string;
  updatedAt: string;
  campus?: { id: string; name: string; isMain: boolean };
  listing?: { id: string; name: string; slug: string };
  course?: { id: string; name: string; slug: string };
  curriculum?: { id: string; name: string; slug: string };
}

export interface AdditionalFee {
  id: string;
  name: string;
  amount: number;
  description?: string;
  isRequired: boolean;
  isRecurring: boolean;
  frequency?: FeeFrequency;
}

export interface TuitionFeeResponse {
  tuitionFees: TuitionFee[];
  total: number;
  hasMore: boolean;
}

export interface TuitionFeeStats {
  totalFees: number;
  activeFees: number;
  inactiveFees: number;
  totalAmount: number;
  averageAmount: number;
  feesByType: { type: FeeType; count: number; totalAmount: number }[];
  feesByAcademicYear: { year: string; count: number; totalAmount: number }[];
}

// ========== FRAGMENTS ==========
const ADDITIONAL_FEE_FRAGMENT = gql`
  fragment AdditionalFeeFragment on AdditionalFee {
    id
    name
    amount
    description
    isRequired
    isRecurring
    frequency
  }
`;

const TUITION_FEE_FRAGMENT = gql`
  fragment TuitionFeeFragment on TuitionFee {
    id
    academicYear
    amount
    currency
    feeType
    gradeLevel
    program
    campusId
    listingId
    courseId
    curriculumId
    isActive
    description
    dueDate
    lateFeeAmount
    lateFeePercentage
    installmentCount
    installmentAmount
    discountPercentage
    discountAmount
    scholarshipAvailable
    paymentMethods
    metaTitle
    metaDescription
    metaKeywords
    createdAt
    updatedAt
    campus { id name isMain }
    listing { id name slug }
    course { id name slug }
    curriculum { id name slug }
    additionalFees { ...AdditionalFeeFragment }
  }
`;

// ========== QUERIES ==========
const GET_TUITION_FEES_QUERY = gql`
  ${TUITION_FEE_FRAGMENT}
  query GetTuitionFees($filters: TuitionFeeFilterInput, $pagination: PaginationInput, $sort: TuitionFeeSortInput) {
    getTuitionFees(filters: $filters, pagination: $pagination, sort: $sort) {
      tuitionFees { ...TuitionFeeFragment }
      total
      hasMore
    }
  }
`;

const GET_TUITION_FEE_QUERY = gql`
  ${TUITION_FEE_FRAGMENT}
  query GetTuitionFee($id: ID!) {
    getTuitionFee(id: $id) { ...TuitionFeeFragment }
  }
`;

const GET_TUITION_FEES_BY_LISTING_QUERY = gql`
  ${TUITION_FEE_FRAGMENT}
  query GetTuitionFeesByListing($listingId: ID!) {
    getTuitionFeesByListing(listingId: $listingId) { ...TuitionFeeFragment }
  }
`;

const GET_TUITION_FEES_BY_CAMPUS_QUERY = gql`
  ${TUITION_FEE_FRAGMENT}
  query GetTuitionFeesByCampus($campusId: ID!) {
    getTuitionFeesByCampus(campusId: $campusId) { ...TuitionFeeFragment }
  }
`;

const GET_TUITION_FEES_BY_COURSE_QUERY = gql`
  ${TUITION_FEE_FRAGMENT}
  query GetTuitionFeesByCourse($courseId: ID!) {
    getTuitionFeesByCourse(courseId: $courseId) { ...TuitionFeeFragment }
  }
`;

const GET_TUITION_FEES_BY_CURRICULUM_QUERY = gql`
  ${TUITION_FEE_FRAGMENT}
  query GetTuitionFeesByCurriculum($curriculumId: ID!) {
    getTuitionFeesByCurriculum(curriculumId: $curriculumId) { ...TuitionFeeFragment }
  }
`;

const GET_TUITION_FEE_STATS_QUERY = gql`
  query GetTuitionFeeStats {
    getTuitionFeeStats {
      totalFees
      activeFees
      inactiveFees
      totalAmount
      averageAmount
      feesByType { type count totalAmount }
      feesByAcademicYear { year count totalAmount }
    }
  }
`;

// ========== MUTATIONS ==========
const CREATE_TUITION_FEE_MUTATION = gql`
  ${TUITION_FEE_FRAGMENT}
  mutation CreateTuitionFee($input: CreateTuitionFeeInput!) {
    createTuitionFee(input: $input) { ...TuitionFeeFragment }
  }
`;

const UPDATE_TUITION_FEE_MUTATION = gql`
  ${TUITION_FEE_FRAGMENT}
  mutation UpdateTuitionFee($id: ID!, $input: UpdateTuitionFeeInput!) {
    updateTuitionFee(id: $id, input: $input) { ...TuitionFeeFragment }
  }
`;

const DELETE_TUITION_FEE_MUTATION = gql`
  mutation RemoveTuitionFee($id: ID!) { removeTuitionFee(id: $id) }
`;

const DUPLICATE_TUITION_FEE_MUTATION = gql`
  ${TUITION_FEE_FRAGMENT}
  mutation DuplicateTuitionFee($id: ID!, $academicYear: String) {
    duplicateTuitionFee(id: $id, academicYear: $academicYear) { ...TuitionFeeFragment }
  }
`;

// ========== SERVICE FUNCTIONS ==========
export async function getTuitionFees(
  filters?: TuitionFeeFilterInput,
  pagination?: { page?: number; limit?: number },
  sort?: TuitionFeeSortInput,
  accessToken?: string
): Promise<TuitionFeeResponse> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_TUITION_FEES_QUERY,
    variables: { filters, pagination, sort },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return data?.getTuitionFees as TuitionFeeResponse;
}

export async function getTuitionFee(id: string, accessToken?: string): Promise<TuitionFee> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_TUITION_FEE_QUERY,
    variables: { id },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return data?.getTuitionFee as TuitionFee;
}

export async function getTuitionFeesByListing(listingId: string, accessToken?: string): Promise<TuitionFee[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_TUITION_FEES_BY_LISTING_QUERY,
    variables: { listingId },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return (data?.getTuitionFeesByListing || []) as TuitionFee[];
}

export async function getTuitionFeesByCampus(campusId: string, accessToken?: string): Promise<TuitionFee[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_TUITION_FEES_BY_CAMPUS_QUERY,
    variables: { campusId },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return (data?.getTuitionFeesByCampus || []) as TuitionFee[];
}

export async function getTuitionFeesByCourse(courseId: string, accessToken?: string): Promise<TuitionFee[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_TUITION_FEES_BY_COURSE_QUERY,
    variables: { courseId },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return (data?.getTuitionFeesByCourse || []) as TuitionFee[];
}

export async function getTuitionFeesByCurriculum(curriculumId: string, accessToken?: string): Promise<TuitionFee[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_TUITION_FEES_BY_CURRICULUM_QUERY,
    variables: { curriculumId },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return (data?.getTuitionFeesByCurriculum || []) as TuitionFee[];
}

export async function getTuitionFeeStats(accessToken?: string): Promise<TuitionFeeStats> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_TUITION_FEE_STATS_QUERY,
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return data?.getTuitionFeeStats as TuitionFeeStats;
}

export async function createTuitionFee(input: CreateTuitionFeeInput, accessToken: string): Promise<TuitionFee> {
  const { data } = await apolloClient.mutate({
    mutation: CREATE_TUITION_FEE_MUTATION,
    variables: { input },
    context: { headers: { authorization: `Bearer ${accessToken}` } },
    errorPolicy: 'all'
  });
  return data?.createTuitionFee as TuitionFee;
}

export async function updateTuitionFee(id: string, input: UpdateTuitionFeeInput, accessToken: string): Promise<TuitionFee> {
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_TUITION_FEE_MUTATION,
    variables: { id, input },
    context: { headers: { authorization: `Bearer ${accessToken}` } },
    errorPolicy: 'all'
  });
  return data?.updateTuitionFee as TuitionFee;
}

export async function deleteTuitionFee(id: string, accessToken: string): Promise<boolean> {
  const { data } = await apolloClient.mutate({
    mutation: DELETE_TUITION_FEE_MUTATION,
    variables: { id },
    context: { headers: { authorization: `Bearer ${accessToken}` } },
    errorPolicy: 'all'
  });
  return data?.removeTuitionFee === true;
}

export async function duplicateTuitionFee(id: string, academicYear?: string, accessToken?: string): Promise<TuitionFee> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.mutate({
    mutation: DUPLICATE_TUITION_FEE_MUTATION,
    variables: { id, academicYear },
    context,
    errorPolicy: 'all'
  });
  return data?.duplicateTuitionFee as TuitionFee;
}

// ========== UTILITY HELPERS ==========
export async function getActiveTuitionFees(accessToken?: string): Promise<TuitionFee[]> {
  const result = await getTuitionFees({ isActive: true }, { page: 1, limit: 100 }, { academicYear: 'desc' }, accessToken);
  return result.tuitionFees;
}

export async function getTuitionFeesByAcademicYear(academicYear: string, accessToken?: string): Promise<TuitionFee[]> {
  const result = await getTuitionFees({ academicYear, isActive: true }, { page: 1, limit: 100 }, { amount: 'asc' }, accessToken);
  return result.tuitionFees;
}

export async function getTuitionFeesByType(feeType: FeeType, accessToken?: string): Promise<TuitionFee[]> {
  const result = await getTuitionFees({ feeType, isActive: true }, { page: 1, limit: 100 }, { amount: 'asc' }, accessToken);
  return result.tuitionFees;
}

export async function searchTuitionFees(searchTerm: string, accessToken?: string): Promise<TuitionFee[]> {
  const result = await getTuitionFees({ search: searchTerm, isActive: true }, { page: 1, limit: 50 }, { academicYear: 'desc' }, accessToken);
  return result.tuitionFees;
}

export async function getTuitionFeesByAmountRange(minAmount: number, maxAmount: number, accessToken?: string): Promise<TuitionFee[]> {
  const result = await getTuitionFees({ minAmount, maxAmount, isActive: true }, { page: 1, limit: 100 }, { amount: 'asc' }, accessToken);
  return result.tuitionFees;
}


