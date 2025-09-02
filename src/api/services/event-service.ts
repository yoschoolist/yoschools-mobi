import { gql } from '@apollo/client';
import { apolloClient } from '../common/apollo-client';

// Types
export enum EventType {
  OPEN_DAY = 'OPEN_DAY',
  WORKSHOP = 'WORKSHOP',
  SEMINAR = 'SEMINAR',
  CONFERENCE = 'CONFERENCE',
  COMPETITION = 'COMPETITION',
  EXHIBITION = 'EXHIBITION',
  PERFORMANCE = 'PERFORMANCE',
  SPORTS_EVENT = 'SPORTS_EVENT',
  ACADEMIC_EVENT = 'ACADEMIC_EVENT',
  SOCIAL_EVENT = 'SOCIAL_EVENT',
  OTHER = 'OTHER'
}

export enum EventCategory {
  SCHOOL_EVENT = 'SCHOOL_EVENT',
  ACADEMIC_EVENT = 'ACADEMIC_EVENT',
  SPORTS_EVENT = 'SPORTS_EVENT',
  CULTURAL_EVENT = 'CULTURAL_EVENT',
  SOCIAL_EVENT = 'SOCIAL_EVENT',
  PROFESSIONAL_EVENT = 'PROFESSIONAL_EVENT',
  COMMUNITY_EVENT = 'COMMUNITY_EVENT',
  OTHER = 'OTHER'
}

export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CANCELLED = 'CANCELLED',
  POSTPONED = 'POSTPONED',
  COMPLETED = 'COMPLETED'
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  summary?: string;
  type: EventType;
  category: EventCategory;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  timezone?: string;
  isAllDay: boolean;
  venue?: string;
  address?: string;
  isOnline: boolean;
  meetingUrl?: string;
  capacity?: number;
  requiresRegistration: boolean;
  registrationDeadline?: string;
  registrationUrl?: string;
  registrationEmail?: string;
  registrationFee?: number;
  currency?: string;
  imageUrl?: string;
  imageId?: string;
  images: string[];
  documents: string[];
  targetAudience: string[];
  ageGroups: string[];
  gradeLevels: string[];
  status: EventStatus;
  isActive: boolean;
  isFeatured: boolean;
  approvalStatus: ApprovalStatus;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  viewCount: number;
  registrationCount: number;
  attendanceCount: number;
  countryId?: string;
  regionId?: string;
  localityId?: string;
  organizerId: string;
  listingId?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  
  // Relations
  organizer: {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    profilePicture?: string;
  };
  listing?: {
    id: string;
    name: string;
    slug: string;
  };
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
    code: string;
  };
}

