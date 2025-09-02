import { gql } from '@apollo/client';

// ========== TYPES ==========
export enum CampusType {
  MAIN = 'MAIN',
  BRANCH = 'BRANCH',
  EXTENSION = 'EXTENSION',
  ONLINE = 'ONLINE',
  SATELLITE = 'SATELLITE'
}

export enum CampusStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  UNDER_CONSTRUCTION = 'UNDER_CONSTRUCTION',
  PLANNED = 'PLANNED',
  CLOSED = 'CLOSED'
}

// ========== INTERFACES ==========
export interface Campus {
  id: string;
  name: string;
  slug: string;
  description?: string;
  type: CampusType;
  status: CampusStatus;
  address: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  website?: string;
  capacity?: number;
  currentEnrollment?: number;
  yearEstablished?: number;
  facilities: string[];
  amenities: string[];
  transportation?: string;
  parking?: string;
  security?: string;
  isMainCampus: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  listingId: string;
  listing: {
    id: string;
    name: string;
    slug: string;
    owner: {
      id: string;
      firstName?: string;
      lastName?: string;
      email: string;
      profile?: {
        name?: string;
        avatar?: string;
      };
    };
  };
  // Computed fields
  fullAddress?: string;
  enrollmentPercentage?: number;
  facilitiesCount?: number;
  amenitiesCount?: number;
}

export interface CampusFiltersInput {
  search?: string;
  type?: CampusType;
  status?: CampusStatus;
  listingId?: string;
  country?: string;
  city?: string;
  isMainCampus?: boolean;
  isActive?: boolean;
  hasFacilities?: boolean;
  hasAmenities?: boolean;
  minCapacity?: number;
  maxCapacity?: number;
  minEnrollment?: number;
  maxEnrollment?: number;
  yearEstablishedFrom?: number;
  yearEstablishedTo?: number;
  createdAtFrom?: string;
  createdAtTo?: string;
}

export interface PaginationInput {
  page?: number;
  limit?: number;
  skip?: number;
  take?: number;
}

export interface CampusSortInput {
  field: 'NAME' | 'TYPE' | 'STATUS' | 'CITY' | 'COUNTRY' | 'CAPACITY' | 'CURRENT_ENROLLMENT' | 'YEAR_ESTABLISHED' | 'CREATED_AT' | 'UPDATED_AT';
  order: 'ASC' | 'DESC';
}

export interface CreateCampusInput {
  name: string;
  description?: string;
  type: CampusType;
  status: CampusStatus;
  address: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  website?: string;
  capacity?: number;
  currentEnrollment?: number;
  yearEstablished?: number;
  facilities: string[];
  amenities: string[];
  transportation?: string;
  parking?: string;
  security?: string;
  isMainCampus: boolean;
  isActive: boolean;
  listingId: string;
}

export interface UpdateCampusInput {
  name?: string;
  description?: string;
  type?: CampusType;
  status?: CampusStatus;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  website?: string;
  capacity?: number;
  currentEnrollment?: number;
  yearEstablished?: number;
  facilities?: string[];
  amenities?: string[];
  transportation?: string;
  parking?: string;
  security?: string;
  isMainCampus?: boolean;
  isActive?: boolean;
}

export interface CampusesResponse {
  edges: {
    node: Campus;
    cursor: string;
  }[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  };
  totalCount: number;
}

export interface CampusAnalyticsResponse {
  totalCampuses: number;
  activeCampuses: number;
  mainCampuses: number;
  branchCampuses: number;
  extensionCampuses: number;
  onlineCampuses: number;
  satelliteCampuses: number;
  underConstruction: number;
  planned: number;
  closed: number;
  totalCapacity: number;
  totalEnrollment: number;
  averageEnrollmentRate: number;
  typeDistribution: {
    type: CampusType;
    count: number;
    percentage: number;
  }[];
  statusDistribution: {
    status: CampusStatus;
    count: number;
    percentage: number;
  }[];
  topCampuses: {
    id: string;
    name: string;
    type: CampusType;
    enrollmentRate: number;
    listing: {
      id: string;
      name: string;
      slug: string;
    };
  }[];
}

