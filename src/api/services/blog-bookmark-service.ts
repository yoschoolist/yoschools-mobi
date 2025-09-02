import { gql } from '@apollo/client';

// ========== TYPES ==========
export interface BlogBookmarkUserProfile {
  name?: string;
  avatar?: string;
}

export interface BlogBookmarkUser {
  id: string;
  email: string;
  profile?: BlogBookmarkUserProfile;
}

export interface BlogBookmarkBlogAuthor extends BlogBookmarkUser {}

export interface BlogBookmarkBlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface BlogBookmarkBlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogBookmarkBlog {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  imageUrl?: string;
  author: BlogBookmarkBlogAuthor;
  categories: BlogBookmarkBlogCategory[];
  tags: BlogBookmarkBlogTag[];
}

export interface BlogBookmark {
  id: string;
  userId: string;
  blogId: string;
  createdAt: string;
  user: BlogBookmarkUser;
  blog: BlogBookmarkBlog;
}

// ========== GRAPHQL ==========
const BLOG_BOOKMARK_FRAGMENT = gql`
  fragment BlogBookmarkFragment on BlogBookmark {
    id
    userId
    blogId
    createdAt
    user {
      id
      email
      profile {
        name
        avatar
      }
    }
    blog {
      id
      title
      slug
      excerpt
      imageUrl
      author {
        id
        email
        profile {
          name
          avatar
        }
      }
      categories { id name slug }
      tags { id name slug }
    }
  }
`;

const GET_USER_BLOG_BOOKMARKS_QUERY = gql`
  ${BLOG_BOOKMARK_FRAGMENT}
  query GetUserBlogBookmarks($skip: Int, $take: Int) {
    getUserBlogBookmarks(skip: $skip, take: $take) {
      ...BlogBookmarkFragment
    }
  }
`;

const TOGGLE_BLOG_BOOKMARK_MUTATION = gql`
  mutation ToggleBlogBookmark($blogId: ID!) {
    toggleBlogBookmark(blogId: $blogId)
  }
`;

// ========== MOCK ==========
const mockBookmarks: BlogBookmark[] = [
  {
    id: 'bb_1',
    userId: 'user_1',
    blogId: 'post_1',
    createdAt: new Date().toISOString(),
    user: { id: 'user_1', email: 'user@example.com', profile: { name: 'User', avatar: undefined } },
    blog: {
      id: 'post_1',
      title: 'Welcome to YoSchools',
      slug: 'welcome-to-yoschools',
      excerpt: 'An introduction to the platform',
      imageUrl: undefined,
      author: { id: 'author_1', email: 'author@example.com', profile: { name: 'Author' } },
      categories: [{ id: 'c1', name: 'News', slug: 'news' }],
      tags: [{ id: 't1', name: 'intro', slug: 'intro' }]
    }
  }
];

// ========== API ==========
export async function getUserBlogBookmarks(
  skip: number = 0,
  take: number = 20,
  accessToken?: string
): Promise<BlogBookmark[]> {
  try {
    // TODO: Wire to apolloClient when backend is available
    // const { data } = await apolloClient.query({
    //   query: GET_USER_BLOG_BOOKMARKS_QUERY,
    //   variables: { skip, take },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first',
    // });
    // return data.getUserBlogBookmarks;
    return mockBookmarks.slice(skip, Math.min(mockBookmarks.length, skip + take));
  } catch (err) {
    console.error('Error fetching blog bookmarks:', err);
    return mockBookmarks;
  }
}

export async function toggleBlogBookmark(blogId: string, accessToken?: string): Promise<boolean> {
  try {
    // TODO: Wire to apolloClient
    // const { data } = await apolloClient.mutate({
    //   mutation: TOGGLE_BLOG_BOOKMARK_MUTATION,
    //   variables: { blogId },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    // });
    // return !!data.toggleBlogBookmark;
    return true;
  } catch (err) {
    console.error('Error toggling blog bookmark:', err);
    return false;
  }
}


