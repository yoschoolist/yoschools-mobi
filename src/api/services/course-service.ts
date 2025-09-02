import { gql } from '@apollo/client';

// ========== TYPES ==========
export enum DeliveryMethod {
  IN_PERSON = 'IN_PERSON',
  ONLINE = 'ONLINE',
  HYBRID = 'HYBRID'
}

// ========== INTERFACES ==========
export interface Course {
  id: string;
  name: string;
  slug: string;
  description?: string;
  summary?: string;
  listingId?: string;
  campusId?: string;
  categoryId?: string;
  curriculumId?: string;
  courseCode?: string;
  gradeLevels: string[];
  subjects: string[];
  deliveryMethod: DeliveryMethod;
  duration?: string;
  credits?: number;
  prerequisites: string[];
  language?: string;
  isActive: boolean;
  isFeatured: boolean;
  enrollmentCount: number;
  averageRating?: number;
  reviewCount: number;
  viewCount: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  createdAt: string;
  updatedAt: string;
  listing?: {
    id: string;
    name: string;
    slug: string;
    overview?: string;
    description?: string;
  };
  campus?: {
    id: string;
    name: string;
    isMain: boolean;
    description?: string;
    contactEmail?: string;
    studentCount?: number;
    teacherCount?: number;
    studentTeacherRatio?: number;
    averageClassSize?: number;
    maximumClassSize?: number;
    transportationOptions?: string[];
    imageUrl?: string;
    imageId?: string;
    isActive: boolean;
    address?: {
      id: string;
      locationName?: string;
      isPrimary: boolean;
      streetAddress?: string;
      addressLine2?: string;
      neighborhood?: string;
      subLocality?: string;
      administrativeArea1?: string;
      administrativeArea2?: string;
      postalCode?: string;
      landmark?: string;
      formattedAddress?: string;
      placeId?: string;
      latitude?: number;
      longitude?: number;
      addressType?: string;
      country?: {
        id: string;
        name: string;
        code: string;
      };
      region?: {
        id: string;
        name: string;
        code: string;
      };
      locality?: {
        id: string;
        name: string;
        type: string;
      };
    };
  };
  category?: {
    id: string;
    name: string;
    slug: string;
    type: string;
    description?: string;
  };
  curriculum?: {
    id: string;
    name: string;
    description?: string;
    requirements?: string;
  };
  reviews?: {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    reviewer: {
      id: string;
      firstName: string;
      lastName: string;
      profilePicture?: string;
    };
  }[];
  photos?: {
    id: string;
    imageUrl: string;
    caption?: string;
  }[];
  videos?: {
    id: string;
    url: string;
    caption?: string;
    description?: string;
    duration?: string;
  }[];
  documents?: {
    id: string;
    url: string;
    name: string;
    type: string;
  }[];
  tuitionFees?: {
    id: string;
    amount: number;
    currency: string;
    feeType: string;
    description?: string;
  }[];
  tags?: {
    id: string;
    name: string;
    slug: string;
    color?: string;
  }[];
}

