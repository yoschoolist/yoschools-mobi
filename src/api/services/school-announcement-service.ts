import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

// ========== TYPES ==========
export interface CreateSchoolAnnouncementInput {
  title: string;
  content: string;
  listingId: string;
  category?: string;
  priority?: string;
  isActive?: boolean;
  publishAt?: string;
  expiresAt?: string;
  targetAudience?: string[];
  attachments?: string[];
}

export interface UpdateSchoolAnnouncementInput {
  title?: string;
  content?: string;
  category?: string;
  priority?: string;
  isActive?: boolean;
  publishAt?: string;
  expiresAt?: string;
  targetAudience?: string[];
  attachments?: string[];
}

export interface SchoolAnnouncementFilterInput {
  listingId?: string;
  authorId?: string;
  category?: string;
  priority?: string;
  isActive?: boolean;
  search?: string;
  publishedAfter?: string;
  publishedBefore?: string;
}

export interface SchoolAnnouncementSortInput {
  createdAt?: 'asc' | 'desc';
  updatedAt?: 'asc' | 'desc';
  publishAt?: 'asc' | 'desc';
  priority?: 'asc' | 'desc';
  title?: 'asc' | 'desc';
  viewCount?: 'asc' | 'desc';
}

export interface SchoolAnnouncement {
  id: string;
  title: string;
  content: string;
  listingId: string;
  authorId: string;
  category?: string;
  priority?: string;
  isActive: boolean;
  isPublished: boolean;
  publishAt?: string;
  expiresAt?: string;
  targetAudience: string[];
  attachments: string[];
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  listing: { id: string; name: string; slug: string };
  author: { id: string; email: string; profile?: { name?: string; avatar?: string } };
}

export interface SchoolAnnouncementStatsResponse {
  totalAnnouncements: number;
  publishedAnnouncements: number;
  draftAnnouncements: number;
  expiredAnnouncements: number;
  totalViews: number;
  averageViews: number;
  topCategories: Array<{ category: string; count: number }>;
  recentActivity: Array<{ date: string; count: number }>;
}

// ========== FRAGMENTS ==========
const SCHOOL_ANNOUNCEMENT_FRAGMENT = gql`
  fragment SchoolAnnouncementFragment on SchoolAnnouncement {
    id
    title
    content
    listingId
    authorId
    category
    priority
    isActive
    isPublished
    publishAt
    expiresAt
    targetAudience
    attachments
    viewCount
    createdAt
    updatedAt
    listing { id name slug }
    author {
      id
      email
      profile { name avatar }
    }
  }
`;

// ========== QUERIES ==========
const GET_SCHOOL_ANNOUNCEMENTS_QUERY = gql`
  ${SCHOOL_ANNOUNCEMENT_FRAGMENT}
  query GetSchoolAnnouncements($filter: SchoolAnnouncementFilterInput, $sort: SchoolAnnouncementSortInput) {
    getSchoolAnnouncements(filter: $filter, sort: $sort) {
      ...SchoolAnnouncementFragment
    }
  }
`;

const GET_SCHOOL_ANNOUNCEMENT_BY_ID_QUERY = gql`
  ${SCHOOL_ANNOUNCEMENT_FRAGMENT}
  query GetSchoolAnnouncementById($id: String!) {
    getSchoolAnnouncementById(id: $id) {
      ...SchoolAnnouncementFragment
    }
  }
`;

const GET_ANNOUNCEMENTS_BY_LISTING_QUERY = gql`
  ${SCHOOL_ANNOUNCEMENT_FRAGMENT}
  query GetAnnouncementsByListing($listingId: String!) {
    getAnnouncementsByListing(listingId: $listingId) {
      ...SchoolAnnouncementFragment
    }
  }
`;

const GET_ANNOUNCEMENTS_BY_AUTHOR_QUERY = gql`
  ${SCHOOL_ANNOUNCEMENT_FRAGMENT}
  query GetAnnouncementsByAuthor($authorId: String!) {
    getAnnouncementsByAuthor(authorId: $authorId) {
      ...SchoolAnnouncementFragment
    }
  }
`;

const GET_ANNOUNCEMENTS_BY_CATEGORY_QUERY = gql`
  ${SCHOOL_ANNOUNCEMENT_FRAGMENT}
  query GetAnnouncementsByCategory($category: String!, $listingId: String!) {
    getAnnouncementsByCategory(category: $category, listingId: $listingId) {
      ...SchoolAnnouncementFragment
    }
  }
`;

const GET_ANNOUNCEMENT_STATS_QUERY = gql`
  query GetAnnouncementStats($listingId: String!) {
    getAnnouncementStats(listingId: $listingId) {
      totalAnnouncements
      publishedAnnouncements
      draftAnnouncements
      expiredAnnouncements
      totalViews
      averageViews
      topCategories { category count }
      recentActivity { date count }
    }
  }
`;

// ========== MUTATIONS ==========
const CREATE_SCHOOL_ANNOUNCEMENT_MUTATION = gql`
  ${SCHOOL_ANNOUNCEMENT_FRAGMENT}
  mutation CreateSchoolAnnouncement($input: CreateSchoolAnnouncementInput!) {
    createSchoolAnnouncement(input: $input) {
      ...SchoolAnnouncementFragment
    }
  }
`;

