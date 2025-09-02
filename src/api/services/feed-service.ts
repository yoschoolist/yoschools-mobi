import { gql } from '@apollo/client';
import { apolloClient } from '../common/apollo-client';

// Types
export enum PostType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  LINK = 'LINK',
  POLL = 'POLL',
  EVENT = 'EVENT',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  NEWS = 'NEWS',
  REVIEW = 'REVIEW',
  QUESTION = 'QUESTION',
  DISCUSSION = 'DISCUSSION',
  PROMOTION = 'PROMOTION',
  OTHER = 'OTHER'
}

export enum PostVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  FRIENDS = 'FRIENDS',
  FOLLOWERS = 'FOLLOWERS',
  GROUP = 'GROUP',
  CAMPUS = 'CAMPUS',
  LISTING = 'LISTING',
  CATEGORY = 'CATEGORY'
}

export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED',
  SCHEDULED = 'SCHEDULED'
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  UNDER_REVIEW = 'UNDER_REVIEW'
}

export enum SharePlatform {
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  LINKEDIN = 'LINKEDIN',
  INSTAGRAM = 'INSTAGRAM',
  WHATSAPP = 'WHATSAPP',
  TELEGRAM = 'TELEGRAM',
  EMAIL = 'EMAIL',
  COPY_LINK = 'COPY_LINK',
  OTHER = 'OTHER'
}

export enum ReportStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  RESOLVED = 'RESOLVED',
  DISMISSED = 'DISMISSED',
  ESCALATED = 'ESCALATED'
}

export interface FeedPost {
  id: string;
  userId: string;
  title?: string;
  slug?: string;
  content: string;
  postType: PostType;
  visibility: PostVisibility;
  listingId?: string;
  campusId?: string;
  categoryId?: string;
  tags: string[];
  imageUrls: string[];
  documentUrls: string[];
  isPinned: boolean;
  isFeatured: boolean;
  status: PostStatus;
  approvalStatus: ApprovalStatus;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  
  // Relations
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profile?: {
      name?: string;
      avatar?: string;
    };
  };
  listing?: {
    id: string;
    title: string;
    slug: string;
  };
  campus?: {
    id: string;
    name: string;
    slug: string;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  comments: FeedComment[];
  likes?: FeedPostLike[];
  shares?: FeedPostShare[];
}

export interface FeedComment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  parentId?: string;
  approvalStatus: ApprovalStatus;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  
  // Relations
  post?: FeedPost;
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profile?: {
      name?: string;
      avatar?: string;
    };
  };
  parent?: FeedComment;
  replies?: FeedComment[];
  likes?: FeedCommentLike[];
}

export interface FeedPostLike {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
  
  // Relations
  post?: FeedPost;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profile?: {
      name?: string;
      avatar?: string;
    };
  };
}

export interface FeedCommentLike {
  id: string;
  commentId: string;
  userId: string;
  createdAt: string;
  
  // Relations
  comment?: FeedComment;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profile?: {
      name?: string;
      avatar?: string;
    };
  };
}

export interface FeedPostShare {
  id: string;
  postId: string;
  userId: string;
  platform?: SharePlatform;
  createdAt: string;
  
  // Relations
  post?: FeedPost;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profile?: {
      name?: string;
      avatar?: string;
    };
  };
}

export interface FeedPostReport {
  id: string;
  postId: string;
  userId: string;
  reason: string;
  status: ReportStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  resolution?: string;
  createdAt: string;
  updatedAt: string;
  
  // Relations
  post: FeedPost;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profile?: {
      name?: string;
      avatar?: string;
    };
  };
  reviewer?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profile?: {
      name?: string;
      avatar?: string;
    };
  };
}

// Input Types
export interface CreateFeedPostInput {
  title?: string;
  content: string;
  postType: PostType;
  visibility: PostVisibility;
  listingId?: string;
  campusId?: string;
  categoryId?: string;
  tags: string[];
  imageUrls: string[];
  documentUrls: string[];
  isPinned?: boolean;
  isFeatured?: boolean;
  status?: PostStatus;
}

export interface UpdateFeedPostInput {
  title?: string;
  content?: string;
  postType?: PostType;
  visibility?: PostVisibility;
  listingId?: string;
  campusId?: string;
  categoryId?: string;
  tags?: string[];
  imageUrls?: string[];
  documentUrls?: string[];
  isPinned?: boolean;
  isFeatured?: boolean;
  status?: PostStatus;
}

