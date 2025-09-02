import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  getBlogPosts, 
  getBlogPostById, 
  getBlogPostBySlug,
  getBlogCategories,
  getFeaturedBlogPosts,
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost, 
  likeBlogPost, 
  unlikeBlogPost, 
  bookmarkBlogPost, 
  unbookmarkBlogPost, 
  shareBlogPost,
  createBlogComment, 
  updateBlogComment, 
  deleteBlogComment, 
  likeBlogComment, 
  unlikeBlogComment,
  type PaginationInput,
  type BlogFiltersInput,
  type BlogSortInput,
  type CreateBlogPostInput,
  type UpdateBlogPostInput,
  type CreateBlogCommentInput,
  type UpdateBlogCommentInput
} from './blog-service';
import { 
  getAllPosts, 
  getFeaturedPosts, 
  getPostById as getMockPostById,
  getPostBySlug as getMockPostBySlug,
  mockCategories 
} from './mock-blog-data';

// Get blog posts with pagination and filters
export const useBlogPosts = (
  pagination?: PaginationInput,
  filters?: BlogFiltersInput,
  sort?: BlogSortInput
) => {
  return useQuery({
    queryKey: ['blogPosts', pagination, filters, sort],
    queryFn: async () => {
      try {
        return await getBlogPosts(pagination, filters, sort);
      } catch (error) {
        // Fallback to mock data if API fails
        console.log('Using mock blog posts data');
        const allPosts = getAllPosts();
        const page = pagination?.page || 1;
        const limit = pagination?.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const items = allPosts.slice(startIndex, endIndex);
        
        return {
          items,
          totalCount: allPosts.length,
          hasMore: endIndex < allPosts.length,
          page,
          limit,
        };
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1,
  });
};

// Get a single blog post by ID
export const useBlogPost = (id: string) => {
  return useQuery({
    queryKey: ['blogPost', id],
    queryFn: () => getBlogPostById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: !!id,
  });
};

// Get a single blog post by slug
export const useBlogPostBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['blogPostBySlug', slug],
    queryFn: () => getBlogPostBySlug(slug),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: !!slug,
  });
};

// Get blog categories
export const useBlogCategories = () => {
  return useQuery({
    queryKey: ['blogCategories'],
    queryFn: async () => {
      try {
        return await getBlogCategories();
      } catch (error) {
        // Fallback to mock data if API fails
        console.log('Using mock blog categories data');
        return mockCategories;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
};

// Get featured blog posts
export const useFeaturedBlogPosts = (limit?: number) => {
  return useQuery({
    queryKey: ['featuredBlogPosts', limit],
    queryFn: async () => {
      try {
        return await getFeaturedBlogPosts(limit);
      } catch (error) {
        // Fallback to mock data if API fails
        console.log('Using mock featured blog posts data');
        const featuredPosts = getFeaturedPosts();
        return limit ? featuredPosts.slice(0, limit) : featuredPosts;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

// Create blog post
export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (input: CreateBlogPostInput) => createBlogPost(input),
    onSuccess: () => {
      // Invalidate blog posts queries
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['featuredBlogPosts'] });
    },
  });
};

// Update blog post
export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (input: UpdateBlogPostInput) => updateBlogPost(input),
    onSuccess: (data) => {
      // Invalidate specific blog post and list queries
      queryClient.invalidateQueries({ queryKey: ['blogPost', data.id] });
      queryClient.invalidateQueries({ queryKey: ['blogPostBySlug', data.slug] });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['featuredBlogPosts'] });
    },
  });
};

// Delete blog post
export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      // Invalidate blog posts queries
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['featuredBlogPosts'] });
    },
  });
};

// Like blog post
export const useLikeBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: likeBlogPost,
    onSuccess: (_, postId) => {
      // Invalidate specific blog post and list queries
      queryClient.invalidateQueries({ queryKey: ['blogPost', postId] });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['featuredBlogPosts'] });
    },
  });
};

// Unlike blog post
export const useUnlikeBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: unlikeBlogPost,
    onSuccess: (_, postId) => {
      // Invalidate specific blog post and list queries
      queryClient.invalidateQueries({ queryKey: ['blogPost', postId] });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['featuredBlogPosts'] });
    },
  });
};

// Bookmark blog post
export const useBookmarkBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: bookmarkBlogPost,
    onSuccess: (_, postId) => {
      // Invalidate specific blog post and list queries
      queryClient.invalidateQueries({ queryKey: ['blogPost', postId] });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
  });
};

// Unbookmark blog post
export const useUnbookmarkBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: unbookmarkBlogPost,
    onSuccess: (_, postId) => {
      // Invalidate specific blog post and list queries
      queryClient.invalidateQueries({ queryKey: ['blogPost', postId] });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
  });
};

// Share blog post
export const useShareBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ postId, content }: { postId: string; content?: string }) => 
      shareBlogPost(postId, content),
    onSuccess: (_, { postId }) => {
      // Invalidate specific blog post and list queries
      queryClient.invalidateQueries({ queryKey: ['blogPost', postId] });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
  });
};

// Create blog comment
export const useCreateBlogComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (input: CreateBlogCommentInput) => createBlogComment(input),
    onSuccess: (_, { postId }) => {
      // Invalidate specific blog post and list queries
      queryClient.invalidateQueries({ queryKey: ['blogPost', postId] });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
  });
};

// Update blog comment
export const useUpdateBlogComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (input: UpdateBlogCommentInput) => updateBlogComment(input),
    onSuccess: (data) => {
      // Invalidate specific blog post queries
      queryClient.invalidateQueries({ queryKey: ['blogPost', data.postId] });
    },
  });
};

// Delete blog comment
export const useDeleteBlogComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteBlogComment,
    onSuccess: () => {
      // Invalidate blog post queries
      queryClient.invalidateQueries({ queryKey: ['blogPost'] });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
  });
};

// Like blog comment
export const useLikeBlogComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: likeBlogComment,
    onSuccess: () => {
      // Invalidate blog post queries
      queryClient.invalidateQueries({ queryKey: ['blogPost'] });
    },
  });
};

// Unlike blog comment
export const useUnlikeBlogComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: unlikeBlogComment,
    onSuccess: () => {
      // Invalidate blog post queries
      queryClient.invalidateQueries({ queryKey: ['blogPost'] });
    },
  });
};
