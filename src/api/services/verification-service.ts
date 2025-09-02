import { gql } from '@apollo/client';
import { apolloClient } from '@/api/common/apollo-client';

export interface CreateVerificationInput { type: VerificationType; listingId: string; documents?: string[]; notes?: string; expiresAt?: string }
export interface UpdateVerificationInput { documents?: string[]; notes?: string }
export interface ReviewVerificationInput { status: VerificationStatus; notes?: string }
export interface VerificationWhereInput { listingId?: string; reviewedBy?: string; status?: VerificationStatus; type?: VerificationType }

export enum VerificationType { ACCREDITATION='ACCREDITATION', BUSINESS_LICENSE='BUSINESS_LICENSE', FACILITY_INSPECTION='FACILITY_INSPECTION', MOE_REGISTRATION='MOE_REGISTRATION', OTHER='OTHER', OWNERSHIP_PROOF='OWNERSHIP_PROOF', SCHOOL_REGISTRATION='SCHOOL_REGISTRATION', TAX_DOCUMENT='TAX_DOCUMENT' }
export enum VerificationStatus { PENDING='PENDING', IN_REVIEW='IN_REVIEW', APPROVED='APPROVED', REJECTED='REJECTED', RESUBMISSION_REQUIRED='RESUBMISSION_REQUIRED', EXPIRED='EXPIRED' }

export interface Verification {
  id: string; type: VerificationType; status: VerificationStatus; documents: string[]; notes?: string; listingId: string; reviewedBy?: string; reviewedAt?: string; rejectionReason?: string; approvalNotes?: string; expiresAt?: string; createdAt: string; updatedAt: string;
  listing: { id: string; name: string; slug: string; ownerId: string; createdBy: string; claimedById: string };
  reviewer?: { id: string; firstName: string; lastName: string; email: string };
}

export interface VerificationStats { total: number; pending: number; approved: number; rejected: number; expired: number }

const VERIFICATION_FRAGMENT = gql`fragment VerificationFragment on Verification { id type status documents notes listingId reviewedBy reviewedAt rejectionReason approvalNotes expiresAt createdAt updatedAt listing { id name slug ownerId createdBy claimedById } reviewer { id firstName lastName email } }`;

const GET_VERIFICATIONS_QUERY = gql`${VERIFICATION_FRAGMENT} query GetVerifications($where: VerificationWhereInput) { getVerifications(where: $where) { ...VerificationFragment } }`;
const GET_VERIFICATION_QUERY = gql`${VERIFICATION_FRAGMENT} query GetVerification($id: ID!) { getVerification(id: $id) { ...VerificationFragment } }`;
const GET_VERIFICATIONS_BY_LISTING_QUERY = gql`${VERIFICATION_FRAGMENT} query GetVerificationsByListing($listingId: ID!) { getVerificationsByListing(listingId: $listingId) { ...VerificationFragment } }`;
const GET_VERIFICATION_STATS_QUERY = gql`query GetVerificationStats($listingId: ID) { getVerificationStats(listingId: $listingId) { total pending approved rejected expired } }`;
const GET_PENDING_VERIFICATIONS_QUERY = gql`${VERIFICATION_FRAGMENT} query GetPendingVerifications { pendingVerifications { ...VerificationFragment } }`;
const GET_EXPIRED_VERIFICATIONS_QUERY = gql`${VERIFICATION_FRAGMENT} query GetExpiredVerifications { expiredVerifications { ...VerificationFragment } }`;
const GET_MY_VERIFICATIONS_QUERY = gql`${VERIFICATION_FRAGMENT} query GetMyVerifications { myVerifications { ...VerificationFragment } }`;