export interface CreateFeedCommentInput {
  postId: string;
  content: string;
  parentId?: string;
}

export interface UpdateFeedCommentInput {
  content: string;
}

export interface FeedPostFilterInput {
  search?: string;
  types?: PostType[];
  visibilities?: PostVisibility[];
  statuses?: PostStatus[];
  approvalStatuses?: ApprovalStatus[];
  tags?: string[];
  userId?: string;
  listingId?: string;
  campusId?: string;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  isPinned?: boolean;
  isFeatured?: boolean;
}

// Response Types
export interface FeedPostResponse {
  posts: FeedPost[];
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FeedCommentResponse {
  comments: FeedComment[];
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BulkFeedOperationResponse {
  successCount: number;
  failureCount: number;
  successIds: string[];
  failureIds: string[];
  errors: string[];
}

export interface FeedAnalyticsResponse {
  totalPosts: number;
  activePosts: number;
  pendingApproval: number;
  totalComments: number;
  totalLikes: number;
  totalShares: number;
  totalViews: number;
  typeDistribution: {
    type: PostType;
    count: number;
    percentage: number;
  }[];
  visibilityDistribution: {
    visibility: PostVisibility;
    count: number;
    percentage: number;
  }[];
  topPosts: {
    id: string;
    title: string;
    content: string;
    likeCount: number;
    commentCount: number;
    shareCount: number;
    viewCount: number;
    engagementRate: number;
  }[];
  monthlyStats: {
    month: string;
    totalPosts: number;
    activePosts: number;
    totalViews: number;
    totalEngagement: number;
    averageEngagement: number;
  }[];
  topTags: string[];
  topCategories: string[];
}

// GraphQL Fragments
const FEED_POST_FRAGMENT = gql`
  fragment FeedPostFragment on FeedPost {
    id
    userId
    title
    slug
    content
    postType
    visibility
    listingId
    campusId
    categoryId
    tags
    imageUrls
    documentUrls
    isPinned
    isFeatured
    status
    approvalStatus
    approvedAt
    rejectedAt
    rejectionReason
    likeCount
    commentCount
    shareCount
    viewCount
    createdAt
    updatedAt
    user {
      id
      email
      firstName
      lastName
      profile {
        name
        avatar
      }
    }
    listing {
      id
      title
      slug
    }
    campus {
      id
      name
      slug
    }
    category {
      id
      name
      slug
    }
  }
`;

const FEED_COMMENT_FRAGMENT = gql`
  fragment FeedCommentFragment on FeedComment {
    id
    postId
    userId
    content
    parentId
    approvalStatus
    approvedAt
    rejectedAt
    rejectionReason
    likeCount
    createdAt
    updatedAt
    user {
      id
      email
      firstName
      lastName
      profile {
        name
        avatar
      }
    }
    post {
      id
      title
      content
    }
    parent {
      id
      content
    }
  }
`;

// GraphQL Queries
const GET_FEED_POSTS_QUERY = gql`
  ${FEED_POST_FRAGMENT}
  query GetFeedPosts($page: Int, $limit: Int, $filter: FeedPostFilterInput) {
    getFeedPosts(page: $page, limit: $limit, filter: $filter) {
      posts {
        ...FeedPostFragment
        comments {
          id
          content
          createdAt
          user {
            id
            email
            firstName
            lastName
            profile {
              name
              avatar
            }
          }
        }
        likes {
          id
          userId
          createdAt
          user {
            id
            email
            firstName
            lastName
            profile {
              name
              avatar
            }
          }
        }
        shares {
          id
          userId
          platform
          createdAt
          user {
            id
            email
            firstName
            lastName
            profile {
              name
              avatar
            }
          }
        }
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

const GET_FEED_POST_QUERY = gql`
  ${FEED_POST_FRAGMENT}
  query GetFeedPost($id: String!) {
    getFeedPost(id: $id) {
      ...FeedPostFragment
      comments {
        id
        content
        createdAt
        user {
          id
          email
          firstName
          lastName
          profile {
            name
            avatar
          }
        }
      }
      likes {
        id
        userId
        createdAt
        user {
          id
          email
          firstName
          lastName
          profile {
            name
            avatar
          }
        }
      }
      shares {
        id
        userId
        platform
        createdAt
        user {
          id
          email
          firstName
          lastName
          profile {
            name
            avatar
          }
        }
      }
    }
  }
`;

const GET_FEED_COMMENTS_QUERY = gql`
  ${FEED_COMMENT_FRAGMENT}
  query GetFeedComments($page: Int, $limit: Int) {
    getFeedComments(page: $page, limit: $limit) {
      comments {
        ...FeedCommentFragment
        replies {
          id
          content
          createdAt
          user {
            id
            email
            firstName
            lastName
            profile {
              name
              avatar
            }
          }
        }
        likes {
          id
          userId
          createdAt
          user {
            id
            email
            firstName
            lastName
            profile {
              name
              avatar
            }
          }
        }
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

const GET_FEED_ANALYTICS_QUERY = gql`
  query GetFeedAnalytics {
    getFeedAnalytics {
      totalPosts
      activePosts
      pendingApproval
      totalComments
      totalLikes
      totalShares
      totalViews
      typeDistribution {
        type
        count
        percentage
      }
      visibilityDistribution {
        visibility
        count
        percentage
      }
      topPosts {
        id
        title
        content
        likeCount
        commentCount
        shareCount
        viewCount
        engagementRate
      }
      monthlyStats {
        month
        totalPosts
        activePosts
        totalViews
        totalEngagement
        averageEngagement
      }
      topTags
      topCategories
    }
  }
`;

// GraphQL Mutations
const CREATE_FEED_POST_MUTATION = gql`
  ${FEED_POST_FRAGMENT}
  mutation CreateFeedPost($input: CreateFeedPostInput!) {
    createFeedPost(input: $input) {
      ...FeedPostFragment
    }
  }
`;

const UPDATE_FEED_POST_MUTATION = gql`
  ${FEED_POST_FRAGMENT}
  mutation UpdateFeedPost($id: String!, $input: UpdateFeedPostInput!) {
    updateFeedPost(id: $id, input: $input) {
      ...FeedPostFragment
    }
  }
`;

const DELETE_FEED_POST_MUTATION = gql`
  mutation DeleteFeedPost($id: String!) {
    deleteFeedPost(id: $id) {
      id
      title
      content
    }
  }
`;

const LIKE_FEED_POST_MUTATION = gql`
  mutation LikeFeedPost($postId: String!) {
    likeFeedPost(postId: $postId) {
      id
      postId
      userId
      createdAt
    }
  }
`;

const UNLIKE_FEED_POST_MUTATION = gql`
  mutation UnlikeFeedPost($postId: String!) {
    unlikeFeedPost(postId: $postId) {
      success
      message
    }
  }
`;

const SHARE_FEED_POST_MUTATION = gql`
  mutation ShareFeedPost($postId: String!, $platform: SharePlatform) {
    shareFeedPost(postId: $postId, platform: $platform) {
      id
      postId
      userId
      platform
      createdAt
    }
  }
`;

const CREATE_FEED_COMMENT_MUTATION = gql`
  ${FEED_COMMENT_FRAGMENT}
  mutation CreateFeedComment($input: CreateFeedCommentInput!) {
    createFeedComment(input: $input) {
      ...FeedCommentFragment
    }
  }
`;

const UPDATE_FEED_COMMENT_MUTATION = gql`
  ${FEED_COMMENT_FRAGMENT}
  mutation UpdateFeedComment($id: String!, $input: UpdateFeedCommentInput!) {
    updateFeedComment(id: $id, input: $input) {
      ...FeedCommentFragment
    }
  }
`;

const DELETE_FEED_COMMENT_MUTATION = gql`
  mutation DeleteFeedComment($id: String!) {
    deleteFeedComment(id: $id) {
      id
      content
    }
  }
`;

const LIKE_FEED_COMMENT_MUTATION = gql`
  mutation LikeFeedComment($commentId: String!) {
    likeFeedComment(commentId: $commentId) {
      id
      commentId
      userId
      createdAt
    }
  }
`;

const UNLIKE_FEED_COMMENT_MUTATION = gql`
  mutation UnlikeFeedComment($commentId: String!) {
    unlikeFeedComment(commentId: $commentId) {
      success
      message
    }
  }
`;

// Service Functions
export async function getFeedPosts(
  page = 1,
  limit = 10,
  filter?: FeedPostFilterInput,
  accessToken?: string
): Promise<FeedPostResponse> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_FEED_POSTS_QUERY,
      variables: { page, limit, filter },
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getFeedPosts) {
      console.warn('No feed posts returned from GraphQL query');
      return {
        posts: [],
        total: 0,
        hasNextPage: false,
        hasPreviousPage: false,
        page,
        limit,
        totalPages: 0
      };
    }

    return data.getFeedPosts;
  } catch (error) {
    console.error('Error fetching feed posts from API:', error);
    return {
      posts: [],
      total: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      page,
      limit,
      totalPages: 0
    };
  }
}

export async function getFeedPost(id: string, accessToken?: string): Promise<FeedPost | undefined> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_FEED_POST_QUERY,
      variables: { id },
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getFeedPost) {
      console.warn('No feed post found with ID:', id);
      return undefined;
    }

