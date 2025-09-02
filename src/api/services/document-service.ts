import { gql } from '@apollo/client';

// ========== TYPES ==========
export enum DocumentType {
  ACADEMIC_CALENDAR = 'ACADEMIC_CALENDAR',
  ADMISSION_FORM = 'ADMISSION_FORM',
  BROCHURE = 'BROCHURE',
  CURRICULUM = 'CURRICULUM',
  HANDBOOK = 'HANDBOOK',
  NEWSLETTER = 'NEWSLETTER',
  POLICY = 'POLICY',
  PROCEDURE = 'PROCEDURE',
  REPORT = 'REPORT',
  SYLLABUS = 'SYLLABUS',
  TRANSCRIPT = 'TRANSCRIPT',
  OTHER = 'OTHER'
}

// ========== INTERFACES ==========
export interface Document {
  id: string;
  title: string;
  description?: string;
  type: DocumentType;
  fileUrl?: string;
  fileId?: string;
  thumbnailUrl?: string;
  thumbnailId?: string;
  isPublic: boolean;
  isActive: boolean;
  tags: string[];
  campusId?: string;
  courseId?: string;
  listingId?: string;
  curriculumId?: string;
  eventId?: string;
  facilityId?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  downloadCount: number;
  fileSize?: number;
  mimeType?: string;
  version?: string;
  expiryDate?: string;
  createdAt: string;
  updatedAt: string;
  
  // Relations
  campus?: {
    id: string;
    name: string;
    isMain: boolean;
  };
  course?: {
    id: string;
    name: string;
    slug: string;
  };
  listing?: {
    id: string;
    name: string;
    slug: string;
  };
  curriculum?: {
    id: string;
    name: string;
    slug: string;
  };
  event?: {
    id: string;
    title: string;
    slug: string;
  };
  facility?: {
    id: string;
    name: string;
    type: string;
  };
}

export interface CreateDocumentInput {
  title: string;
  description?: string;
  type: DocumentType;
  fileUrl?: string;
  fileId?: string;
  thumbnailUrl?: string;
  thumbnailId?: string;
  isPublic?: boolean;
  isActive?: boolean;
  tags?: string[];
  campusId?: string;
  courseId?: string;
  listingId?: string;
  curriculumId?: string;
  eventId?: string;
  facilityId?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  downloadCount?: number;
  fileSize?: number;
  mimeType?: string;
  version?: string;
  expiryDate?: string;
}

export interface UpdateDocumentInput {
  title?: string;
  description?: string;
  type?: DocumentType;
  fileUrl?: string;
  fileId?: string;
  thumbnailUrl?: string;
  thumbnailId?: string;
  isPublic?: boolean;
  isActive?: boolean;
  tags?: string[];
  campusId?: string;
  courseId?: string;
  listingId?: string;
  curriculumId?: string;
  eventId?: string;
  facilityId?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  downloadCount?: number;
  fileSize?: number;
  mimeType?: string;
  version?: string;
  expiryDate?: string;
}

export interface DocumentFilter {
  search?: string;
  type?: DocumentType;
  isPublic?: boolean;
  isActive?: boolean;
  campusId?: string;
  courseId?: string;
  listingId?: string;
  curriculumId?: string;
  eventId?: string;
  facilityId?: string;
  tags?: string[];
  hasFile?: boolean;
  hasThumbnail?: boolean;
}

export interface DocumentSort {
  title?: 'asc' | 'desc';
  type?: 'asc' | 'desc';
  createdAt?: 'asc' | 'desc';
  updatedAt?: 'asc' | 'desc';
  downloadCount?: 'asc' | 'desc';
  fileSize?: 'asc' | 'desc';
}

export interface DocumentResponse {
  documents: Document[];
  total: number;
  hasMore: boolean;
}

export interface DocumentStats {
  totalDocuments: number;
  publicDocuments: number;
  privateDocuments: number;
  activeDocuments: number;
  inactiveDocuments: number;
  totalDownloads: number;
  averageFileSize: number;
  documentsByType: {
    type: DocumentType;
    count: number;
  }[];
}

