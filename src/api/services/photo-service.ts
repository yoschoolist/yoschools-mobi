import { gql } from '@apollo/client';

// ========== TYPES ==========
export enum PhotoCategory {
  GENERAL = 'GENERAL',
  EXTERIOR = 'EXTERIOR',
  INTERIOR = 'INTERIOR',
  CLASSROOMS = 'CLASSROOMS',
  LABORATORIES = 'LABORATORIES',
  LIBRARY = 'LIBRARY',
  SPORTS_FACILITIES = 'SPORTS_FACILITIES',
  DINING = 'DINING',
  DORMITORY = 'DORMITORY',
  PLAYGROUND = 'PLAYGROUND',
  EVENTS = 'EVENTS',
  STAFF = 'STAFF',
  STUDENTS = 'STUDENTS',
  GRADUATION = 'GRADUATION',
  FACILITIES = 'FACILITIES',
  TRANSPORTATION = 'TRANSPORTATION',
  WORKPLACE = 'WORKPLACE',
  TEAM = 'TEAM',
  OFFICE = 'OFFICE',
  WORK_ENVIRONMENT = 'WORK_ENVIRONMENT',
  BENEFITS = 'BENEFITS',
  EVENT_VENUE = 'EVENT_VENUE',
  EVENT_SETUP = 'EVENT_SETUP',
  ATTENDEES = 'ATTENDEES',
  SPEAKERS = 'SPEAKERS',
  ACTIVITIES = 'ACTIVITIES',
  CEREMONY = 'CEREMONY'
}

// ========== INTERFACES ==========
export interface Photo {
  id: string;
  imageUrl?: string;
  imageId?: string;
  caption?: string;
  isFeatured: boolean;
  viewCount: number;
  likeCount: number;
  category: PhotoCategory;
  tags: string[];
  listingId?: string;
  campusId?: string;
  jobId?: string;
  eventId?: string;
  alt?: string;
  sortOrder: number;
  resourceId?: string;
  facilityId?: string;
  courseId?: string;
  createdAt: string;
  updatedAt: string;
  listing?: any;
  campus?: any;
  job?: any;
  event?: any;
  resourcePhoto?: any;
  facility?: any;
  course?: any;
}

export interface CreatePhotoInput {
  imageUrl?: string;
  imageId?: string;
  caption?: string;
  isFeatured?: boolean;
  category?: PhotoCategory;
  tags?: string[];
  listingId?: string;
  campusId?: string;
  jobId?: string;
  eventId?: string;
  alt?: string;
  sortOrder?: number;
  resourceId?: string;
  facilityId?: string;
  courseId?: string;
}

export interface UpdatePhotoInput {
  imageUrl?: string;
  imageId?: string;
  caption?: string;
  isFeatured?: boolean;
  category?: PhotoCategory;
  tags?: string[];
  listingId?: string;
  campusId?: string;
  jobId?: string;
  eventId?: string;
  alt?: string;
  sortOrder?: number;
  resourceId?: string;
  facilityId?: string;
  courseId?: string;
}

export interface PhotoFilter {
  category?: PhotoCategory;
  isFeatured?: boolean;
  tags?: string[];
  listingId?: string;
  campusId?: string;
  jobId?: string;
  eventId?: string;
  resourceId?: string;
  facilityId?: string;
  courseId?: string;
  createdAfter?: string;
  createdBefore?: string;
}

export interface PhotoSort {
  createdAt?: 'asc' | 'desc';
  updatedAt?: 'asc' | 'desc';
  sortOrder?: 'asc' | 'desc';
  viewCount?: 'asc' | 'desc';
  likeCount?: 'asc' | 'desc';
  caption?: 'asc' | 'desc';
}

export interface PhotoResponse {
  photos: Photo[];
  total: number;
  hasMore: boolean;
}

export interface PhotoStats {
  totalPhotos: number;
  featuredPhotos: number;
  totalViews: number;
  totalLikes: number;
  photosByCategory: {
    category: PhotoCategory;
    count: number;
  }[];
  averageViewsPerPhoto: number;
  averageLikesPerPhoto: number;
}