    return data.getFeedPost;
  } catch (error) {
    console.error('Error fetching feed post from API:', error);
    return undefined;
  }
}

export async function getFeedComments(
  page = 1,
  limit = 10,
  accessToken?: string
): Promise<FeedCommentResponse> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_FEED_COMMENTS_QUERY,
      variables: { page, limit },
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getFeedComments) {
      console.warn('No feed comments returned from GraphQL query');
      return {
        comments: [],
        total: 0,
        hasNextPage: false,
        hasPreviousPage: false,
        page,
        limit,
        totalPages: 0
      };
    }

    return data.getFeedComments;
  } catch (error) {
    console.error('Error fetching feed comments from API:', error);
    return {
      comments: [],
      total: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      page,
      limit,
      totalPages: 0
    };
  }
}

export async function getFeedAnalytics(accessToken?: string): Promise<FeedAnalyticsResponse | undefined> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_FEED_ANALYTICS_QUERY,
      variables: {},
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getFeedAnalytics) {
      console.warn('No feed analytics returned from GraphQL query');
      return undefined;
    }

    return data.getFeedAnalytics;
  } catch (error) {
    console.error('Error fetching feed analytics from API:', error);
    return undefined;
  }
}

export async function createFeedPost(
  input: CreateFeedPostInput,
  accessToken: string
): Promise<FeedPost> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_FEED_POST_MUTATION,
      variables: { input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.createFeedPost) {
      throw new Error("Failed to create feed post");
    }

    return data.createFeedPost;
  } catch (error: any) {
    console.error('Error creating feed post:', error);
    throw new Error(error.message ?? 'Failed to create feed post');
  }
}

