import { gql } from '@apollo/client';

// ========== TYPES ==========
export enum LocalityType {
  CITY = 'CITY',
  TOWN = 'TOWN',
  VILLAGE = 'VILLAGE',
  DISTRICT = 'DISTRICT',
  MUNICIPALITY = 'MUNICIPALITY',
  COUNTY = 'COUNTY',
  SUBURB = 'SUBURB'
}

export enum AddressType {
  CAMPUS = 'CAMPUS',
  HEADQUARTERS = 'HEADQUARTERS',
  BRANCH = 'BRANCH',
  RESIDENTIAL = 'RESIDENTIAL',
  COMMERCIAL = 'COMMERCIAL',
  MAILING = 'MAILING'
}

// Input Interfaces
export interface CreateCountryInput {
  name: string;
  code: string; // ISO 3166-1 alpha-2
  code3: string; // ISO 3166-1 alpha-3
  currency?: string;
  timezone?: string;
  isActive?: boolean;
}

export interface UpdateCountryInput {
  name?: string;
  code?: string;
  code3?: string;
  currency?: string;
  timezone?: string;
  isActive?: boolean;
}

export interface CreateRegionInput {
  name: string;
  code?: string;
  countryId: string;
  isActive?: boolean;
}

export interface UpdateRegionInput {
  name?: string;
  code?: string;
  countryId?: string;
  isActive?: boolean;
}

export interface CreateLocalityInput {
  name: string;
  type: LocalityType;
  regionId: string;
  countryId: string;
  isActive?: boolean;
  latitude?: number;
  longitude?: number;
  zipCode?: string;
}

export interface UpdateLocalityInput {
  name?: string;
  type?: LocalityType;
  regionId?: string;
  countryId?: string;
  isActive?: boolean;
  latitude?: number;
  longitude?: number;
  zipCode?: string;
}

export interface CreateAddressInput {
  campusId?: string;
  countryId?: string;
  regionId: string;
  localityId: string;
  locationName?: string;
  isPrimary?: boolean;
  subLocality?: string;
  neighborhood?: string;
  streetAddress?: string;
  administrativeArea1?: string;
  administrativeArea2?: string;
  postalCode?: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
}

export interface UpdateAddressInput {
  campusId?: string;
  countryId?: string;
  regionId?: string;
  localityId?: string;
  locationName?: string;
  isPrimary?: boolean;
  subLocality?: string;
  neighborhood?: string;
  streetAddress?: string;
  administrativeArea1?: string;
  administrativeArea2?: string;
  postalCode?: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
}

// Filter Interfaces
export interface CountryFiltersInput {
  search?: string;
  isActive?: boolean;
  codes?: string[];
}

export interface RegionFiltersInput {
  search?: string;
  countryId?: string;
  isActive?: boolean;
}

export interface LocalityFiltersInput {
  search?: string;
  type?: LocalityType[];
  regionId?: string;
  countryId?: string;
  isActive?: boolean;
  hasCoordinates?: boolean;
}

export interface AddressFiltersInput {
  campusId?: string;
  countryId?: string;
  regionId?: string;
  localityId?: string;
  isPrimary?: boolean;
  hasCoordinates?: boolean;
  search?: string;
}

// Response Interfaces
export interface Country {
  id: string;
  name: string;
  slug: string;
  code: string;
  code3: string;
  currency?: string;
  timezone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  regions?: Region[];
  localities?: Locality[];
  addresses?: Address[];
}

export interface Region {
  id: string;
  name: string;
  slug: string;
  code?: string;
  countryId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  country?: Country;
  localities?: Locality[];
  addresses?: Address[];
}

export interface Locality {
  id: string;
  name: string;
  slug: string;
  type: LocalityType;
  regionId: string;
  countryId: string;
  isActive: boolean;
  latitude?: number;
  longitude?: number;
  zipCode?: string;
  createdAt: string;
  updatedAt: string;
  region?: Region;
  country?: Country;
  addresses?: Address[];
}

