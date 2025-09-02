import { gql } from '@apollo/client';

// ========== TYPES ==========
export enum CurriculumType {
  NATIONAL = 'NATIONAL',
  INTERNATIONAL_BACCALAUREATE = 'INTERNATIONAL_BACCALAUREATE',
  ADVANCED_PLACEMENT = 'ADVANCED_PLACEMENT',
  A_LEVEL = 'A_LEVEL',
  IGCSE = 'IGCSE',
  MONTESSORI = 'MONTESSORI',
  WALDORF = 'WALDORF',
  STEM = 'STEM',
  ARTS_FOCUSED = 'ARTS_FOCUSED',
  VOCATIONAL = 'VOCATIONAL',
  SPECIAL_NEEDS = 'SPECIAL_NEEDS',
  OTHER = 'OTHER'
}

export enum DeliveryMethod {
  IN_PERSON = 'IN_PERSON',
  ONLINE = 'ONLINE',
  HYBRID = 'HYBRID'
}

// ========== INTERFACES ==========
export interface Curriculum {
  id: string;
  name: string;
  slug: string;
  description?: string;
  type: CurriculumType;
  gradeLevels: string[];
  subjects: string[];
  accreditation?: string;
  duration?: string;
  deliveryMethod: DeliveryMethod;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  listings?: {
    id: string;
    name: string;
    slug: string;
  }[];
  campuses?: {
    id: string;
    name: string;
    slug: string;
  }[];
  categories?: {
    id: string;
    name: string;
    slug: string;
    type: string;
  }[];
  reviews?: {
    id: string;
    rating: number;
    comment: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
    };
  }[];
  courses?: {
    id: string;
    title: string;
    slug: string;
  }[];
}

export interface CreateCurriculumInput {
  name: string;
  slug: string;
  description?: string;
  type: CurriculumType;
  gradeLevels: string[];
  subjects: string[];
  accreditation?: string;
  duration?: string;
  deliveryMethod?: DeliveryMethod;
  isActive?: boolean;
}

export interface UpdateCurriculumInput {
  name?: string;
  slug?: string;
  description?: string;
  type?: CurriculumType;
  gradeLevels?: string[];
  subjects?: string[];
  accreditation?: string;
  duration?: string;
  deliveryMethod?: DeliveryMethod;
  isActive?: boolean;
}

export interface CurriculumFilter {
  search?: string;
  types?: CurriculumType[];
  isActive?: boolean;
  gradeLevels?: string[];
  subjects?: string[];
  deliveryMethod?: DeliveryMethod;
}