// Input Types
export interface CreateEventInput {
  title: string;
  slug: string;
  description: string;
  summary?: string;
  type: EventType;
  category: EventCategory;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  timezone?: string;
  isAllDay: boolean;
  venue?: string;
  address?: string;
  isOnline: boolean;
  meetingUrl?: string;
  capacity?: number;
  requiresRegistration: boolean;
  registrationDeadline?: string;
  registrationUrl?: string;
  registrationEmail?: string;
  registrationFee?: number;
  currency?: string;
  imageUrl?: string;
  imageId?: string;
  images: string[];
  documents: string[];
  targetAudience: string[];
  ageGroups: string[];
  gradeLevels: string[];
  status: EventStatus;
  countryId?: string;
  regionId?: string;
  localityId?: string;
  listingId?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface UpdateEventInput {
  title?: string;
  slug?: string;
  description?: string;
  summary?: string;
  type?: EventType;
  category?: EventCategory;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  timezone?: string;
  isAllDay?: boolean;
  venue?: string;
  address?: string;
  isOnline?: boolean;
  meetingUrl?: string;
  capacity?: number;
  requiresRegistration?: boolean;
  registrationDeadline?: string;
  registrationUrl?: string;
  registrationEmail?: string;
  registrationFee?: number;
  currency?: string;
  imageUrl?: string;
  imageId?: string;
  images?: string[];
  documents?: string[];
  targetAudience?: string[];
  ageGroups?: string[];
  gradeLevels?: string[];
  status?: EventStatus;
  countryId?: string;
  regionId?: string;
  localityId?: string;
  listingId?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface EventFilterInput {
  search?: string;
  type?: EventType;
  category?: EventCategory;
  status?: EventStatus;
  isActive?: boolean;
  isFeatured?: boolean;
  isOnline?: boolean;
  requiresRegistration?: boolean;
  organizerId?: string;
  listingId?: string;
  countryId?: string;
  regionId?: string;
  localityId?: string;
  startDateFrom?: string;
  startDateTo?: string;
  endDateFrom?: string;
  endDateTo?: string;
  capacityMin?: number;
  capacityMax?: number;
  targetAudience?: string[];
  ageGroups?: string[];
  gradeLevels?: string[];
}

export interface EventSortInput {
  field?: 'TITLE' | 'START_DATE' | 'END_DATE' | 'CREATED_AT' | 'UPDATED_AT' | 'VIEW_COUNT' | 'REGISTRATION_COUNT' | 'ATTENDANCE_COUNT' | 'STATUS' | 'TYPE' | 'CATEGORY';
  order?: 'ASC' | 'DESC';
}

export interface PaginationInput {
  page?: number;
  limit?: number;
}

// Response Types
export interface EventResponse {
  events: Event[];
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  limit: number;
  totalPages: number;
}

export interface EventStats {
  totalEvents: number;
  publishedEvents: number;
  draftEvents: number;
  cancelledEvents: number;
  completedEvents: number;
  upcomingEvents: number;
  pastEvents: number;
  onlineEvents: number;
  inPersonEvents: number;
  featuredEvents: number;
  totalRegistrations: number;
  totalAttendance: number;
  averageAttendanceRate: number;
  eventsByType: {
    [key in EventType]: number;
  };
  eventsByCategory: {
    [key in EventCategory]: number;
  };
  eventsByStatus: {
    [key in EventStatus]: number;
  };
  topTargetAudiences: string[];
  topAgeGroups: string[];
  topGradeLevels: string[];
}

// GraphQL Fragments
const EVENT_FRAGMENT = gql`
  fragment EventFragment on Event {
    id
    title
    slug
    description
    summary
    type
    category
    startDate
    endDate
    startTime
    endTime
    timezone
    isAllDay
    venue
    address
    isOnline
    meetingUrl
    capacity
    requiresRegistration
    registrationDeadline
    registrationUrl
    registrationEmail
    registrationFee
    currency
    imageUrl
    imageId
    images
    documents
    targetAudience
    ageGroups
    gradeLevels
    status
    isActive
    isFeatured
    approvalStatus
    approvedAt
    rejectedAt
    rejectionReason
    viewCount
    registrationCount
    attendanceCount
    countryId
    regionId
    localityId
    organizerId
    listingId
    metaTitle
    metaDescription
    metaKeywords
    createdAt
    updatedAt
    publishedAt
    organizer {
      id
      firstName
      lastName
      email
      profilePicture
    }
    listing {
      id
      name
      slug
    }
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
      code
    }
  }
`;

// GraphQL Queries
const GET_EVENTS_QUERY = gql`
  ${EVENT_FRAGMENT}
  query GetEvents($page: Int, $limit: Int, $filter: EventFilterInput, $sort: EventSortInput) {
    getEvents(page: $page, limit: $limit, filter: $filter, sort: $sort) {
      events {
        ...EventFragment
      }
      total
      hasNextPage
      hasPreviousPage
      page
      limit
      totalPages
    }
  }
`;

const GET_EVENT_QUERY = gql`
  ${EVENT_FRAGMENT}
  query GetEvent($id: String!) {
    getEvent(id: $id) {
      ...EventFragment
    }
  }
`;

const GET_EVENT_BY_SLUG_QUERY = gql`
  ${EVENT_FRAGMENT}
  query GetEventBySlug($slug: String!) {
    getEventBySlug(slug: $slug) {
      ...EventFragment
    }
  }
`;

const GET_EVENT_STATS_QUERY = gql`
  query GetEventStats {
    getEventStats {
      totalEvents
      publishedEvents
      draftEvents
      cancelledEvents
      completedEvents
      upcomingEvents
      pastEvents
      onlineEvents
      inPersonEvents
      featuredEvents
      totalRegistrations
      totalAttendance
      averageAttendanceRate
      eventsByType
      eventsByCategory
      eventsByStatus
      topTargetAudiences
      topAgeGroups
      topGradeLevels
    }
  }
`;

// GraphQL Mutations
const CREATE_EVENT_MUTATION = gql`
  ${EVENT_FRAGMENT}
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      ...EventFragment
    }
  }
`;

const UPDATE_EVENT_MUTATION = gql`
  ${EVENT_FRAGMENT}
  mutation UpdateEvent($id: String!, $input: UpdateEventInput!) {
    updateEvent(id: $id, input: $input) {
      ...EventFragment
    }
  }
`;

const DELETE_EVENT_MUTATION = gql`
  mutation DeleteEvent($id: String!) {
    deleteEvent(id: $id) {
      id
      title
      slug
    }
  }
`;

const REGISTER_FOR_EVENT_MUTATION = gql`
  mutation RegisterForEvent($eventId: String!, $input: EventRegistrationInput!) {
    registerForEvent(eventId: $eventId, input: $input) {
      id
      eventId
      userId
      status
      registeredAt
    }
  }
`;

// Service Functions
export async function getEvents(
  page = 1,
  limit = 10,
  filter?: EventFilterInput,
  sort?: EventSortInput,
  accessToken?: string
): Promise<EventResponse> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_EVENTS_QUERY,
      variables: { page, limit, filter, sort },
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getEvents) {
      console.warn('No events returned from GraphQL query');
      return {
        events: [],
        total: 0,
        hasNextPage: false,
        hasPreviousPage: false,
        page,
        limit,
        totalPages: 0
      };
    }