export interface Address {
  id: string;
  campusId?: string;
  countryId?: string;
  regionId: string;
  localityId: string;
  locationName?: string;
  isPrimary: boolean;
  subLocality?: string;
  neighborhood?: string;
  streetAddress?: string;
  administrativeArea1?: string;
  administrativeArea2?: string;
  postalCode?: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  updatedAt: string;
  country?: Country;
  region: Region;
  locality: Locality;
  formattedAddress?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
  };
}

// ========== GRAPHQL FRAGMENTS ==========
const COUNTRY_FRAGMENT = gql`
  fragment CountryFragment on Country {
    id
    name
    slug
    code
    code3
    currency
    timezone
    isActive
    createdAt
    updatedAt
  }
`;

const REGION_FRAGMENT = gql`
  fragment RegionFragment on Region {
    id
    name
    slug
    code
    countryId
    isActive
    createdAt
    updatedAt
    country {
      ...CountryFragment
    }
  }
`;

const LOCALITY_FRAGMENT = gql`
  fragment LocalityFragment on Locality {
    id
    name
    slug
    type
    regionId
    countryId
    isActive
    latitude
    longitude
    zipCode
    createdAt
    updatedAt
    region {
      ...RegionFragment
    }
    country {
      ...CountryFragment
    }
  }
`;

const ADDRESS_FRAGMENT = gql`
  fragment AddressFragment on Address {
    id
    campusId
    countryId
    regionId
    localityId
    locationName
    isPrimary
    subLocality
    neighborhood
    streetAddress
    administrativeArea1
    administrativeArea2
    postalCode
    landmark
    latitude
    longitude
    createdAt
    updatedAt
    formattedAddress
    country {
      ...CountryFragment
    }
    region {
      ...RegionFragment
    }
    locality {
      ...LocalityFragment
    }
  }
`;

// ========== GRAPHQL QUERIES ==========
const GET_COUNTRIES_QUERY = gql`
  ${COUNTRY_FRAGMENT}
  query GetCountries($filter: CountryFiltersInput) {
    getCountries(filter: $filter) {
      ...CountryFragment
    }
  }
`;

const GET_COUNTRY_BY_ID_QUERY = gql`
  ${COUNTRY_FRAGMENT}
  ${REGION_FRAGMENT}
  query GetCountry($id: ID!) {
    getCountry(id: $id) {
      ...CountryFragment
      regions {
        ...RegionFragment
      }
    }
  }
`;

const GET_COUNTRY_BY_CODE_QUERY = gql`
  ${COUNTRY_FRAGMENT}
  query GetCountryByCode($code: String!) {
    getCountryByCode(code: $code) {
      ...CountryFragment
    }
  }
`;

const GET_COUNTRY_BY_SLUG_QUERY = gql`
  ${COUNTRY_FRAGMENT}
  query GetCountryBySlug($slug: String!) {
    getCountryBySlug(slug: $slug) {
      ...CountryFragment
    }
  }
`;

const GET_REGIONS_QUERY = gql`
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  query GetRegions($filter: RegionFiltersInput) {
    getRegions(filter: $filter) {
      ...RegionFragment
    }
  }
`;

const GET_REGION_BY_ID_QUERY = gql`
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  query GetRegion($id: ID!) {
    getRegion(id: $id) {
      ...RegionFragment
    }
  }
`;

const GET_REGIONS_BY_COUNTRY_QUERY = gql`
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  query GetRegionsByCountry($countryId: ID!) {
    getRegionsByCountry(countryId: $countryId) {
      ...RegionFragment
    }
  }
`;

const GET_LOCALITIES_QUERY = gql`
  ${LOCALITY_FRAGMENT}
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  query GetLocalities($filters: LocalityFiltersInput) {
    getLocalities(filters: $filters) {
      ...LocalityFragment
    }
  }
`;

const GET_LOCALITY_BY_ID_QUERY = gql`
  ${LOCALITY_FRAGMENT}
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  query GetLocality($id: ID!) {
    getLocality(id: $id) {
      ...LocalityFragment
    }
  }
`;

