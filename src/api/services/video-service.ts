import { gql } from '@apollo/client';

// ========== TYPES ==========
export enum VideoCategory {
  GENERAL = 'GENERAL',
  VIRTUAL_TOUR = 'VIRTUAL_TOUR',
  EVENT_HIGHLIGHT = 'EVENT_HIGHLIGHT',
  TESTIMONIAL = 'TESTIMONIAL',
  CLASSROOM = 'CLASSROOM',
  PROMOTIONAL = 'PROMOTIONAL'
}

// ========== INTERFACES ==========
export interface Video {
  id: string;
  url: string;
  thumbnail?: string;
  caption?: string;
  category: VideoCategory;
  listingId?: string;
  campusId?: string;
  eventId?: string;
  jobId?: string;
  courseId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  listing?: any;
  campus?: any;
  event?: any;
  job?: any;
  course?: any;
}

export interface CreateVideoInput {
  url: string;
  thumbnail?: string;
  caption?: string;
  category?: VideoCategory;
  listingId?: string;
  campusId?: string;
  eventId?: string;
  jobId?: string;
  courseId?: string;
  isActive?: boolean;
}

export interface UpdateVideoInput {
  url?: string;
  thumbnail?: string;
  caption?: string;
  category?: VideoCategory;
  listingId?: string;
  campusId?: string;
  eventId?: string;
  jobId?: string;
  courseId?: string;
  isActive?: boolean;
}

export interface VideoFilter {
  category?: VideoCategory;
  isActive?: boolean;
  listingId?: string;
  campusId?: string;
  eventId?: string;
  jobId?: string;
  courseId?: string;
  createdAfter?: string;
  createdBefore?: string;
}

export interface VideoSort {
  createdAt?: 'asc' | 'desc';
  updatedAt?: 'asc' | 'desc';
  caption?: 'asc' | 'desc';
  category?: 'asc' | 'desc';
}

export interface PaginationInput {
  skip?: number;
  take?: number;
}

