import { gql } from '@apollo/client';

// ========== TYPES ==========
export enum CategoryType {
  EDUCATION_LEVEL = 'EDUCATION_LEVEL',
  SUBJECT = 'SUBJECT',
  SKILL_LEVEL = 'SKILL_LEVEL',
  ACTIVITY_TYPE = 'ACTIVITY_TYPE'
}

// ========== INTERFACES ==========
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  type: CategoryType;
  order?: number;
  color?: string;
  icon?: string;
  gradeNumber?: number;
  gradeName?: string;
  ageRange?: string;
  isActive: boolean;
  listingCount: number;
  followerCount: number;
  createdAt: string;
  updatedAt: string;
  parent?: Category;
  children?: Category[];
  followers?: any[];
}

export interface CreateCategoryInput {
  name: string;
  slug: string;
  description?: string;
  type: CategoryType;
  order?: number;
  color?: string;
  icon?: string;
  parentId?: string;
  gradeNumber?: number;
  gradeName?: string;
  ageRange?: string;
}

export interface UpdateCategoryInput {
  name?: string;
  slug?: string;
  description?: string;
  type?: CategoryType;
  order?: number;
  color?: string;
  icon?: string;
  parentId?: string;
  gradeNumber?: number;
  gradeName?: string;
  ageRange?: string;
  isActive?: boolean;
}

export interface CategoryFilterInput {
  type?: CategoryType;
  isActive?: boolean;
  parentId?: string;
}

export interface CategoryOrderByInput {
  order?: 'asc' | 'desc';
  name?: 'asc' | 'desc';
  createdAt?: 'asc' | 'desc';
}

// ========== GRAPHQL FRAGMENTS ==========
const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on Category {
    id
    name
    slug
    description
    type
    order
    color
    icon
    gradeNumber
    gradeName
    ageRange
    isActive
    listingCount
    followerCount
    createdAt
    updatedAt
    parent {
      id
      name
      slug
      type
    }
    children {
      id
      name
      slug
      type
    }
    followers {
      id
      userId
    }
  }
`;

// ========== GRAPHQL QUERIES ==========
const GET_CATEGORIES_QUERY = gql`
  ${CATEGORY_FRAGMENT}
  query GetCategories(
    $filter: CategoryFilterInput
    $orderBy: CategoryOrderByInput
    $take: Int
    $skip: Int
  ) {
    getCategories(
      filter: $filter
      orderBy: $orderBy
      take: $take
      skip: $skip
    ) {
      ...CategoryFragment
    }
  }
`;

const GET_CATEGORY_QUERY = gql`
  ${CATEGORY_FRAGMENT}
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      ...CategoryFragment
    }
  }
`;

const GET_CATEGORY_BY_SLUG_QUERY = gql`
  ${CATEGORY_FRAGMENT}
  query GetCategoryBySlug($slug: String!) {
    getCategoryBySlug(slug: $slug) {
      ...CategoryFragment
    }
  }
`;

const GET_CATEGORY_HIERARCHY_QUERY = gql`
  ${CATEGORY_FRAGMENT}
  query GetCategoryHierarchy {
    getCategoryHierarchy {
      ...CategoryFragment
    }
  }
`;

// ========== GRAPHQL MUTATIONS ==========
const CREATE_CATEGORY_MUTATION = gql`
  ${CATEGORY_FRAGMENT}
  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      ...CategoryFragment
    }
  }
`;

const UPDATE_CATEGORY_MUTATION = gql`
  ${CATEGORY_FRAGMENT}
  mutation UpdateCategory($id: ID!, $updateCategoryInput: UpdateCategoryInput!) {
    updateCategory(id: $id, updateCategoryInput: $updateCategoryInput) {
      ...CategoryFragment
    }
  }
`;

const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($id: ID!) {
    removeCategory(id: $id) {
      id
      name
      slug
    }
  }
`;

// ========== UTILITY FUNCTIONS ==========
export function getCategoryTypeLabel(type: CategoryType): string {
  const labels: Record<CategoryType, string> = {
    [CategoryType.EDUCATION_LEVEL]: 'Education Level',
    [CategoryType.SUBJECT]: 'Subject',
    [CategoryType.SKILL_LEVEL]: 'Skill Level',
    [CategoryType.ACTIVITY_TYPE]: 'Activity Type'
  };
  return labels[type] || type;
}

export function getCategoryTypeIcon(type: CategoryType): string {
  const icons: Record<CategoryType, string> = {
    [CategoryType.EDUCATION_LEVEL]: '🎓',
    [CategoryType.SUBJECT]: '📚',
    [CategoryType.SKILL_LEVEL]: '⭐',
    [CategoryType.ACTIVITY_TYPE]: '🎯'
  };
  return icons[type] || '📁';
}

export function getCategoryColor(type: CategoryType): string {
  const colors: Record<CategoryType, string> = {
    [CategoryType.EDUCATION_LEVEL]: '#3B82F6', // Blue
    [CategoryType.SUBJECT]: '#10B981', // Green
    [CategoryType.SKILL_LEVEL]: '#F59E0B', // Yellow
    [CategoryType.ACTIVITY_TYPE]: '#EF4444' // Red
  };
  return colors[type] || '#6B7280'; // Gray
}