export interface CreateCourseInput {
  name: string;
  slug: string;
  description?: string;
  summary?: string;
  listingId?: string;
  campusId?: string;
  categoryId?: string;
  curriculumId?: string;
  courseCode?: string;
  gradeLevels?: string[];
  subjects?: string[];
  deliveryMethod?: DeliveryMethod;
  duration?: string;
  credits?: number;
  prerequisites?: string[];
  language?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface UpdateCourseInput {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
  summary?: string;
  listingId?: string;
  campusId?: string;
  categoryId?: string;
  curriculumId?: string;
  courseCode?: string;
  gradeLevels?: string[];
  subjects?: string[];
  deliveryMethod?: DeliveryMethod;
  duration?: string;
  credits?: number;
  prerequisites?: string[];
  language?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface CourseFilterInput {
  listingId?: string;
  campusId?: string;
  categoryId?: string;
  curriculumId?: string;
  deliveryMethod?: DeliveryMethod;
  gradeLevels?: string[];
  subjects?: string[];
  language?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  minCredits?: number;
  maxCredits?: number;
  searchTerm?: string;
}

export interface CourseSortInput {
  field?: 'NAME' | 'CREATED_AT' | 'UPDATED_AT' | 'ENROLLMENT_COUNT' | 'AVERAGE_RATING' | 'VIEW_COUNT' | 'COURSE_CODE' | 'DURATION' | 'CREDITS';
  order?: 'ASC' | 'DESC';
}

export interface PaginationInput {
  page?: number;
  limit?: number;
}

export interface CourseResponse {
  courses: Course[];
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// ========== GRAPHQL FRAGMENTS ==========
const COURSE_FRAGMENT = gql`
  fragment CourseFragment on Course {
    id
    name
    slug
    description
    summary
    listingId
    campusId
    categoryId
    curriculumId
    courseCode
    gradeLevels
    subjects
    deliveryMethod
    duration
    credits
    prerequisites
    language
    isActive
    isFeatured
    enrollmentCount
    averageRating
    reviewCount
    viewCount
    metaTitle
    metaDescription
    metaKeywords
    createdAt
    updatedAt
    listing {
      id
      name
      slug
      overview
      description
    }
    campus {
      id
      name
      isMain
      description
      contactEmail
      studentCount
      teacherCount
      studentTeacherRatio
      averageClassSize
      maximumClassSize
      transportationOptions
      imageUrl
      imageId
      isActive
      address {
        id
        locationName
        isPrimary
        streetAddress
        addressLine2
        neighborhood
        subLocality
        administrativeArea1
        administrativeArea2
        postalCode
        landmark
        formattedAddress
        placeId
        latitude
        longitude
        addressType
        country {
          id
          name
          code
        }
        region {
          id
          name
          code
        }
        locality {
          id
          name
          type
        }
      }
    }
    category {
      id
      name
      slug
      type
      description
    }
    curriculum {
      id
      name
      description
      requirements
    }
    reviews {
      id
      rating
      comment
      createdAt
      reviewer {
        id
        firstName
        lastName
        profilePicture
      }
    }
    photos {
      id
      imageUrl
      caption
    }
    videos {
      id
      url
      caption
      description
      duration
    }
    documents {
      id
      url
      name
      type
    }
    tuitionFees {
      id
      amount
      currency
      feeType
      description
    }
    tags {
      id
      name
      slug
      color
    }
  }
`;

// ========== GRAPHQL QUERIES ==========
const GET_COURSES_QUERY = gql`
  ${COURSE_FRAGMENT}
  query GetCourses(
    $filter: CourseFilterInput
    $sort: CourseSortInput
    $pagination: PaginationInput
  ) {
    getCourses(
      filter: $filter
      sort: $sort
      pagination: $pagination
    ) {
      courses {
        ...CourseFragment
      }
      total
      hasNextPage
      hasPreviousPage
    }
  }
`;

const GET_COURSE_QUERY = gql`
  ${COURSE_FRAGMENT}
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
      ...CourseFragment
    }
  }
`;

const GET_COURSE_BY_SLUG_QUERY = gql`
  ${COURSE_FRAGMENT}
  query GetCourseBySlug($slug: String!) {
    getCourseBySlug(slug: $slug) {
      ...CourseFragment
    }
  }
`;

const GET_FEATURED_COURSES_QUERY = gql`
  ${COURSE_FRAGMENT}
  query GetFeaturedCourses($limit: Int) {
    getFeaturedCourses(limit: $limit) {
      ...CourseFragment
    }
  }
`;

const GET_POPULAR_COURSES_QUERY = gql`
  ${COURSE_FRAGMENT}
  query GetPopularCourses($limit: Int) {
    getPopularCourses(limit: $limit) {
      ...CourseFragment
    }
  }
`;

// ========== GRAPHQL MUTATIONS ==========
const CREATE_COURSE_MUTATION = gql`
  ${COURSE_FRAGMENT}
  mutation CreateCourse($createCourseInput: CreateCourseInput!) {
    createCourse(createCourseInput: $createCourseInput) {
      ...CourseFragment
    }
  }
`;

const UPDATE_COURSE_MUTATION = gql`
  ${COURSE_FRAGMENT}
  mutation UpdateCourse($updateCourseInput: UpdateCourseInput!) {
    updateCourse(updateCourseInput: $updateCourseInput) {
      ...CourseFragment
    }
  }
`;

const DELETE_COURSE_MUTATION = gql`
  mutation DeleteCourse($id: ID!) {
    removeCourse(id: $id) {
      id
      name
      slug
    }
  }
`;

const UPDATE_ENROLLMENT_COUNT_MUTATION = gql`
  mutation UpdateEnrollmentCount($courseId: ID!, $increment: Int!) {
    updateEnrollmentCount(courseId: $courseId, increment: $increment) {
      id
      enrollmentCount
    }
  }
`;

const UPDATE_AVERAGE_RATING_MUTATION = gql`
  mutation UpdateAverageRating($courseId: ID!) {
    updateAverageRating(courseId: $courseId) {
      id
      averageRating
      reviewCount
    }
  }
`;

// ========== UTILITY FUNCTIONS ==========
export function getDeliveryMethodLabel(method: DeliveryMethod): string {
  const labels: Record<DeliveryMethod, string> = {
    [DeliveryMethod.IN_PERSON]: 'In-Person',
    [DeliveryMethod.ONLINE]: 'Online',
    [DeliveryMethod.HYBRID]: 'Hybrid'
  };
  return labels[method] || method;
}

export function getDeliveryMethodIcon(method: DeliveryMethod): string {
  const icons: Record<DeliveryMethod, string> = {
    [DeliveryMethod.IN_PERSON]: '🏫',
    [DeliveryMethod.ONLINE]: '💻',
    [DeliveryMethod.HYBRID]: '🔄'
  };
  return icons[method] || '📚';
}

export function getDeliveryMethodColor(method: DeliveryMethod): string {
  const colors: Record<DeliveryMethod, string> = {
    [DeliveryMethod.IN_PERSON]: '#3B82F6', // Blue
    [DeliveryMethod.ONLINE]: '#10B981', // Green
    [DeliveryMethod.HYBRID]: '#F59E0B' // Yellow
  };
  return colors[method] || '#6B7280'; // Gray
}

export function formatCourseDuration(duration?: string): string {
  if (!duration) return 'Duration not specified';
  return duration;
}

export function formatCourseCredits(credits?: number): string {
  if (!credits) return 'No credits';
  return `${credits} credit${credits !== 1 ? 's' : ''}`;
}

export function formatCourseRating(rating?: number): string {
  if (!rating) return 'No rating';
  return `${rating.toFixed(1)}/5.0`;
}

export function formatEnrollmentCount(count: number): string {
  if (count === 0) return 'No enrollments';
  if (count === 1) return '1 student';
  return `${count} students`;
}

export function getCourseDifficultyLevel(course: Course): string {
  // Simple logic based on prerequisites and credits
  if (course.prerequisites.length > 3 || (course.credits && course.credits > 6)) {
    return 'Advanced';
  } else if (course.prerequisites.length > 0 || (course.credits && course.credits > 3)) {
    return 'Intermediate';
  } else {
    return 'Beginner';
  }
}

export function getCourseStatus(course: Course): string {
  if (!course.isActive) return 'Inactive';
  if (course.isFeatured) return 'Featured';
  return 'Active';
}

// ========== MOCK DATA ==========
export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Introduction to Mathematics',
    slug: 'introduction-to-mathematics',
    description: 'A comprehensive introduction to basic mathematical concepts including algebra, geometry, and arithmetic.',
    summary: 'Learn fundamental math concepts',
    listingId: '1',
    campusId: '1',
    categoryId: '7',
    courseCode: 'MATH101',
    gradeLevels: ['Grade 9', 'Grade 10'],
    subjects: ['Mathematics'],
    deliveryMethod: DeliveryMethod.IN_PERSON,
    duration: '1 year',
    credits: 4,
    prerequisites: [],
    language: 'English',
    isActive: true,
    isFeatured: true,
    enrollmentCount: 150,
    averageRating: 4.5,
    reviewCount: 25,
    viewCount: 500,
    metaTitle: 'Introduction to Mathematics - University of Lagos',
    metaDescription: 'Learn fundamental mathematical concepts in this comprehensive course.',
    metaKeywords: 'mathematics, algebra, geometry, arithmetic',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    listing: {
      id: '1',
      name: 'University of Lagos',
      slug: 'university-of-lagos',
      overview: 'Leading university in Nigeria',
      description: 'A prestigious university offering quality education'
    },
    campus: {
      id: '1',
      name: 'Main Campus - Victoria Island',
      isMain: true,
      description: 'Main campus in Victoria Island',
      contactEmail: 'info@unilag.edu.ng',
      studentCount: 5000,
      teacherCount: 300,
      studentTeacherRatio: 16.7,
      averageClassSize: 30,
      maximumClassSize: 50,
      transportationOptions: ['Bus', 'Car'],
      isActive: true
    },
    category: {
      id: '7',
      name: 'Mathematics',
      slug: 'mathematics',
      type: 'SUBJECT',
      description: 'Mathematics and related subjects'
    },
    reviews: [
      {
        id: '1',
        rating: 5,
        comment: 'Excellent course! Very well structured.',
        createdAt: new Date().toISOString(),
        reviewer: {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          profilePicture: 'https://example.com/avatar1.jpg'
        }
      }
    ],
    photos: [
      {
        id: '1',
        imageUrl: 'https://example.com/math-course.jpg',
        caption: 'Mathematics classroom'
      }
    ],
    tuitionFees: [
      {
        id: '1',
        amount: 50000,
        currency: 'NGN',
        feeType: 'Tuition',
        description: 'Annual tuition fee'
      }
    ],
    tags: [
      {
        id: '1',
        name: 'Mathematics',
        slug: 'mathematics',
        color: '#3B82F6'
      }
    ]
  },
  {
    id: '2',
    name: 'Advanced Physics',
    slug: 'advanced-physics',
    description: 'Advanced physics course covering mechanics, thermodynamics, and quantum physics.',
    summary: 'Advanced physics concepts and applications',
    listingId: '1',
    campusId: '1',
    categoryId: '8',
    courseCode: 'PHYS301',
    gradeLevels: ['Grade 11', 'Grade 12'],
    subjects: ['Physics'],
    deliveryMethod: DeliveryMethod.HYBRID,
    duration: '2 semesters',
    credits: 6,
    prerequisites: ['Introduction to Physics', 'Calculus I'],
    language: 'English',
    isActive: true,
    isFeatured: false,
    enrollmentCount: 75,
    averageRating: 4.2,
    reviewCount: 15,
    viewCount: 200,
    metaTitle: 'Advanced Physics - University of Lagos',
    metaDescription: 'Master advanced physics concepts in this comprehensive course.',
    metaKeywords: 'physics, mechanics, thermodynamics, quantum',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    listing: {
      id: '1',
      name: 'University of Lagos',
      slug: 'university-of-lagos',
      overview: 'Leading university in Nigeria',
      description: 'A prestigious university offering quality education'
    },
    campus: {
      id: '1',
      name: 'Main Campus - Victoria Island',
      isMain: true,
      description: 'Main campus in Victoria Island',
      contactEmail: 'info@unilag.edu.ng',
      studentCount: 5000,
      teacherCount: 300,
      studentTeacherRatio: 16.7,
      averageClassSize: 30,
      maximumClassSize: 50,
      transportationOptions: ['Bus', 'Car'],
      isActive: true
    },
    category: {
      id: '8',
      name: 'Science',
      slug: 'science',
      type: 'SUBJECT',
      description: 'Science subjects including Physics, Chemistry, Biology'
    },
    reviews: [
      {
        id: '2',
        rating: 4,
        comment: 'Challenging but rewarding course.',
        createdAt: new Date().toISOString(),
        reviewer: {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          profilePicture: 'https://example.com/avatar2.jpg'
        }
      }
    ],
    photos: [
      {
        id: '2',
        imageUrl: 'https://example.com/physics-lab.jpg',
        caption: 'Physics laboratory'
      }
    ],
    tuitionFees: [
      {
        id: '2',
        amount: 75000,
        currency: 'NGN',
        feeType: 'Tuition',
        description: 'Annual tuition fee'
      }
    ],
    tags: [
      {
        id: '2',
        name: 'Physics',
        slug: 'physics',
        color: '#10B981'
      }
    ]
  },
  {
    id: '3',
    name: 'Online English Literature',
    slug: 'online-english-literature',
    description: 'Study classic and contemporary English literature in this online course.',
    summary: 'Explore English literature online',
    listingId: '2',
    categoryId: '9',
    courseCode: 'ENG201',
    gradeLevels: ['Grade 10', 'Grade 11', 'Grade 12'],
    subjects: ['English Literature'],
    deliveryMethod: DeliveryMethod.ONLINE,
    duration: '6 months',
    credits: 3,
    prerequisites: ['English Language'],
    language: 'English',
    isActive: true,
    isFeatured: true,
    enrollmentCount: 200,
    averageRating: 4.7,
    reviewCount: 40,
    viewCount: 800,
    metaTitle: 'Online English Literature Course',
    metaDescription: 'Study English literature from anywhere with our online course.',
    metaKeywords: 'english, literature, online, classic',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    listing: {
      id: '2',
      name: 'Lagos State University',
      slug: 'lagos-state-university',
      overview: 'State university in Lagos',
      description: 'Quality education for all'
    },
    category: {
      id: '9',
      name: 'English Literature',
      slug: 'english-literature',
      type: 'SUBJECT',
      description: 'English literature and language studies'
    },
    reviews: [
      {
        id: '3',
        rating: 5,
        comment: 'Amazing online course! Very interactive.',
        createdAt: new Date().toISOString(),
        reviewer: {
          id: '3',
          firstName: 'Mike',
          lastName: 'Johnson',
          profilePicture: 'https://example.com/avatar3.jpg'
        }
      }
    ],
    photos: [
      {
        id: '3',
        imageUrl: 'https://example.com/english-course.jpg',
        caption: 'English literature study materials'
      }
    ],
    tuitionFees: [
      {
        id: '3',
        amount: 30000,
        currency: 'NGN',
        feeType: 'Tuition',
        description: 'Course fee'
      }
    ],
    tags: [
      {
        id: '3',
        name: 'English',
        slug: 'english',
        color: '#EF4444'
      }
    ]
  }
];

// ========== API FUNCTIONS ==========
export async function getCourses(
  filter?: CourseFilterInput,
  sort?: CourseSortInput,
  pagination?: PaginationInput,
  accessToken?: string
): Promise<CourseResponse> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_COURSES_QUERY,
    //   variables: { filter, sort, pagination },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getCourses;
    