export interface PaginatedVideoResponse {
  data: Video[];
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface VideoStatsDto {
  totalVideos: number;
  activeVideos: number;
  inactiveVideos: number;
  videosByCategory: Record<VideoCategory, number>;
  recentlyAdded: number;
}

export interface BulkCreateVideoInput {
  videos: CreateVideoInput[];
}

export interface BulkUpdateVideoInput {
  ids: string[];
  data: UpdateVideoInput;
}

export interface BulkDeleteVideoInput {
  ids: string[];
}

export interface BulkVideoOperationResult {
  successCount: number;
  failureCount: number;
  errors: string[];
  processedIds: string[];
}

// ========== GRAPHQL QUERIES ==========
const GET_VIDEO_QUERY = gql`
  query GetVideo($id: ID!) {
    getVideo(id: $id) {
      id
      url
      thumbnail
      caption
      category
      listingId
      campusId
      eventId
      jobId
      courseId
      isActive
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
        slug
      }
      event {
        id
        name
        slug
      }
      job {
        id
        title
        slug
      }
      course {
        id
        name
        slug
      }
    }
  }
`;

const GET_VIDEOS_QUERY = gql`
  query GetVideos(
    $filter: VideoFilterInput
    $sort: VideoSortInput
    $pagination: PaginationInput
  ) {
    getVideos(filter: $filter, sort: $sort, pagination: $pagination) {
      data {
        id
        url
        thumbnail
        caption
        category
        listingId
        campusId
        eventId
        jobId
        courseId
        isActive
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
          slug
        }
        event {
          id
          name
          slug
        }
        job {
          id
          title
          slug
        }
        course {
          id
          name
          slug
        }
      }
      total
      hasNextPage
      hasPreviousPage
    }
  }
`;

const GET_VIDEOS_BY_LISTING_QUERY = gql`
  query GetVideosByListing($listingId: ID!) {
    getVideosByListing(listingId: $listingId) {
      id
      url
      thumbnail
      caption
      category
      isActive
      createdAt
      updatedAt
    }
  }
`;

const GET_VIDEOS_BY_CAMPUS_QUERY = gql`
  query GetVideosByCampus($campusId: ID!) {
    getVideosByCampus(campusId: $campusId) {
      id
      url
      thumbnail
      caption
      category
      isActive
      createdAt
      updatedAt
    }
  }
`;

const GET_VIDEOS_BY_EVENT_QUERY = gql`
  query GetVideosByEvent($eventId: ID!) {
    getVideosByEvent(eventId: $eventId) {
      id
      url
      thumbnail
      caption
      category
      isActive
      createdAt
      updatedAt
    }
  }
`;

const GET_VIDEOS_BY_JOB_QUERY = gql`
  query GetVideosByJob($jobId: ID!) {
    getVideosByJob(jobId: $jobId) {
      id
      url
      thumbnail
      caption
      category
      isActive
      createdAt
      updatedAt
    }
  }
`;

const GET_VIDEOS_BY_COURSE_QUERY = gql`
  query GetVideosByCourse($courseId: ID!) {
    getVideosByCourse(courseId: $courseId) {
      id
      url
      thumbnail
      caption
      category
      isActive
      createdAt
      updatedAt
    }
  }
`;

const GET_VIDEO_STATS_QUERY = gql`
  query GetVideoStats {
    getVideoStats {
      totalVideos
      activeVideos
      inactiveVideos
      videosByCategory
      recentlyAdded
    }
  }
`;

// ========== GRAPHQL MUTATIONS ==========
const CREATE_VIDEO_MUTATION = gql`
  mutation CreateVideo($createVideoInput: CreateVideoInput!) {
    createVideo(createVideoInput: $createVideoInput) {
      id
      url
      thumbnail
      caption
      category
      listingId
      campusId
      eventId
      jobId
      courseId
      isActive
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_VIDEO_MUTATION = gql`
  mutation UpdateVideo($id: ID!, $updateVideoInput: UpdateVideoInput!) {
    updateVideo(id: $id, updateVideoInput: $updateVideoInput) {
      id
      url
      thumbnail
      caption
      category
      listingId
      campusId
      eventId
      jobId
      courseId
      isActive
      createdAt
      updatedAt
    }
  }
`;

const DELETE_VIDEO_MUTATION = gql`
  mutation DeleteVideo($id: ID!) {
    deleteVideo(id: $id)
  }
`;

const TOGGLE_VIDEO_STATUS_MUTATION = gql`
  mutation ToggleVideoStatus($id: ID!) {
    toggleVideoStatus(id: $id) {
      id
      isActive
      updatedAt
    }
  }
`;

const BULK_CREATE_VIDEOS_MUTATION = gql`
  mutation BulkCreateVideos($bulkCreateVideoInput: BulkCreateVideoInput!) {
    bulkCreateVideos(bulkCreateVideoInput: $bulkCreateVideoInput) {
      successCount
      failureCount
      errors
      processedIds
    }
  }
`;

const BULK_UPDATE_VIDEOS_MUTATION = gql`
  mutation BulkUpdateVideos($bulkUpdateVideoInput: BulkUpdateVideoInput!) {
    bulkUpdateVideos(bulkUpdateVideoInput: $bulkUpdateVideoInput) {
      successCount
      failureCount
      errors
      processedIds
    }
  }
`;

const BULK_DELETE_VIDEOS_MUTATION = gql`
  mutation BulkDeleteVideos($bulkDeleteVideoInput: BulkDeleteVideoInput!) {
    bulkDeleteVideos(bulkDeleteVideoInput: $bulkDeleteVideoInput) {
      successCount
      failureCount
      errors
      processedIds
    }
  }
`;

const ACTIVATE_VIDEOS_MUTATION = gql`
  mutation ActivateVideos($ids: [ID!]!) {
    activateVideos(ids: $ids) {
      successCount
      failureCount
      errors
      processedIds
    }
  }
`;

const DEACTIVATE_VIDEOS_MUTATION = gql`
  mutation DeactivateVideos($ids: [ID!]!) {
    deactivateVideos(ids: $ids) {
      successCount
      failureCount
      errors
      processedIds
    }
  }
`;

// ========== UTILITY FUNCTIONS ==========
export function formatVideoCategory(category: VideoCategory): string {
  const categoryMap: Record<VideoCategory, string> = {
    [VideoCategory.GENERAL]: 'General',
    [VideoCategory.VIRTUAL_TOUR]: 'Virtual Tour',
    [VideoCategory.EVENT_HIGHLIGHT]: 'Event Highlight',
    [VideoCategory.TESTIMONIAL]: 'Testimonial',
    [VideoCategory.CLASSROOM]: 'Classroom',
    [VideoCategory.PROMOTIONAL]: 'Promotional'
  };
  return categoryMap[category] || category;
}

export function getVideoCategoryIcon(category: VideoCategory): string {
  const iconMap: Record<VideoCategory, string> = {
    [VideoCategory.GENERAL]: '🎥',
    [VideoCategory.VIRTUAL_TOUR]: '🏛️',
    [VideoCategory.EVENT_HIGHLIGHT]: '🎉',
    [VideoCategory.TESTIMONIAL]: '💬',
    [VideoCategory.CLASSROOM]: '📚',
    [VideoCategory.PROMOTIONAL]: '📢'
  };
  return iconMap[category] || '🎥';
}

export function getVideoCategoryColor(category: VideoCategory): string {
  const colorMap: Record<VideoCategory, string> = {
    [VideoCategory.GENERAL]: '#6B7280',
    [VideoCategory.VIRTUAL_TOUR]: '#3B82F6',
    [VideoCategory.EVENT_HIGHLIGHT]: '#EF4444',
    [VideoCategory.TESTIMONIAL]: '#10B981',
    [VideoCategory.CLASSROOM]: '#F59E0B',
    [VideoCategory.PROMOTIONAL]: '#8B5CF6'
  };
  return colorMap[category] || '#6B7280';
}

export function formatVideoDuration(duration?: string): string {
  if (!duration) return 'Duration not available';
  return duration;
}

export function formatVideoViews(views?: number): string {
  if (!views) return 'No views';
  if (views === 1) return '1 view';
  return `${views} views`;
}

export function getVideoThumbnail(video: Video): string {
  return video.thumbnail || `https://img.youtube.com/vi/${extractYouTubeId(video.url)}/maxresdefault.jpg`;
}