export interface CurriculumPagination {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CurriculumOrderBy {
  name?: 'asc' | 'desc';
  createdAt?: 'asc' | 'desc';
  type?: 'asc' | 'desc';
  isActive?: true | false;
}

export interface CurriculumsResponse {
  data: Curriculum[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface CurriculumStats {
  total: number;
  active: number;
  inactive: number;
  byType: Array<{ type: CurriculumType; count: number }>;
  popularGradeLevels: string[];
  popularSubjects: string[];
}

// ========== GRAPHQL FRAGMENTS ==========
const CURRICULUM_FRAGMENT = gql`
  fragment CurriculumFragment on Curriculum {
    id
    name
    slug
    description
    type
    gradeLevels
    subjects
    accreditation
    duration
    deliveryMethod
    isActive
    createdAt
    updatedAt
    listings {
      id
      name
      slug
    }
    campuses {
      id
      name
      slug
    }
    categories {
      id
      name
      slug
      type
    }
    reviews {
      id
      rating
      comment
      user {
        id
        firstName
        lastName
      }
    }
    courses {
      id
      title
      slug
    }
  }
`;

// ========== GRAPHQL QUERIES ==========
const GET_CURRICULUMS_QUERY = gql`
  ${CURRICULUM_FRAGMENT}
  query GetCurriculums(
    $filter: CurriculumFilterInput
    $pagination: PaginationInput
    $sort: CurriculumSortInput
  ) {
    getCurriculums(filter: $filter, pagination: $pagination, sort: $sort) {
      curriculums {
        ...CurriculumFragment
      }
      total
      page
      limit
      totalPages
      hasNext
      hasPrev
    }
  }
`;

const GET_CURRICULUM_QUERY = gql`
  ${CURRICULUM_FRAGMENT}
  query GetCurriculum($id: ID!) {
    curriculum(id: $id) {
      ...CurriculumFragment
    }
  }
`;

const GET_CURRICULUM_BY_SLUG_QUERY = gql`
  ${CURRICULUM_FRAGMENT}
  query GetCurriculumBySlug($slug: String!) {
    curriculumBySlug(slug: $slug) {
      ...CurriculumFragment
    }
  }
`;

const GET_CURRICULUM_STATS_QUERY = gql`
  query GetCurriculumStats {
    curriculumStats {
      total
      active
      inactive
      byType {
        type
        count
      }
      popularGradeLevels
      popularSubjects
    }
  }
`;

// ========== GRAPHQL MUTATIONS ==========
const CREATE_CURRICULUM_MUTATION = gql`
  ${CURRICULUM_FRAGMENT}
  mutation CreateCurriculum($createCurriculumInput: CreateCurriculumInput!) {
    createCurriculum(createCurriculumInput: $createCurriculumInput) {
      ...CurriculumFragment
    }
  }
`;

const UPDATE_CURRICULUM_MUTATION = gql`
  ${CURRICULUM_FRAGMENT}
  mutation UpdateCurriculum($id: ID!, $updateCurriculumInput: UpdateCurriculumInput!) {
    updateCurriculum(id: $id, updateCurriculumInput: $updateCurriculumInput) {
      ...CurriculumFragment
    }
  }
`;

const DELETE_CURRICULUM_MUTATION = gql`
  mutation DeleteCurriculum($id: ID!) {
    removeCurriculum(id: $id)
  }
`;

const TOGGLE_CURRICULUM_ACTIVE_MUTATION = gql`
  mutation ToggleCurriculumActive($id: ID!) {
    toggleCurriculumActive(id: $id) {
      id
      name
      isActive
      updatedAt
    }
  }
`;

// ========== UTILITY FUNCTIONS ==========
export function formatCurriculumType(type: CurriculumType): string {
  const typeMap: Record<CurriculumType, string> = {
    [CurriculumType.NATIONAL]: 'National Curriculum',
    [CurriculumType.INTERNATIONAL_BACCALAUREATE]: 'International Baccalaureate',
    [CurriculumType.ADVANCED_PLACEMENT]: 'Advanced Placement',
    [CurriculumType.A_LEVEL]: 'A-Level',
    [CurriculumType.IGCSE]: 'IGCSE',
    [CurriculumType.MONTESSORI]: 'Montessori',
    [CurriculumType.WALDORF]: 'Waldorf',
    [CurriculumType.STEM]: 'STEM',
    [CurriculumType.ARTS_FOCUSED]: 'Arts-Focused',
    [CurriculumType.VOCATIONAL]: 'Vocational',
    [CurriculumType.SPECIAL_NEEDS]: 'Special Needs',
    [CurriculumType.OTHER]: 'Other'
  };
  return typeMap[type] || type;
}

export function formatDeliveryMethod(method: DeliveryMethod): string {
  const methodMap: Record<DeliveryMethod, string> = {
    [DeliveryMethod.IN_PERSON]: 'In-Person',
    [DeliveryMethod.ONLINE]: 'Online',
    [DeliveryMethod.HYBRID]: 'Hybrid'
  };
  return methodMap[method] || method;
}

export function getCurriculumTypeColor(type: CurriculumType): string {
  const colorMap: Record<CurriculumType, string> = {
    [CurriculumType.NATIONAL]: '#3B82F6',
    [CurriculumType.INTERNATIONAL_BACCALAUREATE]: '#EF4444',
    [CurriculumType.ADVANCED_PLACEMENT]: '#10B981',
    [CurriculumType.A_LEVEL]: '#F59E0B',
    [CurriculumType.IGCSE]: '#8B5CF6',
    [CurriculumType.MONTESSORI]: '#EC4899',
    [CurriculumType.WALDORF]: '#14B8A6',
    [CurriculumType.STEM]: '#F97316',
    [CurriculumType.ARTS_FOCUSED]: '#84CC16',
    [CurriculumType.VOCATIONAL]: '#6366F1',
    [CurriculumType.SPECIAL_NEEDS]: '#06B6D4',
    [CurriculumType.OTHER]: '#6B7280'
  };
  return colorMap[type] || '#6B7280';
}

export function getCurriculumTypeIcon(type: CurriculumType): string {
  const iconMap: Record<CurriculumType, string> = {
    [CurriculumType.NATIONAL]: '🏛️',
    [CurriculumType.INTERNATIONAL_BACCALAUREATE]: '🌍',
    [CurriculumType.ADVANCED_PLACEMENT]: '🎓',
    [CurriculumType.A_LEVEL]: '📚',
    [CurriculumType.IGCSE]: '📖',
    [CurriculumType.MONTESSORI]: '🧸',
    [CurriculumType.WALDORF]: '🎨',
    [CurriculumType.STEM]: '🔬',
    [CurriculumType.ARTS_FOCUSED]: '🎭',
    [CurriculumType.VOCATIONAL]: '🔧',
    [CurriculumType.SPECIAL_NEEDS]: '♿',
    [CurriculumType.OTHER]: '📋'
  };
  return iconMap[type] || '📋';
}

export function getDeliveryMethodIcon(method: DeliveryMethod): string {
  const iconMap: Record<DeliveryMethod, string> = {
    [DeliveryMethod.IN_PERSON]: '🏫',
    [DeliveryMethod.ONLINE]: '💻',
    [DeliveryMethod.HYBRID]: '🔄'
  };
  return iconMap[method] || '📚';
}

export function formatCurriculumDuration(duration?: string): string {
  if (!duration) return 'Duration not specified';
  return duration;
}

export function formatCurriculumGradeLevels(gradeLevels: string[]): string {
  if (gradeLevels.length === 0) return 'No grade levels specified';
  if (gradeLevels.length === 1) return gradeLevels[0];
  if (gradeLevels.length === 2) return gradeLevels.join(' and ');
  return `${gradeLevels.slice(0, -1).join(', ')} and ${gradeLevels[gradeLevels.length - 1]}`;
}

export function formatCurriculumSubjects(subjects: string[]): string {
  if (subjects.length === 0) return 'No subjects specified';
  if (subjects.length === 1) return subjects[0];
  if (subjects.length === 2) return subjects.join(' and ');
  return `${subjects.slice(0, -1).join(', ')} and ${subjects[subjects.length - 1]}`;
}

// ========== MOCK DATA ==========
export const mockCurriculums: Curriculum[] = [
  {
    id: '1',
    name: 'Nigerian National Curriculum',
    slug: 'nigerian-national-curriculum',
    description: 'The official curriculum framework for Nigerian schools, covering all grade levels from primary to secondary education.',
    type: CurriculumType.NATIONAL,
    gradeLevels: ['Primary 1-6', 'JSS 1-3', 'SSS 1-3'],
    subjects: ['Mathematics', 'English Language', 'Science', 'Social Studies', 'Arts', 'Physical Education'],
    accreditation: 'Federal Ministry of Education, Nigeria',
    duration: '12 years',
    deliveryMethod: DeliveryMethod.IN_PERSON,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    listings: [
      {
        id: '1',
        name: 'University of Lagos',
        slug: 'university-of-lagos'
      }
    ],
    campuses: [
      {
        id: '1',
        name: 'Main Campus - Victoria Island',
        slug: 'main-campus-victoria-island'
      }
    ],
    categories: [
      {
        id: '1',
        name: 'Primary Education',
        slug: 'primary-education',
        type: 'EDUCATION_LEVEL'
      }
    ],
    reviews: [
      {
        id: '1',
        rating: 4,
        comment: 'Comprehensive curriculum with good coverage of essential subjects.',
        user: {
          id: '1',
          firstName: 'John',
          lastName: 'Doe'
        }
      }
    ],
    courses: [
      {
        id: '1',
        title: 'Introduction to Mathematics',
        slug: 'introduction-to-mathematics'
      }
    ]
  },
  {
    id: '2',
    name: 'International Baccalaureate (IB)',
    slug: 'international-baccalaureate',
    description: 'A rigorous, internationally recognized curriculum that prepares students for university and life beyond.',
    type: CurriculumType.INTERNATIONAL_BACCALAUREATE,
    gradeLevels: ['Primary Years Programme (PYP)', 'Middle Years Programme (MYP)', 'Diploma Programme (DP)'],
    subjects: ['Language and Literature', 'Language Acquisition', 'Individuals and Societies', 'Sciences', 'Mathematics', 'Arts'],
    accreditation: 'International Baccalaureate Organization',
    duration: '12 years',
    deliveryMethod: DeliveryMethod.HYBRID,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    listings: [
      {
        id: '2',
        name: 'Lagos State University',
        slug: 'lagos-state-university'
      }
    ],
    campuses: [
      {
        id: '2',
        name: 'Branch Campus - Ikeja',
        slug: 'branch-campus-ikeja'
      }
    ],
    categories: [
      {
        id: '2',
        name: 'Secondary Education',
        slug: 'secondary-education',
        type: 'EDUCATION_LEVEL'
      }
    ],
    reviews: [
      {
        id: '2',
        rating: 5,
        comment: 'Excellent international curriculum with strong academic focus.',
        user: {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith'
        }
      }
    ],
    courses: [
      {
        id: '2',
        title: 'Advanced Physics',
        slug: 'advanced-physics'
      }
    ]
  },
  {
    id: '3',
    name: 'Montessori Education',
    slug: 'montessori-education',
    description: 'A child-centered educational approach based on scientific observations of children from birth to adulthood.',
    type: CurriculumType.MONTESSORI,
    gradeLevels: ['Infant (0-3)', 'Primary (3-6)', 'Elementary (6-12)', 'Adolescent (12-18)'],
    subjects: ['Practical Life', 'Sensorial', 'Language', 'Mathematics', 'Cultural Studies', 'Science'],
    accreditation: 'Association Montessori Internationale (AMI)',
    duration: '18 years',
    deliveryMethod: DeliveryMethod.IN_PERSON,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    listings: [
      {
        id: '3',
        name: 'Montessori School Lagos',
        slug: 'montessori-school-lagos'
      }
    ],
    campuses: [
      {
        id: '3',
        name: 'Montessori Campus',
        slug: 'montessori-campus'
      }
    ],
    categories: [
      {
        id: '3',
        name: 'Early Childhood',
        slug: 'early-childhood',
        type: 'EDUCATION_LEVEL'
      }
    ],
    reviews: [
      {
        id: '3',
        rating: 4,
        comment: 'Great for developing independence and critical thinking skills.',
        user: {
          id: '3',
          firstName: 'Mike',
          lastName: 'Johnson'
        }
      }
    ],
    courses: [
      {
        id: '3',
        title: 'Online English Literature',
        slug: 'online-english-literature'
      }
    ]
  },
  {
    id: '4',
    name: 'STEM Focused Curriculum',
    slug: 'stem-focused-curriculum',
    description: 'A curriculum emphasizing Science, Technology, Engineering, and Mathematics with hands-on learning experiences.',
    type: CurriculumType.STEM,
    gradeLevels: ['Grade 6-12'],
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Engineering', 'Technology'],
    accreditation: 'STEM Education Coalition',
    duration: '6 years',
    deliveryMethod: DeliveryMethod.HYBRID,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    listings: [
      {
        id: '4',
        name: 'STEM Academy Lagos',
        slug: 'stem-academy-lagos'
      }
    ],
    campuses: [
      {
        id: '4',
        name: 'STEM Campus',
        slug: 'stem-campus'
      }
    ],
    categories: [
      {
        id: '4',
        name: 'Science',
        slug: 'science',
        type: 'SUBJECT'
      }
    ],
    reviews: [
      {
        id: '4',
        rating: 5,
        comment: 'Excellent preparation for STEM careers and university programs.',
        user: {
          id: '4',
          firstName: 'Sarah',
          lastName: 'Wilson'
        }
      }
    ],
    courses: []
  }
];

// ========== API FUNCTIONS ==========
export async function getCurriculums(
  filter?: CurriculumFilter,
  orderBy?: CurriculumOrderBy,
  pagination?: CurriculumPagination,
  accessToken?: string
): Promise<CurriculumsResponse> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_CURRICULUMS_QUERY,
    //   variables: { filter, pagination, sort: orderBy },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getCurriculums;
    
    // Return mock data for now
    let filteredCurriculums = [...mockCurriculums];
    
    if (filter) {
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        filteredCurriculums = filteredCurriculums.filter(curriculum =>
          curriculum.name.toLowerCase().includes(searchLower) ||
          curriculum.description?.toLowerCase().includes(searchLower)
        );
      }
      
      if (filter.types && filter.types.length > 0) {
        filteredCurriculums = filteredCurriculums.filter(curriculum =>
          filter.types!.includes(curriculum.type)
        );
      }
      
      if (filter.isActive !== undefined) {
        filteredCurriculums = filteredCurriculums.filter(curriculum =>
          curriculum.isActive === filter.isActive
        );
      }
      
      if (filter.gradeLevels && filter.gradeLevels.length > 0) {
        filteredCurriculums = filteredCurriculums.filter(curriculum =>
          curriculum.gradeLevels.some(level =>
            filter.gradeLevels!.some(filterLevel =>
              level.toLowerCase().includes(filterLevel.toLowerCase())
            )
          )
        );
      }
      
      if (filter.subjects && filter.subjects.length > 0) {
        filteredCurriculums = filteredCurriculums.filter(curriculum =>
          curriculum.subjects.some(subject =>
            filter.subjects!.some(filterSubject =>
              subject.toLowerCase().includes(filterSubject.toLowerCase())
            )
          )
        );
      }
      
      if (filter.deliveryMethod) {
        filteredCurriculums = filteredCurriculums.filter(curriculum =>
          curriculum.deliveryMethod === filter.deliveryMethod
        );
      }
    }
    