export function formatCategoryName(category: Category): string {
  if (category.gradeName) {
    return `${category.name} (${category.gradeName})`;
  }
  if (category.ageRange) {
    return `${category.name} (${category.ageRange})`;
  }
  return category.name;
}

export function getCategoryPath(category: Category): string {
  const path: string[] = [];
  let current: Category | undefined = category;
  
  while (current) {
    path.unshift(current.name);
    current = current.parent;
  }
  
  return path.join(' > ');
}

// ========== MOCK DATA ==========
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Primary Education',
    slug: 'primary-education',
    description: 'Elementary and primary school education',
    type: CategoryType.EDUCATION_LEVEL,
    order: 1,
    color: '#3B82F6',
    icon: '🎓',
    ageRange: '5-11 years',
    isActive: true,
    listingCount: 150,
    followerCount: 25,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    children: [
      {
        id: '2',
        name: 'Grade 1',
        slug: 'grade-1',
        type: CategoryType.EDUCATION_LEVEL,
        gradeNumber: 1,
        gradeName: 'Grade 1',
        ageRange: '5-6 years',
        isActive: true,
        listingCount: 30,
        followerCount: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Grade 2',
        slug: 'grade-2',
        type: CategoryType.EDUCATION_LEVEL,
        gradeNumber: 2,
        gradeName: 'Grade 2',
        ageRange: '6-7 years',
        isActive: true,
        listingCount: 28,
        followerCount: 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  },
  {
    id: '4',
    name: 'Secondary Education',
    slug: 'secondary-education',
    description: 'High school and secondary education',
    type: CategoryType.EDUCATION_LEVEL,
    order: 2,
    color: '#3B82F6',
    icon: '🎓',
    ageRange: '12-18 years',
    isActive: true,
    listingCount: 200,
    followerCount: 35,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    children: [
      {
        id: '5',
        name: 'Junior Secondary',
        slug: 'junior-secondary',
        type: CategoryType.EDUCATION_LEVEL,
        ageRange: '12-15 years',
        isActive: true,
        listingCount: 100,
        followerCount: 18,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '6',
        name: 'Senior Secondary',
        slug: 'senior-secondary',
        type: CategoryType.EDUCATION_LEVEL,
        ageRange: '15-18 years',
        isActive: true,
        listingCount: 100,
        followerCount: 17,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  },
  {
    id: '7',
    name: 'Mathematics',
    slug: 'mathematics',
    description: 'Mathematics and related subjects',
    type: CategoryType.SUBJECT,
    order: 1,
    color: '#10B981',
    icon: '📚',
    isActive: true,
    listingCount: 75,
    followerCount: 20,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Science',
    slug: 'science',
    description: 'Science subjects including Physics, Chemistry, Biology',
    type: CategoryType.SUBJECT,
    order: 2,
    color: '#10B981',
    icon: '📚',
    isActive: true,
    listingCount: 60,
    followerCount: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '9',
    name: 'Beginner',
    slug: 'beginner',
    description: 'Beginner level courses and programs',
    type: CategoryType.SKILL_LEVEL,
    order: 1,
    color: '#F59E0B',
    icon: '⭐',
    isActive: true,
    listingCount: 40,
    followerCount: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '10',
    name: 'Advanced',
    slug: 'advanced',
    description: 'Advanced level courses and programs',
    type: CategoryType.SKILL_LEVEL,
    order: 3,
    color: '#F59E0B',
    icon: '⭐',
    isActive: true,
    listingCount: 25,
    followerCount: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '11',
    name: 'Sports',
    slug: 'sports',
    description: 'Sports and physical activities',
    type: CategoryType.ACTIVITY_TYPE,
    order: 1,
    color: '#EF4444',
    icon: '🎯',
    isActive: true,
    listingCount: 35,
    followerCount: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '12',
    name: 'Arts & Crafts',
    slug: 'arts-crafts',
    description: 'Creative arts and craft activities',
    type: CategoryType.ACTIVITY_TYPE,
    order: 2,
    color: '#EF4444',
    icon: '🎯',
    isActive: true,
    listingCount: 20,
    followerCount: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// ========== API FUNCTIONS ==========
export async function getCategories(
  filter?: CategoryFilterInput,
  orderBy?: CategoryOrderByInput,
  take?: number,
  skip?: number,
  accessToken?: string
): Promise<Category[]> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_CATEGORIES_QUERY,
    //   variables: { filter, orderBy, take, skip },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getCategories || [];
    
    // Return mock data for now
    let filteredCategories = [...mockCategories];
    
    if (filter) {
      if (filter.type) {
        filteredCategories = filteredCategories.filter(category => category.type === filter.type);
      }
      
      if (filter.isActive !== undefined) {
        filteredCategories = filteredCategories.filter(category => category.isActive === filter.isActive);
      }
      
      if (filter.parentId !== undefined) {
        if (filter.parentId === null) {
          // Get root categories (no parent)
          filteredCategories = filteredCategories.filter(category => !category.parent);
        } else {
          // Get categories with specific parent
          filteredCategories = filteredCategories.filter(category => category.parent?.id === filter.parentId);
        }
      }
    }
    
    // Apply ordering
    if (orderBy) {
      if (orderBy.order) {
        filteredCategories.sort((a, b) => {
          const aOrder = a.order || 0;
          const bOrder = b.order || 0;
          return orderBy.order === 'asc' ? aOrder - bOrder : bOrder - aOrder;
        });
      } else if (orderBy.name) {
        filteredCategories.sort((a, b) => {
          return orderBy.name === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        });
      } else if (orderBy.createdAt) {
        filteredCategories.sort((a, b) => {
          const aDate = new Date(a.createdAt).getTime();
          const bDate = new Date(b.createdAt).getTime();
          return orderBy.createdAt === 'asc' ? aDate - bDate : bDate - aDate;
        });
      }
    }
    
    // Apply pagination
    if (skip !== undefined) {
      filteredCategories = filteredCategories.slice(skip);
    }
    if (take !== undefined) {
      filteredCategories = filteredCategories.slice(0, take);
    }
    
    return filteredCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return mockCategories;
  }
}

export async function getRootCategories(
  type?: CategoryType,
  take?: number,
  skip?: number,
  accessToken?: string
): Promise<Category[]> {
  try {
    const filter: CategoryFilterInput = { parentId: undefined, isActive: true };
    if (type) {
      filter.type = type;
    }
    
    return getCategories(filter, { order: 'asc' }, take, skip, accessToken);
  } catch (error) {
    console.error('Error fetching root categories:', error);
    return mockCategories.filter(category => !category.parent && category.isActive);
  }
}

export async function getCategory(
  id: string,
  accessToken?: string
): Promise<Category | null> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_CATEGORY_QUERY,
    //   variables: { id },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getCategory;
    
    // Return mock data for now
    return mockCategories.find(category => category.id === id) || null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

export async function getCategoryBySlug(
  slug: string,
  accessToken?: string
): Promise<Category | null> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_CATEGORY_BY_SLUG_QUERY,
    //   variables: { slug },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getCategoryBySlug;
    
    // Return mock data for now
    return mockCategories.find(category => category.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return null;
  }
}

export async function getCategoryHierarchy(
  type?: CategoryType,
  accessToken?: string
): Promise<Category[]> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_CATEGORY_HIERARCHY_QUERY,
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // let categories = data.getCategoryHierarchy || [];
    // 
    // // Filter by type if specified
    // if (type) {
    //   categories = categories.filter((category: Category) => category.type === type);
    // }
    // 
    // return categories;
    
    // Return mock data for now
    let categories = mockCategories.filter(category => !category.parent);
    
    if (type) {
      categories = categories.filter(category => category.type === type);
    }
    
    return categories;
  } catch (error) {
    console.error('Error fetching category hierarchy:', error);
    return mockCategories.filter(category => !category.parent);
  }
}

