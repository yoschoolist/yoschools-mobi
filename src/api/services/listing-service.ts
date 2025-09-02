import { gql } from '@apollo/client';
import { apolloClient } from '../common/apollo-client';

// Enums - aligned with backend schema
export enum FeeTiers {
  FREE = 'FREE',
  AFFORDABLE = 'AFFORDABLE',
  MODERATE = 'MODERATE',
  EXPENSIVE = 'EXPENSIVE',
  PREMIUM = 'PREMIUM'
}

export enum SectorFocus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  CHARTER = 'CHARTER',
  INTERNATIONAL = 'INTERNATIONAL'
}

export enum GenderFocus {
  MIXED_COEDUCATION = 'MIXED_COEDUCATION',
  BOYS_ONLY = 'BOYS',
  GIRLS_ONLY = 'GIRLS'
}

export enum ReligiousFocus {
  MULTI_FAITH = 'MULTI_FAITH',
  CATHOLIC = 'CATHOLIC',
  ANGLICAN = 'ANGLICAN',
  ADVENTIST = 'ADVENTIST',
  ORTHODOX = 'ORTHODOX',
  CHRISTIAN = 'CHRISTIAN',
  ISLAMIC = 'ISLAMIC',
  JEWISH = 'JEWISH',
  HINDU = 'HINDU',
  BUDDHIST = 'BUDDHIST',
  OTHER_RELIGIOUS = 'OTHER_RELIGIOUS'
}

