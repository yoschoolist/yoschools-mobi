# Authentication Context Documentation

## Overview

The authentication system in this app uses a combination of Zustand for state management and React Context for easy access throughout the component tree. This provides the best of both worlds: efficient state management and convenient access to auth data.

## Provider Setup

The `AuthProvider` is automatically set up in the root layout (`src/app/_layout.tsx`) and wraps the entire application, making auth context available to all components.

## Available Hooks

### 1. `useAuthContext()` - Main Auth Context Hook

This is the primary hook that provides access to all auth-related data and functions:

```typescript
import { useAuthContext } from '@/lib';

function MyComponent() {
  const { 
    isAuthenticated, 
    isLoading, 
    user, 
    token, 
    signIn, 
    signOut, 
    refreshAuth 
  } = useAuthContext();

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : isAuthenticated ? (
        <Text>Welcome, {user?.firstName}!</Text>
      ) : (
        <Text>Please log in</Text>
      )}
    </View>
  );
}
```

### 2. Convenience Hooks

For simpler use cases, you can use these specialized hooks:

#### `useIsAuthenticated()` - Check if user is logged in
```typescript
import { useIsAuthenticated } from '@/lib';

function ProtectedComponent() {
  const isAuthenticated = useIsAuthenticated();
  
  if (!isAuthenticated) {
    return <LoginPrompt />;
  }
  
  return <ProtectedContent />;
}
```

#### `useUser()` - Get current user data
```typescript
import { useUser } from '@/lib';

function UserProfile() {
  const user = useUser();
  
  return (
    <View>
      <Text>Name: {user?.firstName} {user?.lastName}</Text>
      <Text>Email: {user?.email}</Text>
      <Text>Role: {user?.role}</Text>
    </View>
  );
}
```

#### `useAuthLoading()` - Check if auth is loading
```typescript
import { useAuthLoading } from '@/lib';

function LoadingScreen() {
  const isLoading = useAuthLoading();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return <MainContent />;
}
```

#### `useAuthActions()` - Get auth action functions
```typescript
import { useAuthActions } from '@/lib';

function AuthButtons() {
  const { signIn, signOut, refreshAuth } = useAuthActions();
  
  return (
    <View>
      <Button onPress={() => signIn(token)} title="Sign In" />
      <Button onPress={signOut} title="Sign Out" />
      <Button onPress={refreshAuth} title="Refresh Auth" />
    </View>
  );
}
```

## Legacy Zustand Hooks

You can still use the original Zustand hooks if needed:

```typescript
import { useAuth } from '@/lib';

function LegacyComponent() {
  const signOut = useAuth.use.signOut();
  const authStatus = useAuth.use.status();
  const token = useAuth.use.token();
  
  // ... your component logic
}
```

## Data Structure

### User Object
```typescript
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
```

### Token Object
```typescript
interface Token {
  access: string;    // JWT access token
  refresh: string;   // JWT refresh token
  user: User;        // User data
}
```

### Auth Context Value
```typescript
interface AuthContextType {
  isAuthenticated: boolean;  // True if user is logged in
  isLoading: boolean;        // True while auth is loading
  user: User | null;         // Current user data
  token: Token | null;       // Current token
  signIn: (token: Token) => void;
  signOut: () => void;
  refreshAuth: () => void;
}
```

## Usage Examples

### 1. Protected Routes
```typescript
import { useIsAuthenticated } from '@/lib';

function ProtectedRoute({ children }) {
  const isAuthenticated = useIsAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
}
```

### 2. Conditional Rendering
```typescript
import { useAuthContext } from '@/lib';

function Header() {
  const { isAuthenticated, user } = useAuthContext();
  
  return (
    <View>
      {isAuthenticated ? (
        <Text>Welcome back, {user?.firstName}!</Text>
      ) : (
        <Text>Please sign in</Text>
      )}
    </View>
  );
}
```

### 3. Loading States
```typescript
import { useAuthLoading } from '@/lib';

function App() {
  const isLoading = useAuthLoading();
  
  if (isLoading) {
    return <SplashScreen />;
  }
  
  return <MainApp />;
}
```

### 4. User Profile
```typescript
import { useUser } from '@/lib';

function Profile() {
  const user = useUser();
  
  if (!user) {
    return <Text>No user data available</Text>;
  }
  
  return (
    <View>
      <Text>Name: {user.firstName} {user.lastName}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Role: {user.role}</Text>
    </View>
  );
}
```

## Best Practices

1. **Use the appropriate hook for your use case**:
   - Use `useAuthContext()` when you need multiple auth values
   - Use convenience hooks (`useUser`, `useIsAuthenticated`, etc.) for simple cases

2. **Handle loading states**:
   - Always check `isLoading` before rendering auth-dependent content
   - Show appropriate loading indicators

3. **Error handling**:
   - The auth context automatically handles token storage and retrieval
   - Use try-catch blocks when calling auth actions

4. **Performance**:
   - The context is optimized to prevent unnecessary re-renders
   - Use the specific hooks you need rather than the full context when possible

## Migration from Zustand

If you're migrating from the old Zustand-only approach:

**Before:**
```typescript
const signOut = useAuth.use.signOut();
const authStatus = useAuth.use.status();
```

**After:**
```typescript
const { signOut } = useAuthActions();
const isAuthenticated = useIsAuthenticated();
```

The new approach provides better TypeScript support and more intuitive APIs while maintaining the same functionality.