// ========== GRAPHQL QUERIES ==========
const GET_PHOTOS_QUERY = gql`
  query GetPhotos(
    $page: Int
    $limit: Int
    $filter: PhotoFilterInput
  ) {
    getPhotos(page: $page, limit: $limit, filter: $filter) {
      photos {
        id
        imageUrl
        imageId
        caption
        isFeatured
        viewCount
        likeCount
        category
        tags
        listingId
        campusId
        jobId
        eventId
        alt
        sortOrder
        resourceId
        facilityId
        courseId
        createdAt
        updatedAt
        listing {
          id
          name
          slug
        }
        campus {
          id
          name
        }
        job {
          id
          title
        }
        event {
          id
          title
        }
        facility {
          id
          name
        }
        course {
          id
          name
        }
      }
      total
      hasMore
    }
  }
`;

const GET_PHOTO_QUERY = gql`
  query GetPhoto($id: String!) {
    photo(id: $id) {
      id
      imageUrl
      imageId
      caption
      isFeatured
      viewCount
      likeCount
      category
      tags
      listingId
      campusId
      jobId
      eventId
      alt
      sortOrder
      resourceId
      facilityId
      courseId
      createdAt
      updatedAt
      listing {
        id
        name
        slug
      }
      campus {
        id
        name
      }
      job {
        id
        title
      }
      event {
        id
        title
      }
      facility {
        id
        name
      }
      course {
        id
        name
      }
    }
  }
`;

const GET_FEATURED_PHOTOS_QUERY = gql`
  query GetFeaturedPhotos(
    $page: Int
    $limit: Int
    $filter: PhotoFilterInput
  ) {
    getFeaturedPhotos(page: $page, limit: $limit, filter: $filter) {
      photos {
        id
        imageUrl
        imageId
        caption
        isFeatured
        viewCount
        likeCount
        category
        tags
        alt
        sortOrder
        createdAt
        updatedAt
      }
      total
      hasMore
    }
  }
`;

// ========== GRAPHQL MUTATIONS ==========
const CREATE_PHOTO_MUTATION = gql`
  mutation CreatePhoto($createPhotoInput: CreatePhotoInput!) {
    createPhoto(createPhotoInput: $createPhotoInput) {
      id
      imageUrl
      imageId
      caption
      isFeatured
      viewCount
      likeCount
      category
      tags
      listingId
      campusId
      jobId
      eventId
      alt
      sortOrder
      resourceId
      facilityId
      courseId
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_PHOTO_MUTATION = gql`
  mutation UpdatePhoto($id: String!, $updatePhotoInput: UpdatePhotoInput!) {
    updatePhoto(id: $id, updatePhotoInput: $updatePhotoInput) {
      id
      imageUrl
      imageId
      caption
      isFeatured
      viewCount
      likeCount
      category
      tags
      listingId
      campusId
      jobId
      eventId
      alt
      sortOrder
      resourceId
      facilityId
      courseId
      createdAt
      updatedAt
    }
  }
`;

const DELETE_PHOTO_MUTATION = gql`
  mutation RemovePhoto($id: String!) {
    removePhoto(id: $id) {
      message
    }
  }