// ========== GRAPHQL FRAGMENTS ==========
const DOCUMENT_FRAGMENT = gql`
  fragment DocumentFragment on Document {
    id
    title
    description
    type
    fileUrl
    fileId
    thumbnailUrl
    thumbnailId
    isPublic
    isActive
    tags
    campusId
    courseId
    listingId
    curriculumId
    eventId
    facilityId
    metaTitle
    metaDescription
    metaKeywords
    downloadCount
    fileSize
    mimeType
    version
    expiryDate
    createdAt
    updatedAt
    campus {
      id
      name
      isMain
    }
    course {
      id
      name
      slug
    }
    listing {
      id
      name
      slug
    }
    curriculum {
      id
      name
      slug
    }
    event {
      id
      title
      slug
    }
    facility {
      id
      name
      type
    }
  }
`;

// ========== GRAPHQL QUERIES ==========
const GET_DOCUMENTS_QUERY = gql`
  ${DOCUMENT_FRAGMENT}
  query GetDocuments(
    $filters: DocumentFilterInput
    $pagination: PaginationInput
    $sort: DocumentSortInput
  ) {
    getDocuments(filters: $filters, pagination: $pagination, sort: $sort) {
      documents {
        ...DocumentFragment
      }
      total
      hasMore
    }
  }
`;

const GET_DOCUMENT_QUERY = gql`
  ${DOCUMENT_FRAGMENT}
  query GetDocument($id: ID!) {
    getDocument(id: $id) {
      ...DocumentFragment
    }
  }
`;

const GET_DOCUMENTS_BY_CAMPUS_QUERY = gql`
  ${DOCUMENT_FRAGMENT}
  query GetDocumentsByCampus($campusId: ID!, $isPublic: Boolean) {
    getDocumentsByCampus(campusId: $campusId, isPublic: $isPublic) {
      ...DocumentFragment
    }
  }
`;

const GET_DOCUMENTS_BY_COURSE_QUERY = gql`
  ${DOCUMENT_FRAGMENT}
  query GetDocumentsByCourse($courseId: ID!, $isPublic: Boolean) {
    getDocumentsByCourse(courseId: $courseId, isPublic: $isPublic) {
      ...DocumentFragment
    }
  }
`;

const GET_DOCUMENTS_BY_LISTING_QUERY = gql`
  ${DOCUMENT_FRAGMENT}
  query GetDocumentsByListing($listingId: ID!, $isPublic: Boolean) {
    getDocumentsByListing(listingId: $listingId, isPublic: $isPublic) {
      ...DocumentFragment
    }
  }
`;

const GET_DOCUMENTS_BY_TYPE_QUERY = gql`
  ${DOCUMENT_FRAGMENT}
  query GetDocumentsByType($type: DocumentType!, $isPublic: Boolean) {
    getDocumentsByType(type: $type, isPublic: $isPublic) {
      ...DocumentFragment
    }
  }
`;

const GET_DOCUMENT_STATS_QUERY = gql`
  query GetDocumentStats {
    getDocumentStats {
      totalDocuments
      publicDocuments
      privateDocuments
      activeDocuments
      inactiveDocuments
      totalDownloads
      averageFileSize
      documentsByType {
        type
        count
      }
    }
  }
`;

// ========== GRAPHQL MUTATIONS ==========
const CREATE_DOCUMENT_MUTATION = gql`
  ${DOCUMENT_FRAGMENT}
  mutation CreateDocument($input: CreateDocumentInput!) {
    createDocument(input: $input) {
      ...DocumentFragment
    }
  }
`;

const UPDATE_DOCUMENT_MUTATION = gql`
  ${DOCUMENT_FRAGMENT}
  mutation UpdateDocument($id: ID!, $input: UpdateDocumentInput!) {
    updateDocument(id: $id, input: $input) {
      ...DocumentFragment
    }
  }
`;

const DELETE_DOCUMENT_MUTATION = gql`
  mutation RemoveDocument($id: ID!) {
    removeDocument(id: $id)
  }
`;

const TOGGLE_DOCUMENT_PUBLIC_STATUS_MUTATION = gql`
  ${DOCUMENT_FRAGMENT}
  mutation ToggleDocumentPublicStatus($id: ID!) {
    toggleDocumentPublicStatus(id: $id) {
      ...DocumentFragment
    }
  }
`;

