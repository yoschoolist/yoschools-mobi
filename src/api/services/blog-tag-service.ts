import { gql } from '@apollo/client';

// ========== TYPES ==========
export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  postCount: number;
  displayName: string;
  url: string;
  colorClass?: string;
  popularity?: 'high' | 'medium' | 'low' | 'minimal';
  hasPublishedPosts?: boolean;
}

export interface CreateBlogTagInput { name: string; slug: string }
export interface UpdateBlogTagInput { name?: string; slug?: string }

// ========== GRAPHQL ==========
const BLOG_TAG_FRAGMENT = gql`
  fragment BlogTagFragment on BlogTag {
    id
    name
    slug
    createdAt
    updatedAt
    postCount
    displayName
    url
    colorClass
    popularity
    hasPublishedPosts
  }
`;

const GET_BLOG_TAGS_QUERY = gql`
  ${BLOG_TAG_FRAGMENT}
  query GetBlogTags { getBlogTags { ...BlogTagFragment } }
`;

const GET_BLOG_TAG_QUERY = gql`
  ${BLOG_TAG_FRAGMENT}
  query GetBlogTag($id: String!) { getBlogTag(id: $id) { ...BlogTagFragment } }
`;

const GET_BLOG_TAG_BY_SLUG_QUERY = gql`
  ${BLOG_TAG_FRAGMENT}
  query GetBlogTagBySlug($slug: String!) { getBlogTagBySlug(slug: $slug) { ...BlogTagFragment } }
`;

const CREATE_BLOG_TAG_MUTATION = gql`
  ${BLOG_TAG_FRAGMENT}
  mutation CreateBlogTag($input: CreateBlogTagInput!) { createBlogTag(input: $input) { ...BlogTagFragment } }
`;

const UPDATE_BLOG_TAG_MUTATION = gql`
  ${BLOG_TAG_FRAGMENT}
  mutation UpdateBlogTag($id: String!, $input: UpdateBlogTagInput!) { updateBlogTag(id: $id, input: $input) { ...BlogTagFragment } }
`;

const DELETE_BLOG_TAG_MUTATION = gql`
  mutation RemoveBlogTag($id: String!) { removeBlogTag(id: $id) { id name slug } }
`;

// ========== MOCK ==========
const mockTags: BlogTag[] = [
  {
    id: 'tag_1',
    name: 'news',
    slug: 'news',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    postCount: 5,
    displayName: '#news',
    url: '/blog/tag/news',
    colorClass: 'bg-blue-100 text-blue-800',
    popularity: 'high',
    hasPublishedPosts: true
  }
];

// ========== API ==========
export async function getBlogTags(accessToken?: string): Promise<BlogTag[]> {
  try {
    // const { data } = await apolloClient.query({ query: GET_BLOG_TAGS_QUERY, ... })
    return mockTags;
  } catch (err) {
    console.error('Error fetching blog tags:', err);
    return mockTags;
  }
}

export async function getBlogTag(id: string, accessToken?: string): Promise<BlogTag | null> {
  try {
    return mockTags.find(t => t.id === id) || null;
  } catch (err) {
    console.error('Error fetching blog tag:', err);
    return null;
  }
}

export async function getBlogTagBySlug(slug: string, accessToken?: string): Promise<BlogTag | null> {
  try {
    return mockTags.find(t => t.slug === slug) || null;
  } catch (err) {
    console.error('Error fetching blog tag by slug:', err);
    return null;
  }
}

export async function createBlogTag(input: CreateBlogTagInput, accessToken: string): Promise<BlogTag> {
  try {
    return { ...mockTags[0], id: 'new', name: input.name, slug: input.slug, displayName: `#${input.name}`, url: `/blog/tag/${input.slug}` };
  } catch (err) {
    console.error('Error creating blog tag:', err);
    throw err;
  }
}

export async function updateBlogTag(id: string, input: UpdateBlogTagInput, accessToken: string): Promise<BlogTag> {
  try {
    const existing = mockTags.find(t => t.id === id) || mockTags[0];
    return { ...existing, ...input, updatedAt: new Date().toISOString() };
  } catch (err) {
    console.error('Error updating blog tag:', err);
    throw err;
  }
}

export async function deleteBlogTag(id: string, accessToken: string): Promise<{ id: string; name: string; slug: string }> {
  try {
    const existing = mockTags.find(t => t.id === id) || mockTags[0];
    return { id: existing.id, name: existing.name, slug: existing.slug };
  } catch (err) {
    console.error('Error deleting blog tag:', err);
    throw err;
  }
}


