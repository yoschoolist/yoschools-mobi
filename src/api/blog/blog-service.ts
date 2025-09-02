import { apolloClient } from '../common/apollo-client';

// Types for blog posts
export enum BlogPostType {
  ARTICLE = 'ARTICLE',
  TUTORIAL = 'TUTORIAL',
  NEWS = 'NEWS',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  INTERVIEW = 'INTERVIEW',
  REVIEW = 'REVIEW',
  GUIDE = 'GUIDE'
}

export enum BlogPostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED'
}

export enum BlogPostVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  SCHOOL_ONLY = 'SCHOOL_ONLY',
  SUBSCRIBERS_ONLY = 'SUBSCRIBERS_ONLY'
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  type: BlogPostType;
  status: BlogPostStatus;
  visibility: BlogPostVisibility;
  authorId: string;
  schoolId?: string;
  categoryId?: string;
  tags: string[];
  featuredImage?: string;
  mediaUrls: string[];
  readTime: number; // in minutes
  viewCount: number;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  isShared: boolean;
  isFeatured: boolean;
  isPinned: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  
  // Relations
  author: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
    role: string;
    school?: {
      id: string;
      name: string;
    };
  };
  school?: {
    id: string;
    name: string;
    logo?: string;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
    color?: string;
  };
  comments?: BlogComment[];
  likes?: BlogLike[];
  shares?: BlogShare[];
}

export interface BlogComment {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  parentId?: string;
  likeCount: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: string;
  };
  replies?: BlogComment[];
}

