import { gql } from '@apollo/client';

// ========== TYPES ==========
export enum FacilityType {
  ACADEMIC = 'ACADEMIC',
  ATHLETIC = 'ATHLETIC',
  RECREATIONAL = 'RECREATIONAL',
  ADMINISTRATIVE = 'ADMINISTRATIVE',
  DINING = 'DINING',
  TRANSPORTATION = 'TRANSPORTATION',
  TECHNOLOGY = 'TECHNOLOGY',
  HEALTH = 'HEALTH',
  SAFETY = 'SAFETY',
  OTHER = 'OTHER'
}

// ========== INTERFACES ==========
export interface Facility {
  id: string;
  name: string;
  description?: string;
  type: FacilityType;
  campusId?: string;
  listingId?: string;
  isActive: boolean;
  features: string[];
  capacity?: number;
  operatingHours?: string;
  contactInfo?: string;
  imageUrl?: string;
  imageId?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  createdAt: string;
  updatedAt: string;
  
  // Relations
  campus?: {
    id: string;
    name: string;
    isMain: boolean;
  };
  listing?: {
    id: string;
    name: string;
    slug: string;
  };
  photos?: FacilityPhoto[];
}

export interface FacilityPhoto {
  id: string;
  url: string;
  imageId: string;
  caption?: string;
  isPrimary: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface CreateFacilityInput {
  name: string;
  description?: string;
  type: FacilityType;
  campusId?: string;
  listingId?: string;
  isActive?: boolean;
  features?: string[];
  capacity?: number;
  operatingHours?: string;
  contactInfo?: string;
  imageUrl?: string;
  imageId?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface UpdateFacilityInput {
  name?: string;
  description?: string;
  type?: FacilityType;
  campusId?: string;
  listingId?: string;
  isActive?: boolean;
  features?: string[];
  capacity?: number;
  operatingHours?: string;
  contactInfo?: string;
  imageUrl?: string;
  imageId?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface FacilityFilter {
  search?: string;
  type?: FacilityType;
  isActive?: boolean;
  campusId?: string;
  listingId?: string;
  hasImage?: boolean;
}

export interface FacilitySort {
  name?: 'asc' | 'desc';
  type?: 'asc' | 'desc';
  createdAt?: 'asc' | 'desc';
  updatedAt?: 'asc' | 'desc';
}

export interface FacilityResponse {
  facilities: Facility[];
  total: number;
  hasMore: boolean;
}

// ========== GRAPHQL FRAGMENTS ==========
const FACILITY_FRAGMENT = gql`
  fragment FacilityFragment on Facility {
    id
    name
    description
    type
    campusId
    listingId
    isActive
    features
    capacity
    operatingHours
    contactInfo
    imageUrl
    imageId
    metaTitle
    metaDescription
    metaKeywords
    createdAt
    updatedAt
    campus {
      id
      name
      isMain
    }
    listing {
      id
      name
      slug
    }
  }
`;

const FACILITY_PHOTO_FRAGMENT = gql`
  fragment FacilityPhotoFragment on FacilityPhoto {
    id
    url
    imageId
    caption
    isPrimary
    sortOrder
    createdAt
  }
`;

// ========== GRAPHQL QUERIES ==========
const GET_FACILITIES_QUERY = gql`
  ${FACILITY_FRAGMENT}
  query GetFacilities(
    $filters: FacilityFilterInput
    $pagination: PaginationInput
    $sort: FacilitySortInput
  ) {
    getFacilities(filters: $filters, pagination: $pagination, sort: $sort) {
      facilities {
        ...FacilityFragment
      }
      total
      hasMore
    }
  }
`;

const GET_FACILITY_QUERY = gql`
  ${FACILITY_FRAGMENT}
  ${FACILITY_PHOTO_FRAGMENT}
  query GetFacility($id: ID!) {
    getFacility(id: $id) {
      ...FacilityFragment
      photos {
        ...FacilityPhotoFragment
      }
    }
  }
`;

const GET_FACILITY_BY_SLUG_QUERY = gql`
  ${FACILITY_FRAGMENT}
  ${FACILITY_PHOTO_FRAGMENT}
  query GetFacilityBySlug($slug: String!) {
    getFacilityBySlug(slug: $slug) {
      ...FacilityFragment
      photos {
        ...FacilityPhotoFragment
      }
    }
  }
`;

const GET_FACILITIES_BY_CAMPUS_QUERY = gql`
  ${FACILITY_FRAGMENT}
  query GetFacilitiesByCampus($campusId: ID!) {
    getFacilitiesByCampus(campusId: $campusId) {
      ...FacilityFragment
    }
  }
`;

const GET_FACILITIES_BY_LISTING_QUERY = gql`
  ${FACILITY_FRAGMENT}
  query GetFacilitiesByListing($listingId: ID!) {
    getFacilitiesByListing(listingId: $listingId) {
      ...FacilityFragment
    }
  }
`;

// ========== GRAPHQL MUTATIONS ==========
const CREATE_FACILITY_MUTATION = gql`
  ${FACILITY_FRAGMENT}
  mutation CreateFacility($input: CreateFacilityInput!) {
    createFacility(input: $input) {
      ...FacilityFragment
    }
  }
`;

const UPDATE_FACILITY_MUTATION = gql`
  ${FACILITY_FRAGMENT}
  mutation UpdateFacility($id: ID!, $input: UpdateFacilityInput!) {
    updateFacility(id: $id, input: $input) {
      ...FacilityFragment
    }
  }
`;

const DELETE_FACILITY_MUTATION = gql`
  mutation RemoveFacility($id: ID!) {
    removeFacility(id: $id)
  }
`;

const TOGGLE_FACILITY_STATUS_MUTATION = gql`
  ${FACILITY_FRAGMENT}
  mutation ToggleFacilityStatus($id: ID!) {
    toggleFacilityStatus(id: $id) {
      ...FacilityFragment
    }
  }
`;

// ========== UTILITY FUNCTIONS ==========
export function formatFacilityType(type: FacilityType): string {
  const typeMap: Record<FacilityType, string> = {
    [FacilityType.ACADEMIC]: 'Academic',
    [FacilityType.ATHLETIC]: 'Athletic',
    [FacilityType.RECREATIONAL]: 'Recreational',
    [FacilityType.ADMINISTRATIVE]: 'Administrative',
    [FacilityType.DINING]: 'Dining',
    [FacilityType.TRANSPORTATION]: 'Transportation',
    [FacilityType.TECHNOLOGY]: 'Technology',
    [FacilityType.HEALTH]: 'Health',
    [FacilityType.SAFETY]: 'Safety',
    [FacilityType.OTHER]: 'Other'
  };
  return typeMap[type] || type;
}

export function getFacilityTypeColor(type: FacilityType): string {
  const colorMap: Record<FacilityType, string> = {
    [FacilityType.ACADEMIC]: '#3B82F6',
    [FacilityType.ATHLETIC]: '#EF4444',
    [FacilityType.RECREATIONAL]: '#10B981',
    [FacilityType.ADMINISTRATIVE]: '#F59E0B',
    [FacilityType.DINING]: '#8B5CF6',
    [FacilityType.TRANSPORTATION]: '#EC4899',
    [FacilityType.TECHNOLOGY]: '#14B8A6',
    [FacilityType.HEALTH]: '#F97316',
    [FacilityType.SAFETY]: '#84CC16',
    [FacilityType.OTHER]: '#6B7280'
  };
  return colorMap[type] || '#6B7280';
}

export function getFacilityTypeIcon(type: FacilityType): string {
  const iconMap: Record<FacilityType, string> = {
    [FacilityType.ACADEMIC]: '📚',
    [FacilityType.ATHLETIC]: '🏃',
    [FacilityType.RECREATIONAL]: '🎮',
    [FacilityType.ADMINISTRATIVE]: '🏢',
    [FacilityType.DINING]: '🍽️',
    [FacilityType.TRANSPORTATION]: '🚌',
    [FacilityType.TECHNOLOGY]: '💻',
    [FacilityType.HEALTH]: '🏥',
    [FacilityType.SAFETY]: '🛡️',
    [FacilityType.OTHER]: '🏗️'
  };
  return iconMap[type] || '🏗️';
}

export function formatFacilityCapacity(capacity?: number): string {
  if (!capacity) return 'Capacity not specified';
  return `${capacity} people`;
}

export function formatFacilityFeatures(features: string[]): string {
  if (features.length === 0) return 'No features listed';
  if (features.length === 1) return features[0];
  if (features.length === 2) return features.join(' and ');
  return `${features.slice(0, -1).join(', ')} and ${features[features.length - 1]}`;
}

export function formatOperatingHours(hours?: string): string {
  if (!hours) return 'Hours not specified';
  return hours;
}

// ========== MOCK DATA ==========
export const mockFacilities: Facility[] = [
  {
    id: '1',
    name: 'Main Library',
    description: 'A comprehensive library with over 50,000 books, digital resources, and study spaces.',
    type: FacilityType.ACADEMIC,
    campusId: '1',
    listingId: '1',
    isActive: true,
    features: ['WiFi', 'Study Rooms', 'Computer Access', 'Quiet Zones', 'Group Study Areas'],
    capacity: 200,
    operatingHours: 'Monday-Friday: 8:00 AM - 10:00 PM, Saturday-Sunday: 9:00 AM - 8:00 PM',
    contactInfo: 'library@school.edu',
    imageUrl: 'https://example.com/library.jpg',
    imageId: 'lib-001',
    metaTitle: 'Main Library - School Name',
    metaDescription: 'Access to thousands of books and digital resources',
    metaKeywords: 'library, books, study, research',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    campus: {
      id: '1',
      name: 'Main Campus',
      isMain: true
    },
    listing: {
      id: '1',
      name: 'University of Lagos',
      slug: 'university-of-lagos'
    },
    photos: [
      {
        id: '1',
        url: 'https://example.com/library-1.jpg',
        imageId: 'lib-photo-1',
        caption: 'Main reading area',
        isPrimary: true,
        sortOrder: 1,
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: '2',
    name: 'Sports Complex',
    description: 'State-of-the-art sports facility with gym, swimming pool, and multiple courts.',
    type: FacilityType.ATHLETIC,
    campusId: '1',
    listingId: '1',
    isActive: true,
    features: ['Gym', 'Swimming Pool', 'Basketball Court', 'Tennis Court', 'Locker Rooms'],
    capacity: 500,
    operatingHours: 'Monday-Friday: 6:00 AM - 10:00 PM, Saturday-Sunday: 7:00 AM - 9:00 PM',
    contactInfo: 'sports@school.edu',
    imageUrl: 'https://example.com/sports-complex.jpg',
    imageId: 'sports-001',
    metaTitle: 'Sports Complex - School Name',
    metaDescription: 'Modern sports and fitness facilities',
    metaKeywords: 'sports, gym, swimming, fitness',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    campus: {
      id: '1',
      name: 'Main Campus',
      isMain: true
    },
    listing: {
      id: '1',
      name: 'University of Lagos',
      slug: 'university-of-lagos'
    },
    photos: [
      {
        id: '2',
        url: 'https://example.com/sports-1.jpg',
        imageId: 'sports-photo-1',
        caption: 'Main gym area',
        isPrimary: true,
        sortOrder: 1,
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: '3',
    name: 'Student Cafeteria',
    description: 'Large dining hall serving breakfast, lunch, and dinner with various meal options.',
    type: FacilityType.DINING,
    campusId: '1',
    listingId: '1',
    isActive: true,
    features: ['Multiple Food Stations', 'Vegetarian Options', 'Halal Options', 'Outdoor Seating'],
    capacity: 300,
    operatingHours: 'Monday-Friday: 7:00 AM - 8:00 PM, Saturday-Sunday: 8:00 AM - 7:00 PM',
    contactInfo: 'dining@school.edu',
    imageUrl: 'https://example.com/cafeteria.jpg',
    imageId: 'cafe-001',
    metaTitle: 'Student Cafeteria - School Name',
    metaDescription: 'Diverse dining options for students',
    metaKeywords: 'dining, food, cafeteria, meals',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    campus: {
      id: '1',
      name: 'Main Campus',
      isMain: true
    },
    listing: {
      id: '1',
      name: 'University of Lagos',
      slug: 'university-of-lagos'
    },
    photos: []
  },
  {
    id: '4',
    name: 'Computer Lab',
    description: 'Modern computer laboratory with high-speed internet and latest software.',
    type: FacilityType.TECHNOLOGY,
    campusId: '1',
    listingId: '1',
    isActive: true,
    features: ['High-Speed Internet', 'Latest Software', 'Printing Services', 'Technical Support'],
    capacity: 50,
    operatingHours: 'Monday-Friday: 8:00 AM - 9:00 PM, Saturday-Sunday: 9:00 AM - 6:00 PM',
    contactInfo: 'it@school.edu',
    imageUrl: 'https://example.com/computer-lab.jpg',
    imageId: 'comp-001',
    metaTitle: 'Computer Lab - School Name',
    metaDescription: 'Modern computing facilities for students',
    metaKeywords: 'computer, technology, lab, internet',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    campus: {
      id: '1',
      name: 'Main Campus',
      isMain: true
    },
    listing: {
      id: '1',
      name: 'University of Lagos',
      slug: 'university-of-lagos'
    },
    photos: []
  },
  {
    id: '5',
    name: 'Health Center',
    description: 'On-campus medical facility providing basic healthcare services to students.',
    type: FacilityType.HEALTH,
    campusId: '1',
    listingId: '1',
    isActive: true,
    features: ['Medical Consultation', 'First Aid', 'Health Checkups', 'Emergency Care'],
    capacity: 20,
    operatingHours: 'Monday-Friday: 8:00 AM - 5:00 PM, Emergency: 24/7',
    contactInfo: 'health@school.edu',
    imageUrl: 'https://example.com/health-center.jpg',
    imageId: 'health-001',
    metaTitle: 'Health Center - School Name',
    metaDescription: 'On-campus medical and health services',
    metaKeywords: 'health, medical, clinic, healthcare',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    campus: {
      id: '1',
      name: 'Main Campus',
      isMain: true
    },
    listing: {
      id: '1',
      name: 'University of Lagos',
      slug: 'university-of-lagos'
    },
    photos: []
  }
];

// ========== API FUNCTIONS ==========
export async function getFacilities(
  filters?: FacilityFilter,
  pagination?: { page?: number; limit?: number },
  sort?: FacilitySort,
  accessToken?: string
): Promise<FacilityResponse> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_FACILITIES_QUERY,
    //   variables: { filters, pagination, sort },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getFacilities;
    
    // Return mock data for now
    let filteredFacilities = [...mockFacilities];
    
    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredFacilities = filteredFacilities.filter(facility =>
          facility.name.toLowerCase().includes(searchLower) ||
          facility.description?.toLowerCase().includes(searchLower)
        );
      }
      
      if (filters.type) {
        filteredFacilities = filteredFacilities.filter(facility =>
          facility.type === filters.type
        );
      }
      
      if (filters.isActive !== undefined) {
        filteredFacilities = filteredFacilities.filter(facility =>
          facility.isActive === filters.isActive
        );
      }
      
      if (filters.campusId) {
        filteredFacilities = filteredFacilities.filter(facility =>
          facility.campusId === filters.campusId
        );
      }
      
      if (filters.listingId) {
        filteredFacilities = filteredFacilities.filter(facility =>
          facility.listingId === filters.listingId
        );
      }
      
      if (filters.hasImage !== undefined) {
        filteredFacilities = filteredFacilities.filter(facility =>
          filters.hasImage ? !!facility.imageUrl : !facility.imageUrl
        );
      }
    }
    
    // Apply sorting
    if (sort) {
      filteredFacilities.sort((a, b) => {
        if (sort.name) {
          return sort.name === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        if (sort.type) {
          return sort.type === 'asc'
            ? a.type.localeCompare(b.type)
            : b.type.localeCompare(a.type);
        }
        if (sort.createdAt) {
          const aDate = new Date(a.createdAt).getTime();
          const bDate = new Date(b.createdAt).getTime();
          return sort.createdAt === 'asc' ? aDate - bDate : bDate - aDate;
        }
        if (sort.updatedAt) {
          const aDate = new Date(a.updatedAt).getTime();
          const bDate = new Date(b.updatedAt).getTime();
          return sort.updatedAt === 'asc' ? aDate - bDate : bDate - aDate;
        }
        return 0;
      });
    }
    
    const total = filteredFacilities.length;
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;
    const paginatedFacilities = filteredFacilities.slice(skip, skip + limit);
    
    return {
      facilities: paginatedFacilities,
      total,
      hasMore: skip + limit < total
    };
  } catch (error) {
    console.error('Error fetching facilities:', error);
    return {
      facilities: mockFacilities,
      total: mockFacilities.length,
      hasMore: false
    };
  }
}

export async function getFacility(
  id: string,
  accessToken?: string
): Promise<Facility & { photos?: FacilityPhoto[] } | null> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_FACILITY_QUERY,
    //   variables: { id },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getFacility;
    
    // Return mock data for now
    return mockFacilities.find(facility => facility.id === id) || null;
  } catch (error) {
    console.error('Error fetching facility:', error);
    return null;
  }
}

export async function getFacilityBySlug(
  slug: string,
  accessToken?: string
): Promise<Facility & { photos?: FacilityPhoto[] } | null> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_FACILITY_BY_SLUG_QUERY,
    //   variables: { slug },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getFacilityBySlug;
    
    // Return mock data for now (assuming slug is name-based)
    return mockFacilities.find(facility => 
      facility.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
    ) || null;
  } catch (error) {
    console.error('Error fetching facility by slug:', error);
    return null;
  }
}