export function extractYouTubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

export function isYouTubeUrl(url: string): boolean {
  return /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.test(url);
}

export function getVideoEmbedUrl(url: string): string {
  if (isYouTubeUrl(url)) {
    const videoId = extractYouTubeId(url);
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
}

// ========== MOCK DATA ==========
export const mockVideos: Video[] = [
  {
    id: '1',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    caption: 'Virtual tour of our beautiful campus',
    category: VideoCategory.VIRTUAL_TOUR,
    listingId: '1',
    isActive: true,
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
    url: 'https://www.youtube.com/watch?v=example2',
    thumbnail: 'https://img.youtube.com/vi/example2/maxresdefault.jpg',
    caption: 'Student testimonial about their experience',
    category: VideoCategory.TESTIMONIAL,
    listingId: '1',
    isActive: true,
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
    url: 'https://www.youtube.com/watch?v=example3',
    thumbnail: 'https://img.youtube.com/vi/example3/maxresdefault.jpg',
    caption: 'Graduation ceremony highlights',
    category: VideoCategory.EVENT_HIGHLIGHT,
    listingId: '1',
    isActive: true,
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
    url: 'https://www.youtube.com/watch?v=example4',
    thumbnail: 'https://img.youtube.com/vi/example4/maxresdefault.jpg',
    caption: 'Modern classroom technology in action',
    category: VideoCategory.CLASSROOM,
    listingId: '1',
    isActive: true,
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
    url: 'https://www.youtube.com/watch?v=example5',
    thumbnail: 'https://img.youtube.com/vi/example5/maxresdefault.jpg',
    caption: 'Why choose our university - promotional video',
    category: VideoCategory.PROMOTIONAL,
    listingId: '1',
    isActive: true,
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
export async function getVideo(
  id: string,
  accessToken?: string
): Promise<Video | null> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_VIDEO_QUERY,
    //   variables: { id },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getVideo;
    
    // Return mock data for now
    return mockVideos.find(video => video.id === id) || null;
  } catch (error) {
    console.error('Error fetching video:', error);
    return null;
  }
}

export async function getVideos(
  filter?: VideoFilter,
  sort?: VideoSort,
  pagination?: PaginationInput,
  accessToken?: string
): Promise<PaginatedVideoResponse> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_VIDEOS_QUERY,
    //   variables: { filter, sort, pagination },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getVideos;
    
    // Return mock data for now
    let filteredVideos = [...mockVideos];
    
    if (filter) {
      if (filter.category) {
        filteredVideos = filteredVideos.filter(video => video.category === filter.category);
      }
      
      if (filter.isActive !== undefined) {
        filteredVideos = filteredVideos.filter(video => video.isActive === filter.isActive);
      }
      
      if (filter.listingId) {
        filteredVideos = filteredVideos.filter(video => video.listingId === filter.listingId);
      }
      
      if (filter.campusId) {
        filteredVideos = filteredVideos.filter(video => video.campusId === filter.campusId);
      }
      
      if (filter.eventId) {
        filteredVideos = filteredVideos.filter(video => video.eventId === filter.eventId);
      }
      
      if (filter.jobId) {
        filteredVideos = filteredVideos.filter(video => video.jobId === filter.jobId);
      }
      
      if (filter.courseId) {
        filteredVideos = filteredVideos.filter(video => video.courseId === filter.courseId);
      }
    }
    
    // Apply sorting
    if (sort) {
      filteredVideos.sort((a, b) => {
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
        if (sort.caption) {
          return sort.caption === 'asc'
            ? (a.caption || '').localeCompare(b.caption || '')
            : (b.caption || '').localeCompare(a.caption || '');
        }
        if (sort.category) {
          return sort.category === 'asc'
            ? a.category.localeCompare(b.category)
            : b.category.localeCompare(a.category);
        }
        return 0;
      });
    }
    
    const total = filteredVideos.length;
    const skip = pagination?.skip || 0;
    const take = pagination?.take || 10;
    const paginatedVideos = filteredVideos.slice(skip, skip + take);
    
    return {
      data: paginatedVideos,
      total,
      hasNextPage: skip + take < total,
      hasPreviousPage: skip > 0
    };
  } catch (error) {
    console.error('Error fetching videos:', error);
    return {
      data: mockVideos,
      total: mockVideos.length,
      hasNextPage: false,
      hasPreviousPage: false
    };
  }
}

