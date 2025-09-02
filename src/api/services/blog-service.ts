import { gql } from '@apollo/client';
import { apolloClient } from '../common/apollo-client';

// Types
export enum ApprovalStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  displayName: string;
  description?: string;
  postCount: number;
  hasPublishedPosts: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  displayName: string;
  colorClass: string;
  postCount: number;
  hasPublishedPosts: boolean;
  popularity: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogComment {
  id: string;
  content: string;
  authorId: string;
  blogPostId: string;
  parentId?: string;
  approvalStatus: ApprovalStatus;
  approvedAt: string;
  rejectedAt?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  replyCount: number;
  
  // Relations
  author: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profile?: {
      name?: string;
      avatar?: string;
    };
  };
  blogPost?: {
    id: string;
    title: string;
    slug: string;
  };
  parent?: BlogComment;
  replies?: BlogComment[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  imageId?: string;
  views: number;
  likes: number;
  featured: boolean;
  disabled_comments: boolean;
  authorId: string;
  isPublished: boolean;
  publishedAt?: string;
  approvalStatus: ApprovalStatus;
  approvedAt: string;
  rejectedAt?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  
  // Computed fields
  commentCount: number;
  readingTime: string;
  shortExcerpt?: string;
  isRecent: boolean;
  publishedTimeAgo?: string;
  
  // Relations
  author: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profile?: {
      name?: string;
      avatar?: string;
    };
  };
  categories: BlogCategory[];
  tags: BlogTag[];
  comments?: BlogComment[];
}