    // Return mock data for now
    let filteredCourses = [...mockCourses];
    
    if (filter) {
      if (filter.listingId) {
        filteredCourses = filteredCourses.filter(course => course.listingId === filter.listingId);
      }
      
      if (filter.campusId) {
        filteredCourses = filteredCourses.filter(course => course.campusId === filter.campusId);
      }
      
      if (filter.categoryId) {
        filteredCourses = filteredCourses.filter(course => course.categoryId === filter.categoryId);
      }
      
      if (filter.deliveryMethod) {
        filteredCourses = filteredCourses.filter(course => course.deliveryMethod === filter.deliveryMethod);
      }
      
      if (filter.gradeLevels && filter.gradeLevels.length > 0) {
        filteredCourses = filteredCourses.filter(course =>
          course.gradeLevels.some(level => filter.gradeLevels!.includes(level))
        );
      }
      
      if (filter.subjects && filter.subjects.length > 0) {
        filteredCourses = filteredCourses.filter(course =>
          course.subjects.some(subject => filter.subjects!.includes(subject))
        );
      }
      
      if (filter.language) {
        filteredCourses = filteredCourses.filter(course => course.language === filter.language);
      }
      
      if (filter.isActive !== undefined) {
        filteredCourses = filteredCourses.filter(course => course.isActive === filter.isActive);
      }
      
      if (filter.isFeatured !== undefined) {
        filteredCourses = filteredCourses.filter(course => course.isFeatured === filter.isFeatured);
      }
      
      if (filter.minCredits) {
        filteredCourses = filteredCourses.filter(course => 
          course.credits && course.credits >= filter.minCredits!
        );
      }
      
      if (filter.maxCredits) {
        filteredCourses = filteredCourses.filter(course => 
          course.credits && course.credits <= filter.maxCredits!
        );
      }
      
      if (filter.searchTerm) {
        const searchLower = filter.searchTerm.toLowerCase();
        filteredCourses = filteredCourses.filter(course =>
          course.name.toLowerCase().includes(searchLower) ||
          course.description?.toLowerCase().includes(searchLower) ||
          course.courseCode?.toLowerCase().includes(searchLower)
        );
      }
    }
    
