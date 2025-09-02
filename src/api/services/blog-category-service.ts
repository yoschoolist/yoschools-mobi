import { gql } from '@apollo/client';

// ========== TYPES ==========
export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  postCount: number;
  hasPublishedPosts: boolean;
  displayName: string;
  url: string;
}

export interface CreateBlogCategoryInput {
  name: string;
  slug: string;
  description?: string;
}

export interface UpdateBlogCategoryInput {
  name?: string;
  slug?: string;
  description?: string;
}

// ========== GRAPHQL ==========
const BLOG_CATEGORY_FRAGMENT = gql`
  fragment BlogCategoryFragment on BlogCategory {
    id
    name
    slug
    description
    createdAt
    updatedAt
    postCount
    hasPublishedPosts
    displayName
    url
  }
`;

const GET_BLOG_CATEGORIES_QUERY = gql`
  ${BLOG_CATEGORY_FRAGMENT}
  query GetBlogCategories {
    getBlogCategories { ...BlogCategoryFragment }
  }
`;

const GET_BLOG_CATEGORY_QUERY = gql`
  ${BLOG_CATEGORY_FRAGMENT}
  query GetBlogCategory($id: String!) {
    getBlogCategory(id: $id) { ...BlogCategoryFragment }
  }
`;

const GET_BLOG_CATEGORY_BY_SLUG_QUERY = gql`
  ${BLOG_CATEGORY_FRAGMENT}
  query GetBlogCategoryBySlug($slug: String!) {
    getBlogCategoryBySlug(slug: $slug) { ...BlogCategoryFragment }
  }
`;

const CREATE_BLOG_CATEGORY_MUTATION = gql`
  ${BLOG_CATEGORY_FRAGMENT}
  mutation CreateBlogCategory($input: CreateBlogCategoryInput!) {
    createBlogCategory(input: $input) { ...BlogCategoryFragment }
  }
`;

const UPDATE_BLOG_CATEGORY_MUTATION = gql`
  ${BLOG_CATEGORY_FRAGMENT}
  mutation UpdateBlogCategory($id: String!, $input: UpdateBlogCategoryInput!) {
    updateBlogCategory(id: $id, input: $input) { ...BlogCategoryFragment }
  }
`;

const DELETE_BLOG_CATEGORY_MUTATION = gql`
  mutation RemoveBlogCategory($id: String!) {
    removeBlogCategory(id: $id) { id name slug }
  }
`;

// ========== MOCK ==========
const mockCategories: BlogCategory[] = [
  {
    id: 'cat_1',
    name: 'Announcements',
    slug: 'announcements',
    description: 'Latest platform updates',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    postCount: 3,
    hasPublishedPosts: true,
    displayName: 'Announcements',
    url: '/blog/category/announcements'
  }
];

// ========== API ==========
export async function getBlogCategories(accessToken?: string): Promise<BlogCategory[]> {
  try {
    // TODO: Wire to apolloClient
    // const { data } = await apolloClient.query({
    //   query: GET_BLOG_CATEGORIES_QUERY,
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all', fetchPolicy: 'cache-first'
    // });
    // return data.getBlogCategories;
    return mockCategories;
  } catch (err) {
    console.error('Error fetching blog categories:', err);
    return mockCategories;
  }
}

export async function getBlogCategory(id: string, accessToken?: string): Promise<BlogCategory | null> {
  try {
    // const { data } = await apolloClient.query({ query: GET_BLOG_CATEGORY_QUERY, variables: { id }, ... })
    return mockCategories.find(c => c.id === id) || null;
  } catch (err) {
    console.error('Error fetching blog category:', err);
    return null;
  }
}

export async function getBlogCategoryBySlug(slug: string, accessToken?: string): Promise<BlogCategory | null> {
  try {
    // const { data } = await apolloClient.query({ query: GET_BLOG_CATEGORY_BY_SLUG_QUERY, variables: { slug }, ... })
    return mockCategories.find(c => c.slug === slug) || null;
  } catch (err) {
    console.error('Error fetching blog category by slug:', err);
    return null;
  }
}

export async function createBlogCategory(input: CreateBlogCategoryInput, accessToken: string): Promise<BlogCategory> {
  try {
    // const { data } = await apolloClient.mutate({ mutation: CREATE_BLOG_CATEGORY_MUTATION, variables: { input }, ... })
    return { ...mockCategories[0], id: 'new', ...input, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), postCount: 0, hasPublishedPosts: false, displayName: input.name, url: `/blog/category/${input.slug}` };
  } catch (err) {
    console.error('Error creating blog category:', err);
    throw err;
  }
}

export async function updateBlogCategory(id: string, input: UpdateBlogCategoryInput, accessToken: string): Promise<BlogCategory> {
  try {
    // const { data } = await apolloClient.mutate({ mutation: UPDATE_BLOG_CATEGORY_MUTATION, variables: { id, input }, ... })
    const existing = mockCategories.find(c => c.id === id) || mockCategories[0];
    return { ...existing, ...input, updatedAt: new Date().toISOString() };
  } catch (err) {
    console.error('Error updating blog category:', err);
    throw err;
  }
}

export async function deleteBlogCategory(id: string, accessToken: string): Promise<{ id: string; name: string; slug: string }> {
  try {
    // const { data } = await apolloClient.mutate({ mutation: DELETE_BLOG_CATEGORY_MUTATION, variables: { id }, ... })
    const existing = mockCategories.find(c => c.id === id) || mockCategories[0];
    return { id: existing.id, name: existing.name, slug: existing.slug };
  } catch (err) {
    console.error('Error deleting blog category:', err);
    throw err;
  }
}