export enum AccommodationFocus {
  DAY = 'DAY',
  BOARDING = 'BOARDING',
  MIXED_DAY_AND_BOARDING = 'MIXED_DAY_AND_BOARDING'
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export enum ListingSortField {
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
  NAME = 'NAME',
  POPULARITY_SCORE = 'POPULARITY_SCORE',
  AVERAGE_RATING = 'AVERAGE_RATING',
  STUDENT_COUNT = 'STUDENT_COUNT',
  VIEW_COUNT = 'VIEW_COUNT',
  LIKE_COUNT = 'LIKE_COUNT',
  FOLLOW_COUNT = 'FOLLOW_COUNT'
}

// Interfaces
export interface ListingSortInput {
  field: ListingSortField;
  order: SortOrder;
}

export interface PhoneNumber {
  number: string;
  type: string;
  isPrimary: boolean;
  label?: string;
  listingId?: string;
  campusId?: string;
}

export interface SocialMediaLink {
  platform: string;
  url: string;
  username?: string;
}

export interface CreateListingInput {
  name: string;
  slug: string;
  description?: string;
  overview?: string;
  foundedYear?: number;
  slogan?: string;
  moeRegNumber?: string;
  feeTiers?: FeeTiers;
  sectorFocus?: SectorFocus;
  genderFocus?: GenderFocus;
  religiousFocus?: ReligiousFocus;
  accommodationFocus?: AccommodationFocus;
  contactEmail?: string;
  websiteUrl?: string;
  imageUrl?: string;
  imageId?: string;
  studentCount?: number;
  teacherCount?: number;
  studentTeacherRatio?: number;
  averageClassSize?: number;
  maximumClassSize?: number;
  languagesOffered?: string[];
  extraLanguages?: string[];
  nativeEnglishTeachers?: boolean;
  leavingQualifications?: string;
  extracurricularActivities?: string[];
  extraCurricularOffered?: boolean;
  sportsActivities?: string;
  transportationOptions?: string[];
  parentAssociation?: boolean;
  alumniFacilities?: boolean;
  uniformRequired?: boolean;
  lunchesProvided?: boolean;
  teachingAssistants?: boolean;
  schoolQualities?: string;
  teachingApproach?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  categoryIds?: string[];
  curriculumIds?: string[];
  phoneNumbers?: PhoneNumber[];
  socialMediaLinks?: SocialMediaLink[];
  campuses?: {
    name?: string;
    isMain?: boolean;
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
    phoneNumbers?: PhoneNumber[];
    address?: {
      countryId: string;
      regionId: string;
      localityId: string;
      locationName?: string;
      isPrimary?: boolean;
      subLocality?: string;
      neighborhood?: string;
      streetAddress?: string;
      addressLine2?: string;
      administrativeArea1?: string;
      administrativeArea2?: string;
      postalCode?: string;
      landmark?: string;
      formattedAddress?: string;
      placeId?: string;
      latitude?: number;
      longitude?: number;
    };
  };
}

export interface UpdateListingInput {
  name?: string;
  slug?: string;
  description?: string;
  overview?: string;
  foundedYear?: number;
  slogan?: string;
  moeRegNumber?: string;
  feeTiers?: FeeTiers;
  sectorFocus?: SectorFocus;
  genderFocus?: GenderFocus;
  religiousFocus?: ReligiousFocus;
  accommodationFocus?: AccommodationFocus;
  contactEmail?: string;
  websiteUrl?: string;
  imageUrl?: string;
  imageId?: string;
  studentCount?: number;
  teacherCount?: number;
  studentTeacherRatio?: number;
  averageClassSize?: number;
  maximumClassSize?: number;
  languagesOffered?: string[];
  extraLanguages?: string[];
  nativeEnglishTeachers?: boolean;
  leavingQualifications?: string;
  extracurricularActivities?: string[];
  extraCurricularOffered?: boolean;
  sportsActivities?: string;
  transportationOptions?: string[];
  parentAssociation?: boolean;
  alumniFacilities?: boolean;
  uniformRequired?: boolean;
  lunchesProvided?: boolean;
  teachingAssistants?: boolean;
  schoolQualities?: string;
  teachingApproach?: string;
  popularityScore?: number;
  featured?: boolean;
  isVerified?: boolean;
  isActive?: boolean;
  isApproved?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  categoryIds?: string[];
  curriculumIds?: string[];
}

export interface ListingFiltersInput {
  search?: string;
  countryId?: string;
  regionId?: string;
  localityId?: string;
  categoryIds?: string[];
  isVerified?: boolean;
  featured?: boolean;
  isApproved?: boolean;
  minRating?: number;
  maxRating?: number;
  feeTiers?: FeeTiers[];
  sectorFocus?: SectorFocus[];
  genderFocus?: GenderFocus[];
  religiousFocus?: ReligiousFocus[];
  accommodationFocus?: AccommodationFocus[];
  languagesOffered?: string[];
  minStudentCount?: number;
  maxStudentCount?: number;
  foundedAfter?: number;
  foundedBefore?: number;
  nativeEnglishTeachers?: boolean;
  extraCurricularOffered?: boolean;
  parentAssociation?: boolean;
  alumniFacilities?: boolean;
  uniformRequired?: boolean;
  lunchesProvided?: boolean;
  teachingAssistants?: boolean;
  networkId?: string;
  sortInput?: ListingSortInput;
}

// Response interfaces
export interface Profile {
  name?: string;
  avatar?: string;
}

export interface Owner {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  profile?: Profile;
}

export interface Country {
  id: string;
  name: string;
  slug: string;
  code: string;
  code3: string;
}

export interface Region {
  id: string;
  name: string;
  slug: string;
  code?: string;
}

export interface Locality {
  id: string;
  name: string;
  slug: string;
  type: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  type: string;
  gradeNumber?: number;
  gradeName?: string;
  ageRange?: string;
}

export interface Address {
  id: string;
  locationName?: string;
  isPrimary: boolean;
  subLocality?: string;
  neighborhood?: string;
  streetAddress?: string;
  addressLine2?: string;
  administrativeArea1?: string;
  administrativeArea2?: string;
  postalCode?: string;
  landmark?: string;
  formattedAddress?: string;
  placeId?: string;
  latitude?: number;
  longitude?: number;
  addressType: string;
  country: Country;
  region: Region;
  locality: Locality;
}

export interface Campus {
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
  transportationOptions: string[];
  imageUrl?: string;
  imageId?: string;
  isActive: boolean;
  address?: Address;
}

export interface Verification {
  id: string;
  type: string;
  status: string;
  documents: string[];
  notes?: string;
  createdAt: string;
  expiresAt?: string;
}

export interface Review {
  id: string;
  reviewerName?: string;
  reviewerType: string;
  rating: number;
  comment?: string;
  academicRating?: number;
  facilitiesRating?: number;
  teachingRating?: number;
  environmentRating?: number;
  approvalStatus: string;
  isVerified: boolean;
  helpfulCount: number;
  createdAt: string;
}

export interface Listing {
  id: string;
  name: string;
  slug: string;
  description?: string;
  overview?: string;
  foundedYear?: number;
  slogan?: string;
  moeRegNumber?: string;
  feeTiers: FeeTiers;
  sectorFocus: SectorFocus;
  genderFocus: GenderFocus;
  religiousFocus: ReligiousFocus;
  accommodationFocus: AccommodationFocus;
  contactEmail?: string;
  websiteUrl?: string;
  imageUrl?: string;
  imageId?: string;
  studentCount?: number;
  teacherCount?: number;
  studentTeacherRatio?: number;
  averageClassSize?: number;
  maximumClassSize: number;
  languagesOffered: string[];
  extraLanguages: string[];
  nativeEnglishTeachers?: boolean;
  leavingQualifications?: string;
  specialPrograms: string[];
  extracurricularActivities: string[];
  extraCurricularOffered?: boolean;
  sportsActivities?: string;
  transportationOptions: string[];
  parentAssociation: boolean;
  alumniFacilities: boolean;
  uniformRequired?: boolean;
  lunchesProvided?: boolean;
  teachingAssistants?: boolean;
  schoolQualities?: string;
  teachingApproach?: string;
  averageRating?: number;
  currency: string;
  popularityScore: number;
  viewCount: number;
  likeCount: number;
  followCount: number;
  isActive: boolean;
  isVerified: boolean;
  isApproved: boolean;
  isClaimed: boolean;
  featured: boolean;
  claimedById?: string;
  claimedAt?: string;
  approvedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  createdAt: string;
  updatedAt: string;
  owner: Owner;
  creator: Owner;
  claimedBy?: Owner;
  approver?: Owner;
  categories: Category[];
  curriculum: any[];
  campuses: Campus[];
  verifications: Verification[];
  reviews: Review[];
  socialMediaLinks: SocialMediaLink[];
  phoneNumbers: PhoneNumber[];
}

export interface ListingsResponse {
  listings: Listing[];
  total: number;
  hasMore: boolean;
}

export interface PaginatedListingsResponse {
  listings: Listing[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
  };
}

// GraphQL Queries
const LISTING_FRAGMENT = gql`
  fragment ListingFragment on Listing {
    id
    name
    slug
    description
    overview
    foundedYear
    slogan
    moeRegNumber
    feeTiers
    sectorFocus
    genderFocus
    religiousFocus
    accommodationFocus
    contactEmail
    websiteUrl
    imageUrl
    imageId
    studentCount
    teacherCount
    studentTeacherRatio
    averageClassSize
    maximumClassSize
    languagesOffered
    extraLanguages
    nativeEnglishTeachers
    leavingQualifications
    extracurricularActivities
    extraCurricularOffered
    sportsActivities
    transportationOptions
    parentAssociation
    alumniFacilities
    uniformRequired
    lunchesProvided
    teachingAssistants
    schoolQualities
    teachingApproach
    averageRating
    currency
    popularityScore
    viewCount
    likeCount
    followCount
    isActive
    isVerified
    isApproved
    isClaimed
    featured
    claimedById
    claimedAt
    approvedAt
    metaTitle
    metaDescription
    metaKeywords
    createdAt
    updatedAt
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
    creator {
      id
      firstName
      lastName
      email
      profile {
        name
        avatar
      }
    }
    claimedBy {
      id
      firstName
      lastName
      email
      profile {
        name
        avatar
      }
    }
    approver {
      id
      firstName
      lastName
      email
      profile {
        name
        avatar
      }
    }
    categories {
      id
      name
      slug
      type
      gradeNumber
      gradeName
      ageRange
    }
    campuses {
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
    verifications {
      id
      type
      status
      documents
      notes
      createdAt
      expiresAt
    }
    reviews {
      id
      reviewerName
      reviewerType
      rating
      comment
      academicRating
      facilitiesRating
      teachingRating
      environmentRating
      approvalStatus
      isVerified
      helpfulCount
      createdAt
    }
  }
`;

const GET_LISTINGS_QUERY = gql`
  ${LISTING_FRAGMENT}
  query GetListings($page: Int, $limit: Int, $filters: ListingFiltersInput) {
    getListings(page: $page, limit: $limit, filters: $filters) {
      listings {
        ...ListingFragment
      }
      total
      hasMore
    }
  }
`;

const GET_LISTING_BY_ID_QUERY = gql`
  ${LISTING_FRAGMENT}
  query GetListing($id: ID!) {
    getListing(id: $id) {
      ...ListingFragment
    }
  }
`;

const GET_LISTING_BY_SLUG_QUERY = gql`
  ${LISTING_FRAGMENT}
  query GetListingBySlug($slug: String!) {
    getListingBySlug(slug: $slug) {
      ...ListingFragment
    }
  }
`;

const SEARCH_LISTINGS_QUERY = gql`
  ${LISTING_FRAGMENT}
  query SearchListings($searchTerm: String!, $filters: ListingFiltersInput, $page: Int, $limit: Int) {
    searchListings(searchTerm: $searchTerm, filters: $filters, page: $page, limit: $limit) {
      listings {
        ...ListingFragment
      }
      total
      hasMore
    }
  }
`;

const CREATE_LISTING_MUTATION = gql`
  mutation CreateListing($input: CreateListingInput!) {
    createListing(input: $input) {
      id
      name
      slug
      description
      createdAt
      campuses {
        id
        name
        isMain
        address {
          id
          formattedAddress
          country {
            name
          }
          region {
            name
          }
          locality {
            name
          }
        }
      }
    }
  }
`;

const UPDATE_LISTING_MUTATION = gql`
  mutation UpdateListing($id: ID!, $input: UpdateListingInput!) {
    updateListing(id: $id, input: $input) {
      id
      name
      description
      updatedAt
    }
  }
`;

const DELETE_LISTING_MUTATION = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id)
  }