export interface BlogLike {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface BlogShare {
  id: string;
  userId: string;
  postId: string;
  content?: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  postCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPage {
  items: BlogPost[];
  total: number;
  hasMore: boolean;
  page: number;
  limit: number;
}

export interface PaginationInput {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface BlogFiltersInput {
  type?: BlogPostType[];
  status?: BlogPostStatus[];
  visibility?: BlogPostVisibility[];
  authorId?: string;
  schoolId?: string;
  categoryId?: string;
  tags?: string[];
  isFeatured?: boolean;
  isPinned?: boolean;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface BlogSortInput {
  createdAt?: 'asc' | 'desc';
  publishedAt?: 'asc' | 'desc';
  viewCount?: 'asc' | 'desc';
  likeCount?: 'asc' | 'desc';
  commentCount?: 'asc' | 'desc';
  readTime?: 'asc' | 'desc';
}

export interface CreateBlogPostInput {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  type: BlogPostType;
  visibility: BlogPostVisibility;
  schoolId?: string;
  categoryId?: string;
  tags: string[];
  featuredImage?: string;
  mediaUrls: string[];
  isFeatured?: boolean;
  isPinned?: boolean;
  publishedAt?: string;
}

export interface UpdateBlogPostInput {
  id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  type?: BlogPostType;
  status?: BlogPostStatus;
  visibility?: BlogPostVisibility;
  schoolId?: string;
  categoryId?: string;
  tags?: string[];
  featuredImage?: string;
  mediaUrls?: string[];
  isFeatured?: boolean;
  isPinned?: boolean;
  publishedAt?: string;
}

export interface CreateBlogCommentInput {
  postId: string;
  content: string;
  parentId?: string;
}

export interface UpdateBlogCommentInput {
  id: string;
  content: string;
}

// GraphQL Queries
const GET_BLOG_POSTS_QUERY = `
  query GetBlogPosts(
    $pagination: PaginationInput
    $filters: BlogFiltersInput
    $sort: BlogSortInput
  ) {
    getBlogPosts(pagination: $pagination, filters: $filters, sort: $sort) {
      items {
        id
        title
        slug
        excerpt
        content
        type
        status
        visibility
        authorId
        schoolId
        categoryId
        tags
        featuredImage
        mediaUrls
        readTime
        viewCount
        likeCount
        commentCount
        shareCount
        isLiked
        isBookmarked
        isShared
        isFeatured
        isPinned
        publishedAt
        createdAt
        updatedAt
        author {
          id
          name
          avatar
          bio
          role
          school {
            id
            name
          }
        }
        school {
          id
          name
          logo
        }
        category {
          id
          name
          slug
          color
        }
        comments {
          id
          content
          authorId
          postId
          parentId
          likeCount
          isLiked
          createdAt
          updatedAt
          author {
            id
            name
            avatar
            role
          }
          replies {
            id
            content
            authorId
            postId
            parentId
            likeCount
            isLiked
            createdAt
            updatedAt
            author {
              id
              name
              avatar
              role
            }
          }
        }
        likes {
          id
          userId
          postId
          createdAt
          user {
            id
            name
            avatar
          }
        }
        shares {
          id
          userId
          postId
          content
          createdAt
          user {
            id
            name
            avatar
          }
        }
      }
      total
      hasMore
      page
      limit
    }
  }
`;

const GET_BLOG_POST_BY_ID_QUERY = `
  query GetBlogPostById($id: ID!) {
    getBlogPostById(id: $id) {
      id
      title
      slug
      excerpt
      content
      type
      status
      visibility
      authorId
      schoolId
      categoryId
      tags
      featuredImage
      mediaUrls
      readTime
      viewCount
      likeCount
      commentCount
      shareCount
      isLiked
      isBookmarked
      isShared
      isFeatured
      isPinned
      publishedAt
      createdAt
      updatedAt
      author {
        id
        name
        avatar
        bio
        role
        school {
          id
          name
        }
      }
      school {
        id
        name
        logo
      }
      category {
        id
        name
        slug
        color
      }
      comments {
        id
        content
        authorId
        postId
        parentId
        likeCount
        isLiked
        createdAt
        updatedAt
        author {
          id
          name
          avatar
          role
        }
        replies {
          id
          content
          authorId
          postId
          parentId
          likeCount
          isLiked
          createdAt
          updatedAt
          author {
            id
            name
            avatar
            role
          }
        }
      }
      likes {
        id
        userId
        postId
        createdAt
        user {
          id
          name
          avatar
        }
      }
      shares {
        id
        userId
        postId
        content
        createdAt
        user {
          id
          name
          avatar
        }
      }
    }
  }
`;

const GET_BLOG_POST_BY_SLUG_QUERY = `
  query GetBlogPostBySlug($slug: String!) {
    getBlogPostBySlug(slug: $slug) {
      id
      title
      slug
      excerpt
      content
      type
      status
      visibility
      authorId
      schoolId
      categoryId
      tags
      featuredImage
      mediaUrls
      readTime
      viewCount
      likeCount
      commentCount
      shareCount
      isLiked
      isBookmarked
      isShared
      isFeatured
      isPinned
      publishedAt
      createdAt
      updatedAt
      author {
        id
        name
        avatar
        bio
        role
        school {
          id
          name
        }
      }
      school {
        id
        name
        logo
      }
      category {
        id
        name
        slug
        color
      }
      comments {
        id
        content
        authorId
        postId
        parentId
        likeCount
        isLiked
        createdAt
        updatedAt
        author {
          id
          name
          avatar
          role
        }
        replies {
          id
          content
          authorId
          postId
          parentId
          likeCount
          isLiked
          createdAt
          updatedAt
          author {
            id
            name
            avatar
            role
          }
        }
      }
      likes {
        id
        userId
        postId
        createdAt
        user {
          id
          name
          avatar
        }
      }
      shares {
        id
        userId
        postId
        content
        createdAt
        user {
          id
          name
          avatar
        }
      }
    }
  }
`;

const GET_BLOG_CATEGORIES_QUERY = `
  query GetBlogCategories {
    getBlogCategories {
      id
      name
      slug
      description
      color
      postCount
      createdAt
      updatedAt
    }
  }
`;

const GET_FEATURED_BLOG_POSTS_QUERY = `
  query GetFeaturedBlogPosts($limit: Int) {
    getFeaturedBlogPosts(limit: $limit) {
      id
      title
      slug
      excerpt
      type
      featuredImage
      readTime
      viewCount
      likeCount
      commentCount
      publishedAt
      author {
        id
        name
        avatar
        role
      }
      school {
        id
        name
        logo
      }
      category {
        id
        name
        slug
        color
      }
    }
  }
`;

// GraphQL Mutations
const CREATE_BLOG_POST_MUTATION = `
  mutation CreateBlogPost($input: CreateBlogPostInput!) {
    createBlogPost(input: $input) {
      id
      title
      slug
      excerpt
      content
      type
      status
      visibility
      authorId
      schoolId
      categoryId
      tags
      featuredImage
      mediaUrls
      readTime
      viewCount
      likeCount
      commentCount
      shareCount
      isLiked
      isBookmarked
      isShared
      isFeatured
      isPinned
      publishedAt
      createdAt
      updatedAt
      author {
        id
        name
        avatar
        bio
        role
        school {
          id
          name
        }
      }
      school {
        id
        name
        logo
      }
      category {
        id
        name
        slug
        color
      }
    }
  }
`;

const UPDATE_BLOG_POST_MUTATION = `
  mutation UpdateBlogPost($input: UpdateBlogPostInput!) {
    updateBlogPost(input: $input) {
      id
      title
      slug
      excerpt
      content
      type
      status
      visibility
      authorId
      schoolId
      categoryId
      tags
      featuredImage
      mediaUrls
      readTime
      viewCount
      likeCount
      commentCount
      shareCount
      isLiked
      isBookmarked
      isShared
      isFeatured
      isPinned
      publishedAt
      createdAt
      updatedAt
      author {
        id
        name
        avatar
        bio
        role
        school {
          id
          name
        }
      }
      school {
        id
        name
        logo
      }
      category {
        id
        name
        slug
        color
      }
    }
  }
`;

const DELETE_BLOG_POST_MUTATION = `
  mutation DeleteBlogPost($id: ID!) {
    deleteBlogPost(id: $id)
  }
`;

const LIKE_BLOG_POST_MUTATION = `
  mutation LikeBlogPost($postId: ID!) {
    likeBlogPost(postId: $postId)
  }
`;

const UNLIKE_BLOG_POST_MUTATION = `
  mutation UnlikeBlogPost($postId: ID!) {
    unlikeBlogPost(postId: $postId)
  }
`;

const BOOKMARK_BLOG_POST_MUTATION = `
  mutation BookmarkBlogPost($postId: ID!) {
    bookmarkBlogPost(postId: $postId)
  }
`;

const UNBOOKMARK_BLOG_POST_MUTATION = `
  mutation UnbookmarkBlogPost($postId: ID!) {
    unbookmarkBlogPost(postId: $postId)
  }
`;

const SHARE_BLOG_POST_MUTATION = `
  mutation ShareBlogPost($postId: ID!, $content: String) {
    shareBlogPost(postId: $postId, content: $content)
  }
`;

const CREATE_BLOG_COMMENT_MUTATION = `
  mutation CreateBlogComment($input: CreateBlogCommentInput!) {
    createBlogComment(input: $input) {
      id
      content
      authorId
      postId
      parentId
      likeCount
      isLiked
      createdAt
      updatedAt
      author {
        id
        name
        avatar
        role
      }
    }
  }
`;

const UPDATE_BLOG_COMMENT_MUTATION = `
  mutation UpdateBlogComment($input: UpdateBlogCommentInput!) {
    updateBlogComment(input: $input) {
      id
      content
      authorId
      postId
      parentId
      likeCount
      isLiked
      createdAt
      updatedAt
      author {
        id
        name
        avatar
        role
      }
    }
  }
`;

const DELETE_BLOG_COMMENT_MUTATION = `
  mutation DeleteBlogComment($id: ID!) {
    deleteBlogComment(id: $id)
  }
`;

const LIKE_BLOG_COMMENT_MUTATION = `
  mutation LikeBlogComment($commentId: ID!) {
    likeBlogComment(commentId: $commentId)
  }
`;

const UNLIKE_BLOG_COMMENT_MUTATION = `
  mutation UnlikeBlogComment($commentId: ID!) {
    unlikeBlogComment(commentId: $commentId)
  }
`;

// Service Functions
export async function getBlogPosts(
  pagination?: PaginationInput,
  filters?: BlogFiltersInput,
  sort?: BlogSortInput
): Promise<BlogPage> {
  try {
    const { data } = await apolloClient.query({
      query: GET_BLOG_POSTS_QUERY,
      variables: { pagination, filters, sort },
      fetchPolicy: 'cache-first',
    });
    return data.getBlogPosts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost> {
  try {
    const { data } = await apolloClient.query({
      query: GET_BLOG_POST_BY_ID_QUERY,
      variables: { id },
      fetchPolicy: 'cache-first',
    });
    return data.getBlogPostById;
  } catch (error) {
    console.error('Error fetching blog post by ID:', error);
    throw error;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  try {
    const { data } = await apolloClient.query({
      query: GET_BLOG_POST_BY_SLUG_QUERY,
      variables: { slug },
      fetchPolicy: 'cache-first',
    });
    return data.getBlogPostBySlug;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    throw error;
  }
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const { data } = await apolloClient.query({
      query: GET_BLOG_CATEGORIES_QUERY,
      fetchPolicy: 'cache-first',
    });
    return data.getBlogCategories;
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    throw error;
  }
}

export async function getFeaturedBlogPosts(limit?: number): Promise<BlogPost[]> {
  try {
    const { data } = await apolloClient.query({
      query: GET_FEATURED_BLOG_POSTS_QUERY,
      variables: { limit },
      fetchPolicy: 'cache-first',
    });
    return data.getFeaturedBlogPosts;
  } catch (error) {
    console.error('Error fetching featured blog posts:', error);
    throw error;
  }
}

export async function createBlogPost(input: CreateBlogPostInput): Promise<BlogPost> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_BLOG_POST_MUTATION,
      variables: { input },
    });
    return data.createBlogPost;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
}

export async function updateBlogPost(input: UpdateBlogPostInput): Promise<BlogPost> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_BLOG_POST_MUTATION,
      variables: { input },
    });
    return data.updateBlogPost;
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_BLOG_POST_MUTATION,
      variables: { id },
    });
    return data.deleteBlogPost;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
}