`;

// ========== UTILITY FUNCTIONS ==========
export function formatPhotoCategory(category: PhotoCategory): string {
  const categoryMap: Record<PhotoCategory, string> = {
    [PhotoCategory.GENERAL]: 'General',
    [PhotoCategory.EXTERIOR]: 'Exterior',
    [PhotoCategory.INTERIOR]: 'Interior',
    [PhotoCategory.CLASSROOMS]: 'Classrooms',
    [PhotoCategory.LABORATORIES]: 'Laboratories',
    [PhotoCategory.LIBRARY]: 'Library',
    [PhotoCategory.SPORTS_FACILITIES]: 'Sports Facilities',
    [PhotoCategory.DINING]: 'Dining',
    [PhotoCategory.DORMITORY]: 'Dormitory',
    [PhotoCategory.PLAYGROUND]: 'Playground',
    [PhotoCategory.EVENTS]: 'Events',
    [PhotoCategory.STAFF]: 'Staff',
    [PhotoCategory.STUDENTS]: 'Students',
    [PhotoCategory.GRADUATION]: 'Graduation',
    [PhotoCategory.FACILITIES]: 'Facilities',
    [PhotoCategory.TRANSPORTATION]: 'Transportation',
    [PhotoCategory.WORKPLACE]: 'Workplace',
    [PhotoCategory.TEAM]: 'Team',
    [PhotoCategory.OFFICE]: 'Office',
    [PhotoCategory.WORK_ENVIRONMENT]: 'Work Environment',
    [PhotoCategory.BENEFITS]: 'Benefits',
    [PhotoCategory.EVENT_VENUE]: 'Event Venue',
    [PhotoCategory.EVENT_SETUP]: 'Event Setup',
    [PhotoCategory.ATTENDEES]: 'Attendees',
    [PhotoCategory.SPEAKERS]: 'Speakers',
    [PhotoCategory.ACTIVITIES]: 'Activities',
    [PhotoCategory.CEREMONY]: 'Ceremony'
  };
  return categoryMap[category] || category;
}

export function getPhotoCategoryIcon(category: PhotoCategory): string {
  const iconMap: Record<PhotoCategory, string> = {
    [PhotoCategory.GENERAL]: '📷',
    [PhotoCategory.EXTERIOR]: '🏢',
    [PhotoCategory.INTERIOR]: '🏠',
    [PhotoCategory.CLASSROOMS]: '📚',
    [PhotoCategory.LABORATORIES]: '🔬',
    [PhotoCategory.LIBRARY]: '📖',
    [PhotoCategory.SPORTS_FACILITIES]: '⚽',
    [PhotoCategory.DINING]: '🍽️',
    [PhotoCategory.DORMITORY]: '🏠',
    [PhotoCategory.PLAYGROUND]: '🎮',
    [PhotoCategory.EVENTS]: '🎉',
    [PhotoCategory.STAFF]: '👨‍🏫',
    [PhotoCategory.STUDENTS]: '👨‍🎓',
    [PhotoCategory.GRADUATION]: '🎓',
    [PhotoCategory.FACILITIES]: '🏗️',
    [PhotoCategory.TRANSPORTATION]: '🚌',
    [PhotoCategory.WORKPLACE]: '💼',
    [PhotoCategory.TEAM]: '👥',
    [PhotoCategory.OFFICE]: '🏢',
    [PhotoCategory.WORK_ENVIRONMENT]: '💻',
    [PhotoCategory.BENEFITS]: '🎁',
    [PhotoCategory.EVENT_VENUE]: '🏟️',
    [PhotoCategory.EVENT_SETUP]: '🎪',
    [PhotoCategory.ATTENDEES]: '👥',
    [PhotoCategory.SPEAKERS]: '🎤',
    [PhotoCategory.ACTIVITIES]: '🎯',
    [PhotoCategory.CEREMONY]: '🏆'
  };
  return iconMap[category] || '📷';
}

export function formatPhotoTags(tags: string[]): string {
  if (tags.length === 0) return 'No tags';
  if (tags.length === 1) return tags[0];
  if (tags.length === 2) return tags.join(' and ');
  return `${tags.slice(0, -1).join(', ')} and ${tags[tags.length - 1]}`;
}

export function formatViewCount(count: number): string {
  if (count === 0) return 'No views';
  if (count === 1) return '1 view';
  return `${count} views`;
}

export function formatLikeCount(count: number): string {
  if (count === 0) return 'No likes';
  if (count === 1) return '1 like';
  return `${count} likes`;
}

// ========== MOCK DATA ==========
export const mockPhotos: Photo[] = [
  {
    id: '1',
    imageUrl: 'https://example.com/photo1.jpg',
    imageId: 'photo-001',
    caption: 'Beautiful campus entrance with modern architecture',
    isFeatured: true,
    viewCount: 1250,
    likeCount: 45,
    category: PhotoCategory.EXTERIOR,
    tags: ['campus', 'architecture', 'entrance'],
    listingId: '1',
    alt: 'Campus entrance view',
    sortOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    listing: {
      id: '1',
      name: 'University of Lagos',
      slug: 'university-of-lagos'
    }
  },
  {
    id: '2',
    imageUrl: 'https://example.com/photo2.jpg',
    imageId: 'photo-002',
    caption: 'Modern library with extensive book collection',
    isFeatured: true,
    viewCount: 980,
    likeCount: 32,
    category: PhotoCategory.LIBRARY,
    tags: ['library', 'books', 'study'],
    listingId: '1',
    alt: 'Library interior',
    sortOrder: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    listing: {
      id: '1',
      name: 'University of Lagos',
      slug: 'university-of-lagos'
    }
  },
  {
    id: '3',
    imageUrl: 'https://example.com/photo3.jpg',
    imageId: 'photo-003',
    caption: 'State-of-the-art science laboratory',
    isFeatured: false,
    viewCount: 750,
    likeCount: 28,
    category: PhotoCategory.LABORATORIES,
    tags: ['laboratory', 'science', 'equipment'],
    listingId: '1',
    alt: 'Science laboratory',
    sortOrder: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    listing: {
      id: '1',
      name: 'University of Lagos',
      slug: 'university-of-lagos'
    }
  },
  {
    id: '4',
    imageUrl: 'https://example.com/photo4.jpg',
    imageId: 'photo-004',
    caption: 'Students enjoying lunch in the cafeteria',
    isFeatured: false,
    viewCount: 650,
    likeCount: 15,
    category: PhotoCategory.DINING,
    tags: ['dining', 'students', 'cafeteria'],
    listingId: '1',
    alt: 'Cafeteria scene',
    sortOrder: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    listing: {
      id: '1',
      name: 'University of Lagos',
      slug: 'university-of-lagos'
    }
  },
  {
    id: '5',
    imageUrl: 'https://example.com/photo5.jpg',
    imageId: 'photo-005',
    caption: 'Graduation ceremony celebration',
    isFeatured: true,
    viewCount: 2100,
    likeCount: 89,
    category: PhotoCategory.GRADUATION,
    tags: ['graduation', 'ceremony', 'celebration'],
    listingId: '1',
    alt: 'Graduation ceremony',
    sortOrder: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    listing: {
      id: '1',
      name: 'University of Lagos',
      slug: 'university-of-lagos'
    }
  }
];

// ========== API FUNCTIONS ==========
export async function getPhotos(
  page?: number,
  limit?: number,
  filter?: PhotoFilter,
  accessToken?: string
): Promise<PhotoResponse> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_PHOTOS_QUERY,
    //   variables: { page, limit, filter },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getPhotos;
    
    // Return mock data for now
    let filteredPhotos = [...mockPhotos];
    
    if (filter) {
      if (filter.category) {
        filteredPhotos = filteredPhotos.filter(photo => photo.category === filter.category);
      }
      
      if (filter.isFeatured !== undefined) {
        filteredPhotos = filteredPhotos.filter(photo => photo.isFeatured === filter.isFeatured);
      }
      
      if (filter.tags && filter.tags.length > 0) {
        filteredPhotos = filteredPhotos.filter(photo =>
          filter.tags!.some(tag => photo.tags.includes(tag))
        );
      }
      
      if (filter.listingId) {
        filteredPhotos = filteredPhotos.filter(photo => photo.listingId === filter.listingId);
      }
      
      if (filter.campusId) {
        filteredPhotos = filteredPhotos.filter(photo => photo.campusId === filter.campusId);
      }
      
      if (filter.jobId) {
        filteredPhotos = filteredPhotos.filter(photo => photo.jobId === filter.jobId);
      }
      
      if (filter.eventId) {
        filteredPhotos = filteredPhotos.filter(photo => photo.eventId === filter.eventId);
      }
      
      if (filter.facilityId) {
        filteredPhotos = filteredPhotos.filter(photo => photo.facilityId === filter.facilityId);
      }
      
      if (filter.courseId) {
        filteredPhotos = filteredPhotos.filter(photo => photo.courseId === filter.courseId);
      }
    }
    
    const total = filteredPhotos.length;
    const pageNum = page || 1;
    const limitNum = limit || 10;
    const skip = (pageNum - 1) * limitNum;
    const paginatedPhotos = filteredPhotos.slice(skip, skip + limitNum);
    
    return {
      photos: paginatedPhotos,
      total,
      hasMore: skip + limitNum < total
    };
  } catch (error) {
    console.error('Error fetching photos:', error);
    return {
      photos: mockPhotos,
      total: mockPhotos.length,
      hasMore: false
    };
  }
}

export async function getPhoto(
  id: string,
  accessToken?: string
): Promise<Photo | null> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_PHOTO_QUERY,
    //   variables: { id },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.photo;
    
    // Return mock data for now
    return mockPhotos.find(photo => photo.id === id) || null;
  } catch (error) {
    console.error('Error fetching photo:', error);
    return null;
  }
}

export async function getFeaturedPhotos(
  page?: number,
  limit?: number,
  filter?: PhotoFilter,
  accessToken?: string
): Promise<PhotoResponse> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_FEATURED_PHOTOS_QUERY,
    //   variables: { page, limit, filter },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getFeaturedPhotos;
    
    // Return mock data for now
    const featuredPhotos = mockPhotos.filter(photo => photo.isFeatured);
    const total = featuredPhotos.length;
    const pageNum = page || 1;
    const limitNum = limit || 10;
    const skip = (pageNum - 1) * limitNum;
    const paginatedPhotos = featuredPhotos.slice(skip, skip + limitNum);
    
    return {
      photos: paginatedPhotos,
      total,
      hasMore: skip + limitNum < total
    };
  } catch (error) {
    console.error('Error fetching featured photos:', error);
    return {
      photos: mockPhotos.filter(photo => photo.isFeatured),
      total: mockPhotos.filter(photo => photo.isFeatured).length,
      hasMore: false
    };
  }
}

// ========== UTILITY API FUNCTIONS ==========
export async function getPhotosByCategory(
  category: PhotoCategory,
  page?: number,
  limit?: number,
  accessToken?: string
): Promise<PhotoResponse> {
  try {
    return getPhotos(page, limit, { category }, accessToken);
  } catch (error) {
    console.error('Error fetching photos by category:', error);
    return {
      photos: mockPhotos.filter(photo => photo.category === category),
      total: mockPhotos.filter(photo => photo.category === category).length,
      hasMore: false
    };
  }
}

export async function getPhotosByListing(
  listingId: string,
  page?: number,
  limit?: number,
  accessToken?: string
): Promise<PhotoResponse> {
  try {
    return getPhotos(page, limit, { listingId }, accessToken);
  } catch (error) {
    console.error('Error fetching photos by listing:', error);
    return {
      photos: mockPhotos.filter(photo => photo.listingId === listingId),
      total: mockPhotos.filter(photo => photo.listingId === listingId).length,
      hasMore: false
    };
  }
}

export async function getPhotosByCampus(
  campusId: string,
  page?: number,
  limit?: number,
  accessToken?: string
): Promise<PhotoResponse> {
  try {
    return getPhotos(page, limit, { campusId }, accessToken);
  } catch (error) {
    console.error('Error fetching photos by campus:', error);
    return {
      photos: mockPhotos.filter(photo => photo.campusId === campusId),
      total: mockPhotos.filter(photo => photo.campusId === campusId).length,
      hasMore: false
    };
  }
}

export async function getPhotosByTags(
  tags: string[],
  page?: number,
  limit?: number,
  accessToken?: string
): Promise<PhotoResponse> {
  try {
    return getPhotos(page, limit, { tags }, accessToken);
  } catch (error) {
    console.error('Error fetching photos by tags:', error);
    return {
      photos: mockPhotos.filter(photo =>
        tags.some(tag => photo.tags.includes(tag))
      ),
      total: mockPhotos.filter(photo =>
        tags.some(tag => photo.tags.includes(tag))
      ).length,
      hasMore: false
    };
  }
}

// ========== MUTATION FUNCTIONS ==========
export async function createPhoto(
  input: CreatePhotoInput,
  accessToken: string
): Promise<Photo> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: CREATE_PHOTO_MUTATION,
    //   variables: { createPhotoInput: input },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.createPhoto;
    
    throw new Error('Create photo not implemented yet');
  } catch (error) {
    console.error('Error creating photo:', error);
    throw error;
  }
}

export async function updatePhoto(
  id: string,
  input: UpdatePhotoInput,
  accessToken: string
): Promise<Photo> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: UPDATE_PHOTO_MUTATION,
    //   variables: { id, updatePhotoInput: input },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.updatePhoto;
    
    throw new Error('Update photo not implemented yet');
  } catch (error) {
    console.error('Error updating photo:', error);
    throw error;
  }
}

export async function deletePhoto(
  id: string,
  accessToken: string
): Promise<{ message: string }> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: DELETE_PHOTO_MUTATION,
    //   variables: { id },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.removePhoto;
    
    throw new Error('Delete photo not implemented yet');
  } catch (error) {
    console.error('Error deleting photo:', error);
    throw error;
  }
}