const CREATE_VERIFICATION_MUTATION = gql`${VERIFICATION_FRAGMENT} mutation CreateVerification($input: CreateVerificationInput!) { createVerification(input: $input) { ...VerificationFragment } }`;
const UPDATE_VERIFICATION_MUTATION = gql`${VERIFICATION_FRAGMENT} mutation UpdateVerification($id: ID!, $input: UpdateVerificationInput!) { updateVerification(id: $id, input: $input) { ...VerificationFragment } }`;
const DELETE_VERIFICATION_MUTATION = gql`mutation DeleteVerification($id: ID!) { deleteVerification(id: $id) }`;
const REVIEW_VERIFICATION_MUTATION = gql`${VERIFICATION_FRAGMENT} mutation ReviewVerification($id: ID!, $input: ReviewVerificationInput!) { reviewVerification(id: $id, input: $input) { ...VerificationFragment } }`;

export async function getVerifications(where?: VerificationWhereInput, accessToken?: string): Promise<Verification[]> { const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}; const { data } = await apolloClient.query({ query: GET_VERIFICATIONS_QUERY, variables: { where }, context, errorPolicy: 'all', fetchPolicy: 'network-only' }); return data.getVerifications as Verification[] }
export async function getVerification(id: string, accessToken?: string): Promise<Verification> { const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}; const { data } = await apolloClient.query({ query: GET_VERIFICATION_QUERY, variables: { id }, context, errorPolicy: 'all', fetchPolicy: 'network-only' }); return data.getVerification as Verification }
export async function getVerificationsByListing(listingId: string, accessToken?: string): Promise<Verification[]> { const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}; const { data } = await apolloClient.query({ query: GET_VERIFICATIONS_BY_LISTING_QUERY, variables: { listingId }, context, errorPolicy: 'all', fetchPolicy: 'network-only' }); return data.getVerificationsByListing as Verification[] }
export async function getVerificationStats(listingId?: string, accessToken?: string): Promise<VerificationStats> { const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}; const { data } = await apolloClient.query({ query: GET_VERIFICATION_STATS_QUERY, variables: { listingId }, context, errorPolicy: 'all', fetchPolicy: 'network-only' }); return data.getVerificationStats as VerificationStats }
export async function getPendingVerifications(accessToken?: string): Promise<Verification[]> { const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}; const { data } = await apolloClient.query({ query: GET_PENDING_VERIFICATIONS_QUERY, context, errorPolicy: 'all', fetchPolicy: 'network-only' }); return data.pendingVerifications as Verification[] }
export async function getExpiredVerifications(accessToken?: string): Promise<Verification[]> { const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}; const { data } = await apolloClient.query({ query: GET_EXPIRED_VERIFICATIONS_QUERY, context, errorPolicy: 'all', fetchPolicy: 'network-only' }); return data.expiredVerifications as Verification[] }
export async function getMyVerifications(accessToken?: string): Promise<Verification[]> { const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}; const { data } = await apolloClient.query({ query: GET_MY_VERIFICATIONS_QUERY, context, errorPolicy: 'all', fetchPolicy: 'network-only' }); return data.myVerifications as Verification[] }
export async function createVerification(input: CreateVerificationInput, accessToken?: string): Promise<Verification> { const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}; const { data } = await apolloClient.mutate({ mutation: CREATE_VERIFICATION_MUTATION, variables: { input }, context, errorPolicy: 'all' }); return data.createVerification as Verification }
export async function updateVerification(id: string, input: UpdateVerificationInput, accessToken?: string): Promise<Verification> { const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}; const { data } = await apolloClient.mutate({ mutation: UPDATE_VERIFICATION_MUTATION, variables: { id, input }, context, errorPolicy: 'all' }); return data.updateVerification as Verification }
export async function deleteVerification(id: string, accessToken?: string): Promise<boolean> { const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}; const { data } = await apolloClient.mutate({ mutation: DELETE_VERIFICATION_MUTATION, variables: { id }, context, errorPolicy: 'all' }); return data.deleteVerification as boolean }
export async function reviewVerification(id: string, input: ReviewVerificationInput, accessToken?: string): Promise<Verification> { const context = accessToken ? { headers: { authorization: `Bearer ${accessToken}` } } : {}; const { data } = await apolloClient.mutate({ mutation: REVIEW_VERIFICATION_MUTATION, variables: { id, input }, context, errorPolicy: 'all' }); return data.reviewVerification as Verification }


