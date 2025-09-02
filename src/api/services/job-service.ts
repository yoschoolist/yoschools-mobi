import { gql } from '@apollo/client';
import { apolloClient } from '../common/apollo-client';

// Types
export enum JobType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  TEMPORARY = 'TEMPORARY',
  INTERNSHIP = 'INTERNSHIP',
  VOLUNTEER = 'VOLUNTEER',
  FREELANCE = 'FREELANCE',
  OTHER = 'OTHER'
}

export enum JobCategory {
  TEACHING = 'TEACHING',
  ADMINISTRATION = 'ADMINISTRATION',
  SUPPORT_STAFF = 'SUPPORT_STAFF',
  MANAGEMENT = 'MANAGEMENT',
  IT_TECHNOLOGY = 'IT_TECHNOLOGY',
  MARKETING = 'MARKETING',
  FINANCE = 'FINANCE',
  HUMAN_RESOURCES = 'HUMAN_RESOURCES',
  MAINTENANCE = 'MAINTENANCE',
  SECURITY = 'SECURITY',
  OTHER = 'OTHER'
}

export enum ExperienceLevel {
  ENTRY = 'ENTRY',
  JUNIOR = 'JUNIOR',
  MID_LEVEL = 'MID_LEVEL',
  SENIOR = 'SENIOR',
  EXECUTIVE = 'EXECUTIVE',
  ANY = 'ANY'
}

export enum SalaryType {
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
  PROJECT_BASED = 'PROJECT_BASED',
  OTHER = 'OTHER'
}

export enum JobStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CLOSED = 'CLOSED',
  EXPIRED = 'EXPIRED',
  FILLED = 'FILLED',
  CANCELLED = 'CANCELLED'
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface Job {
  id: string;
  title: string;
  slug: string;
  description: string;
  summary?: string;
  type: JobType;
  category: JobCategory;
  experience: ExperienceLevel;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  salaryType?: SalaryType;
  benefits: string[];
  qualifications: string[];
  skills: string[];
  subjects: string[];
  applicationDeadline?: string;
  applicationEmail?: string;
  applicationUrl?: string;
  applicationInstructions?: string;
  startDate?: string;
  isRemote: boolean;
  isUrgent: boolean;
  isFeatured: boolean;
  status: JobStatus;
  isActive: boolean;
  approvalStatus: ApprovalStatus;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  viewCount: number;
  applicationCount: number;
  countryId?: string;
  regionId?: string;
  localityId?: string;
  locationDetails?: string;
  postedBy: string;
  listingId?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  expiresAt?: string;
  
  // Relations
  user?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    profilePicture?: string;
  };
  listing?: {
    id: string;
    name: string;
    slug: string;
  };
  country?: {
    id: string;
    name: string;
    code: string;
  };
  region?: {
    id: string;
    name: string;
    code: string;
  };
  locality?: {
    id: string;
    name: string;
    code: string;
  };
}