// Input Types
export interface CreateBlogPostInput {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  imageId?: string;
  featured: boolean;
  disabled_comments: boolean;
  isPublished: boolean;
  publishedAt?: string;
  categoryIds?: string[];
  tagIds?: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface UpdateBlogPostInput {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  imageUrl?: string;
  imageId?: string;
  featured?: boolean;
  disabled_comments?: boolean;
  isPublished?: boolean;
  publishedAt?: string;
  categoryIds?: string[];
  tagIds?: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface CreateBlogCategoryInput {
  name: string;
  slug: string;
  displayName: string;
  description?: string;
}

export interface UpdateBlogCategoryInput {
  name?: string;
  slug?: string;
  displayName?: string;
  description?: string;
}

export interface CreateBlogTagInput {
  name: string;
  slug: string;
  displayName: string;
  colorClass: string;
}

export interface UpdateBlogTagInput {
  name?: string;
  slug?: string;
  displayName?: string;
  colorClass?: string;
}

export interface CreateBlogCommentInput {
  content: string;
  blogPostId: string;
  parentId?: string;
}

export interface UpdateBlogCommentInput {
  content: string;
}

export interface BlogPostFilterInput {
  search?: string;
  authorId?: string;
  categoryIds?: string[];
  tagIds?: string[];
  featured?: boolean;
  isPublished?: boolean;
  approvalStatus?: ApprovalStatus;
}

export interface BlogCategoryFilterInput {
  search?: string;
  hasPublishedPosts?: boolean;
}

export interface BlogTagFilterInput {
  search?: string;
  hasPublishedPosts?: boolean;
}

export interface BlogCommentFilterInput {
  search?: string;
  blogPostId?: string;
  authorId?: string;
  approvalStatus?: ApprovalStatus;
  parentId?: string;
}

// Response Types
export interface BlogPostResponse {
  posts: BlogPost[];
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BlogCategoryResponse {
  data: BlogCategory[];
  total: number;
}

export interface BlogTagResponse {
  data: BlogTag[];
  total: number;
}

export interface BlogCommentResponse {
  data: BlogComment[];
  total: number;
}

export interface BlogAnalytics {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  featuredPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  averageViewsPerPost: number;
  averageLikesPerPost: number;
  averageCommentsPerPost: number;
}

// GraphQL Fragments
const BLOG_POST_FRAGMENT = gql`
  fragment BlogPostFragment on BlogPost {
    id
    title
    slug
    content
    excerpt
    imageUrl
    imageId
    views
    likes
    featured
    disabled_comments
    authorId
    isPublished
    publishedAt
    approvalStatus
    approvedAt
    rejectedAt
    rejectionReason
    createdAt
    updatedAt
    metaTitle
    metaDescription
    metaKeywords
    commentCount
    readingTime
    shortExcerpt
    isRecent
    publishedTimeAgo
    author {
      id
      email
      firstName
      lastName
      profile {
        name
        avatar
      }
    }
    categories {
      id
      name
      slug
      displayName
      description
    }
    tags {
      id
      name
      slug
      displayName
      colorClass
    }
  }
`;

const BLOG_TAG_FRAGMENT = gql`
  fragment BlogTagFragment on BlogTag {
    id
    name
    slug
    displayName
    colorClass
    postCount
    hasPublishedPosts
    popularity
    createdAt
    updatedAt
  }
`;

const BLOG_COMMENT_FRAGMENT = gql`
  fragment BlogCommentFragment on BlogComment {
    id
    content
    authorId
    blogPostId
    parentId
    approvalStatus
    approvedAt
    rejectedAt
    rejectionReason
    createdAt
    updatedAt
    replyCount
    author {
      id
      email
      firstName
      lastName
      profile {
        name
        avatar
      }
    }
    blogPost {
      id
      title
      slug
    }
  }
`;

// GraphQL Queries
const GET_BLOG_POSTS_QUERY = gql`
   query GetBlogPosts($page: Int, $limit: Int, $filter: BlogPostFilterInput) {
    getBlogPosts(page: $page, limit: $limit, filter: $filter) {
      hasMore
      total
      posts {
        id
        title
        slug
        content
        excerpt
        imageUrl
        imageId
        views
        likes
        featured
        disabled_comments
        authorId
        isPublished
        publishedAt
        approvalStatus
        approvedAt
        rejectedAt
        rejectionReason
        createdAt
        updatedAt
        metaTitle
        metaDescription
        metaKeywords
        commentCount
        readingTime
        shortExcerpt
        isRecent
        publishedTimeAgo
        author {
          id
          email
          firstName
          lastName
          profile {
            name
            avatar
          }
        }
        categories {
          id
          name
          slug
          displayName
          description
        }
        tags {
          id
          name
          slug
          displayName
          colorClass
        }
      }
    }
  }
`;

const GET_BLOG_POST_QUERY = gql`
  query GetBlogPost($id: String!) {
    getBlogPost(id: $id) {
      id
      title
      slug
      content
      excerpt
      imageUrl
      imageId
      views
      likes
      featured
      disabled_comments
      authorId
      isPublished
      publishedAt
      approvalStatus
      approvedAt
      rejectedAt
      rejectionReason
      createdAt
      updatedAt
      metaTitle
      metaDescription
      metaKeywords
      commentCount
      readingTime
      shortExcerpt
      isRecent
      publishedTimeAgo
      author {
        id
        email
        firstName
        lastName
        profile {
          name
          avatar
        }
      }
      categories {
        id
        name
        slug
        displayName
        description
      }
      tags {
        id
        name
        slug
        displayName
        colorClass
      }
      comments {
        id
        content
        authorId
        blogPostId
        parentId
        approvalStatus
        approvedAt
        rejectedAt
        rejectionReason
        createdAt
        updatedAt
        replyCount
        author {
          id
          email
          firstName
          lastName
          profile {
            name
            avatar
          }
        }
        blogPost {
          id
          title
          slug
        }
        replies {
          id
          content
          authorId
          blogPostId
          parentId
          approvalStatus
          approvedAt
          rejectedAt
          rejectionReason
          createdAt
          updatedAt
          replyCount
          author {
            id
            email
            firstName
            lastName
            profile {
              name
              avatar
            }
          }
          blogPost {
            id
            title
            slug
          }
        }
      }
    }
  }
`;

const GET_BLOG_CATEGORIES_QUERY = gql`
  query GetBlogCategories {
    getBlogCategories {
      id
      name
      slug
      displayName
      description
      postCount
      hasPublishedPosts
      createdAt
      updatedAt
    }
  }
`;

const GET_BLOG_TAGS_QUERY = gql`
  query GetBlogTags {
    getBlogTags {
      id
      name
      slug
      displayName
      colorClass
      postCount
      hasPublishedPosts
      popularity
      createdAt
      updatedAt
    }
  }
`;

const GET_BLOG_COMMENTS_QUERY = gql`
  query GetBlogComments {
    getBlogComments {
      id
      content
      authorId
      blogPostId
      parentId
      approvalStatus
      approvedAt
      rejectedAt
      rejectionReason
      createdAt
      updatedAt
      replyCount
      author {
        id
        email
        firstName
        lastName
        profile {
          name
          avatar
        }
      }
      blogPost {
        id
        title
        slug
      }
    }
  }
`;

// GraphQL Mutations
const CREATE_BLOG_POST_MUTATION = gql`
  ${BLOG_POST_FRAGMENT}
  mutation CreateBlogPost($input: CreateBlogPostInput!) {
    createBlogPost(input: $input) {
      ...BlogPostFragment
    }
  }
`;

const UPDATE_BLOG_POST_MUTATION = gql`
  ${BLOG_POST_FRAGMENT}
  mutation UpdateBlogPost($id: String!, $input: UpdateBlogPostInput!) {
    updateBlogPost(id: $id, input: $input) {
      ...BlogPostFragment
    }
  }
`;

const DELETE_BLOG_POST_MUTATION = gql`
  mutation DeleteBlogPost($id: String!) {
    deleteBlogPost(id: $id) {
      id
      title
      slug
    }
  }
`;

const CREATE_BLOG_COMMENT_MUTATION = gql`
  ${BLOG_COMMENT_FRAGMENT}
  mutation CreateBlogComment($input: CreateBlogCommentInput!) {
    createBlogComment(input: $input) {
      ...BlogCommentFragment
    }
  }
`;

const UPDATE_BLOG_COMMENT_MUTATION = gql`
  ${BLOG_COMMENT_FRAGMENT}
  mutation UpdateBlogComment($id: String!, $input: UpdateBlogCommentInput!) {
    updateBlogComment(id: $id, input: $input) {
      ...BlogCommentFragment
    }
  }
`;

const DELETE_BLOG_COMMENT_MUTATION = gql`
  mutation DeleteBlogComment($id: String!) {
    deleteBlogComment(id: $id) {
      id
      content
    }
  }
`;

// Service Functions
export async function getBlogPosts(
  page = 1,
  limit = 10,
  filter?: BlogPostFilterInput,
  accessToken?: string
): Promise<BlogPostResponse> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_BLOG_POSTS_QUERY,
      variables: { page, limit, filter },
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) { 
      console.error('GraphQL error:', error); 
      throw new Error(error.message); 
    }

    if (!data?.getBlogPosts) { 
      console.warn('No data returned from GraphQL query'); 
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

    const response = data.getBlogPosts;
    const posts = response.posts || [];
    return {
      posts: posts,
      total: response.total || posts.length,
      hasNextPage: response.hasMore || false,
      hasPreviousPage: page > 1,
      page, 
      limit, 
      totalPages: Math.ceil((response.total || posts.length) / limit)
    };
  } catch (error) {
    console.error('Error fetching blog posts from API:', error);
    // Return empty response on error
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

export async function getBlogPost(id: string, accessToken?: string): Promise<BlogPost | undefined> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_BLOG_POST_QUERY,
      variables: { id },
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getBlogPost) {
      console.warn('No blog post found with ID:', id);
      return undefined;
    }

    return data.getBlogPost;
  } catch (error) {
    console.error('Error fetching blog post from API:', error);
    return undefined;
  }
}

