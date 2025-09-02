import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

// ========== TYPES ==========
export enum ApplicationStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  INTERVIEW_SCHEDULED = 'INTERVIEW_SCHEDULED',
  INTERVIEW_COMPLETED = 'INTERVIEW_COMPLETED',
  ACCEPTED = 'ACCEPTED',
  CONDITIONALLY_ACCEPTED = 'CONDITIONALLY_ACCEPTED',
  WAITLISTED = 'WAITLISTED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
  DEFERRED = 'DEFERRED'
}

export enum ApplicationType {
  NEW_STUDENT = 'NEW_STUDENT',
  TRANSFER_STUDENT = 'TRANSFER_STUDENT',
  RETURNING_STUDENT = 'RETURNING_STUDENT',
  INTERNATIONAL_STUDENT = 'INTERNATIONAL_STUDENT',
  EXCHANGE_STUDENT = 'EXCHANGE_STUDENT',
  GRADUATE_STUDENT = 'GRADUATE_STUDENT',
  ADULT_EDUCATION = 'ADULT_EDUCATION',
  SUMMER_SCHOOL = 'SUMMER_SCHOOL',
  OTHER = 'OTHER'
}

export interface CreateSchoolApplicationInput {
  listingId: string;
  applicantId: string;
  type: ApplicationType;
  academicYear: string;
  gradeLevel: string;
  program?: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender?: string;
    nationality?: string;
    passportNumber?: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state?: string;
      country: string;
      postalCode?: string;
    };
  };
  academicInfo: {
    previousSchool?: string;
    currentGrade?: string;
    gpa?: number;
    transcripts?: string[];
    testScores?: Record<string, any>;
  };
  documents: string[];
  additionalInfo?: Record<string, any>;
  notes?: string;
}

export interface UpdateSchoolApplicationInput {
  type?: ApplicationType;
  academicYear?: string;
  gradeLevel?: string;
  program?: string;
  personalInfo?: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    gender?: string;
    nationality?: string;
    passportNumber?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      postalCode?: string;
    };
  };
  academicInfo?: {
    previousSchool?: string;
    currentGrade?: string;
    gpa?: number;
    transcripts?: string[];
    testScores?: Record<string, any>;
  };
  documents?: string[];
  additionalInfo?: Record<string, any>;
  notes?: string;
}

export interface SchoolApplicationFilterInput {
  listingId?: string;
  applicantId?: string;
  type?: ApplicationType;
  status?: ApplicationStatus;
  academicYear?: string;
  gradeLevel?: string;
  program?: string;
  search?: string;
  submittedAfter?: string;
  submittedBefore?: string;
  reviewedAfter?: string;
  reviewedBefore?: string;
}

export interface SchoolApplicationSortInput {
  createdAt?: 'asc' | 'desc';
  updatedAt?: 'asc' | 'desc';
  submittedAt?: 'asc' | 'desc';
  status?: 'asc' | 'desc';
  type?: 'asc' | 'desc';
  gradeLevel?: 'asc' | 'desc';
}

export interface SchoolApplication {
  id: string;
  listingId: string;
  applicantId: string;
  type: ApplicationType;
  status: ApplicationStatus;
  academicYear: string;
  gradeLevel: string;
  program?: string;
  personalInfo: any;
  contactInfo: any;
  academicInfo: any;
  documents: string[];
  additionalInfo?: Record<string, any>;
  notes?: string;
  reviewNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
  listing: { id: string; name: string; slug: string };
  applicant: { id: string; email: string; profile?: { name?: string; avatar?: string } };
  reviewer?: { id: string; email: string; profile?: { name?: string; avatar?: string } };
}

export interface SchoolApplicationStatsResponse {
  totalApplications: number;
  applicationsByStatus: Array<{ status: ApplicationStatus; count: number }>;
  applicationsByType: Array<{ type: ApplicationType; count: number }>;
  applicationsByGrade: Array<{ gradeLevel: string; count: number }>;
  applicationsByProgram: Array<{ program: string; count: number }>;
  recentSubmissions: Array<{ date: string; count: number }>;
  averageProcessingTime: number;
  acceptanceRate: number;
}

// ========== FRAGMENTS ==========
const SCHOOL_APPLICATION_FRAGMENT = gql`
  fragment SchoolApplicationFragment on SchoolApplication {
    id
    listingId
    applicantId
    type
    status
    academicYear
    gradeLevel
    program
    personalInfo
    contactInfo
    academicInfo
    documents
    additionalInfo
    notes
    reviewNotes
    reviewedBy
    reviewedAt
    submittedAt
    createdAt
    updatedAt
    listing { id name slug }
    applicant { id email profile { name avatar } }
    reviewer { id email profile { name avatar } }
  }
`;

// ========== QUERIES ==========
const GET_SCHOOL_APPLICATIONS_QUERY = gql`
  ${SCHOOL_APPLICATION_FRAGMENT}
  query GetSchoolApplications($filters: SchoolApplicationFilterInput, $sort: SchoolApplicationSortInput) {
    getSchoolApplications(filters: $filters, sort: $sort) {
      ...SchoolApplicationFragment
    }
  }
`;