// ========== GRAPHQL FRAGMENTS ==========
const CAMPUS_FRAGMENT = gql`
  fragment CampusFragment on Campus {
    id
    name
    slug
    description
    type
    status
    address
    city
    state
    postalCode
    country
    latitude
    longitude
    phone
    email
    website
    capacity
    currentEnrollment
    yearEstablished
    facilities
    amenities
    transportation
    parking
    security
    isMainCampus
    isActive
    createdAt
    updatedAt
    listingId
    listing {
      id
      name
      slug
      owner {
        id
        firstName
        lastName
        email
        profile {
          name
          avatar
        }
      }
    }
    fullAddress
    enrollmentPercentage
    facilitiesCount
    amenitiesCount
  }
`;

// ========== GRAPHQL QUERIES ==========
const GET_CAMPUSES_QUERY = gql`
  ${CAMPUS_FRAGMENT}
  query GetCampuses($where: CampusWhereInput, $orderBy: CampusOrderByInput, $skip: Int, $take: Int) {
    getCampuses(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {
      edges {
        node {
          ...CampusFragment
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

const GET_CAMPUS_QUERY = gql`
  ${CAMPUS_FRAGMENT}
  query GetCampus($id: ID!) {
    getCampus(id: $id) {
      ...CampusFragment
    }
  }
`;

const GET_CAMPUSES_BY_LISTING_QUERY = gql`
  ${CAMPUS_FRAGMENT}
  query GetCampusesByListing($listingId: String!) {
    getCampusesByListing(listingId: $listingId) {
      ...CampusFragment
    }
  }
`;

const GET_CAMPUS_ANALYTICS_QUERY = gql`
  query GetCampusAnalytics($input: CampusAnalyticsInput) {
    getCampusAnalytics(input: $input) {
      totalCampuses
      activeCampuses
      mainCampuses
      branchCampuses
      extensionCampuses
      onlineCampuses
      satelliteCampuses
      underConstruction
      planned
      closed
      totalCapacity
      totalEnrollment
      averageEnrollmentRate
      typeDistribution {
        type
        count
        percentage
      }
      statusDistribution {
        status
        count
        percentage
      }
      topCampuses {
        id
        name
        type
        enrollmentRate
        listing {
          id
          name
          slug
        }
      }
    }
  }
`;

// ========== GRAPHQL MUTATIONS ==========
const CREATE_CAMPUS_MUTATION = gql`
  ${CAMPUS_FRAGMENT}
  mutation CreateCampus($input: CreateCampusInput!) {
    createCampus(input: $input) {
      ...CampusFragment
    }
  }
`;

const UPDATE_CAMPUS_MUTATION = gql`
  ${CAMPUS_FRAGMENT}
  mutation UpdateCampus($id: ID!, $input: UpdateCampusInput!) {
    updateCampus(id: $id, input: $input) {
      ...CampusFragment
    }
  }
`;

const DELETE_CAMPUS_MUTATION = gql`
  ${CAMPUS_FRAGMENT}
  mutation DeleteCampus($id: ID!) {
    deleteCampus(id: $id) {
      ...CampusFragment
    }
  }