    // Apply sorting
    if (sort) {
      filteredCourses.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (sort.field) {
          case 'NAME':
            aValue = a.name;
            bValue = b.name;
            break;
          case 'CREATED_AT':
            aValue = new Date(a.createdAt).getTime();
            bValue = new Date(b.createdAt).getTime();
            break;
          case 'UPDATED_AT':
            aValue = new Date(a.updatedAt).getTime();
            bValue = new Date(b.updatedAt).getTime();
            break;
          case 'ENROLLMENT_COUNT':
            aValue = a.enrollmentCount;
            bValue = b.enrollmentCount;
            break;
          case 'AVERAGE_RATING':
            aValue = a.averageRating || 0;
            bValue = b.averageRating || 0;
            break;
          case 'VIEW_COUNT':
            aValue = a.viewCount;
            bValue = b.viewCount;
            break;
          case 'COURSE_CODE':
            aValue = a.courseCode || '';
            bValue = b.courseCode || '';
            break;
          case 'DURATION':
            aValue = a.duration || '';
            bValue = b.duration || '';
            break;
          case 'CREDITS':
            aValue = a.credits || 0;
            bValue = b.credits || 0;
            break;
          default:
            aValue = a.name;
            bValue = b.name;
        }
        
        if (sort.order === 'DESC') {
          return bValue > aValue ? 1 : bValue < aValue ? -1 : 0;
        } else {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        }
      });
    }
    
    const total = filteredCourses.length;
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;
    const paginatedCourses = filteredCourses.slice(skip, skip + limit);
    
    return {
      courses: paginatedCourses,
      total,
      hasNextPage: skip + limit < total,
      hasPreviousPage: page > 1
    };
  } catch (error) {
    console.error('Error fetching courses:', error);
    return {
      courses: mockCourses,
      total: mockCourses.length,
      hasNextPage: false,
      hasPreviousPage: false
    };
  }
}