const GET_LOCALITIES_BY_REGION_QUERY = gql`
  ${LOCALITY_FRAGMENT}
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  query GetLocalitiesByRegion($regionId: ID!, $includeInactive: Boolean) {
    getLocalitiesByRegion(regionId: $regionId, includeInactive: $includeInactive) {
      ...LocalityFragment
    }
  }
`;

const GET_LOCALITIES_BY_COUNTRY_QUERY = gql`
  ${LOCALITY_FRAGMENT}
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  query GetLocalitiesByCountry($countryId: ID!, $includeInactive: Boolean) {
    getLocalitiesByCountry(countryId: $countryId, includeInactive: $includeInactive) {
      ...LocalityFragment
    }
  }
`;

const SEARCH_LOCALITIES_QUERY = gql`
  ${LOCALITY_FRAGMENT}
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  query SearchLocalities($searchTerm: String!, $includeInactive: Boolean) {
    searchLocalities(searchTerm: $searchTerm, includeInactive: $includeInactive) {
      ...LocalityFragment
    }
  }
`;

const GET_ADDRESSES_QUERY = gql`
  ${ADDRESS_FRAGMENT}
  ${LOCALITY_FRAGMENT}
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  query GetAddresses($filters: AddressFiltersInput) {
    addresses(filters: $filters) {
      ...AddressFragment
    }
  }
`;

const GET_ADDRESS_BY_ID_QUERY = gql`
  ${ADDRESS_FRAGMENT}
  ${LOCALITY_FRAGMENT}
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  query GetAddress($id: ID!) {
    address(id: $id) {
      ...AddressFragment
    }
  }
`;

const GET_ADDRESSES_BY_CAMPUS_QUERY = gql`
  ${ADDRESS_FRAGMENT}
  ${LOCALITY_FRAGMENT}
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  query GetAddressesByCampus($campusId: ID!, $includeInactive: Boolean) {
    addressesByCampus(campusId: $campusId, includeInactive: $includeInactive) {
      ...AddressFragment
    }
  }
`;

const GET_PRIMARY_ADDRESS_BY_CAMPUS_QUERY = gql`
  ${ADDRESS_FRAGMENT}
  ${LOCALITY_FRAGMENT}
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  query GetPrimaryAddressByCampus($campusId: ID!) {
    primaryAddressByCampus(campusId: $campusId) {
      ...AddressFragment
    }
  }
`;

const SEARCH_ADDRESSES_QUERY = gql`
  ${ADDRESS_FRAGMENT}
  ${LOCALITY_FRAGMENT}
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  query SearchAddresses($searchTerm: String!, $includeInactive: Boolean) {
    searchAddresses(searchTerm: $searchTerm, includeInactive: $includeInactive) {
      ...AddressFragment
    }
  }
`;

// ========== GRAPHQL MUTATIONS ==========
const CREATE_COUNTRY_MUTATION = gql`
  ${COUNTRY_FRAGMENT}
  mutation CreateCountry($input: CreateCountryInput!) {
    createCountry(input: $input) {
      ...CountryFragment
    }
  }
`;

const UPDATE_COUNTRY_MUTATION = gql`
  ${COUNTRY_FRAGMENT}
  mutation UpdateCountry($id: ID!, $input: UpdateCountryInput!) {
    updateCountry(id: $id, input: $input) {
      ...CountryFragment
    }
  }
`;

const DELETE_COUNTRY_MUTATION = gql`
  ${COUNTRY_FRAGMENT}
  mutation DeleteCountry($id: ID!) {
    deleteCountry(id: $id) {
      ...CountryFragment
    }
  }
`;

const CREATE_REGION_MUTATION = gql`
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  mutation CreateRegion($input: CreateRegionInput!) {
    createRegion(input: $input) {
      ...RegionFragment
    }
  }
`;

const UPDATE_REGION_MUTATION = gql`
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  mutation UpdateRegion($input: UpdateRegionInput!) {
    updateRegion(input: $input) {
      ...RegionFragment
    }
  }
`;

const DELETE_REGION_MUTATION = gql`
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  mutation DeleteRegion($id: ID!) {
    deleteRegion(id: $id) {
      ...RegionFragment
    }
  }
`;

