import { gql } from '@apollo/client';

// Login mutation
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      access_token
      refresh_token
      user {
        id
        firstName
        lastName
        email
        emailVerified
        followerCount
        isActive
        locked
        role
        subscribeNewsletter
        createdAt
        updatedAt
      }
    }
  }
`;

// Register mutation
export const REGISTER = gql`
  mutation Register($registerInput: RegisterDto!) {
    register(registerInput: $registerInput) {
      access_token
      refresh_token
      user {
        id
        firstName
        lastName
        email
        emailVerified
        followerCount
        isActive
        locked
        role
        subscribeNewsletter
        createdAt
        updatedAt
      }
    }
  }
`;

// Logout mutation
export const LOGOUT = gql`
  mutation Logout($refreshToken: String!) {
    logout(refreshToken: $refreshToken) {
      success
    }
  }
`;

// Refresh token mutation
export const REFRESH_TOKEN = gql`
  mutation RefreshToken($refreshTokenInput: RefreshTokenInput!) {
    refreshToken(refreshTokenInput: $refreshTokenInput) {
      access_token
      refresh_token
      user {
        id
        createdAt
        firstName
        lastName
        email
        emailVerified
        locked
        role
        avatar
      }
    }
  }
`;

// Confirm email mutation
export const CONFIRM_EMAIL = gql`
  mutation ConfirmEmail($userId: String!, $token: String!) {
    confirmEmail(userId: $userId, token: $token) {
      success
      message
    }
  }
`;

// Resend email confirmation mutation
export const RESEND_EMAIL_CONFIRMATION = gql`
  mutation ResendEmailConfirmation {
    resendEmailConfirmation {
      success
      message
    }
  }
`;

// Get listings query
export const GET_LISTINGS = gql`
  query GetListings($page: Int, $limit: Int, $filters: ListingFiltersInput) {
    getListings(page: $page, limit: $limit, filters: $filters) {
      listings {
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
        socialMediaLinks {
          platform
          url
          username
        }
        phoneNumbers {
          number
          type
          isPrimary
          label
        }
      }
      total
      hasMore
    }
  }
`;