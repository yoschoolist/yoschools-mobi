import { gql } from '@apollo/client';

// ========== TYPES ==========
export interface JobBookmarkUserProfile { name?: string; avatar?: string }
export interface JobBookmarkUser { id: string; email: string; profile?: JobBookmarkUserProfile }

export interface JobBookmarkJobPostedByUser extends JobBookmarkUser {}

export interface JobBookmarkJob {
  id: string;
  title: string;
  slug: string;
  company: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  type: string;
  status: string;
  postedBy: string;
  postedByUser: JobBookmarkJobPostedByUser;
}

export interface JobBookmark {
  id: string;
  userId: string;
  jobId: string;
  createdAt: string;
  user: JobBookmarkUser;
  job: JobBookmarkJob;
}

// ========== GRAPHQL ==========
const JOB_BOOKMARK_FRAGMENT = gql`
  fragment JobBookmarkFragment on JobBookmark {
    id
    userId
    jobId
    createdAt
    user { id email profile { name avatar } }
    job {
      id
      title
      slug
      company
      location
      salaryMin
      salaryMax
      salaryCurrency
      type
      status
      postedBy
      postedByUser { id email profile { name avatar } }
    }
  }
`;

const GET_USER_JOB_BOOKMARKS_QUERY = gql`
  ${JOB_BOOKMARK_FRAGMENT}
  query GetUserJobBookmarks($skip: Int, $take: Int) {
    getUserJobBookmarks(skip: $skip, take: $take) { ...JobBookmarkFragment }
  }
`;

const TOGGLE_JOB_BOOKMARK_MUTATION = gql`
  mutation ToggleJobBookmark($jobId: ID!) { toggleJobBookmark(jobId: $jobId) }
`;

// ========== MOCK ==========
const mockJobBookmarks: JobBookmark[] = [
  {
    id: 'jb_1',
    userId: 'user_1',
    jobId: 'job_1',
    createdAt: new Date().toISOString(),
    user: { id: 'user_1', email: 'user@example.com', profile: { name: 'User One' } },
    job: {
      id: 'job_1',
      title: 'Math Teacher',
      slug: 'math-teacher',
      company: 'Lagos High',
      location: 'Lagos, NG',
      salaryMin: 150000,
      salaryMax: 250000,
      salaryCurrency: 'NGN',
      type: 'FULL_TIME',
      status: 'OPEN',
      postedBy: 'HR',
      postedByUser: { id: 'hr_1', email: 'hr@lagoshigh.edu', profile: { name: 'HR' } }
    }
  }
];

// ========== API ==========
export async function getUserJobBookmarks(
  skip: number = 0,
  take: number = 20,
  accessToken?: string
): Promise<JobBookmark[]> {
  try {
    // TODO: Wire to apolloClient
    // const { data } = await apolloClient.query({
    //   query: GET_USER_JOB_BOOKMARKS_QUERY,
    //   variables: { skip, take },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all', fetchPolicy: 'cache-first'
    // });
    // return data.getUserJobBookmarks;
    return mockJobBookmarks.slice(skip, Math.min(mockJobBookmarks.length, skip + take));
  } catch (err) {
    console.error('Error fetching job bookmarks:', err);
    return mockJobBookmarks;
  }
}

export async function toggleJobBookmark(jobId: string, accessToken?: string): Promise<boolean> {
  try {
    // const { data } = await apolloClient.mutate({ mutation: TOGGLE_JOB_BOOKMARK_MUTATION, variables: { jobId }, ... })
    return true;
  } catch (err) {
    console.error('Error toggling job bookmark:', err);
    return false;
  }
}