export async function getCourse(
  id: string,
  accessToken?: string
): Promise<Course | null> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_COURSE_QUERY,
    //   variables: { id },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getCourse;
    
    // Return mock data for now
    return mockCourses.find(course => course.id === id) || null;
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
}

export async function getCourseBySlug(
  slug: string,
  accessToken?: string
): Promise<Course | null> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_COURSE_BY_SLUG_QUERY,
    //   variables: { slug },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getCourseBySlug;
    
    // Return mock data for now
    return mockCourses.find(course => course.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching course by slug:', error);
    return null;
  }
}

export async function getFeaturedCourses(
  limit?: number,
  accessToken?: string
): Promise<Course[]> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_FEATURED_COURSES_QUERY,
    //   variables: { limit },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getFeaturedCourses || [];
    
    // Return mock data for now
    const featuredCourses = mockCourses.filter(course => course.isFeatured);
    return limit ? featuredCourses.slice(0, limit) : featuredCourses;
  } catch (error) {
    console.error('Error fetching featured courses:', error);
    return mockCourses.filter(course => course.isFeatured);
  }
}

export async function getPopularCourses(
  limit?: number,
  accessToken?: string
): Promise<Course[]> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_POPULAR_COURSES_QUERY,
    //   variables: { limit },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getPopularCourses || [];
    
    // Return mock data for now
    const popularCourses = [...mockCourses].sort((a, b) => b.enrollmentCount - a.enrollmentCount);
    return limit ? popularCourses.slice(0, limit) : popularCourses;
  } catch (error) {
    console.error('Error fetching popular courses:', error);
    return mockCourses.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
  }
}