export async function getBlogCategories(accessToken?: string): Promise<BlogCategory[]> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_BLOG_CATEGORIES_QUERY,
      variables: {},
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getBlogCategories) {
      console.warn('No categories returned from GraphQL query');
      return [];
    }

    return data.getBlogCategories;
  } catch (error) {
    console.error('Error fetching blog categories from API:', error);
    return [];
  }
}

export async function getBlogTags(accessToken?: string): Promise<BlogTag[]> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_BLOG_TAGS_QUERY,
      variables: {},
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getBlogTags) {
      console.warn('No tags returned from GraphQL query');
      return [];
    }

    return data.getBlogTags;
  } catch (error) {
    console.error('Error fetching blog tags from API:', error);
    return [];
  }
}

export async function getBlogComments(accessToken?: string): Promise<BlogComment[]> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_BLOG_COMMENTS_QUERY,
      variables: {},
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getBlogComments) {
      console.warn('No comments returned from GraphQL query');
      return [];
    }

    return data.getBlogComments;
  } catch (error) {
    console.error('Error fetching blog comments from API:', error);
    return [];
  }
}

export async function createBlogPost(
  input: CreateBlogPostInput,
  accessToken: string
): Promise<BlogPost> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_BLOG_POST_MUTATION,
      variables: { input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.createBlogPost) {
      throw new Error("Failed to create blog post");
    }

    return data.createBlogPost;
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    throw new Error(error.message ?? 'Failed to create blog post');
  }
}