export async function likeBlogPost(postId: string): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: LIKE_BLOG_POST_MUTATION,
      variables: { postId },
    });
    return data.likeBlogPost;
  } catch (error) {
    console.error('Error liking blog post:', error);
    throw error;
  }
}

export async function unlikeBlogPost(postId: string): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UNLIKE_BLOG_POST_MUTATION,
      variables: { postId },
    });
    return data.unlikeBlogPost;
  } catch (error) {
    console.error('Error unliking blog post:', error);
    throw error;
  }
}

export async function bookmarkBlogPost(postId: string): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: BOOKMARK_BLOG_POST_MUTATION,
      variables: { postId },
    });
    return data.bookmarkBlogPost;
  } catch (error) {
    console.error('Error bookmarking blog post:', error);
    throw error;
  }
}

export async function unbookmarkBlogPost(postId: string): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UNBOOKMARK_BLOG_POST_MUTATION,
      variables: { postId },
    });
    return data.unbookmarkBlogPost;
  } catch (error) {
    console.error('Error unbookmarking blog post:', error);
    throw error;
  }
}

export async function shareBlogPost(postId: string, content?: string): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: SHARE_BLOG_POST_MUTATION,
      variables: { postId, content },
    });
    return data.shareBlogPost;
  } catch (error) {
    console.error('Error sharing blog post:', error);
    throw error;
  }
}