// Input Types
export interface CreateJobInput {
  title: string;
  slug: string;
  description: string;
  summary?: string;
  type: JobType;
  category: JobCategory;
  experience: ExperienceLevel;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  salaryType?: SalaryType;
  benefits: string[];
  qualifications: string[];
  skills: string[];
  subjects: string[];
  applicationDeadline?: string;
  applicationEmail?: string;
  applicationUrl?: string;
  applicationInstructions?: string;
  startDate?: string;
  isRemote: boolean;
  isUrgent: boolean;
  isFeatured: boolean;
  status: JobStatus;
  countryId?: string;
  regionId?: string;
  localityId?: string;
  locationDetails?: string;
  listingId?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface UpdateJobInput {
  title?: string;
  slug?: string;
  description?: string;
  summary?: string;
  type?: JobType;
  category?: JobCategory;
  experience?: ExperienceLevel;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  salaryType?: SalaryType;
  benefits?: string[];
  qualifications?: string[];
  skills?: string[];
  subjects?: string[];
  applicationDeadline?: string;
  applicationEmail?: string;
  applicationUrl?: string;
  applicationInstructions?: string;
  startDate?: string;
  isRemote?: boolean;
  isUrgent?: boolean;
  isFeatured?: boolean;
  status?: JobStatus;
  countryId?: string;
  regionId?: string;
  localityId?: string;
  locationDetails?: string;
  listingId?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface JobFilterInput {
  search?: string;
  type?: JobType;
  category?: JobCategory;
  experience?: ExperienceLevel;
  status?: JobStatus;
  isActive?: boolean;
  isFeatured?: boolean;
  isUrgent?: boolean;
  isRemote?: boolean;
  postedBy?: string;
  listingId?: string;
  countryId?: string;
  regionId?: string;
  localityId?: string;
  salaryMin?: number;
  salaryMax?: number;
  applicationDeadlineFrom?: string;
  applicationDeadlineTo?: string;
  startDateFrom?: string;
  startDateTo?: string;
  createdAtFrom?: string;
  createdAtTo?: string;
  skills?: string[];
  subjects?: string[];
}

export interface JobSortInput {
  field?: 'TITLE' | 'CREATED_AT' | 'UPDATED_AT' | 'VIEW_COUNT' | 'APPLICATION_COUNT' | 'SALARY_MIN' | 'SALARY_MAX' | 'APPLICATION_DEADLINE' | 'START_DATE' | 'STATUS' | 'TYPE' | 'CATEGORY' | 'EXPERIENCE';
  order?: 'ASC' | 'DESC';
}

// Response Types
export interface JobResponse {
  jobs: Job[];
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  limit: number;
  totalPages: number;
}

export interface JobStats {
  totalJobs: number;
  publishedJobs: number;
  draftJobs: number;
  closedJobs: number;
  expiredJobs: number;
  filledJobs: number;
  urgentJobs: number;
  featuredJobs: number;
  remoteJobs: number;
  totalApplications: number;
  averageApplicationsPerJob: number;
  jobsByType: {
    [key in JobType]: number;
  };
  jobsByCategory: {
    [key in JobCategory]: number;
  };
  jobsByExperience: {
    [key in ExperienceLevel]: number;
  };
  topSkills: string[];
  topSubjects: string[];
}

// GraphQL Fragments
const JOB_FRAGMENT = gql`
  fragment JobFragment on Job {
    id
    title
    slug
    description
    summary
    type
    category
    experience
    salaryMin
    salaryMax
    currency
    salaryType
    benefits
    qualifications
    skills
    subjects
    applicationDeadline
    applicationEmail
    applicationUrl
    applicationInstructions
    startDate
    isRemote
    isUrgent
    isFeatured
    status
    isActive
    approvalStatus
    approvedAt
    rejectedAt
    rejectionReason
    viewCount
    applicationCount
    countryId
    regionId
    localityId
    locationDetails
    postedBy
    listingId
    metaTitle
    metaDescription
    metaKeywords
    createdAt
    updatedAt
    publishedAt
    expiresAt
    user {
      id
      firstName
      lastName
      email
      profilePicture
    }
    listing {
      id
      name
      slug
    }
    country {
      id
      name
      code
    }
    region {
      id
      name
      code
    }
    locality {
      id
      name
      code
    }
  }
`;

// GraphQL Queries
const GET_JOBS_QUERY = gql`
  ${JOB_FRAGMENT}
  query GetJobs($page: Int, $limit: Int, $filter: JobFilterInput, $sort: JobSortInput) {
    getJobs(page: $page, limit: $limit, filter: $filter, sort: $sort) {
      jobs {
        ...JobFragment
      }
      total
      hasNextPage
      hasPreviousPage
      page
      limit
      totalPages
    }
  }
`;

const GET_JOB_QUERY = gql`
  ${JOB_FRAGMENT}
  query GetJob($id: String!) {
    getJob(id: $id) {
      ...JobFragment
    }
  }
`;

const GET_JOB_BY_SLUG_QUERY = gql`
  ${JOB_FRAGMENT}
  query GetJobBySlug($slug: String!) {
    getJobBySlug(slug: $slug) {
      ...JobFragment
    }
  }
`;

const GET_JOB_STATS_QUERY = gql`
  query GetJobStats {
    getJobStats {
      totalJobs
      publishedJobs
      draftJobs
      closedJobs
      expiredJobs
      filledJobs
      urgentJobs
      featuredJobs
      remoteJobs
      totalApplications
      averageApplicationsPerJob
      jobsByType
      jobsByCategory
      jobsByExperience
      topSkills
      topSubjects
    }
  }
`;

// GraphQL Mutations
const CREATE_JOB_MUTATION = gql`
  ${JOB_FRAGMENT}
  mutation CreateJob($input: CreateJobInput!) {
    createJob(input: $input) {
      ...JobFragment
    }
  }
`;

const UPDATE_JOB_MUTATION = gql`
  ${JOB_FRAGMENT}
  mutation UpdateJob($id: String!, $input: UpdateJobInput!) {
    updateJob(id: $id, input: $input) {
      ...JobFragment
    }
  }
`;

const DELETE_JOB_MUTATION = gql`
  mutation DeleteJob($id: String!) {
    deleteJob(id: $id) {
      id
      title
      slug
    }
  }
`;

const APPLY_JOB_MUTATION = gql`
  mutation ApplyJob($jobId: String!, $input: JobApplicationInput!) {
    applyJob(jobId: $jobId, input: $input) {
      id
      jobId
      applicantId
      status
      appliedAt
    }
  }
`;

// Service Functions
export async function getJobs(
  page = 1,
  limit = 10,
  filter?: JobFilterInput,
  sort?: JobSortInput,
  accessToken?: string
): Promise<JobResponse> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_JOBS_QUERY,
      variables: { page, limit, filter, sort },
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getJobs) {
      console.warn('No jobs returned from GraphQL query');
      return {
        jobs: [],
        total: 0,
        hasNextPage: false,
        hasPreviousPage: false,
        page,
        limit,
        totalPages: 0
      };
    }