export async function updateFeedPost(
  id: string,
  input: UpdateFeedPostInput,
  accessToken: string
): Promise<FeedPost> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_FEED_POST_MUTATION,
      variables: { id, input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.updateFeedPost) {
      throw new Error("Failed to update feed post");
    }

    return data.updateFeedPost;
  } catch (error: any) {
    console.error('Error updating feed post:', error);
    throw new Error(error.message ?? 'Failed to update feed post');
  }
}

export async function deleteFeedPost(
  id: string,
  accessToken: string
): Promise<{ id: string; title?: string; content: string }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_FEED_POST_MUTATION,
      variables: { id },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.deleteFeedPost) {
      throw new Error("Failed to delete feed post");
    }

    return data.deleteFeedPost;
  } catch (error: any) {
    console.error('Error deleting feed post:', error);
    throw new Error(error.message ?? 'Failed to delete feed post');
  }
}

export async function likeFeedPost(
  postId: string,
  accessToken: string
): Promise<FeedPostLike> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: LIKE_FEED_POST_MUTATION,
      variables: { postId },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.likeFeedPost) {
      throw new Error("Failed to like feed post");
    }

    return data.likeFeedPost;
  } catch (error: any) {
    console.error('Error liking feed post:', error);
    throw new Error(error.message ?? 'Failed to like feed post');
  }
}

export async function unlikeFeedPost(
  postId: string,
  accessToken: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UNLIKE_FEED_POST_MUTATION,
      variables: { postId },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.unlikeFeedPost) {
      throw new Error("Failed to unlike feed post");
    }

    return data.unlikeFeedPost;
  } catch (error: any) {
    console.error('Error unliking feed post:', error);
    throw new Error(error.message ?? 'Failed to unlike feed post');
  }
}