const CREATE_LOCALITY_MUTATION = gql`
  ${LOCALITY_FRAGMENT}
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  mutation CreateLocality($input: CreateLocalityInput!) {
    createLocality(input: $input) {
      ...LocalityFragment
    }
  }
`;

const UPDATE_LOCALITY_MUTATION = gql`
  ${LOCALITY_FRAGMENT}
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  mutation UpdateLocality($input: UpdateLocalityInput!) {
    updateLocality(input: $input) {
      ...LocalityFragment
    }
  }
`;

const DELETE_LOCALITY_MUTATION = gql`
  ${LOCALITY_FRAGMENT}
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  mutation DeleteLocality($id: ID!) {
    deleteLocality(id: $id) {
      ...LocalityFragment
    }
  }
`;

const UPDATE_ADDRESS_MUTATION = gql`
  ${ADDRESS_FRAGMENT}
  ${LOCALITY_FRAGMENT}
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  mutation UpdateAddress($input: UpdateAddressInput!) {
    updateAddress(input: $input) {
      ...AddressFragment
    }
  }
`;

const DELETE_ADDRESS_MUTATION = gql`
  ${ADDRESS_FRAGMENT}
  ${LOCALITY_FRAGMENT}
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  mutation DeleteAddress($id: ID!) {
    deleteAddress(id: $id) {
      ...AddressFragment
    }
  }
`;

const SET_PRIMARY_ADDRESS_MUTATION = gql`
  ${ADDRESS_FRAGMENT}
  ${LOCALITY_FRAGMENT}
  ${REGION_FRAGMENT}
  ${COUNTRY_FRAGMENT}
  mutation SetPrimaryAddress($id: ID!) {
    setPrimaryAddress(id: $id) {
      ...AddressFragment
    }
  }
`;

// ========== UTILITY FUNCTIONS ==========
export function getLocalityTypeLabel(type: LocalityType): string {
  const labels: Record<LocalityType, string> = {
    [LocalityType.CITY]: 'City',
    [LocalityType.TOWN]: 'Town',
    [LocalityType.VILLAGE]: 'Village',
    [LocalityType.DISTRICT]: 'District',
    [LocalityType.MUNICIPALITY]: 'Municipality',
    [LocalityType.COUNTY]: 'County',
    [LocalityType.SUBURB]: 'Suburb'
  };
  return labels[type] || type;
}

export function getAddressTypeLabel(type: AddressType): string {
  const labels: Record<AddressType, string> = {
    [AddressType.CAMPUS]: 'Campus',
    [AddressType.HEADQUARTERS]: 'Headquarters',
    [AddressType.BRANCH]: 'Branch',
    [AddressType.RESIDENTIAL]: 'Residential',
    [AddressType.COMMERCIAL]: 'Commercial',
    [AddressType.MAILING]: 'Mailing'
  };
  return labels[type] || type;
}

export function formatAddressString(address: Address): string {
  const parts: string[] = [];
  
  if (address.streetAddress) parts.push(address.streetAddress);
  if (address.subLocality) parts.push(address.subLocality);
  if (address.locality?.name) parts.push(address.locality.name);
  if (address.region?.name) parts.push(address.region.name);
  if (address.country?.name) parts.push(address.country.name);
  if (address.postalCode) parts.push(address.postalCode);
  
  return parts.join(', ');
}