const BULK_CREATE_DOCUMENTS_MUTATION = gql`
  ${DOCUMENT_FRAGMENT}
  mutation BulkCreateDocuments($documents: [CreateDocumentInput!]!) {
    bulkCreateDocuments(documents: $documents) {
      ...DocumentFragment
    }
  }
`;

const BULK_DELETE_DOCUMENTS_MUTATION = gql`
  mutation BulkDeleteDocuments($ids: [ID!]!) {
    bulkDeleteDocuments(ids: $ids)
  }
`;

// ========== UTILITY FUNCTIONS ==========
export function formatDocumentType(type: DocumentType): string {
  const typeMap: Record<DocumentType, string> = {
    [DocumentType.ACADEMIC_CALENDAR]: 'Academic Calendar',
    [DocumentType.ADMISSION_FORM]: 'Admission Form',
    [DocumentType.BROCHURE]: 'Brochure',
    [DocumentType.CURRICULUM]: 'Curriculum',
    [DocumentType.HANDBOOK]: 'Handbook',
    [DocumentType.NEWSLETTER]: 'Newsletter',
    [DocumentType.POLICY]: 'Policy',
    [DocumentType.PROCEDURE]: 'Procedure',
    [DocumentType.REPORT]: 'Report',
    [DocumentType.SYLLABUS]: 'Syllabus',
    [DocumentType.TRANSCRIPT]: 'Transcript',
    [DocumentType.OTHER]: 'Other'
  };
  return typeMap[type] || type;
}

export function getDocumentTypeIcon(type: DocumentType): string {
  const iconMap: Record<DocumentType, string> = {
    [DocumentType.ACADEMIC_CALENDAR]: '📅',
    [DocumentType.ADMISSION_FORM]: '📝',
    [DocumentType.BROCHURE]: '📄',
    [DocumentType.CURRICULUM]: '📚',
    [DocumentType.HANDBOOK]: '📖',
    [DocumentType.NEWSLETTER]: '📰',
    [DocumentType.POLICY]: '📋',
    [DocumentType.PROCEDURE]: '📋',
    [DocumentType.REPORT]: '📊',
    [DocumentType.SYLLABUS]: '📑',
    [DocumentType.TRANSCRIPT]: '🎓',
    [DocumentType.OTHER]: '📄'
  };
  return iconMap[type] || '📄';
}

export function getDocumentTypeColor(type: DocumentType): string {
  const colorMap: Record<DocumentType, string> = {
    [DocumentType.ACADEMIC_CALENDAR]: '#3B82F6',
    [DocumentType.ADMISSION_FORM]: '#EF4444',
    [DocumentType.BROCHURE]: '#10B981',
    [DocumentType.CURRICULUM]: '#F59E0B',
    [DocumentType.HANDBOOK]: '#8B5CF6',
    [DocumentType.NEWSLETTER]: '#EC4899',
    [DocumentType.POLICY]: '#14B8A6',
    [DocumentType.PROCEDURE]: '#F97316',
    [DocumentType.REPORT]: '#84CC16',
    [DocumentType.SYLLABUS]: '#6366F1',
    [DocumentType.TRANSCRIPT]: '#06B6D4',
    [DocumentType.OTHER]: '#6B7280'
  };
  return colorMap[type] || '#6B7280';
}

export function formatFileSize(size?: number): string {
  if (!size) return 'Size not available';
  
  const units = ['B', 'KB', 'MB', 'GB'];
  let unitIndex = 0;
  let fileSize = size;
  
  while (fileSize >= 1024 && unitIndex < units.length - 1) {
    fileSize /= 1024;
    unitIndex++;
  }
  
  return `${fileSize.toFixed(1)} ${units[unitIndex]}`;
}

export function formatDownloadCount(count: number): string {
  if (count === 0) return 'No downloads';
  if (count === 1) return '1 download';
  return `${count} downloads`;
}

export function formatDocumentTags(tags: string[]): string {
  if (tags.length === 0) return 'No tags';
  if (tags.length === 1) return tags[0];
  if (tags.length === 2) return tags.join(' and ');
  return `${tags.slice(0, -1).join(', ')} and ${tags[tags.length - 1]}`;
}