export async function getFacilitiesByCampus(
  campusId: string,
  accessToken?: string
): Promise<Facility[]> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_FACILITIES_BY_CAMPUS_QUERY,
    //   variables: { campusId },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getFacilitiesByCampus;
    
    // Return mock data for now
    return mockFacilities.filter(facility => facility.campusId === campusId);
  } catch (error) {
    console.error('Error fetching facilities by campus:', error);
    return mockFacilities.filter(facility => facility.campusId === campusId);
  }
}

export async function getFacilitiesByListing(
  listingId: string,
  accessToken?: string
): Promise<Facility[]> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_FACILITIES_BY_LISTING_QUERY,
    //   variables: { listingId },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getFacilitiesByListing;
    
    // Return mock data for now
    return mockFacilities.filter(facility => facility.listingId === listingId);
  } catch (error) {
    console.error('Error fetching facilities by listing:', error);
    return mockFacilities.filter(facility => facility.listingId === listingId);
  }
}

// ========== UTILITY API FUNCTIONS ==========
export async function getActiveFacilities(accessToken?: string): Promise<Facility[]> {
  try {
    const result = await getFacilities(
      { isActive: true },
      { page: 1, limit: 100 },
      { name: 'asc' },
      accessToken
    );
    return result.facilities;
  } catch (error) {
    console.error('Error fetching active facilities:', error);
    return mockFacilities.filter(facility => facility.isActive);
  }
}