export function getDistanceFromCoordinates(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// ========== MOCK DATA ==========
export const mockCountries: Country[] = [
  {
    id: '1',
    name: 'Nigeria',
    slug: 'nigeria',
    code: 'NG',
    code3: 'NGA',
    currency: 'NGN',
    timezone: 'Africa/Lagos',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Ghana',
    slug: 'ghana',
    code: 'GH',
    code3: 'GHA',
    currency: 'GHS',
    timezone: 'Africa/Accra',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const mockRegions: Region[] = [
  {
    id: '1',
    name: 'Lagos State',
    slug: 'lagos-state',
    code: 'LA',
    countryId: '1',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    country: mockCountries[0]
  },
  {
    id: '2',
    name: 'Abuja FCT',
    slug: 'abuja-fct',
    code: 'FC',
    countryId: '1',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    country: mockCountries[0]
  }
];

export const mockLocalities: Locality[] = [
  {
    id: '1',
    name: 'Victoria Island',
    slug: 'victoria-island',
    type: LocalityType.SUBURB,
    regionId: '1',
    countryId: '1',
    isActive: true,
    latitude: 6.4281,
    longitude: 3.4219,
    zipCode: '101241',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    region: mockRegions[0],
    country: mockCountries[0]
  },
  {
    id: '2',
    name: 'Ikeja',
    slug: 'ikeja',
    type: LocalityType.CITY,
    regionId: '1',
    countryId: '1',
    isActive: true,
    latitude: 6.6059,
    longitude: 3.3515,
    zipCode: '100001',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    region: mockRegions[0],
    country: mockCountries[0]
  }
];

export const mockAddresses: Address[] = [
  {
    id: '1',
    campusId: '1',
    regionId: '1',
    localityId: '1',
    locationName: 'Main Campus',
    isPrimary: true,
    streetAddress: '123 Ahmadu Bello Way',
    subLocality: 'Victoria Island',
    neighborhood: 'VI',
    postalCode: '101241',
    landmark: 'Near Eko Hotel',
    latitude: 6.4281,
    longitude: 3.4219,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    region: mockRegions[0],
    locality: mockLocalities[0],
    formattedAddress: '123 Ahmadu Bello Way, Victoria Island, Lagos State, Nigeria, 101241'
  }
];

// ========== API FUNCTIONS ==========
export async function getCountries(
  filters?: CountryFiltersInput,
  accessToken?: string
): Promise<Country[]> {
  try {
    // TODO: Implement actual GraphQL call
    // const { data } = await apolloClient.query({
    //   query: GET_COUNTRIES_QUERY,
    //   variables: { filter: filters },
    //   context: accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {},
    //   errorPolicy: 'all',
    //   fetchPolicy: 'cache-first'
    // });
    // return data.getCountries || [];
    
    // Return mock data for now
    return mockCountries.filter(country => {
      if (filters?.isActive !== undefined && country.isActive !== filters.isActive) {
        return false;
      }
      if (filters?.search && !country.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters?.codes && !filters.codes.includes(country.code)) {
        return false;
      }
      return true;
    });
  } catch (error) {
    console.error('Error fetching countries:', error);
    return mockCountries;
  }
}

export async function getCountry(
  id: string,
  accessToken?: string
): Promise<Country | null> {
  try {
    // TODO: Implement actual GraphQL call
    return mockCountries.find(country => country.id === id) || null;
  } catch (error) {
    console.error('Error fetching country:', error);
    return null;
  }
}

export async function getCountryByCode(
  code: string,
  accessToken?: string
): Promise<Country | null> {
  try {
    // TODO: Implement actual GraphQL call
    return mockCountries.find(country => country.code === code) || null;
  } catch (error) {
    console.error('Error fetching country by code:', error);
    return null;
  }
}

export async function getRegions(
  filter?: RegionFiltersInput,
  accessToken?: string
): Promise<Region[]> {
  try {
    // TODO: Implement actual GraphQL call
    return mockRegions.filter(region => {
      if (filter?.isActive !== undefined && region.isActive !== filter.isActive) {
        return false;
      }
      if (filter?.countryId && region.countryId !== filter.countryId) {
        return false;
      }
      if (filter?.search && !region.name.toLowerCase().includes(filter.search.toLowerCase())) {
        return false;
      }
      return true;
    });
  } catch (error) {
    console.error('Error fetching regions:', error);
    return mockRegions;
  }
}

export async function getRegionsByCountry(
  countryId: string,
  accessToken?: string
): Promise<Region[]> {
  try {
    // TODO: Implement actual GraphQL call
    return mockRegions.filter(region => region.countryId === countryId);
  } catch (error) {
    console.error('Error fetching regions by country:', error);
    return mockRegions.filter(region => region.countryId === countryId);
  }
}

export async function getLocalities(
  filters?: LocalityFiltersInput,
  accessToken?: string
): Promise<Locality[]> {
  try {
    // TODO: Implement actual GraphQL call
    return mockLocalities.filter(locality => {
      if (filters?.isActive !== undefined && locality.isActive !== filters.isActive) {
        return false;
      }
      if (filters?.regionId && locality.regionId !== filters.regionId) {
        return false;
      }
      if (filters?.countryId && locality.countryId !== filters.countryId) {
        return false;
      }
      if (filters?.type && !filters.type.includes(locality.type)) {
        return false;
      }
      if (filters?.hasCoordinates && !locality.latitude && !locality.longitude) {
        return false;
      }
      if (filters?.search && !locality.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      return true;
    });
  } catch (error) {
    console.error('Error fetching localities:', error);
    return mockLocalities;
  }
}

export async function getLocalitiesByRegion(
  regionId: string,
  includeInactive: boolean = false,
  accessToken?: string
): Promise<Locality[]> {
  try {
    // TODO: Implement actual GraphQL call
    return mockLocalities.filter(locality => {
      if (locality.regionId !== regionId) return false;
      if (!includeInactive && !locality.isActive) return false;
      return true;
    });
  } catch (error) {
    console.error('Error fetching localities by region:', error);
    return mockLocalities.filter(locality => locality.regionId === regionId);
  }
}

export async function searchLocalities(
  searchTerm: string,
  includeInactive: boolean = false,
  accessToken?: string
): Promise<Locality[]> {
  try {
    // TODO: Implement actual GraphQL call
    return mockLocalities.filter(locality => {
      if (!includeInactive && !locality.isActive) return false;
      return locality.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  } catch (error) {
    console.error('Error searching localities:', error);
    return mockLocalities.filter(locality => 
      locality.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}

export async function getAddresses(
  filters?: AddressFiltersInput,
  accessToken?: string
): Promise<Address[]> {
  try {
    // TODO: Implement actual GraphQL call
    return mockAddresses.filter(address => {
      if (filters?.campusId && address.campusId !== filters.campusId) {
        return false;
      }
      if (filters?.regionId && address.regionId !== filters.regionId) {
        return false;
      }
      if (filters?.localityId && address.localityId !== filters.localityId) {
        return false;
      }
      if (filters?.isPrimary !== undefined && address.isPrimary !== filters.isPrimary) {
        return false;
      }
      if (filters?.hasCoordinates && !address.latitude && !address.longitude) {
        return false;
      }
      return true;
    });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return mockAddresses;
  }
}

export async function getAddress(
  id: string,
  accessToken?: string
): Promise<Address | null> {
  try {
    // TODO: Implement actual GraphQL call
    return mockAddresses.find(address => address.id === id) || null;
  } catch (error) {
    console.error('Error fetching address:', error);
    return null;
  }
}

export async function getAddressesByCampus(
  campusId: string,
  includeInactive: boolean = false,
  accessToken?: string
): Promise<Address[]> {
  try {
    // TODO: Implement actual GraphQL call
    return mockAddresses.filter(address => address.campusId === campusId);
  } catch (error) {
    console.error('Error fetching addresses by campus:', error);
    return mockAddresses.filter(address => address.campusId === campusId);
  }
}

export async function getPrimaryAddressByCampus(
  campusId: string,
  accessToken?: string
): Promise<Address | null> {
  try {
    // TODO: Implement actual GraphQL call
    return mockAddresses.find(address => 
      address.campusId === campusId && address.isPrimary
    ) || null;
  } catch (error) {
    console.error('Error fetching primary address by campus:', error);
    return mockAddresses.find(address => 
      address.campusId === campusId && address.isPrimary
    ) || null;
  }
}

export async function searchAddresses(
  searchTerm: string,
  includeInactive: boolean = false,
  accessToken?: string
): Promise<Address[]> {
  try {
    // TODO: Implement actual GraphQL call
    return mockAddresses.filter(address => {
      const searchLower = searchTerm.toLowerCase();
      return (
        address.streetAddress?.toLowerCase().includes(searchLower) ||
        address.locality?.name.toLowerCase().includes(searchLower) ||
        address.region?.name.toLowerCase().includes(searchLower) ||
        address.country?.name.toLowerCase().includes(searchLower)
      );
    });
  } catch (error) {
    console.error('Error searching addresses:', error);
    return mockAddresses;
  }
}

// ========== MUTATION FUNCTIONS ==========
export async function createCountry(
  input: CreateCountryInput,
  accessToken: string
): Promise<Country> {
  try {
    // TODO: Implement actual GraphQL mutation
    throw new Error('Create country not implemented yet');
  } catch (error) {
    console.error('Error creating country:', error);
    throw error;
  }
}

export async function updateCountry(
  id: string,
  input: UpdateCountryInput,
  accessToken: string
): Promise<Country> {
  try {
    // TODO: Implement actual GraphQL mutation
    throw new Error('Update country not implemented yet');
  } catch (error) {
    console.error('Error updating country:', error);
    throw error;
  }
}

export async function deleteCountry(
  id: string,
  accessToken: string
): Promise<Country> {
  try {
    // TODO: Implement actual GraphQL mutation
    throw new Error('Delete country not implemented yet');
  } catch (error) {
    console.error('Error deleting country:', error);
    throw error;
  }
}

export async function createRegion(
  input: CreateRegionInput,
  accessToken: string
): Promise<Region> {
  try {
    // TODO: Implement actual GraphQL mutation
    throw new Error('Create region not implemented yet');
  } catch (error) {
    console.error('Error creating region:', error);
    throw error;
  }
}

export async function updateRegion(
  id: string,
  input: UpdateRegionInput,
  accessToken: string
): Promise<Region> {
  try {
    // TODO: Implement actual GraphQL mutation
    throw new Error('Update region not implemented yet');
  } catch (error) {
    console.error('Error updating region:', error);
    throw error;
  }
}

export async function deleteRegion(
  id: string,
  accessToken: string
): Promise<Region> {
  try {
    // TODO: Implement actual GraphQL mutation
    throw new Error('Delete region not implemented yet');
  } catch (error) {
    console.error('Error deleting region:', error);
    throw error;
  }
}

export async function createLocality(
  input: CreateLocalityInput,
  accessToken: string
): Promise<Locality> {
  try {
    // TODO: Implement actual GraphQL mutation
    throw new Error('Create locality not implemented yet');
  } catch (error) {
    console.error('Error creating locality:', error);
    throw error;
  }
}

export async function updateLocality(
  id: string,
  input: UpdateLocalityInput,
  accessToken: string
): Promise<Locality> {
  try {
    // TODO: Implement actual GraphQL mutation
    throw new Error('Update locality not implemented yet');
  } catch (error) {
    console.error('Error updating locality:', error);
    throw error;
  }
}

export async function deleteLocality(
  id: string,
  accessToken: string
): Promise<Locality> {
  try {
    // TODO: Implement actual GraphQL mutation
    throw new Error('Delete locality not implemented yet');
  } catch (error) {
    console.error('Error deleting locality:', error);
    throw error;
  }
}

export async function updateAddress(
  id: string,
  input: UpdateAddressInput,
  accessToken: string
): Promise<Address> {
  try {
    // TODO: Implement actual GraphQL mutation
    throw new Error('Update address not implemented yet');
  } catch (error) {
    console.error('Error updating address:', error);
    throw error;
  }
}

export async function deleteAddress(
  id: string,
  accessToken: string
): Promise<Address> {
  try {
    // TODO: Implement actual GraphQL mutation
    throw new Error('Delete address not implemented yet');
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
}

export async function setPrimaryAddress(
  id: string,
  accessToken: string
): Promise<Address> {
  try {
    // TODO: Implement actual GraphQL mutation
    throw new Error('Set primary address not implemented yet');
  } catch (error) {
    console.error('Error setting primary address:', error);
    throw error;
  }
}