    return data.getJobs;
  } catch (error) {
    console.error('Error fetching jobs from API:', error);
    return {
      jobs: [],
      total: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      page,
      limit,
      totalPages: 0
    };
  }
}

export async function getJob(id: string, accessToken?: string): Promise<Job | undefined> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_JOB_QUERY,
      variables: { id },
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getJob) {
      console.warn('No job found with ID:', id);
      return undefined;
    }

    return data.getJob;
  } catch (error) {
    console.error('Error fetching job from API:', error);
    return undefined;
  }
}

export async function getJobBySlug(slug: string, accessToken?: string): Promise<Job | undefined> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_JOB_BY_SLUG_QUERY,
      variables: { slug },
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getJobBySlug) {
      console.warn('No job found with slug:', slug);
      return undefined;
    }

    return data.getJobBySlug;
  } catch (error) {
    console.error('Error fetching job by slug from API:', error);
    return undefined;
  }
}

export async function getJobStats(accessToken?: string): Promise<JobStats | undefined> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_JOB_STATS_QUERY,
      variables: {},
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getJobStats) {
      console.warn('No job stats returned from GraphQL query');
      return undefined;
    }

    return data.getJobStats;
  } catch (error) {
    console.error('Error fetching job stats from API:', error);
    return undefined;
  }
}

export async function createJob(
  input: CreateJobInput,
  accessToken: string
): Promise<Job> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_JOB_MUTATION,
      variables: { input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.createJob) {
      throw new Error("Failed to create job");
    }

    return data.createJob;
  } catch (error: any) {
    console.error('Error creating job:', error);
    throw new Error(error.message ?? 'Failed to create job');
  }
}

export async function updateJob(
  id: string,
  input: UpdateJobInput,
  accessToken: string
): Promise<Job> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_JOB_MUTATION,
      variables: { id, input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.updateJob) {
      throw new Error("Failed to update job");
    }

    return data.updateJob;
  } catch (error: any) {
    console.error('Error updating job:', error);
    throw new Error(error.message ?? 'Failed to update job');
  }
}

export async function deleteJob(
  id: string,
  accessToken: string
): Promise<{ id: string; title: string; slug: string }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_JOB_MUTATION,
      variables: { id },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.deleteJob) {
      throw new Error("Failed to delete job");
    }

    return data.deleteJob;
  } catch (error: any) {
    console.error('Error deleting job:', error);
    throw new Error(error.message ?? 'Failed to delete job');
  }
}

// Utility Functions
export const getJobTypeLabel = (type: JobType): string => {
  switch (type) {
    case JobType.FULL_TIME:
      return 'Full Time';
    case JobType.PART_TIME:
      return 'Part Time';
    case JobType.CONTRACT:
      return 'Contract';
    case JobType.TEMPORARY:
      return 'Temporary';
    case JobType.INTERNSHIP:
      return 'Internship';
    case JobType.VOLUNTEER:
      return 'Volunteer';
    case JobType.FREELANCE:
      return 'Freelance';
    case JobType.OTHER:
      return 'Other';
    default:
      return 'Unknown';
  }
};

export const getJobCategoryLabel = (category: JobCategory): string => {
  switch (category) {
    case JobCategory.TEACHING:
      return 'Teaching';
    case JobCategory.ADMINISTRATION:
      return 'Administration';
    case JobCategory.SUPPORT_STAFF:
      return 'Support Staff';
    case JobCategory.MANAGEMENT:
      return 'Management';
    case JobCategory.IT_TECHNOLOGY:
      return 'IT & Technology';
    case JobCategory.MARKETING:
      return 'Marketing';
    case JobCategory.FINANCE:
      return 'Finance';
    case JobCategory.HUMAN_RESOURCES:
      return 'Human Resources';
    case JobCategory.MAINTENANCE:
      return 'Maintenance';
    case JobCategory.SECURITY:
      return 'Security';
    case JobCategory.OTHER:
      return 'Other';
    default:
      return 'Unknown';
  }
};