export function getFileExtension(url?: string): string {
  if (!url) return '';
  const parts = url.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
}

export function isExpired(expiryDate?: string): boolean {
  if (!expiryDate) return false;
  return new Date(expiryDate) < new Date();
}

export function getDaysUntilExpiry(expiryDate?: string): number {
  if (!expiryDate) return -1;
  const expiry = new Date(expiryDate);
  const now = new Date();
  const diffTime = expiry.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// ========== MOCK DATA ==========
export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Academic Calendar 2024-2025',
    description: 'Complete academic calendar for the 2024-2025 academic year',
    type: DocumentType.ACADEMIC_CALENDAR,
    fileUrl: 'https://example.com/academic-calendar-2024-2025.pdf',
    fileId: 'doc-001',
    thumbnailUrl: 'https://example.com/calendar-thumb.jpg',
    thumbnailId: 'thumb-001',
    isPublic: true,
    isActive: true,
    tags: ['academic', 'calendar', '2024', '2025'],
    listingId: '1',
    metaTitle: 'Academic Calendar 2024-2025 - University of Lagos',
    metaDescription: 'Download the complete academic calendar for the 2024-2025 academic year',
    metaKeywords: 'academic calendar, university, 2024, 2025',
    downloadCount: 1250,
    fileSize: 2048576, // 2MB
    mimeType: 'application/pdf',
    version: '1.0',
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
    title: 'Admission Requirements',
    description: 'Complete guide to admission requirements and procedures',
    type: DocumentType.ADMISSION_FORM,
    fileUrl: 'https://example.com/admission-requirements.pdf',
    fileId: 'doc-002',
    thumbnailUrl: 'https://example.com/admission-thumb.jpg',
    thumbnailId: 'thumb-002',
    isPublic: true,
    isActive: true,
    tags: ['admission', 'requirements', 'guide'],
    listingId: '1',
    metaTitle: 'Admission Requirements - University of Lagos',
    metaDescription: 'Complete guide to admission requirements and procedures',
    metaKeywords: 'admission, requirements, university',
    downloadCount: 890,
    fileSize: 1536000, // 1.5MB
    mimeType: 'application/pdf',
    version: '2.1',
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
    title: 'Student Handbook',
    description: 'Comprehensive student handbook with policies and procedures',
    type: DocumentType.HANDBOOK,
    fileUrl: 'https://example.com/student-handbook.pdf',
    fileId: 'doc-003',
    thumbnailUrl: 'https://example.com/handbook-thumb.jpg',
    thumbnailId: 'thumb-003',
    isPublic: true,
    isActive: true,
    tags: ['student', 'handbook', 'policies', 'procedures'],
    listingId: '1',
    metaTitle: 'Student Handbook - University of Lagos',
    metaDescription: 'Comprehensive student handbook with policies and procedures',
    metaKeywords: 'student, handbook, policies, procedures',
    downloadCount: 2100,
    fileSize: 5120000, // 5MB
    mimeType: 'application/pdf',
    version: '3.0',
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
    title: 'Course Syllabus - Computer Science',
    description: 'Detailed syllabus for Computer Science program',
    type: DocumentType.SYLLABUS,
    fileUrl: 'https://example.com/cs-syllabus.pdf',
    fileId: 'doc-004',
    thumbnailUrl: 'https://example.com/syllabus-thumb.jpg',
    thumbnailId: 'thumb-004',
    isPublic: true,
    isActive: true,
    tags: ['computer science', 'syllabus', 'course'],
    courseId: '1',
    listingId: '1',
    metaTitle: 'Computer Science Syllabus - University of Lagos',
    metaDescription: 'Detailed syllabus for Computer Science program',
    metaKeywords: 'computer science, syllabus, course',
    downloadCount: 750,
    fileSize: 1024000, // 1MB
    mimeType: 'application/pdf',
    version: '1.5',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    course: {
      id: '1',
      name: 'Computer Science',
      slug: 'computer-science'
    },
    listing: {
      id: '1',
      name: 'University of Lagos',
      slug: 'university-of-lagos'
    }
  },
  {
    id: '5',
    title: 'University Brochure',
    description: 'Official university brochure with campus information',
    type: DocumentType.BROCHURE,
    fileUrl: 'https://example.com/university-brochure.pdf',
    fileId: 'doc-005',
    thumbnailUrl: 'https://example.com/brochure-thumb.jpg',
    thumbnailId: 'thumb-005',
    isPublic: true,
    isActive: true,
    tags: ['brochure', 'university', 'campus', 'information'],
    listingId: '1',
    metaTitle: 'University Brochure - University of Lagos',
    metaDescription: 'Official university brochure with campus information',
    metaKeywords: 'brochure, university, campus, information',
    downloadCount: 1500,
    fileSize: 8192000, // 8MB
    mimeType: 'application/pdf',
    version: '4.2',
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
export async function getDocuments(
  filters?: DocumentFilter,
  pagination?: { page?: number; limit?: number },
  sort?: DocumentSort,
  accessToken?: string
): Promise<DocumentResponse> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_DOCUMENTS_QUERY,
    //   variables: { filters, pagination, sort },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getDocuments;
    
    // Return mock data for now
    let filteredDocuments = [...mockDocuments];
    
    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredDocuments = filteredDocuments.filter(doc =>
          doc.title.toLowerCase().includes(searchLower) ||
          doc.description?.toLowerCase().includes(searchLower)
        );
      }
      
      if (filters.type) {
        filteredDocuments = filteredDocuments.filter(doc => doc.type === filters.type);
      }
      
      if (filters.isPublic !== undefined) {
        filteredDocuments = filteredDocuments.filter(doc => doc.isPublic === filters.isPublic);
      }
      
      if (filters.isActive !== undefined) {
        filteredDocuments = filteredDocuments.filter(doc => doc.isActive === filters.isActive);
      }
      
      if (filters.campusId) {
        filteredDocuments = filteredDocuments.filter(doc => doc.campusId === filters.campusId);
      }
      
      if (filters.courseId) {
        filteredDocuments = filteredDocuments.filter(doc => doc.courseId === filters.courseId);
      }
      
      if (filters.listingId) {
        filteredDocuments = filteredDocuments.filter(doc => doc.listingId === filters.listingId);
      }
      
      if (filters.curriculumId) {
        filteredDocuments = filteredDocuments.filter(doc => doc.curriculumId === filters.curriculumId);
      }
      
      if (filters.eventId) {
        filteredDocuments = filteredDocuments.filter(doc => doc.eventId === filters.eventId);
      }
      
      if (filters.facilityId) {
        filteredDocuments = filteredDocuments.filter(doc => doc.facilityId === filters.facilityId);
      }
      
      if (filters.tags && filters.tags.length > 0) {
        filteredDocuments = filteredDocuments.filter(doc =>
          filters.tags!.some(tag => doc.tags.includes(tag))
        );
      }
      
      if (filters.hasFile !== undefined) {
        filteredDocuments = filteredDocuments.filter(doc =>
          filters.hasFile ? !!doc.fileUrl : !doc.fileUrl
        );
      }
      
      if (filters.hasThumbnail !== undefined) {
        filteredDocuments = filteredDocuments.filter(doc =>
          filters.hasThumbnail ? !!doc.thumbnailUrl : !doc.thumbnailUrl
        );
      }
    }
    
    // Apply sorting
    if (sort) {
      filteredDocuments.sort((a, b) => {
        if (sort.title) {
          return sort.title === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
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
        if (sort.downloadCount) {
          return sort.downloadCount === 'asc'
            ? a.downloadCount - b.downloadCount
            : b.downloadCount - a.downloadCount;
        }
        if (sort.fileSize) {
          const aSize = a.fileSize || 0;
          const bSize = b.fileSize || 0;
          return sort.fileSize === 'asc' ? aSize - bSize : bSize - aSize;
        }
        return 0;
      });
    }
    
    const total = filteredDocuments.length;
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;
    const paginatedDocuments = filteredDocuments.slice(skip, skip + limit);
    
    return {
      documents: paginatedDocuments,
      total,
      hasMore: skip + limit < total
    };
  } catch (error) {
    console.error('Error fetching documents:', error);
    return {
      documents: mockDocuments,
      total: mockDocuments.length,
      hasMore: false
    };
  }
}