export async function getVideosByListing(
  listingId: string,
  accessToken?: string
): Promise<Video[]> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_VIDEOS_BY_LISTING_QUERY,
    //   variables: { listingId },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getVideosByListing;
    
    // Return mock data for now
    return mockVideos.filter(video => video.listingId === listingId);
  } catch (error) {
    console.error('Error fetching videos by listing:', error);
    return mockVideos.filter(video => video.listingId === listingId);
  }
}

export async function getVideosByCampus(
  campusId: string,
  accessToken?: string
): Promise<Video[]> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_VIDEOS_BY_CAMPUS_QUERY,
    //   variables: { campusId },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getVideosByCampus;
    
    // Return mock data for now
    return mockVideos.filter(video => video.campusId === campusId);
  } catch (error) {
    console.error('Error fetching videos by campus:', error);
    return mockVideos.filter(video => video.campusId === campusId);
  }
}

export async function getVideosByEvent(
  eventId: string,
  accessToken?: string
): Promise<Video[]> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_VIDEOS_BY_EVENT_QUERY,
    //   variables: { eventId },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getVideosByEvent;
    
    // Return mock data for now
    return mockVideos.filter(video => video.eventId === eventId);
  } catch (error) {
    console.error('Error fetching videos by event:', error);
    return mockVideos.filter(video => video.eventId === eventId);
  }
}