export const getExperienceLevelLabel = (experience: ExperienceLevel): string => {
  switch (experience) {
    case ExperienceLevel.ENTRY:
      return 'Entry Level';
    case ExperienceLevel.JUNIOR:
      return 'Junior';
    case ExperienceLevel.MID_LEVEL:
      return 'Mid Level';
    case ExperienceLevel.SENIOR:
      return 'Senior';
    case ExperienceLevel.EXECUTIVE:
      return 'Executive';
    case ExperienceLevel.ANY:
      return 'Any Level';
    default:
      return 'Unknown';
  }
};

export const getSalaryTypeLabel = (salaryType: SalaryType): string => {
  switch (salaryType) {
    case SalaryType.HOURLY:
      return 'Hourly';
    case SalaryType.DAILY:
      return 'Daily';
    case SalaryType.WEEKLY:
      return 'Weekly';
    case SalaryType.MONTHLY:
      return 'Monthly';
    case SalaryType.YEARLY:
      return 'Yearly';
    case SalaryType.PROJECT_BASED:
      return 'Project Based';
    case SalaryType.OTHER:
      return 'Other';
    default:
      return 'Unknown';
  }
};

export const getJobStatusLabel = (status: JobStatus): string => {
  switch (status) {
    case JobStatus.DRAFT:
      return 'Draft';
    case JobStatus.PUBLISHED:
      return 'Published';
    case JobStatus.CLOSED:
      return 'Closed';
    case JobStatus.EXPIRED:
      return 'Expired';
    case JobStatus.FILLED:
      return 'Filled';
    case JobStatus.CANCELLED:
      return 'Cancelled';
    default:
      return 'Unknown';
  }
};

export const getJobStatusColor = (status: JobStatus): string => {
  switch (status) {
    case JobStatus.DRAFT:
      return 'bg-gray-100 text-gray-800';
    case JobStatus.PUBLISHED:
      return 'bg-green-100 text-green-800';
    case JobStatus.CLOSED:
      return 'bg-red-100 text-red-800';
    case JobStatus.EXPIRED:
      return 'bg-orange-100 text-orange-800';
    case JobStatus.FILLED:
      return 'bg-blue-100 text-blue-800';
    case JobStatus.CANCELLED:
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getApprovalStatusLabel = (status: ApprovalStatus): string => {
  switch (status) {
    case ApprovalStatus.PENDING:
      return 'Pending';
    case ApprovalStatus.APPROVED:
      return 'Approved';
    case ApprovalStatus.REJECTED:
      return 'Rejected';
    default:
      return 'Unknown';
  }
};

export const getApprovalStatusColor = (status: ApprovalStatus): string => {
  switch (status) {
    case ApprovalStatus.PENDING:
      return 'bg-yellow-100 text-yellow-800';
    case ApprovalStatus.APPROVED:
      return 'bg-green-100 text-green-800';
    case ApprovalStatus.REJECTED:
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const isActive = (job: Job): boolean => job.isActive && job.status === JobStatus.PUBLISHED;
export const isFeatured = (job: Job): boolean => job.isFeatured;
export const isUrgent = (job: Job): boolean => job.isUrgent;
export const isRemote = (job: Job): boolean => job.isRemote;
export const isExpired = (job: Job): boolean => {
  if (!job.expiresAt) return false;
  return new Date(job.expiresAt) < new Date();
};
export const isApplicationDeadlinePassed = (job: Job): boolean => {
  if (!job.applicationDeadline) return false;
  return new Date(job.applicationDeadline) < new Date();
};

export const getSalaryRange = (job: Job): string => {
  if (!job.salaryMin && !job.salaryMax) return 'Salary not specified';
  if (job.salaryMin && job.salaryMax) {
    return `${job.currency || ''} ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}`;
  }
  if (job.salaryMin) {
    return `${job.currency || ''} ${job.salaryMin.toLocaleString()}+`;
  }
  if (job.salaryMax) {
    return `Up to ${job.currency || ''} ${job.salaryMax.toLocaleString()}`;
  }
  return 'Salary not specified';
};

export const getTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const getDaysUntilDeadline = (deadline: string): number => {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const diffInMs = deadlineDate.getTime() - now.getTime();
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
};

export const isDeadlineApproaching = (deadline: string, daysThreshold = 7): boolean => {
  const daysUntil = getDaysUntilDeadline(deadline);
  return daysUntil > 0 && daysUntil <= daysThreshold;
};