export async function getCategoriesByType(
  type: CategoryType,
  accessToken?: string
): Promise<Category[]> {
  try {
    return getCategories({ type, isActive: true }, { order: 'asc' }, undefined, undefined, accessToken);
  } catch (error) {
    console.error('Error fetching categories by type:', error);
    return mockCategories.filter(category => category.type === type && category.isActive);
  }
}

export async function getActiveCategories(accessToken?: string): Promise<Category[]> {
  try {
    return getCategories({ isActive: true }, { name: 'asc' }, undefined, undefined, accessToken);
  } catch (error) {
    console.error('Error fetching active categories:', error);
    return mockCategories.filter(category => category.isActive);
  }
}

export async function searchCategories(
  searchTerm: string,
  type?: CategoryType,
  accessToken?: string
): Promise<Category[]> {
  try {
    const filter: CategoryFilterInput = { isActive: true };
    if (type) filter.type = type;
    
    const categories = await getCategories(filter, { name: 'asc' }, undefined, undefined, accessToken);
    
    // Filter by search term
    return categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching categories:', error);
    return mockCategories.filter(category => 
      category.isActive && 
      (category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       category.description?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }
}

// ========== MUTATION FUNCTIONS ==========
export async function createCategory(
  input: CreateCategoryInput,
  accessToken: string
): Promise<Category> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: CREATE_CATEGORY_MUTATION,
    //   variables: { createCategoryInput: input },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.createCategory;
    
    throw new Error('Create category not implemented yet');
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
}

export async function updateCategory(
  id: string,
  input: UpdateCategoryInput,
  accessToken: string
): Promise<Category> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: UPDATE_CATEGORY_MUTATION,
    //   variables: { id, updateCategoryInput: input },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.updateCategory;
    
    throw new Error('Update category not implemented yet');
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
}

export async function deleteCategory(
  id: string,
  accessToken: string
): Promise<{ id: string; name: string; slug: string }> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: DELETE_CATEGORY_MUTATION,
    //   variables: { id },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.removeCategory;
    
    throw new Error('Delete category not implemented yet');
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
}