export async function getVideosByJob(
  jobId: string,
  accessToken?: string
): Promise<Video[]> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_VIDEOS_BY_JOB_QUERY,
    //   variables: { jobId },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getVideosByJob;
    
    // Return mock data for now
    return mockVideos.filter(video => video.jobId === jobId);
  } catch (error) {
    console.error('Error fetching videos by job:', error);
    return mockVideos.filter(video => video.jobId === jobId);
  }
}

export async function getVideosByCourse(
  courseId: string,
  accessToken?: string
): Promise<Video[]> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_VIDEOS_BY_COURSE_QUERY,
    //   variables: { courseId },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getVideosByCourse;
    
    // Return mock data for now
    return mockVideos.filter(video => video.courseId === courseId);
  } catch (error) {
    console.error('Error fetching videos by course:', error);
    return mockVideos.filter(video => video.courseId === courseId);
  }
}

export async function getVideoStats(accessToken?: string): Promise<VideoStatsDto> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_VIDEO_STATS_QUERY,
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getVideoStats;
    
    // Return mock data for now
    const totalVideos = mockVideos.length;
    const activeVideos = mockVideos.filter(v => v.isActive).length;
    const inactiveVideos = totalVideos - activeVideos;
    
    const videosByCategory = mockVideos.reduce((acc, video) => {
      acc[video.category] = (acc[video.category] || 0) + 1;
      return acc;
    }, {} as Record<VideoCategory, number>);
    
    return {
      totalVideos,
      activeVideos,
      inactiveVideos,
      videosByCategory,
      recentlyAdded: mockVideos.filter(v => {
        const createdAt = new Date(v.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return createdAt > weekAgo;
      }).length
    };
  } catch (error) {
    console.error('Error fetching video stats:', error);
    return {
      totalVideos: 0,
      activeVideos: 0,
      inactiveVideos: 0,
      videosByCategory: {} as Record<VideoCategory, number>,
      recentlyAdded: 0
    };
  }
}

// ========== UTILITY API FUNCTIONS ==========
export async function getActiveVideos(
  filter?: Omit<VideoFilter, 'isActive'>,
  sort?: VideoSort,
  pagination?: PaginationInput,
  accessToken?: string
): Promise<PaginatedVideoResponse> {
  try {
    return getVideos({ ...filter, isActive: true }, sort, pagination, accessToken);
  } catch (error) {
    console.error('Error fetching active videos:', error);
    return {
      data: mockVideos.filter(v => v.isActive),
      total: mockVideos.filter(v => v.isActive).length,
      hasNextPage: false,
      hasPreviousPage: false
    };
  }
}

export async function getVideosByCategory(
  category: VideoCategory,
  accessToken?: string
): Promise<Video[]> {
  try {
    const result = await getVideos(
      { category, isActive: true },
      { createdAt: 'desc' },
      undefined,
      accessToken
    );
    return result.data;
  } catch (error) {
    console.error('Error fetching videos by category:', error);
    return mockVideos.filter(video => video.category === category && video.isActive);
  }
}

export async function searchVideos(
  searchTerm: string,
  category?: VideoCategory,
  accessToken?: string
): Promise<Video[]> {
  try {
    const filter: VideoFilter = { isActive: true };
    if (category) filter.category = category;
    
    const result = await getVideos(filter, { createdAt: 'desc' }, undefined, accessToken);
    
    // Filter by search term in caption (client-side filtering)
    return result.data.filter(video => 
      video.caption?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching videos:', error);
    return mockVideos.filter(video =>
      video.isActive &&
      video.caption?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!category || video.category === category)
    );
  }
}