const UPDATE_SCHOOL_ANNOUNCEMENT_MUTATION = gql`
  ${SCHOOL_ANNOUNCEMENT_FRAGMENT}
  mutation UpdateSchoolAnnouncement($id: String!, $input: UpdateSchoolAnnouncementInput!) {
    updateSchoolAnnouncement(id: $id, input: $input) {
      ...SchoolAnnouncementFragment
    }
  }
`;

const DELETE_SCHOOL_ANNOUNCEMENT_MUTATION = gql`
  ${SCHOOL_ANNOUNCEMENT_FRAGMENT}
  mutation DeleteSchoolAnnouncement($id: String!) {
    deleteSchoolAnnouncement(id: $id) {
      ...SchoolAnnouncementFragment
    }
  }
`;

const TOGGLE_ANNOUNCEMENT_ACTIVE_MUTATION = gql`
  ${SCHOOL_ANNOUNCEMENT_FRAGMENT}
  mutation ToggleAnnouncementActive($id: String!) {
    toggleAnnouncementActive(id: $id) {
      ...SchoolAnnouncementFragment
    }
  }
`;

const INCREMENT_ANNOUNCEMENT_VIEWS_MUTATION = gql`
  ${SCHOOL_ANNOUNCEMENT_FRAGMENT}
  mutation IncrementAnnouncementViews($id: String!) {
    incrementAnnouncementViews(id: $id) {
      ...SchoolAnnouncementFragment
    }
  }
`;

// ========== SERVICE FUNCTIONS ==========
export async function getSchoolAnnouncements(
  filter?: SchoolAnnouncementFilterInput,
  sort?: SchoolAnnouncementSortInput,
  accessToken?: string
): Promise<SchoolAnnouncement[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_SCHOOL_ANNOUNCEMENTS_QUERY,
    variables: { filter, sort },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return (data?.getSchoolAnnouncements || []) as SchoolAnnouncement[];
}

export async function getSchoolAnnouncementById(
  id: string,
  accessToken?: string
): Promise<SchoolAnnouncement> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_SCHOOL_ANNOUNCEMENT_BY_ID_QUERY,
    variables: { id },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return data?.getSchoolAnnouncementById as SchoolAnnouncement;
}

export async function getAnnouncementsByListing(
  listingId: string,
  accessToken?: string
): Promise<SchoolAnnouncement[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_ANNOUNCEMENTS_BY_LISTING_QUERY,
    variables: { listingId },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return (data?.getAnnouncementsByListing || []) as SchoolAnnouncement[];
}

export async function getAnnouncementsByAuthor(
  authorId: string,
  accessToken?: string
): Promise<SchoolAnnouncement[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_ANNOUNCEMENTS_BY_AUTHOR_QUERY,
    variables: { authorId },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return (data?.getAnnouncementsByAuthor || []) as SchoolAnnouncement[];
}

export async function getAnnouncementsByCategory(
  category: string,
  listingId: string,
  accessToken?: string
): Promise<SchoolAnnouncement[]> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_ANNOUNCEMENTS_BY_CATEGORY_QUERY,
    variables: { category, listingId },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return (data?.getAnnouncementsByCategory || []) as SchoolAnnouncement[];
}

export async function getAnnouncementStats(
  listingId: string,
  accessToken?: string
): Promise<SchoolAnnouncementStatsResponse> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.query({
    query: GET_ANNOUNCEMENT_STATS_QUERY,
    variables: { listingId },
    context,
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  });
  return data?.getAnnouncementStats as SchoolAnnouncementStatsResponse;
}

export async function createSchoolAnnouncement(
  input: CreateSchoolAnnouncementInput,
  accessToken?: string
): Promise<SchoolAnnouncement> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.mutate({
    mutation: CREATE_SCHOOL_ANNOUNCEMENT_MUTATION,
    variables: { input },
    context,
    errorPolicy: 'all'
  });
  return data?.createSchoolAnnouncement as SchoolAnnouncement;
}

export async function updateSchoolAnnouncement(
  id: string,
  input: UpdateSchoolAnnouncementInput,
  accessToken?: string
): Promise<SchoolAnnouncement> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_SCHOOL_ANNOUNCEMENT_MUTATION,
    variables: { id, input },
    context,
    errorPolicy: 'all'
  });
  return data?.updateSchoolAnnouncement as SchoolAnnouncement;
}

export async function deleteSchoolAnnouncement(
  id: string,
  accessToken?: string
): Promise<SchoolAnnouncement> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.mutate({
    mutation: DELETE_SCHOOL_ANNOUNCEMENT_MUTATION,
    variables: { id },
    context,
    errorPolicy: 'all'
  });
  return data?.deleteSchoolAnnouncement as SchoolAnnouncement;
}

export async function toggleAnnouncementActive(
  id: string,
  accessToken?: string
): Promise<SchoolAnnouncement> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.mutate({
    mutation: TOGGLE_ANNOUNCEMENT_ACTIVE_MUTATION,
    variables: { id },
    context,
    errorPolicy: 'all'
  });
  return data?.toggleAnnouncementActive as SchoolAnnouncement;
}

export async function incrementAnnouncementViews(
  id: string,
  accessToken?: string
): Promise<SchoolAnnouncement> {
  const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
  const { data } = await apolloClient.mutate({
    mutation: INCREMENT_ANNOUNCEMENT_VIEWS_MUTATION,
    variables: { id },
    context,
    errorPolicy: 'all'
  });
  return data?.incrementAnnouncementViews as SchoolAnnouncement;
}