export async function getDocument(
  id: string,
  accessToken?: string
): Promise<Document | null> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_DOCUMENT_QUERY,
    //   variables: { id },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getDocument;
    
    // Return mock data for now
    return mockDocuments.find(doc => doc.id === id) || null;
  } catch (error) {
    console.error('Error fetching document:', error);
    return null;
  }
}

export async function getDocumentsByCampus(
  campusId: string,
  isPublic?: boolean,
  accessToken?: string
): Promise<Document[]> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_DOCUMENTS_BY_CAMPUS_QUERY,
    //   variables: { campusId, isPublic },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getDocumentsByCampus;
    
    // Return mock data for now
    return mockDocuments.filter(doc => 
      doc.campusId === campusId && 
      (isPublic === undefined || doc.isPublic === isPublic)
    );
  } catch (error) {
    console.error('Error fetching documents by campus:', error);
    return mockDocuments.filter(doc => 
      doc.campusId === campusId && 
      (isPublic === undefined || doc.isPublic === isPublic)
    );
  }
}

export async function getDocumentsByCourse(
  courseId: string,
  isPublic?: boolean,
  accessToken?: string
): Promise<Document[]> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_DOCUMENTS_BY_COURSE_QUERY,
    //   variables: { courseId, isPublic },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getDocumentsByCourse;
    
    // Return mock data for now
    return mockDocuments.filter(doc => 
      doc.courseId === courseId && 
      (isPublic === undefined || doc.isPublic === isPublic)
    );
  } catch (error) {
    console.error('Error fetching documents by course:', error);
    return mockDocuments.filter(doc => 
      doc.courseId === courseId && 
      (isPublic === undefined || doc.isPublic === isPublic)
    );
  }
}