    return data.getEvents;
  } catch (error) {
    console.error('Error fetching events from API:', error);
    return {
      events: [],
      total: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      page,
      limit,
      totalPages: 0
    };
  }
}

export async function getEvent(id: string, accessToken?: string): Promise<Event | undefined> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_EVENT_QUERY,
      variables: { id },
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getEvent) {
      console.warn('No event found with ID:', id);
      return undefined;
    }

    return data.getEvent;
  } catch (error) {
    console.error('Error fetching event from API:', error);
    return undefined;
  }
}

export async function getEventBySlug(slug: string, accessToken?: string): Promise<Event | undefined> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_EVENT_BY_SLUG_QUERY,
      variables: { slug },
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getEventBySlug) {
      console.warn('No event found with slug:', slug);
      return undefined;
    }

    return data.getEventBySlug;
  } catch (error) {
    console.error('Error fetching event by slug from API:', error);
    return undefined;
  }
}

export async function getEventStats(accessToken?: string): Promise<EventStats | undefined> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, error } = await apolloClient.query({
      query: GET_EVENT_STATS_QUERY,
      variables: {},
      context,
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('GraphQL error:', error);
      throw new Error(error.message);
    }

    if (!data?.getEventStats) {
      console.warn('No event stats returned from GraphQL query');
      return undefined;
    }

    return data.getEventStats;
  } catch (error) {
    console.error('Error fetching event stats from API:', error);
    return undefined;
  }
}

export async function createEvent(
  input: CreateEventInput,
  accessToken: string
): Promise<Event> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_EVENT_MUTATION,
      variables: { input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.createEvent) {
      throw new Error("Failed to create event");
    }

    return data.createEvent;
  } catch (error: any) {
    console.error('Error creating event:', error);
    throw new Error(error.message ?? 'Failed to create event');
  }
}

export async function updateEvent(
  id: string,
  input: UpdateEventInput,
  accessToken: string
): Promise<Event> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_EVENT_MUTATION,
      variables: { id, input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.updateEvent) {
      throw new Error("Failed to update event");
    }

    return data.updateEvent;
  } catch (error: any) {
    console.error('Error updating event:', error);
    throw new Error(error.message ?? 'Failed to update event');
  }
}

export async function deleteEvent(
  id: string,
  accessToken: string
): Promise<{ id: string; title: string; slug: string }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_EVENT_MUTATION,
      variables: { id },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.deleteEvent) {
      throw new Error("Failed to delete event");
    }

    return data.deleteEvent;
  } catch (error: any) {
    console.error('Error deleting event:', error);
    throw new Error(error.message ?? 'Failed to delete event');
  }
}

// Utility Functions
export const getEventTypeLabel = (type: EventType): string => {
  switch (type) {
    case EventType.OPEN_DAY:
      return 'Open Day';
    case EventType.WORKSHOP:
      return 'Workshop';
    case EventType.SEMINAR:
      return 'Seminar';
    case EventType.CONFERENCE:
      return 'Conference';
    case EventType.COMPETITION:
      return 'Competition';
    case EventType.EXHIBITION:
      return 'Exhibition';
    case EventType.PERFORMANCE:
      return 'Performance';
    case EventType.SPORTS_EVENT:
      return 'Sports Event';
    case EventType.ACADEMIC_EVENT:
      return 'Academic Event';
    case EventType.SOCIAL_EVENT:
      return 'Social Event';
    case EventType.OTHER:
      return 'Other';
    default:
      return 'Unknown';
  }
};

export const getEventCategoryLabel = (category: EventCategory): string => {
  switch (category) {
    case EventCategory.SCHOOL_EVENT:
      return 'School Event';
    case EventCategory.ACADEMIC_EVENT:
      return 'Academic Event';
    case EventCategory.SPORTS_EVENT:
      return 'Sports Event';
    case EventCategory.CULTURAL_EVENT:
      return 'Cultural Event';
    case EventCategory.SOCIAL_EVENT:
      return 'Social Event';
    case EventCategory.PROFESSIONAL_EVENT:
      return 'Professional Event';
    case EventCategory.COMMUNITY_EVENT:
      return 'Community Event';
    case EventCategory.OTHER:
      return 'Other';
    default:
      return 'Unknown';
  }
};