export async function updateBlogPost(
  id: string,
  input: UpdateBlogPostInput,
  accessToken: string
): Promise<BlogPost> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_BLOG_POST_MUTATION,
      variables: { id, input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.updateBlogPost) {
      throw new Error("Failed to update blog post");
    }

    return data.updateBlogPost;
  } catch (error: any) {
    console.error('Error updating blog post:', error);
    throw new Error(error.message ?? 'Failed to update blog post');
  }
}

export async function deleteBlogPost(
  id: string,
  accessToken: string
): Promise<{ id: string; title: string; slug: string }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_BLOG_POST_MUTATION,
      variables: { id },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.deleteBlogPost) {
      throw new Error("Failed to delete blog post");
    }

    return data.deleteBlogPost;
  } catch (error: any) {
    console.error('Error deleting blog post:', error);
    throw new Error(error.message ?? 'Failed to delete blog post');
  }
}

export async function createBlogComment(
  input: CreateBlogCommentInput,
  accessToken: string
): Promise<BlogComment> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_BLOG_COMMENT_MUTATION,
      variables: { input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.createBlogComment) {
      throw new Error("Failed to create blog comment");
    }

    return data.createBlogComment;
  } catch (error: any) {
    console.error('Error creating blog comment:', error);
    throw new Error(error.message ?? 'Failed to create blog comment');
  }
}

export async function updateBlogComment(
  id: string,
  input: UpdateBlogCommentInput,
  accessToken: string
): Promise<BlogComment> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_BLOG_COMMENT_MUTATION,
      variables: { id, input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.updateBlogComment) {
      throw new Error("Failed to update blog comment");
    }

    return data.updateBlogComment;
  } catch (error: any) {
    console.error('Error updating blog comment:', error);
    throw new Error(error.message ?? 'Failed to update blog comment');
  }
}

export async function deleteBlogComment(
  id: string,
  accessToken: string
): Promise<{ id: string; content: string }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_BLOG_COMMENT_MUTATION,
      variables: { id },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.deleteBlogComment) {
      throw new Error("Failed to delete blog comment");
    }

    return data.deleteBlogComment;
  } catch (error: any) {
    console.error('Error deleting blog comment:', error);
    throw new Error(error.message ?? 'Failed to delete blog comment');
  }
}

// Utility Functions
export const getBlogPostStatusLabel = (status: ApprovalStatus): string => {
  switch (status) {
    case ApprovalStatus.APPROVED:
      return 'Approved';
    case ApprovalStatus.PENDING:
      return 'Pending';
    case ApprovalStatus.REJECTED:
      return 'Rejected';
    default:
      return 'Unknown';
  }
};

export const getBlogPostStatusColor = (status: ApprovalStatus): string => {
  switch (status) {
    case ApprovalStatus.APPROVED:
      return 'bg-green-100 text-green-800';
    case ApprovalStatus.PENDING:
      return 'bg-yellow-100 text-yellow-800';
    case ApprovalStatus.REJECTED:
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const isPublished = (post: BlogPost): boolean => post.isPublished;
export const isFeatured = (post: BlogPost): boolean => post.featured;
export const hasComments = (post: BlogPost): boolean => post.commentCount > 0;
export const isRecent = (post: BlogPost): boolean => post.isRecent;

export const formatReadingTime = (readingTime: string): string => readingTime;
export const formatPublishedTime = (publishedTimeAgo: string): string => publishedTimeAgo;