`;

const FOLLOW_LISTING_MUTATION = gql`
  mutation FollowListing($listingId: ID!) {
    followListing(listingId: $listingId)
  }
`;

const LIKE_LISTING_MUTATION = gql`
  mutation LikeListing($listingId: ID!) {
    likeListing(listingId: $listingId)
  }
`;

const CLAIM_LISTING_MUTATION = gql`
  mutation ClaimListing($listingId: ID!) {
    claimListing(listingId: $listingId) {
      id
      isClaimed
      claimedById
      claimedAt
    }
  }
`;

// Service Functions
export async function getListings(
  page?: number,
  limit?: number,
  filters?: ListingFiltersInput,
  accessToken?: string
): Promise<ListingsResponse> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, errors } = await apolloClient.query({
      query: GET_LISTINGS_QUERY,
      variables: { page, limit, filters },
      context,
      errorPolicy: 'all',
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true
    });

    if (errors && errors.length > 0) {
      console.error('GraphQL errors:', errors);
    }

    if (!data?.getListings) {
      throw new Error("No listings data received from server");
    }

    return data.getListings as ListingsResponse;
  } catch (error: any) {
    console.error('Error fetching listings:', error);
    throw new Error(error.message ?? 'Failed to fetch listings');
  }
}

export async function getListing(id: string, accessToken?: string): Promise<Listing> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data } = await apolloClient.query({
      query: GET_LISTING_BY_ID_QUERY,
      variables: { id },
      context,
      errorPolicy: 'all',
      fetchPolicy: 'network-only'
    });

    if (!data?.getListing) {
      throw new Error("Listing not found");
    }

    return data.getListing as Listing;
  } catch (error: any) {
    console.error('Error fetching listing:', error);
    throw new Error(error.message ?? 'Failed to fetch listing');
  }
}

export async function getListingBySlug(slug: string, accessToken?: string): Promise<Listing> {
  try {
    console.log(`Fetching listing by slug: ${slug}`);
    
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    const { data, errors } = await apolloClient.query({
      query: GET_LISTING_BY_SLUG_QUERY,
      variables: { slug },
      context,
      errorPolicy: 'all',
      fetchPolicy: 'network-only'
    });

    if (errors && errors.length > 0) {
      console.error('GraphQL errors:', errors);
      throw new Error(errors[0].message);
    }

    if (!data?.getListingBySlug) {
      console.error('No data returned for slug:', slug);
      throw new Error("Listing not found");
    }

    console.log('Successfully fetched listing:', data.getListingBySlug.id);
    return data.getListingBySlug as Listing;
    
  } catch (error: any) {
    console.error('Error in getListingBySlug:', error);
    throw new Error(error.message ?? 'Failed to fetch listing by slug');
  }
}

export async function searchListings(
  searchTerm?: string,
  filters?: ListingFiltersInput,  
  page?: number,
  limit?: number,
  accessToken?: string
): Promise<ListingsResponse> {
  try {
    const context = accessToken ? {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    } : {};

    console.log('Search params:', { searchTerm, filters, page, limit });

    const { data } = await apolloClient.query({
      query: SEARCH_LISTINGS_QUERY,
      variables: { searchTerm, filters, page, limit },
      context,
      errorPolicy: 'all',
      fetchPolicy: 'network-only'
    });

    if (!data?.searchListings) {
      throw new Error("No search results data received");
    }

    console.log("Search results:", data.searchListings);
    return data.searchListings as ListingsResponse;
  } catch (error: any) {
    console.error('Error searching listings:', error);
    throw new Error(error.message ?? 'Failed to search listings');
  }
}

export async function createListing(
  input: CreateListingInput,
  accessToken: string
): Promise<Listing> {
  try {
    console.log('Received input:', input);
    const { data } = await apolloClient.mutate({
      mutation: CREATE_LISTING_MUTATION,
      variables: { input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.createListing) {
      throw new Error("Failed to create listing");
    }

    return data.createListing as Listing;
  } catch (error: any) {
    console.error('Error creating listing:', error);
    throw new Error(error.message ?? 'Failed to create listing');
  }
}

export async function updateListing(
  id: string,
  input: UpdateListingInput,
  accessToken: string
): Promise<Listing> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_LISTING_MUTATION,
      variables: { id, input },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.updateListing) {
      throw new Error("Failed to update listing");
    }

    return data.updateListing as Listing;
  } catch (error: any) {
    console.error('Error updating listing:', error);
    throw new Error(error.message ?? 'Failed to update listing');
  }
}

export async function deleteListing(id: string, accessToken?: string): Promise<boolean> {
  try {
    const context = accessToken
      ? {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      : {};

    const { data } = await apolloClient.mutate({
      mutation: DELETE_LISTING_MUTATION,
      variables: { id },
      context,
      errorPolicy: "all",
    });

    return data?.deleteListing ?? false;
  } catch (error: any) {
    console.error("Delete listing error:", error);
    return false;
  }
}

export async function followListing(
  listingId: string,
  accessToken: string
): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: FOLLOW_LISTING_MUTATION,
      variables: { listingId },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    return data?.followListing ?? false;
  } catch (error: any) {
    console.error('Error following listing:', error);
    throw new Error(error.message ?? 'Failed to follow listing');
  }
}

export async function likeListing(
  listingId: string,
  accessToken: string
): Promise<boolean> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: LIKE_LISTING_MUTATION,
      variables: { listingId },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    return data?.likeListing ?? false;
  } catch (error: any) {
    console.error('Error liking listing:', error);
    throw new Error(error.message ?? 'Failed to like listing');
  }
}

export async function claimListing(
  listingId: string,
  accessToken: string
): Promise<{ id: string; isClaimed: boolean; claimedById: string; claimedAt: string }> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: CLAIM_LISTING_MUTATION,
      variables: { listingId },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      },
      errorPolicy: 'all'
    });

    if (!data?.claimListing) {
      throw new Error("Failed to claim listing");
    }

    return data.claimListing;
  } catch (error: any) {
    console.error('Error claiming listing:', error);
    throw new Error(error.message ?? 'Failed to claim listing');
  }
}

// Helper functions
export async function getFeaturedListings(
  page?: number,
  limit?: number,
  accessToken?: string
): Promise<ListingsResponse> {
  return getListings(page, limit, { featured: true }, accessToken);
}

export async function getVerifiedListings(
  page?: number,
  limit?: number,
  accessToken?: string
): Promise<ListingsResponse> {
  return getListings(page, limit, { isVerified: true }, accessToken);
}

export async function getListingsByCategory(
  categoryIds: string[],
  page?: number,
  limit?: number,
  accessToken?: string
): Promise<ListingsResponse> {
  return getListings(page, limit, { categoryIds }, accessToken);
}

export async function getListingsWithRatingRange(
  minRating: number,
  maxRating: number,
  page?: number,
  limit?: number,
  accessToken?: string
): Promise<ListingsResponse> {
  return getListings(page, limit, { minRating, maxRating }, accessToken);
}