export async function getDocumentsByListing(
  listingId: string,
  isPublic?: boolean,
  accessToken?: string
): Promise<Document[]> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_DOCUMENTS_BY_LISTING_QUERY,
    //   variables: { listingId, isPublic },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getDocumentsByListing;
    
    // Return mock data for now
    return mockDocuments.filter(doc => 
      doc.listingId === listingId && 
      (isPublic === undefined || doc.isPublic === isPublic)
    );
  } catch (error) {
    console.error('Error fetching documents by listing:', error);
    return mockDocuments.filter(doc => 
      doc.listingId === listingId && 
      (isPublic === undefined || doc.isPublic === isPublic)
    );
  }
}

export async function getDocumentsByType(
  type: DocumentType,
  isPublic?: boolean,
  accessToken?: string
): Promise<Document[]> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_DOCUMENTS_BY_TYPE_QUERY,
    //   variables: { type, isPublic },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getDocumentsByType;
    
    // Return mock data for now
    return mockDocuments.filter(doc => 
      doc.type === type && 
      (isPublic === undefined || doc.isPublic === isPublic)
    );
  } catch (error) {
    console.error('Error fetching documents by type:', error);
    return mockDocuments.filter(doc => 
      doc.type === type && 
      (isPublic === undefined || doc.isPublic === isPublic)
    );
  }
}

export async function getDocumentStats(accessToken?: string): Promise<DocumentStats> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_DOCUMENT_STATS_QUERY,
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getDocumentStats;
    
    // Return mock data for now
    const totalDocuments = mockDocuments.length;
    const publicDocuments = mockDocuments.filter(d => d.isPublic).length;
    const privateDocuments = totalDocuments - publicDocuments;
    const activeDocuments = mockDocuments.filter(d => d.isActive).length;
    const inactiveDocuments = totalDocuments - activeDocuments;
    const totalDownloads = mockDocuments.reduce((sum, d) => sum + d.downloadCount, 0);
    const totalFileSize = mockDocuments.reduce((sum, d) => sum + (d.fileSize || 0), 0);
    const averageFileSize = totalFileSize / totalDocuments;
    
    const documentsByType = mockDocuments.reduce((acc, doc) => {
      acc[doc.type] = (acc[doc.type] || 0) + 1;
      return acc;
    }, {} as Record<DocumentType, number>);
    
    return {
      totalDocuments,
      publicDocuments,
      privateDocuments,
      activeDocuments,
      inactiveDocuments,
      totalDownloads,
      averageFileSize,
      documentsByType: Object.entries(documentsByType).map(([type, count]) => ({
        type: type as DocumentType,
        count
      }))
    };
  } catch (error) {
    console.error('Error fetching document stats:', error);
    return {
      totalDocuments: 0,
      publicDocuments: 0,
      privateDocuments: 0,
      activeDocuments: 0,
      inactiveDocuments: 0,
      totalDownloads: 0,
      averageFileSize: 0,
      documentsByType: []
    };
  }
}