// ========== UTILITY API FUNCTIONS ==========
export async function getCoursesByCategory(
  categoryId: string,
  limit?: number,
  accessToken?: string
): Promise<Course[]> {
  try {
    const response = await getCourses(
      { categoryId, isActive: true },
      { field: 'NAME', order: 'ASC' },
      { limit },
      accessToken
    );
    return response.courses;
  } catch (error) {
    console.error('Error fetching courses by category:', error);
    return mockCourses.filter(course => course.categoryId === categoryId && course.isActive);
  }
}

export async function getCoursesByListing(
  listingId: string,
  limit?: number,
  accessToken?: string
): Promise<Course[]> {
  try {
    const response = await getCourses(
      { listingId, isActive: true },
      { field: 'NAME', order: 'ASC' },
      { limit },
      accessToken
    );
    return response.courses;
  } catch (error) {
    console.error('Error fetching courses by listing:', error);
    return mockCourses.filter(course => course.listingId === listingId && course.isActive);
  }
}

export async function getCoursesByDeliveryMethod(
  deliveryMethod: DeliveryMethod,
  limit?: number,
  accessToken?: string
): Promise<Course[]> {
  try {
    const response = await getCourses(
      { deliveryMethod, isActive: true },
      { field: 'NAME', order: 'ASC' },
      { limit },
      accessToken
    );
    return response.courses;
  } catch (error) {
    console.error('Error fetching courses by delivery method:', error);
    return mockCourses.filter(course => course.deliveryMethod === deliveryMethod && course.isActive);
  }
}

