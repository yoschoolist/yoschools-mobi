import { gql } from '@apollo/client';

// ========== TYPES ==========
export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface BlogCommentUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: 'USER' | 'ADMIN' | 'MODERATOR';
}

export interface BlogComment {
  id: string;
  content: string;
  authorId: string;
  blogPostId: string;
  parentId?: string;
  approvalStatus: ApprovalStatus;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  author: BlogCommentUser;
  replyCount: number;
}

export interface CreateBlogCommentInput { content: string; blogPostId: string; parentId?: string }
export interface UpdateBlogCommentInput { content?: string }

// ========== GRAPHQL ==========
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
    author { id email firstName lastName role }
  }
`;

const GET_BLOG_COMMENTS_BY_POST_QUERY = gql`
  ${BLOG_COMMENT_FRAGMENT}
  query GetBlogCommentsByPost($blogPostId: ID!, $skip: Int, $take: Int) {
    getBlogCommentsByPost(blogPostId: $blogPostId, skip: $skip, take: $take) {
      ...BlogCommentFragment
    }
  }
`;

const CREATE_BLOG_COMMENT_MUTATION = gql`
  ${BLOG_COMMENT_FRAGMENT}
  mutation CreateBlogComment($createBlogCommentInput: CreateBlogCommentInput!) {
    createBlogComment(createBlogCommentInput: $createBlogCommentInput) {
      ...BlogCommentFragment
    }
  }
`;

const UPDATE_BLOG_COMMENT_MUTATION = gql`
  ${BLOG_COMMENT_FRAGMENT}
  mutation UpdateBlogComment($id: ID!, $updateBlogCommentInput: UpdateBlogCommentInput!) {
    updateBlogComment(id: $id, updateBlogCommentInput: $updateBlogCommentInput) {
      ...BlogCommentFragment
    }
  }
`;

// ========== MOCK ==========
const mockComments: BlogComment[] = [
  {
    id: 'c1',
    content: 'Great post! 🎉',
    authorId: 'u1',
    blogPostId: 'post_1',
    approvalStatus: ApprovalStatus.APPROVED,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: { id: 'u1', email: 'user@example.com', firstName: 'Jane', lastName: 'Doe', role: 'USER' },
    replyCount: 0
  }
];

// ========== API ==========
export async function getBlogCommentsByPost(
  blogPostId: string,
  skip?: number,
  take?: number,
  accessToken?: string
): Promise<BlogComment[]> {
  try {
    // TODO: Wire to apolloClient
    // const { data } = await apolloClient.query({ query: GET_BLOG_COMMENTS_BY_POST_QUERY, variables: { blogPostId, skip, take }, ... })
    return mockComments.filter(c => c.blogPostId === blogPostId).slice(skip || 0, (skip || 0) + (take || 50));
  } catch (err) {
    console.error('Error fetching comments by post:', err);
    return mockComments;
  }
}

export async function createBlogComment(input: CreateBlogCommentInput, accessToken: string): Promise<BlogComment> {
  try {
    // const { data } = await apolloClient.mutate({ mutation: CREATE_BLOG_COMMENT_MUTATION, variables: { createBlogCommentInput: input }, ... })
    return {
      id: 'new',
      content: input.content,
      authorId: 'me',
      blogPostId: input.blogPostId,
      approvalStatus: ApprovalStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: { id: 'me', email: 'me@example.com' },
      replyCount: 0
    };
  } catch (err) {
    console.error('Error creating blog comment:', err);
    throw err;
  }
}

export async function updateBlogComment(id: string, input: UpdateBlogCommentInput, accessToken: string): Promise<BlogComment> {
  try {
    // const { data } = await apolloClient.mutate({ mutation: UPDATE_BLOG_COMMENT_MUTATION, variables: { id, updateBlogCommentInput: input }, ... })
    const existing = mockComments.find(c => c.id === id) || mockComments[0];
    return { ...existing, ...input, updatedAt: new Date().toISOString() };
  } catch (err) {
    console.error('Error updating blog comment:', err);
    throw err;
  }
}