const GET_SCHOOL_APPLICATION_BY_ID_QUERY = gql`
  ${SCHOOL_APPLICATION_FRAGMENT}
  query GetSchoolApplicationById($id: String!) {
    getSchoolApplicationById(id: $id) {
      ...SchoolApplicationFragment
    }
  }
`;

const GET_APPLICATIONS_BY_LISTING_QUERY = gql`
  ${SCHOOL_APPLICATION_FRAGMENT}
  query GetSchoolApplicationsByListing($listingId: String!) {
    getSchoolApplicationsByListing(listingId: $listingId) {
      ...SchoolApplicationFragment
    }
  }
`;

const GET_APPLICATION_STATS_QUERY = gql`
  query GetApplicationStats($listingId: String!) {
    getApplicationStats(listingId: $listingId) {
      totalApplications
      applicationsByStatus { status count }
      applicationsByType { type count }
      applicationsByGrade { gradeLevel count }
      applicationsByProgram { program count }
      recentSubmissions { date count }
      averageProcessingTime
      acceptanceRate
    }
  }
`;

// ========== MUTATIONS ==========
const CREATE_SCHOOL_APPLICATION_MUTATION = gql`
  ${SCHOOL_APPLICATION_FRAGMENT}
  mutation CreateSchoolApplication($input: CreateSchoolApplicationInput!) {
    createSchoolApplication(input: $input) {
      ...SchoolApplicationFragment
    }
  }
`;

const UPDATE_SCHOOL_APPLICATION_MUTATION = gql`
  ${SCHOOL_APPLICATION_FRAGMENT}
  mutation UpdateSchoolApplication($id: String!, $input: UpdateSchoolApplicationInput!) {
    updateSchoolApplication(id: $id, input: $input) {
      ...SchoolApplicationFragment
    }
  }
`;

const DELETE_SCHOOL_APPLICATION_MUTATION = gql`
  ${SCHOOL_APPLICATION_FRAGMENT}
  mutation DeleteSchoolApplication($id: String!) {
    deleteSchoolApplication(id: $id) {
      ...SchoolApplicationFragment
    }
  }
`;

const UPDATE_APPLICATION_STATUS_MUTATION = gql`
  ${SCHOOL_APPLICATION_FRAGMENT}
  mutation UpdateApplicationStatus($id: String!, $status: String!) {
    updateApplicationStatus(id: $id, status: $status) {
      ...SchoolApplicationFragment
    }
  }
`;

// ========== SERVICE FUNCTIONS ==========
export async function getSchoolApplications(
  filters?: SchoolApplicationFilterInput,
  sort?: SchoolApplicationSortInput,
  accessToken?: string
): Promise<SchoolApplication[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_SCHOOL_APPLICATIONS_QUERY,
    variables: { filters, sort },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return (data?.getSchoolApplications || []) as SchoolApplication[];
}

export async function getSchoolApplicationById(
  id: string,
  accessToken?: string
): Promise<SchoolApplication> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_SCHOOL_APPLICATION_BY_ID_QUERY,
    variables: { id },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return data?.getSchoolApplicationById as SchoolApplication;
}

export async function getSchoolApplicationsByListing(
  listingId: string,
  accessToken?: string
): Promise<SchoolApplication[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_APPLICATIONS_BY_LISTING_QUERY,
    variables: { listingId },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return (data?.getSchoolApplicationsByListing || []) as SchoolApplication[];
}

export async function getApplicationStats(
  listingId: string,
  accessToken?: string
): Promise<SchoolApplicationStatsResponse> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_APPLICATION_STATS_QUERY,
    variables: { listingId },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return data?.getApplicationStats as SchoolApplicationStatsResponse;
}

export async function createSchoolApplication(
  input: CreateSchoolApplicationInput,
  accessToken?: string
): Promise<SchoolApplication> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.mutate({
    mutation: CREATE_SCHOOL_APPLICATION_MUTATION,
    variables: { input },
    context,
    errorPolicy: 'all'
  });
  return data?.createSchoolApplication as SchoolApplication;
}

export async function updateSchoolApplication(
  id: string,
  input: UpdateSchoolApplicationInput,
  accessToken?: string
): Promise<SchoolApplication> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_SCHOOL_APPLICATION_MUTATION,
    variables: { id, input },
    context,
    errorPolicy: 'all'
  });
  return data?.updateSchoolApplication as SchoolApplication;
}

export async function deleteSchoolApplication(
  id: string,
  accessToken?: string
): Promise<SchoolApplication> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.mutate({
    mutation: DELETE_SCHOOL_APPLICATION_MUTATION,
    variables: { id },
    context,
    errorPolicy: 'all'
  });
  return data?.deleteSchoolApplication as SchoolApplication;
}

export async function updateApplicationStatus(
  id: string,
  status: string,
  accessToken?: string
): Promise<SchoolApplication> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_APPLICATION_STATUS_MUTATION,
    variables: { id, status },
    context,
    errorPolicy: 'all'
  });
  return data?.updateApplicationStatus as SchoolApplication;
}