export async function createBlogComment(input: CreateBlogCommentInput): Promise<BlogComment> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_BLOG_COMMENT_MUTATION,
      variables: { input },
    });
    return data.createBlogComment;
  } catch (error) {
    console.error('Error creating blog comment:', error);
    throw error;
  }
}

export async function updateBlogComment(input: UpdateBlogCommentInput): Promise<BlogComment> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_BLOG_COMMENT_MUTATION,
      variables: { input },
    });
    return data.updateBlogComment;
  } catch (error) {
    console.error('Error updating blog comment:', error);
    throw error;
  }
}

export async function deleteBlogComment(id: string): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_BLOG_COMMENT_MUTATION,
      variables: { id },
    });
    return data.deleteBlogComment;
  } catch (error) {
    console.error('Error deleting blog comment:', error);
    throw error;
  }
}

export async function likeBlogComment(commentId: string): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: LIKE_BLOG_COMMENT_MUTATION,
      variables: { commentId },
    });
    return data.likeBlogComment;
  } catch (error) {
    console.error('Error liking blog comment:', error);
    throw error;
  }
}

export async function unlikeBlogComment(commentId: string): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UNLIKE_BLOG_COMMENT_MUTATION,
      variables: { commentId },
    });
    return data.unlikeBlogComment;
  } catch (error) {
    console.error('Error unliking blog comment:', error);
    throw error;
  }
}