    // Apply sorting
    if (orderBy) {
      filteredCurriculums.sort((a, b) => {
        if (orderBy.name) {
          return orderBy.name === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        if (orderBy.createdAt) {
          const aDate = new Date(a.createdAt).getTime();
          const bDate = new Date(b.createdAt).getTime();
          return orderBy.createdAt === 'asc' ? aDate - bDate : bDate - aDate;
        }
        if (orderBy.type) {
          return orderBy.type === 'asc'
            ? a.type.localeCompare(b.type)
            : b.type.localeCompare(a.type);
        }
        return 0;
      });
    }
    
    const total = filteredCurriculums.length;
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    const paginatedCurriculums = filteredCurriculums.slice(skip, skip + limit);
    
    return {
      data: paginatedCurriculums,
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  } catch (error) {
    console.error('Error fetching curriculums:', error);
    return {
      data: mockCurriculums,
      total: mockCurriculums.length,
      page: 1,
      limit: 10,
      totalPages: 1,
      hasNext: false,
      hasPrev: false
    };
  }
}

export async function getCurriculum(
  id: string,
  accessToken?: string
): Promise<Curriculum | null> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_CURRICULUM_QUERY,
    //   variables: { id },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.curriculum;
    
    // Return mock data for now
    return mockCurriculums.find(curriculum => curriculum.id === id) || null;
  } catch (error) {
    console.error('Error fetching curriculum:', error);
    return null;
  }
}

