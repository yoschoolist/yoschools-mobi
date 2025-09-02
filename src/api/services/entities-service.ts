import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

// ========== TYPES ==========
export interface EntityOption { id: string; name: string; description?: string; type: string }
export interface ListingOption { id: string; name: string; slug: string; description?: string }
export interface EventOption { id: string; title: string; description?: string; startDate?: string; endDate?: string }
export interface CampusOption { id: string; name: string; description?: string; location?: string }
export interface FacilityOption { id: string; name: string; description?: string; type?: string }
export interface CourseOption { id: string; name: string; description?: string; code?: string }
export interface JobOption { id: string; title: string; description?: string; company?: string }

// ========== QUERIES ==========
const GET_LISTINGS_QUERY = gql`
  query GetListings($page: Int, $limit: Int) {
    getListings(page: $page, limit: $limit) {
      listings { id name slug description }
      total
    }
  }
`;

const GET_EVENTS_QUERY = gql`
  query GetEvents($page: Int, $limit: Int) {
    getEvents(page: $page, limit: $limit) {
      events { id title description startDate endDate }
      total
    }
  }
`;

const GET_CAMPUSES_QUERY = gql`
  query GetCampuses($page: Int, $limit: Int) {
    getCampuses(page: $page, limit: $limit) {
      campuses { id name description location }
      total
    }
  }
`;

const GET_FACILITIES_QUERY = gql`
  query GetFacilities($page: Int, $limit: Int) {
    getFacilities(page: $page, limit: $limit) {
      facilities { id name description type }
      total
    }
  }
`;

const GET_COURSES_QUERY = gql`
  query GetCourses($page: Int, $limit: Int) {
    getCourses(page: $page, limit: $limit) {
      courses { id name description code }
      total
    }
  }
`;

const GET_JOBS_QUERY = gql`
  query GetJobs($page: Int, $limit: Int) {
    getJobs(page: $page, limit: $limit) {
      jobs { id title description company }
      total
    }
  }
`;

// ========== SERVICE FUNCTIONS ==========
export async function getListings(page: number = 1, limit: number = 50, accessToken?: string): Promise<ListingOption[]> {
  try {
    const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
    const { data } = await apolloClient.query({ query: GET_LISTINGS_QUERY, variables: { page, limit }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
    if (!data?.getListings?.listings) return [];
    return data.getListings.listings.map((listing: any) => ({ id: listing.id, name: listing.name, slug: listing.slug, description: listing.description, type: 'listing' }));
  } catch (error: any) {
    console.error('Error fetching listings:', error);
    return [];
  }
}

export async function getEvents(page: number = 1, limit: number = 50, accessToken?: string): Promise<EventOption[]> {
  try {
    const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
    const { data } = await apolloClient.query({ query: GET_EVENTS_QUERY, variables: { page, limit }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
    if (!data?.getEvents?.events) return [];
    return data.getEvents.events.map((event: any) => ({ id: event.id, name: event.title, description: event.description, type: 'event' }));
  } catch (error: any) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function getCampuses(page: number = 1, limit: number = 50, accessToken?: string): Promise<CampusOption[]> {
  try {
    const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
    const { data } = await apolloClient.query({ query: GET_CAMPUSES_QUERY, variables: { page, limit }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
    if (!data?.getCampuses?.campuses) return [];
    return data.getCampuses.campuses.map((campus: any) => ({ id: campus.id, name: campus.name, description: campus.description, type: 'campus' }));
  } catch (error: any) {
    console.error('Error fetching campuses:', error);
    return [];
  }
}

export async function getFacilities(page: number = 1, limit: number = 50, accessToken?: string): Promise<FacilityOption[]> {
  try {
    const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
    const { data } = await apolloClient.query({ query: GET_FACILITIES_QUERY, variables: { page, limit }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
    if (!data?.getFacilities?.facilities) return [];
    return data.getFacilities.facilities.map((facility: any) => ({ id: facility.id, name: facility.name, description: facility.description, type: 'facility' }));
  } catch (error: any) {
    console.error('Error fetching facilities:', error);
    return [];
  }
}

export async function getCourses(page: number = 1, limit: number = 50, accessToken?: string): Promise<CourseOption[]> {
  try {
    const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
    const { data } = await apolloClient.query({ query: GET_COURSES_QUERY, variables: { page, limit }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
    if (!data?.getCourses?.courses) return [];
    return data.getCourses.courses.map((course: any) => ({ id: course.id, name: course.name, description: course.description, type: 'course' }));
  } catch (error: any) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

export async function getJobs(page: number = 1, limit: number = 50, accessToken?: string): Promise<JobOption[]> {
  try {
    const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {};
    const { data } = await apolloClient.query({ query: GET_JOBS_QUERY, variables: { page, limit }, context, errorPolicy: 'all', fetchPolicy: 'network-only' });
    if (!data?.getJobs?.jobs) return [];
    return data.getJobs.jobs.map((job: any) => ({ id: job.id, name: job.title, description: job.description, type: 'job' }));
  } catch (error: any) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

// Generic function to get entities by type
export async function getEntitiesByType(entityType: 'listing' | 'event' | 'campus' | 'facility' | 'course' | 'job', page: number = 1, limit: number = 50, accessToken?: string): Promise<EntityOption[]> {
  switch (entityType) {
    case 'listing': return getListings(page, limit, accessToken);
    case 'event': return getEvents(page, limit, accessToken);
    case 'campus': return getCampuses(page, limit, accessToken);
    case 'facility': return getFacilities(page, limit, accessToken);
    case 'course': return getCourses(page, limit, accessToken);
    case 'job': return getJobs(page, limit, accessToken);
    default: return [];
  }
}
