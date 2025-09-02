// GraphQL Types for Apollo Client

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  followerCount: number;
  isActive: boolean;
  locked: boolean;
  role: string;
  subscribeNewsletter: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  login: {
    access_token: string;
    refresh_token: string;
    user: User;
  };
}

export interface RegisterResponse {
  register: {
    access_token: string;
    refresh_token: string;
    user: User;
  };
}

export interface LogoutResponse {
  logout: {
    success: boolean;
  };
}

export interface RefreshTokenResponse {
  refreshToken: {
    access_token: string;
    refresh_token: string;
    user: User;
  };
}

export interface ConfirmEmailResponse {
  confirmEmail: {
    success: boolean;
    message: string;
  };
}

export interface ResendEmailConfirmationResponse {
  resendEmailConfirmation: {
    success: boolean;
    message: string;
  };
}

// Input types
export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface RefreshTokenInput {
  refreshToken: string;
}

// Listing types
export interface Listing {
  id: string;
  name: string;
  slug: string;
  description: string;
  overview: string;
  foundedYear: number;
  slogan: string;
  moeRegNumber: string;
  feeTiers: string[];
  sectorFocus: string;
  genderFocus: string;
  religiousFocus: string;
  accommodationFocus: string;
  contactEmail: string;
  websiteUrl: string;
  imageUrl: string;
  imageId: string;
  studentCount: number;
  teacherCount: number;
  studentTeacherRatio: number;
  averageClassSize: number;
  maximumClassSize: number;
  languagesOffered: string[];
  extraLanguages: string[];
  nativeEnglishTeachers: boolean;
  leavingQualifications: string[];
  extracurricularActivities: string[];
  extraCurricularOffered: string[];
  sportsActivities: string[];
  transportationOptions: string[];
  parentAssociation: boolean;
  alumniFacilities: boolean;
  uniformRequired: boolean;
  lunchesProvided: boolean;
  teachingAssistants: boolean;
  schoolQualities: string[];
  teachingApproach: string;
  averageRating: number;
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
  claimedById: string;
  claimedAt: string;
  approvedAt: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  createdAt: string;
  updatedAt: string;
  owner: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profile: {
      name: string;
      avatar: string;
    };
  };
  creator: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profile: {
      name: string;
      avatar: string;
    };
  };
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    type: string;
    gradeNumber: number;
    gradeName: string;
    ageRange: string;
  }>;
  campuses: Array<{
    id: string;
    name: string;
    isMain: boolean;
    description: string;
    contactEmail: string;
    studentCount: number;
    teacherCount: number;
    studentTeacherRatio: number;
    averageClassSize: number;
    maximumClassSize: number;
    transportationOptions: string[];
    imageUrl: string;
    imageId: string;
    isActive: boolean;
    address: {
      id: string;
      locationName: string;
      isPrimary: boolean;
      streetAddress: string;
      addressLine2: string;
      neighborhood: string;
      subLocality: string;
      administrativeArea1: string;
      administrativeArea2: string;
      postalCode: string;
      landmark: string;
      formattedAddress: string;
      placeId: string;
      latitude: number;
      longitude: number;
      addressType: string;
      country: {
        id: string;
        name: string;
        code: string;
      };
      region: {
        id: string;
        name: string;
        code: string;
      };
      locality: {
        id: string;
        name: string;
        type: string;
      };
    };
  }>;
  socialMediaLinks: Array<{
    platform: string;
    url: string;
    username: string;
  }>;
  phoneNumbers: Array<{
    number: string;
    type: string;
    isPrimary: boolean;
    label: string;
  }>;
}

export interface ListingsResponse {
  listings: Listing[];
  total: number;
  hasMore: boolean;
}

export interface GetListingsResponse {
  getListings: ListingsResponse;
}

export interface ListingFiltersInput {
  categories?: string[];
  location?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  features?: string[];
  ageRange?: {
    min: number;
    max: number;
  };
  gender?: string;
  religious?: string;
  sector?: string;
  accommodation?: string;
  languages?: string[];
  extracurricular?: string[];
  sports?: string[];
  transportation?: string[];
  parentAssociation?: boolean;
  alumniFacilities?: boolean;
  uniformRequired?: boolean;
  lunchesProvided?: boolean;
  teachingAssistants?: boolean;
}