// ========== UTILITY API FUNCTIONS ==========
export async function getPublicDocuments(accessToken?: string): Promise<Document[]> {
  try {
    const result = await getDocuments(
      { isPublic: true, isActive: true },
      { page: 1, limit: 100 },
      { title: 'asc' },
      accessToken
    );
    return result.documents;
  } catch (error) {
    console.error('Error fetching public documents:', error);
    return mockDocuments.filter(doc => doc.isPublic && doc.isActive);
  }
}

export async function getPrivateDocuments(accessToken?: string): Promise<Document[]> {
  try {
    const result = await getDocuments(
      { isPublic: false, isActive: true },
      { page: 1, limit: 100 },
      { title: 'asc' },
      accessToken
    );
    return result.documents;
  } catch (error) {
    console.error('Error fetching private documents:', error);
    return mockDocuments.filter(doc => !doc.isPublic && doc.isActive);
  }
}

export async function searchDocuments(
  searchTerm: string,
  accessToken?: string
): Promise<Document[]> {
  try {
    const result = await getDocuments(
      { search: searchTerm, isActive: true },
      { page: 1, limit: 50 },
      { title: 'asc' },
      accessToken
    );
    return result.documents;
  } catch (error) {
    console.error('Error searching documents:', error);
    return mockDocuments.filter(doc =>
      doc.isActive &&
      (doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       doc.description?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }
}

// ========== MUTATION FUNCTIONS ==========
export async function createDocument(
  input: CreateDocumentInput,
  accessToken: string
): Promise<Document> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: CREATE_DOCUMENT_MUTATION,
    //   variables: { input },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.createDocument;
    
    throw new Error('Create document not implemented yet');
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
}

export async function updateDocument(
  id: string,
  input: UpdateDocumentInput,
  accessToken: string
): Promise<Document> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: UPDATE_DOCUMENT_MUTATION,
    //   variables: { id, input },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.updateDocument;
    
    throw new Error('Update document not implemented yet');
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
}

export async function deleteDocument(
  id: string,
  accessToken: string
): Promise<boolean> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: DELETE_DOCUMENT_MUTATION,
    //   variables: { id },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.removeDocument === true;
    
    throw new Error('Delete document not implemented yet');
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}

export async function toggleDocumentPublicStatus(
  id: string,
  accessToken: string
): Promise<Document> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: TOGGLE_DOCUMENT_PUBLIC_STATUS_MUTATION,
    //   variables: { id },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.toggleDocumentPublicStatus;
    
    throw new Error('Toggle document public status not implemented yet');
  } catch (error) {
    console.error('Error toggling document public status:', error);
    throw error;
  }
}

export async function bulkCreateDocuments(
  documents: CreateDocumentInput[],
  accessToken: string
): Promise<Document[]> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: BULK_CREATE_DOCUMENTS_MUTATION,
    //   variables: { documents },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.bulkCreateDocuments;
    
    throw new Error('Bulk create documents not implemented yet');
  } catch (error) {
    console.error('Error bulk creating documents:', error);
    throw error;
  }
}

export async function bulkDeleteDocuments(
  ids: string[],
  accessToken: string
): Promise<number> {
  try {
    // TODO: Implement actual GraphQL mutation
    // const { data } = await apolloClient.mutate({
    //   mutation: BULK_DELETE_DOCUMENTS_MUTATION,
    //   variables: { ids },
    //   context: { headers: { authorization: `Bearer ${accessToken}` } },
    //   errorPolicy: 'all'
    // });
    // return data.bulkDeleteDocuments || 0;
    
    throw new Error('Bulk delete documents not implemented yet');
  } catch (error) {
    console.error('Error bulk deleting documents:', error);
    throw error;
  }
}