export async function shareFeedPost(
  postId: string,
  platform?: SharePlatform,
  accessToken?: string
): Promise<FeedPostShare> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data } = await apolloClient.mutate({
      mutation: SHARE_FEED_POST_MUTATION,
      variables: { postId, platform },
      context,
      errorPolicy: 'all'
    });

    if (!data?.shareFeedPost) {
      throw new Error("Failed to share feed post");
    }

    return data.shareFeedPost;
  } catch (error: any) {
    console.error('Error sharing feed post:', error);
    throw new Error(error.message ?? 'Failed to share feed post');
  }
}

export async function createFeedComment(
  input: CreateFeedCommentInput,
  accessToken: string
): Promise<FeedComment> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_FEED_COMMENT_MUTATION,
      variables: { input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.createFeedComment) {
      throw new Error("Failed to create feed comment");
    }

    return data.createFeedComment;
  } catch (error: any) {
    console.error('Error creating feed comment:', error);
    throw new Error(error.message ?? 'Failed to create feed comment');
  }
}

export async function updateFeedComment(
  id: string,
  input: UpdateFeedCommentInput,
  accessToken: string
): Promise<FeedComment> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_FEED_COMMENT_MUTATION,
      variables: { id, input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.updateFeedComment) {
      throw new Error("Failed to update feed comment");
    }

    return data.updateFeedComment;
  } catch (error: any) {
    console.error('Error updating feed comment:', error);
    throw new Error(error.message ?? 'Failed to update feed comment');
  }
}

export async function deleteFeedComment(
  id: string,
  accessToken: string
): Promise<{ id: string; content: string }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_FEED_COMMENT_MUTATION,
      variables: { id },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.deleteFeedComment) {
      throw new Error("Failed to delete feed comment");
    }

    return data.deleteFeedComment;
  } catch (error: any) {
    console.error('Error deleting feed comment:', error);
    throw new Error(error.message ?? 'Failed to delete feed comment');
  }
}

export async function likeFeedComment(
  commentId: string,
  accessToken: string
): Promise<FeedCommentLike> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: LIKE_FEED_COMMENT_MUTATION,
      variables: { commentId },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.likeFeedComment) {
      throw new Error("Failed to like feed comment");
    }

    return data.likeFeedComment;
  } catch (error: any) {
    console.error('Error liking feed comment:', error);
    throw new Error(error.message ?? 'Failed to like feed comment');
  }
}

export async function unlikeFeedComment(
  commentId: string,
  accessToken: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UNLIKE_FEED_COMMENT_MUTATION,
      variables: { commentId },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.unlikeFeedComment) {
      throw new Error("Failed to unlike feed comment");
    }

    return data.unlikeFeedComment;
  } catch (error: any) {
    console.error('Error unliking feed comment:', error);
    throw new Error(error.message ?? 'Failed to unlike feed comment');
  }
}

// Utility Functions
export const getPostTypeLabel = (type: PostType): string => {
  switch (type) {
    case PostType.TEXT:
      return 'Text Post';
    case PostType.IMAGE:
      return 'Image Post';
    case PostType.VIDEO:
      return 'Video Post';
    case PostType.LINK:
      return 'Link Post';
    case PostType.POLL:
      return 'Poll';
    case PostType.EVENT:
      return 'Event';
    case PostType.ANNOUNCEMENT:
      return 'Announcement';
    case PostType.NEWS:
      return 'News';
    case PostType.REVIEW:
      return 'Review';
    case PostType.QUESTION:
      return 'Question';
    case PostType.DISCUSSION:
      return 'Discussion';
    case PostType.PROMOTION:
      return 'Promotion';
    case PostType.OTHER:
      return 'Other';
    default:
      return 'Unknown';
  }
};