export async function getCurriculumBySlug(
  slug: string,
  accessToken?: string
): Promise<Curriculum | null> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_CURRICULUM_BY_SLUG_QUERY,
    //   variables: { slug },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.curriculumBySlug;
    
    // Return mock data for now
    return mockCurriculums.find(curriculum => curriculum.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching curriculum by slug:', error);
    return null;
  }
}

export async function getCurriculumStats(accessToken?: string): Promise<CurriculumStats> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_CURRICULUM_STATS_QUERY,
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.curriculumStats;
    
    // Return mock data for now
    const total = mockCurriculums.length;
    const active = mockCurriculums.filter(c => c.isActive).length;
    const inactive = total - active;
    
    const typeCounts = mockCurriculums.reduce((acc, curriculum) => {
      acc[curriculum.type] = (acc[curriculum.type] || 0) + 1;
      return acc;
    }, {} as Record<CurriculumType, number>);
    
    const byType = Object.entries(typeCounts).map(([type, count]) => ({
      type: type as CurriculumType,
      count
    }));
    
    const allGradeLevels = mockCurriculums.flatMap(c => c.gradeLevels);
    const gradeLevelCounts = allGradeLevels.reduce((acc, level) => {
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const allSubjects = mockCurriculums.flatMap(c => c.subjects);
    const subjectCounts = allSubjects.reduce((acc, subject) => {
      acc[subject] = (acc[subject] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      total,
      active,
      inactive,
      byType,
      popularGradeLevels: Object.entries(gradeLevelCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([level]) => level),
      popularSubjects: Object.entries(subjectCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([subject]) => subject)
    };
  } catch (error) {
    console.error('Error fetching curriculum stats:', error);
    return {
      total: 0,
      active: 0,
      inactive: 0,
      byType: [],
      popularGradeLevels: [],
      popularSubjects: []
    };
  }
}

// ========== UTILITY API FUNCTIONS ==========
export async function getCurriculumsByType(
  type: CurriculumType,
  accessToken?: string
): Promise<Curriculum[]> {
  try {
    const response = await getCurriculums(
      { types: [type], isActive: true },
      { name: 'asc', createdAt: 'asc' },
      undefined,
      accessToken
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching curriculums by type:', error);
    return mockCurriculums.filter(curriculum => curriculum.type === type && curriculum.isActive);
  }
}

export async function getActiveCurriculums(accessToken?: string): Promise<Curriculum[]> {
  try {
    const response = await getCurriculums(
      { isActive: true },
      { name: 'asc', createdAt: 'asc' },
      undefined,
      accessToken
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching active curriculums:', error);
    return mockCurriculums.filter(curriculum => curriculum.isActive);
  }
}

export async function getCurriculumsByGradeLevel(
  gradeLevel: string,
  accessToken?: string
): Promise<Curriculum[]> {
  try {
    const response = await getCurriculums(
      { gradeLevels: [gradeLevel], isActive: true },
      { name: 'asc', createdAt: 'asc' },
      undefined,
      accessToken
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching curriculums by grade level:', error);
    return mockCurriculums.filter(curriculum =>
      curriculum.isActive &&
      curriculum.gradeLevels.some(level =>
        level.toLowerCase().includes(gradeLevel.toLowerCase())
      )
    );
  }
}

export async function getCurriculumsBySubject(
  subject: string,
  accessToken?: string
): Promise<Curriculum[]> {
  try {
    const response = await getCurriculums(
      { subjects: [subject], isActive: true },
      { name: 'asc', createdAt: 'asc' },
      undefined,
      accessToken
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching curriculums by subject:', error);
    return mockCurriculums.filter(curriculum =>
      curriculum.isActive &&
      curriculum.subjects.some(sub =>
        sub.toLowerCase().includes(subject.toLowerCase())
      )
    );
  }
}

export async function getCurriculumsByDeliveryMethod(
  deliveryMethod: DeliveryMethod,
  accessToken?: string
): Promise<Curriculum[]> {
  try {
    const response = await getCurriculums(
      { deliveryMethod, isActive: true },
      { name: 'asc', createdAt: 'asc' },
      undefined,
      accessToken
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching curriculums by delivery method:', error);
    return mockCurriculums.filter(curriculum =>
      curriculum.deliveryMethod === deliveryMethod && curriculum.isActive
    );
  }
}

export async function searchCurriculums(
  searchTerm: string,
  filter?: Partial<CurriculumFilter>,
  pagination?: CurriculumPagination,
  accessToken?: string
): Promise<CurriculumsResponse> {
  try {
    const searchFilter: CurriculumFilter = {
      search: searchTerm,
      isActive: true,
      ...filter
    };
    
    return getCurriculums(
      searchFilter,
      { name: 'asc', createdAt: 'asc' },
      pagination,
      accessToken
    );
  } catch (error) {
    console.error('Error searching curriculums:', error);
    return {
      data: mockCurriculums.filter(curriculum =>
        curriculum.isActive &&
        (curriculum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         curriculum.description?.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
      hasNext: false,
      hasPrev: false
    };
  }
}

export async function getCurriculumsWithPagination(
  page: number = 1,
  limit: number = 10,
  filter?: CurriculumFilter,
  accessToken?: string
): Promise<CurriculumsResponse> {
  try {
    return getCurriculums(
      filter || { isActive: true },
      { name: 'asc', createdAt: 'asc' },
      { page, limit, sortBy: 'name', sortOrder: 'asc' },
      accessToken
    );
  } catch (error) {
    console.error('Error fetching curriculums with pagination:', error);
    return {
      data: mockCurriculums,
      total: mockCurriculums.length,
      page: 1,
      limit: 10,
      totalPages: 1,
      hasNext: false,
      hasPrev: false
    };
  }
}

// ========== MUTATION FUNCTIONS ==========
export async function createCurriculum(
  input: CreateCurriculumInput,
  accessToken: string
): Promise<Curriculum> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: CREATE_CURRICULUM_MUTATION,
    //   variables: { createCurriculumInput: input },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.createCurriculum;
    
    throw new Error('Create curriculum not implemented yet');
  } catch (error) {
    console.error('Error creating curriculum:', error);
    throw error;
  }
}

export async function updateCurriculum(
  id: string,
  input: UpdateCurriculumInput,
  accessToken: string
): Promise<Curriculum> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: UPDATE_CURRICULUM_MUTATION,
    //   variables: { id, updateCurriculumInput: input },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.updateCurriculum;
    
    throw new Error('Update curriculum not implemented yet');
  } catch (error) {
    console.error('Error updating curriculum:', error);
    throw error;
  }
}

export async function deleteCurriculum(
  id: string,
  accessToken: string
): Promise<boolean> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: DELETE_CURRICULUM_MUTATION,
    //   variables: { id },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.removeCurriculum === true;
    
    throw new Error('Delete curriculum not implemented yet');
  } catch (error) {
    console.error('Error deleting curriculum:', error);
    throw error;
  }
}

export async function toggleCurriculumActive(
  id: string,
  accessToken: string
): Promise<{ id: string; name: string; isActive: boolean; updatedAt: string }> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: TOGGLE_CURRICULUM_ACTIVE_MUTATION,
    //   variables: { id },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.toggleCurriculumActive;
    
    throw new Error('Toggle curriculum active not implemented yet');
  } catch (error) {
    console.error('Error toggling curriculum active status:', error);
    throw error;
  }
}