export async function getFacilitiesByType(
  type: FacilityType,
  accessToken?: string
): Promise<Facility[]> {
  try {
    const result = await getFacilities(
      { type, isActive: true },
      { page: 1, limit: 100 },
      { name: 'asc' },
      accessToken
    );
    return result.facilities;
  } catch (error) {
    console.error('Error fetching facilities by type:', error);
    return mockFacilities.filter(facility => facility.type === type && facility.isActive);
  }
}

export async function searchFacilities(
  searchTerm: string,
  accessToken?: string
): Promise<Facility[]> {
  try {
    const result = await getFacilities(
      { search: searchTerm, isActive: true },
      { page: 1, limit: 50 },
      { name: 'asc' },
      accessToken
    );
    return result.facilities;
  } catch (error) {
    console.error('Error searching facilities:', error);
    return mockFacilities.filter(facility =>
      facility.isActive &&
      (facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       facility.description?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }
}

export async function getFacilitiesWithPagination(
  page: number = 1,
  limit: number = 10,
  filter?: FacilityFilter,
  accessToken?: string
): Promise<FacilityResponse> {
  try {
    return getFacilities(
      filter || { isActive: true },
      { page, limit },
      { name: 'asc' },
      accessToken
    );
  } catch (error) {
    console.error('Error fetching facilities with pagination:', error);
    return {
      facilities: mockFacilities,
      total: mockFacilities.length,
      hasMore: false
    };
  }
}

// ========== MUTATION FUNCTIONS ==========
export async function createFacility(
  input: CreateFacilityInput,
  accessToken: string
): Promise<Facility> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: CREATE_FACILITY_MUTATION,
    //   variables: { input },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.createFacility;
    
    throw new Error('Create facility not implemented yet');
  } catch (error) {
    console.error('Error creating facility:', error);
    throw error;
  }
}

export async function updateFacility(
  id: string,
  input: UpdateFacilityInput,
  accessToken: string
): Promise<Facility> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: UPDATE_FACILITY_MUTATION,
    //   variables: { id, input },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.updateFacility;
    
    throw new Error('Update facility not implemented yet');
  } catch (error) {
    console.error('Error updating facility:', error);
    throw error;
  }
}

export async function deleteFacility(
  id: string,
  accessToken: string
): Promise<boolean> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: DELETE_FACILITY_MUTATION,
    //   variables: { id },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.removeFacility === true;
    
    throw new Error('Delete facility not implemented yet');
  } catch (error) {
    console.error('Error deleting facility:', error);
    throw error;
  }
}

export async function toggleFacilityStatus(
  id: string,
  accessToken: string
): Promise<Facility> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: TOGGLE_FACILITY_STATUS_MUTATION,
    //   variables: { id },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.toggleFacilityStatus;
    
    throw new Error('Toggle facility status not implemented yet');
  } catch (error) {
    console.error('Error toggling facility status:', error);
    throw error;
  }
}