export async function getRecentVideos(
  limit: number = 10,
  accessToken?: string
): Promise<Video[]> {
  try {
    const result = await getVideos(
      { isActive: true },
      { createdAt: 'desc' },
      { take: limit },
      accessToken
    );
    return result.data;
  } catch (error) {
    console.error('Error fetching recent videos:', error);
    return mockVideos
      .filter(v => v.isActive)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }
}

// ========== MUTATION FUNCTIONS ==========
export async function createVideo(
  input: CreateVideoInput,
  accessToken: string
): Promise<Video> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: CREATE_VIDEO_MUTATION,
    //   variables: { createVideoInput: input },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.createVideo;
    
    throw new Error('Create video not implemented yet');
  } catch (error) {
    console.error('Error creating video:', error);
    throw error;
  }
}

export async function updateVideo(
  id: string,
  input: UpdateVideoInput,
  accessToken: string
): Promise<Video> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: UPDATE_VIDEO_MUTATION,
    //   variables: { id, updateVideoInput: input },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.updateVideo;
    
    throw new Error('Update video not implemented yet');
  } catch (error) {
    console.error('Error updating video:', error);
    throw error;
  }
}

export async function deleteVideo(
  id: string,
  accessToken: string
): Promise<boolean> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: DELETE_VIDEO_MUTATION,
    //   variables: { id },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.deleteVideo === true;
    
    throw new Error('Delete video not implemented yet');
  } catch (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
}

export async function toggleVideoStatus(
  id: string,
  accessToken: string
): Promise<Video> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: TOGGLE_VIDEO_STATUS_MUTATION,
    //   variables: { id },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.toggleVideoStatus;
    
    throw new Error('Toggle video status not implemented yet');
  } catch (error) {
    console.error('Error toggling video status:', error);
    throw error;
  }
}

export async function bulkCreateVideos(
  input: BulkCreateVideoInput,
  accessToken: string
): Promise<BulkVideoOperationResult> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: BULK_CREATE_VIDEOS_MUTATION,
    //   variables: { bulkCreateVideoInput: input },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.bulkCreateVideos;
    
    throw new Error('Bulk create videos not implemented yet');
  } catch (error) {
    console.error('Error bulk creating videos:', error);
    throw error;
  }
}

export async function bulkUpdateVideos(
  input: BulkUpdateVideoInput,
  accessToken: string
): Promise<BulkVideoOperationResult> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: BULK_UPDATE_VIDEOS_MUTATION,
    //   variables: { bulkUpdateVideoInput: input },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.bulkUpdateVideos;
    
    throw new Error('Bulk update videos not implemented yet');
  } catch (error) {
    console.error('Error bulk updating videos:', error);
    throw error;
  }
}

export async function bulkDeleteVideos(
  input: BulkDeleteVideoInput,
  accessToken: string
): Promise<BulkVideoOperationResult> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: BULK_DELETE_VIDEOS_MUTATION,
    //   variables: { bulkDeleteVideoInput: input },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.bulkDeleteVideos;
    
    throw new Error('Bulk delete videos not implemented yet');
  } catch (error) {
    console.error('Error bulk deleting videos:', error);
    throw error;
  }
}

export async function activateVideos(
  ids: string[],
  accessToken: string
): Promise<BulkVideoOperationResult> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: ACTIVATE_VIDEOS_MUTATION,
    //   variables: { ids },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.activateVideos;
    
    throw new Error('Activate videos not implemented yet');
  } catch (error) {
    console.error('Error activating videos:', error);
    throw error;
  }
}

export async function deactivateVideos(
  ids: string[],
  accessToken: string
): Promise<BulkVideoOperationResult> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: DEACTIVATE_VIDEOS_MUTATION,
    //   variables: { ids },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.deactivateVideos;
    
    throw new Error('Deactivate videos not implemented yet');
  } catch (error) {
    console.error('Error deactivating videos:', error);
    throw error;
  }
}