export const getPostTypeColor = (type: PostType): string => {
  switch (type) {
    case PostType.TEXT:
      return 'bg-blue-100 text-blue-800';
    case PostType.IMAGE:
      return 'bg-green-100 text-green-800';
    case PostType.VIDEO:
      return 'bg-purple-100 text-purple-800';
    case PostType.LINK:
      return 'bg-orange-100 text-orange-800';
    case PostType.POLL:
      return 'bg-pink-100 text-pink-800';
    case PostType.EVENT:
      return 'bg-indigo-100 text-indigo-800';
    case PostType.ANNOUNCEMENT:
      return 'bg-red-100 text-red-800';
    case PostType.NEWS:
      return 'bg-yellow-100 text-yellow-800';
    case PostType.REVIEW:
      return 'bg-teal-100 text-teal-800';
    case PostType.QUESTION:
      return 'bg-cyan-100 text-cyan-800';
    case PostType.DISCUSSION:
      return 'bg-gray-100 text-gray-800';
    case PostType.PROMOTION:
      return 'bg-emerald-100 text-emerald-800';
    case PostType.OTHER:
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getVisibilityLabel = (visibility: PostVisibility): string => {
  switch (visibility) {
    case PostVisibility.PUBLIC:
      return 'Public';
    case PostVisibility.PRIVATE:
      return 'Private';
    case PostVisibility.FRIENDS:
      return 'Friends Only';
    case PostVisibility.FOLLOWERS:
      return 'Followers Only';
    case PostVisibility.GROUP:
      return 'Group Members';
    case PostVisibility.CAMPUS:
      return 'Campus Only';
    case PostVisibility.LISTING:
      return 'Listing Members';
    case PostVisibility.CATEGORY:
      return 'Category Members';
    default:
      return 'Unknown';
  }
};

export const getVisibilityColor = (visibility: PostVisibility): string => {
  switch (visibility) {
    case PostVisibility.PUBLIC:
      return 'bg-green-100 text-green-800';
    case PostVisibility.PRIVATE:
      return 'bg-red-100 text-red-800';
    case PostVisibility.FRIENDS:
      return 'bg-blue-100 text-blue-800';
    case PostVisibility.FOLLOWERS:
      return 'bg-purple-100 text-purple-800';
    case PostVisibility.GROUP:
      return 'bg-indigo-100 text-indigo-800';
    case PostVisibility.CAMPUS:
      return 'bg-yellow-100 text-yellow-800';
    case PostVisibility.LISTING:
      return 'bg-orange-100 text-orange-800';
    case PostVisibility.CATEGORY:
      return 'bg-teal-100 text-teal-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusLabel = (status: PostStatus): string => {
  switch (status) {
    case PostStatus.DRAFT:
      return 'Draft';
    case PostStatus.PUBLISHED:
      return 'Published';
    case PostStatus.ARCHIVED:
      return 'Archived';
    case PostStatus.DELETED:
      return 'Deleted';
    case PostStatus.SCHEDULED:
      return 'Scheduled';
    default:
      return 'Unknown';
  }
};

export const getStatusColor = (status: PostStatus): string => {
  switch (status) {
    case PostStatus.DRAFT:
      return 'bg-yellow-100 text-yellow-800';
    case PostStatus.PUBLISHED:
      return 'bg-green-100 text-green-800';
    case PostStatus.ARCHIVED:
      return 'bg-gray-100 text-gray-800';
    case PostStatus.DELETED:
      return 'bg-red-100 text-red-800';
    case PostStatus.SCHEDULED:
      return 'bg-blue-100 text-blue-800';
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
    case ApprovalStatus.UNDER_REVIEW:
      return 'Under Review';
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
    case ApprovalStatus.UNDER_REVIEW:
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const isPublished = (post: FeedPost): boolean => post.status === PostStatus.PUBLISHED;
export const isPinned = (post: FeedPost): boolean => post.isPinned;
export const isFeatured = (post: FeedPost): boolean => post.isFeatured;
export const hasImages = (post: FeedPost): boolean => post.imageUrls.length > 0;
export const hasDocuments = (post: FeedPost): boolean => post.documentUrls.length > 0;
export const hasComments = (post: FeedPost): boolean => post.commentCount > 0;
export const hasLikes = (post: FeedPost): boolean => post.likeCount > 0;
export const hasShares = (post: FeedPost): boolean => post.shareCount > 0;

export const getEngagementRate = (post: FeedPost): number => {
  if (post.viewCount === 0) return 0;
  return ((post.likeCount + post.commentCount + post.shareCount) / post.viewCount) * 100;
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

export const getDisplayName = (user: { firstName?: string; lastName?: string; profile?: { name?: string } }): string => {
  if (user.profile?.name) {
    return user.profile.name;
  }
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  if (user.firstName) {
    return user.firstName;
  }
  if (user.lastName) {
    return user.lastName;
  }
  return 'Anonymous';
};

export const getInitials = (user: { firstName?: string; lastName?: string; profile?: { name?: string } }): string => {
  const name = getDisplayName(user);
  const words = name.split(' ');
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return name[0]?.toUpperCase() || 'A';
};