export async function getActiveCourses(
  limit?: number,
  accessToken?: string
): Promise<Course[]> {
  try {
    const response = await getCourses(
      { isActive: true },
      { field: 'NAME', order: 'ASC' },
      { limit },
      accessToken
    );
    return response.courses;
  } catch (error) {
    console.error('Error fetching active courses:', error);
    return mockCourses.filter(course => course.isActive);
  }
}

export async function searchCourses(
  searchTerm: string,
  filters?: Omit<CourseFilterInput, 'searchTerm'>,
  sort?: CourseSortInput,
  pagination?: PaginationInput,
  accessToken?: string
): Promise<CourseResponse> {
  try {
    const filter: CourseFilterInput = {
      searchTerm,
      isActive: true,
      ...filters
    };
    
    return getCourses(filter, sort, pagination, accessToken);
  } catch (error) {
    console.error('Error searching courses:', error);
    return {
      courses: mockCourses.filter(course => 
        course.isActive && 
        (course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         course.description?.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
      total: 0,
      hasNextPage: false,
      hasPreviousPage: false
    };
  }
}

export async function getTopRatedCourses(
  limit?: number,
  accessToken?: string
): Promise<Course[]> {
  try {
    const response = await getCourses(
      { isActive: true },
      { field: 'AVERAGE_RATING', order: 'DESC' },
      { limit },
      accessToken
    );
    return response.courses;
  } catch (error) {
    console.error('Error fetching top rated courses:', error);
    return mockCourses
      .filter(course => course.isActive && course.averageRating)
      .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
  }
}

export async function getMostEnrolledCourses(
  limit?: number,
  accessToken?: string
): Promise<Course[]> {
  try {
    const response = await getCourses(
      { isActive: true },
      { field: 'ENROLLMENT_COUNT', order: 'DESC' },
      { limit },
      accessToken
    );
    return response.courses;
  } catch (error) {
    console.error('Error fetching most enrolled courses:', error);
    return mockCourses
      .filter(course => course.isActive)
      .sort((a, b) => b.enrollmentCount - a.enrollmentCount);
  }
}

export async function getRecentCourses(
  limit?: number,
  accessToken?: string
): Promise<Course[]> {
  try {
    const response = await getCourses(
      { isActive: true },
      { field: 'CREATED_AT', order: 'DESC' },
      { limit },
      accessToken
    );
    return response.courses;
  } catch (error) {
    console.error('Error fetching recent courses:', error);
    return mockCourses
      .filter(course => course.isActive)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

// ========== MUTATION FUNCTIONS ==========
export async function createCourse(
  input: CreateCourseInput,
  accessToken: string
): Promise<Course> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: CREATE_COURSE_MUTATION,
    //   variables: { createCourseInput: input },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.createCourse;
    
    throw new Error('Create course not implemented yet');
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
}

export async function updateCourse(
  input: UpdateCourseInput,
  accessToken: string
): Promise<Course> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: UPDATE_COURSE_MUTATION,
    //   variables: { updateCourseInput: input },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.updateCourse;
    
    throw new Error('Update course not implemented yet');
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
}

export async function deleteCourse(
  id: string,
  accessToken: string
): Promise<{ id: string; name: string; slug: string }> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: DELETE_COURSE_MUTATION,
    //   variables: { id },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.removeCourse;
    
    throw new Error('Delete course not implemented yet');
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
}

export async function updateEnrollmentCount(
  courseId: string,
  increment: number,
  accessToken: string
): Promise<Course> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: UPDATE_ENROLLMENT_COUNT_MUTATION,
    //   variables: { courseId, increment },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.updateEnrollmentCount;
    
    throw new Error('Update enrollment count not implemented yet');
  } catch (error) {
    console.error('Error updating enrollment count:', error);
    throw error;
  }
}

export async function updateAverageRating(
  courseId: string,
  accessToken: string
): Promise<Course> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: UPDATE_AVERAGE_RATING_MUTATION,
    //   variables: { courseId },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.updateAverageRating;
    
    throw new Error('Update average rating not implemented yet');
  } catch (error) {
    console.error('Error updating average rating:', error);
    throw error;
  }
}
