# Authentication Logic Adaptation

This document describes how the authentication logic from `yoschools_mobile_app` has been adapted to `yoschools-mobi`.

## Key Changes Made

### 1. Updated Token Structure
- **Before**: `{ user?: any; token: string; refreshToken: string; }`
- **After**: `{ access: string; refresh: string; user?: { id, firstName, lastName, email, role } }`

### 2. Created Auth Service Layer
- **File**: `src/api/auth/auth-service.ts`
- **Purpose**: Centralized authentication logic using Apollo Client
- **Functions**:
  - `login(email, password, deviceId?)` - User login
  - `registerUser(input)` - User registration
  - `logout(refreshToken)` - User logout
  - `refreshAccessToken(userId, refreshToken)` - Token refresh
  - `createTokenFromResponse(response)` - Transform API response to TokenType

### 3. Enhanced Auth Hooks
- **File**: `src/api/hooks/use-auth.ts`
- **Updated hooks**:
  - `useLogin()` - Now uses auth service with proper error handling
  - `useRegister()` - Now uses auth service with proper error handling
  - `useLogout()` - Now uses auth service with proper cleanup
  - `useRefreshToken()` - Now uses auth service with proper token management
  - `useCurrentUser()` - Unchanged, still uses GraphQL query

### 4. Apollo Auth Hooks
- **File**: `src/api/auth/apollo-auth-hooks.tsx`
- **Purpose**: Alternative auth hooks that work directly with Apollo mutations
- **Hooks**:
  - `useApolloLogin()` - Direct Apollo mutation for login
  - `useApolloRegister()` - Direct Apollo mutation for registration

### 5. Updated Login Form Integration
- **File**: `src/app/login.tsx`
- **Changes**:
  - Now uses `useLogin()` hook instead of dummy auth
  - Proper error handling with Alert dialogs
  - Automatic navigation on successful login
  - Loading states and error states

### 6. Enhanced Auth Utils
- **File**: `src/lib/auth/utils.tsx`
- **Changes**:
  - Updated `TokenType` to match yoschools_mobile_app structure
  - Added error handling in `getToken()`
  - Proper token cleanup on corruption

## Authentication Flow

### Login Process
1. User enters email/password in login form
2. `useLogin()` hook calls `login()` from auth service
3. Auth service makes GraphQL mutation to `/graphql` endpoint
4. On success, tokens are stored and user is signed in
5. User is automatically navigated to main app
6. On error, user sees error message

### Token Management
- Access tokens are stored in MMKV storage
- Refresh tokens are used to get new access tokens
- Tokens are automatically cleaned up on logout or corruption
- Apollo Client is configured to use access tokens in headers

### Error Handling
- GraphQL errors are properly caught and displayed
- Network errors are handled gracefully
- Token corruption is automatically cleaned up
- Failed refresh attempts result in automatic logout

## Usage Examples

### Basic Login
```typescript
import { useLogin } from '@/api/hooks/use-auth';

const { login, loading, error } = useLogin();

const handleLogin = async (email: string, password: string) => {
  try {
    await login(email, password);
    // User is automatically signed in and navigated
  } catch (err) {
    // Handle error
  }
};
```

### Using Auth Service Directly
```typescript
import { login, createTokenFromResponse } from '@/api/auth/auth-service';
import { signIn } from '@/lib/auth';

const handleDirectLogin = async (email: string, password: string) => {
  try {
    const response = await login(email, password);
    const token = createTokenFromResponse(response);
    signIn(token);
  } catch (err) {
    // Handle error
  }
};
```

## Environment Configuration

The authentication system uses the following environment variables:
- `GRAPHQL_URL` - GraphQL endpoint URL
- `API_URL` - Base API URL
- `WS_URL` - WebSocket URL for real-time features

These are configured in `env.js` and automatically adjust based on platform (iOS simulator, Android emulator, web).

## Testing

To test the authentication flow:
1. Start the development server: `pnpm run android` or `pnpm run ios`
2. Navigate to the login screen
3. Enter valid credentials (or use the demo credentials)
4. Verify successful login and navigation
5. Test logout functionality
6. Test token refresh (if applicable)

## Migration Notes

- The old dummy authentication has been completely replaced
- All auth-related components now use the real GraphQL API
- Token storage format has changed - existing tokens will be cleared
- Error handling is now more robust and user-friendly
- Navigation is automatic on successful authentication