`;

// ========== UTILITY FUNCTIONS ==========
export function getCampusTypeLabel(type: CampusType): string {
  const labels: Record<CampusType, string> = {
    [CampusType.MAIN]: 'Main Campus',
    [CampusType.BRANCH]: 'Branch Campus',
    [CampusType.EXTENSION]: 'Extension Campus',
    [CampusType.ONLINE]: 'Online Campus',
    [CampusType.SATELLITE]: 'Satellite Campus'
  };
  return labels[type] || type;
}

export function getCampusStatusLabel(status: CampusStatus): string {
  const labels: Record<CampusStatus, string> = {
    [CampusStatus.ACTIVE]: 'Active',
    [CampusStatus.INACTIVE]: 'Inactive',
    [CampusStatus.UNDER_CONSTRUCTION]: 'Under Construction',
    [CampusStatus.PLANNED]: 'Planned',
    [CampusStatus.CLOSED]: 'Closed'
  };
  return labels[status] || status;
}

export function getCampusStatusColor(status: CampusStatus): string {
  const colors: Record<CampusStatus, string> = {
    [CampusStatus.ACTIVE]: 'green',
    [CampusStatus.INACTIVE]: 'gray',
    [CampusStatus.UNDER_CONSTRUCTION]: 'yellow',
    [CampusStatus.PLANNED]: 'blue',
    [CampusStatus.CLOSED]: 'red'
  };
  return colors[status] || 'gray';
}

export function formatCampusAddress(campus: Campus): string {
  const parts: string[] = [];
  
  if (campus.address) parts.push(campus.address);
  if (campus.city) parts.push(campus.city);
  if (campus.state) parts.push(campus.state);
  if (campus.country) parts.push(campus.country);
  if (campus.postalCode) parts.push(campus.postalCode);
  
  return parts.join(', ');
}

export function calculateEnrollmentPercentage(campus: Campus): number {
  if (!campus.capacity || !campus.currentEnrollment) return 0;
  return Math.round((campus.currentEnrollment / campus.capacity) * 100);
}

export function getCampusTypeIcon(type: CampusType): string {
  const icons: Record<CampusType, string> = {
    [CampusType.MAIN]: '🏛️',
    [CampusType.BRANCH]: '🏢',
    [CampusType.EXTENSION]: '🏫',
    [CampusType.ONLINE]: '💻',
    [CampusType.SATELLITE]: '🛰️'
  };
  return icons[type] || '🏫';
}

// ========== MOCK DATA ==========
export const mockCampuses: Campus[] = [
  {
    id: '1',
    name: 'Main Campus - Victoria Island',
    slug: 'main-campus-victoria-island',
    description: 'The main campus located in the heart of Victoria Island, Lagos.',
    type: CampusType.MAIN,
    status: CampusStatus.ACTIVE,
    address: '123 Ahmadu Bello Way',
    city: 'Victoria Island',
    state: 'Lagos',
    postalCode: '101241',
    country: 'Nigeria',
    latitude: 6.4281,
    longitude: 3.4219,
    phone: '+234-1-234-5678',
    email: 'info@university.edu.ng',
    website: 'https://university.edu.ng',
    capacity: 5000,
    currentEnrollment: 4200,
    yearEstablished: 1962,
    facilities: ['Library', 'Laboratory', 'Sports Complex', 'Cafeteria', 'Auditorium'],
    amenities: ['WiFi', 'Parking', 'Security', 'Transportation', 'Medical Center'],
    transportation: 'Bus service available to major areas',
    parking: '500 parking spaces available',
    security: '24/7 security with CCTV surveillance',
    isMainCampus: true,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    listingId: '1',
    listing: {
      id: '1',
      name: 'University of Lagos',
      slug: 'university-of-lagos',
      owner: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'admin@university.edu.ng',
        profile: {
          name: 'John Doe',
          avatar: 'https://example.com/avatar.jpg'
        }
      }
    },
    fullAddress: '123 Ahmadu Bello Way, Victoria Island, Lagos, Nigeria, 101241',
    enrollmentPercentage: 84,
    facilitiesCount: 5,
    amenitiesCount: 5
  },
  {
    id: '2',
    name: 'Branch Campus - Ikeja',
    slug: 'branch-campus-ikeja',
    description: 'Branch campus located in Ikeja for evening and weekend programs.',
    type: CampusType.BRANCH,
    status: CampusStatus.ACTIVE,
    address: '456 Obafemi Awolowo Way',
    city: 'Ikeja',
    state: 'Lagos',
    postalCode: '100001',
    country: 'Nigeria',
    latitude: 6.6059,
    longitude: 3.3515,
    phone: '+234-1-234-5679',
    email: 'ikeja@university.edu.ng',
    website: 'https://university.edu.ng/ikeja',
    capacity: 2000,
    currentEnrollment: 1500,
    yearEstablished: 1995,
    facilities: ['Library', 'Computer Lab', 'Cafeteria', 'Conference Room'],
    amenities: ['WiFi', 'Parking', 'Security'],
    transportation: 'Easy access via public transport',
    parking: '200 parking spaces',
    security: '24/7 security',
    isMainCampus: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    listingId: '1',
    listing: {
      id: '1',
      name: 'University of Lagos',
      slug: 'university-of-lagos',
      owner: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'admin@university.edu.ng',
        profile: {
          name: 'John Doe',
          avatar: 'https://example.com/avatar.jpg'
        }
      }
    },
    fullAddress: '456 Obafemi Awolowo Way, Ikeja, Lagos, Nigeria, 100001',
    enrollmentPercentage: 75,
    facilitiesCount: 4,
    amenitiesCount: 3
  }
];

// ========== API FUNCTIONS ==========
export async function getCampuses(
  variables?: {
    where?: CampusFiltersInput;
    orderBy?: CampusSortInput;
    skip?: number;
    take?: number;
  },
  accessToken?: string
): Promise<CampusesResponse> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_CAMPUSES_QUERY,
    //   variables,
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getCampuses;
    
    // Return mock data for now
    let filteredCampuses = [...mockCampuses];
    
    if (variables?.where) {
      const filters = variables.where;
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredCampuses = filteredCampuses.filter(campus =>
          campus.name.toLowerCase().includes(searchLower) ||
          campus.city.toLowerCase().includes(searchLower) ||
          campus.country.toLowerCase().includes(searchLower)
        );
      }
      
      if (filters.type) {
        filteredCampuses = filteredCampuses.filter(campus => campus.type === filters.type);
      }
      
      if (filters.status) {
        filteredCampuses = filteredCampuses.filter(campus => campus.status === filters.status);
      }
      
      if (filters.listingId) {
        filteredCampuses = filteredCampuses.filter(campus => campus.listingId === filters.listingId);
      }
      
      if (filters.country) {
        filteredCampuses = filteredCampuses.filter(campus => 
          campus.country.toLowerCase().includes(filters.country!.toLowerCase())
        );
      }
      
      if (filters.city) {
        filteredCampuses = filteredCampuses.filter(campus => 
          campus.city.toLowerCase().includes(filters.city!.toLowerCase())
        );
      }
      
      if (filters.isMainCampus !== undefined) {
        filteredCampuses = filteredCampuses.filter(campus => campus.isMainCampus === filters.isMainCampus);
      }
      
      if (filters.isActive !== undefined) {
        filteredCampuses = filteredCampuses.filter(campus => campus.isActive === filters.isActive);
      }
      
      if (filters.minCapacity) {
        filteredCampuses = filteredCampuses.filter(campus => 
          campus.capacity && campus.capacity >= filters.minCapacity!
        );
      }
      
      if (filters.maxCapacity) {
        filteredCampuses = filteredCampuses.filter(campus => 
          campus.capacity && campus.capacity <= filters.maxCapacity!
        );
      }
    }
    
    const totalCount = filteredCampuses.length;
    const skip = variables?.skip || 0;
    const take = variables?.take || 10;
    const paginatedCampuses = filteredCampuses.slice(skip, skip + take);
    
    return {
      edges: paginatedCampuses.map((campus, index) => ({
        node: campus,
        cursor: `cursor-${skip + index}`
      })),
      pageInfo: {
        hasNextPage: skip + take < totalCount,
        hasPreviousPage: skip > 0,
        startCursor: `cursor-${skip}`,
        endCursor: `cursor-${skip + paginatedCampuses.length - 1}`
      },
      totalCount
    };
  } catch (error) {
    console.error('Error fetching campuses:', error);
    return {
      edges: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: '',
        endCursor: ''
      },
      totalCount: 0
    };
  }
}

export async function getCampus(
  id: string,
  accessToken?: string
): Promise<Campus | null> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_CAMPUS_QUERY,
    //   variables: { id },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getCampus;
    
    // Return mock data for now
    return mockCampuses.find(campus => campus.id === id) || null;
  } catch (error) {
    console.error('Error fetching campus:', error);
    return null;
  }
}

export async function getCampusesByListing(
  listingId: string,
  accessToken?: string
): Promise<Campus[]> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_CAMPUSES_BY_LISTING_QUERY,
    //   variables: { listingId },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getCampusesByListing || [];
    
    // Return mock data for now
    return mockCampuses.filter(campus => campus.listingId === listingId);
  } catch (error) {
    console.error('Error fetching campuses by listing:', error);
    return mockCampuses.filter(campus => campus.listingId === listingId);
  }
}

export async function getCampusAnalytics(
  input?: any,
  accessToken?: string
): Promise<CampusAnalyticsResponse> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_CAMPUS_ANALYTICS_QUERY,
    //   variables: { input },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getCampusAnalytics;
    
    // Return mock data for now
    const totalCampuses = mockCampuses.length;
    const activeCampuses = mockCampuses.filter(c => c.status === CampusStatus.ACTIVE).length;
    const mainCampuses = mockCampuses.filter(c => c.type === CampusType.MAIN).length;
    const branchCampuses = mockCampuses.filter(c => c.type === CampusType.BRANCH).length;
    const totalCapacity = mockCampuses.reduce((sum, c) => sum + (c.capacity || 0), 0);
    const totalEnrollment = mockCampuses.reduce((sum, c) => sum + (c.currentEnrollment || 0), 0);
    const averageEnrollmentRate = totalCapacity > 0 ? (totalEnrollment / totalCapacity) * 100 : 0;
    
    return {
      totalCampuses,
      activeCampuses,
      mainCampuses,
      branchCampuses,
      extensionCampuses: 0,
      onlineCampuses: 0,
      satelliteCampuses: 0,
      underConstruction: 0,
      planned: 0,
      closed: 0,
      totalCapacity,
      totalEnrollment,
      averageEnrollmentRate,
      typeDistribution: [
        { type: CampusType.MAIN, count: mainCampuses, percentage: (mainCampuses / totalCampuses) * 100 },
        { type: CampusType.BRANCH, count: branchCampuses, percentage: (branchCampuses / totalCampuses) * 100 }
      ],
      statusDistribution: [
        { status: CampusStatus.ACTIVE, count: activeCampuses, percentage: (activeCampuses / totalCampuses) * 100 }
      ],
      topCampuses: mockCampuses.map(campus => ({
        id: campus.id,
        name: campus.name,
        type: campus.type,
        enrollmentRate: calculateEnrollmentPercentage(campus),
        listing: {
          id: campus.listing.id,
          name: campus.listing.name,
          slug: campus.listing.slug
        }
      }))
    };
  } catch (error) {
    console.error('Error fetching campus analytics:', error);
    return {
      totalCampuses: 0,
      activeCampuses: 0,
      mainCampuses: 0,
      branchCampuses: 0,
      extensionCampuses: 0,
      onlineCampuses: 0,
      satelliteCampuses: 0,
      underConstruction: 0,
      planned: 0,
      closed: 0,
      totalCapacity: 0,
      totalEnrollment: 0,
      averageEnrollmentRate: 0,
      typeDistribution: [],
      statusDistribution: [],
      topCampuses: []
    };
  }
}

// ========== MUTATION FUNCTIONS ==========
export async function createCampus(
  input: CreateCampusInput,
  accessToken: string
): Promise<Campus> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: CREATE_CAMPUS_MUTATION,
    //   variables: { input },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.createCampus;
    
    throw new Error('Create campus not implemented yet');
  } catch (error) {
    console.error('Error creating campus:', error);
    throw error;
  }
}

export async function updateCampus(
  id: string,
  input: UpdateCampusInput,
  accessToken: string
): Promise<Campus> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: UPDATE_CAMPUS_MUTATION,
    //   variables: { id, input },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.updateCampus;
    
    throw new Error('Update campus not implemented yet');
  } catch (error) {
    console.error('Error updating campus:', error);
    throw error;
  }
}

export async function deleteCampus(
  id: string,
  accessToken: string
): Promise<Campus> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: DELETE_CAMPUS_MUTATION,
    //   variables: { id },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.deleteCampus;
    
    throw new Error('Delete campus not implemented yet');
  } catch (error) {
    console.error('Error deleting campus:', error);
    throw error;
  }
}