export const getEventStatusLabel = (status: EventStatus): string => {
  switch (status) {
    case EventStatus.DRAFT:
      return 'Draft';
    case EventStatus.PUBLISHED:
      return 'Published';
    case EventStatus.CANCELLED:
      return 'Cancelled';
    case EventStatus.POSTPONED:
      return 'Postponed';
    case EventStatus.COMPLETED:
      return 'Completed';
    default:
      return 'Unknown';
  }
};

export const getEventStatusColor = (status: EventStatus): string => {
  switch (status) {
    case EventStatus.DRAFT:
      return 'bg-gray-100 text-gray-800';
    case EventStatus.PUBLISHED:
      return 'bg-green-100 text-green-800';
    case EventStatus.CANCELLED:
      return 'bg-red-100 text-red-800';
    case EventStatus.POSTPONED:
      return 'bg-yellow-100 text-yellow-800';
    case EventStatus.COMPLETED:
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getApprovalStatusLabel = (status: ApprovalStatus): string => {
  switch (status) {
    case ApprovalStatus.PENDING:
      return 'Pending';
    case ApprovalStatus.APPROVED:
      return 'Approved';
    case ApprovalStatus.REJECTED:
      return 'Rejected';
    default:
      return 'Unknown';
  }
};

export const getApprovalStatusColor = (status: ApprovalStatus): string => {
  switch (status) {
    case ApprovalStatus.PENDING:
      return 'bg-yellow-100 text-yellow-800';
    case ApprovalStatus.APPROVED:
      return 'bg-green-100 text-green-800';
    case ApprovalStatus.REJECTED:
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const isActive = (event: Event): boolean => event.isActive && event.status === EventStatus.PUBLISHED;
export const isFeatured = (event: Event): boolean => event.isFeatured;
export const isOnline = (event: Event): boolean => event.isOnline;
export const isUpcoming = (event: Event): boolean => {
  const startDate = new Date(event.startDate);
  return startDate > new Date();
};
export const isPast = (event: Event): boolean => {
  const endDate = event.endDate ? new Date(event.endDate) : new Date(event.startDate);
  return endDate < new Date();
};
export const isOngoing = (event: Event): boolean => {
  const now = new Date();
  const startDate = new Date(event.startDate);
  const endDate = event.endDate ? new Date(event.endDate) : startDate;
  return now >= startDate && now <= endDate;
};
export const requiresRegistration = (event: Event): boolean => event.requiresRegistration;
export const isRegistrationOpen = (event: Event): boolean => {
  if (!event.requiresRegistration || !event.registrationDeadline) return true;
  return new Date(event.registrationDeadline) > new Date();
};
export const isAtCapacity = (event: Event): boolean => {
  if (!event.capacity) return false;
  return event.registrationCount >= event.capacity;
};

export const getEventDuration = (event: Event): string => {
  if (event.isAllDay) {
    return 'All Day';
  }
  
  if (event.startTime && event.endTime) {
    return `${event.startTime} - ${event.endTime}`;
  }
  
  if (event.startTime) {
    return `Starts at ${event.startTime}`;
  }
  
  return 'Time TBD';
};

export const getEventLocation = (event: Event): string => {
  if (event.isOnline && event.meetingUrl) {
    return 'Online Event';
  }
  
  if (event.venue && event.address) {
    return `${event.venue}, ${event.address}`;
  }
  
  if (event.venue) {
    return event.venue;
  }
  
  if (event.address) {
    return event.address;
  }
  
  return 'Location TBD';
};

export const getRegistrationStatus = (event: Event): string => {
  if (!event.requiresRegistration) {
    return 'No Registration Required';
  }
  
  if (!isRegistrationOpen(event)) {
    return 'Registration Closed';
  }
  
  if (isAtCapacity(event)) {
    return 'Event Full';
  }
  
  return 'Registration Open';
};

export const getTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const getDaysUntilEvent = (startDate: string): number => {
  const eventDate = new Date(startDate);
  const now = new Date();
  const diffInMs = eventDate.getTime() - now.getTime();
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
};

export const isEventSoon = (startDate: string, daysThreshold = 7): boolean => {
  const daysUntil = getDaysUntilEvent(startDate);
  return daysUntil > 0 && daysUntil <= daysThreshold;
};

export const formatEventDate = (startDate: string, endDate?: string): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;
  
  const startFormatted = start.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  if (!end || start.toDateString() === end.toDateString()) {
    return startFormatted;
  }
  
  const endFormatted = end.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return `${startFormatted} - ${endFormatted}`;
};
