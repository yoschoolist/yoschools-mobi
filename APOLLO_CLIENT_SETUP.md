# Apollo Client Setup for YoSchools Mobile App

## ✅ **Apollo Client Successfully Installed and Configured**

The yoschools-mobi app has been configured to use Apollo Client for GraphQL communication with the yoschools-api backend.

## 📦 **Installed Packages**

```bash
pnpm add @apollo/client graphql
```

## 🔧 **Configuration Files Created**

### **1. Apollo Client Configuration**
- `src/api/common/apollo-client.tsx` - Main Apollo Client setup
- `src/api/common/apollo-provider.tsx` - Apollo Provider wrapper

### **2. GraphQL Queries & Mutations**
- `src/api/graphql/queries.ts` - All GraphQL queries
- `src/api/graphql/mutations.ts` - All GraphQL mutations

### **3. Custom Hooks**
- `src/api/hooks/use-auth.ts` - Authentication hooks
- `src/api/hooks/use-listings.ts` - School listing hooks
- `src/api/hooks/use-jobs.ts` - Job-related hooks

## 🚀 **Features Implemented**

### **Authentication**
- Login/Register mutations
- Token refresh handling
- Automatic token management
- Logout functionality

### **School Listings**
- Fetch all listings with filters
- Get individual listing details
- Featured listings
- Search functionality

### **Jobs**
- Fetch all jobs with pagination
- Get individual job details
- Featured jobs
- Job search with filters

### **Error Handling**
- GraphQL error handling
- Network error handling
- Automatic 401 redirect to login
- Token refresh on expiration

## 🔐 **Authentication Flow**

```typescript
// Login
const { login, loading, error } = useLogin();
await login(email, password);

// Get current user
const { user, loading, error } = useCurrentUser();

// Logout
const { logout } = useLogout();
await logout();
```

## 📊 **Data Fetching Examples**

### **School Listings**
```typescript
// Get all listings
const { listings, loading, error } = useListings();

// Get featured listings
const { listings } = useFeaturedListings(10);

// Search listings
const { listings, totalCount } = useSearchListings('search query');
```

### **Jobs**
```typescript
// Get all jobs
const { jobs, loading, error } = useJobs();

// Get featured jobs
const { jobs } = useFeaturedJobs(10);

// Search jobs
const { jobs, totalCount } = useSearchJobs({ query: 'developer' });
```

## ⚙️ **Environment Configuration**

You need to set up environment variables for the API URL:

### **Create Environment Files**

**`.env.development`**
```env
API_URL=http://localhost:3000
VAR_NUMBER=42
VAR_BOOL=true
SECRET_KEY=development-secret-key
```

**`.env.staging`**
```env
API_URL=https://staging-api.yoschools.com
VAR_NUMBER=42
VAR_BOOL=true
SECRET_KEY=staging-secret-key
```

**`.env.production`**
```env
API_URL=https://api.yoschools.com
VAR_NUMBER=42
VAR_BOOL=true
SECRET_KEY=production-secret-key
```

## 🔄 **Migration from Axios/React Query**

The app now uses Apollo Client instead of the previous Axios + React Query setup:

### **Before (Axios + React Query)**
```typescript
// Old way
const { data, isPending, isError } = usePosts();
```

### **After (Apollo Client)**
```typescript
// New way
const { listings, loading, error } = useListings();
```

## 🎯 **Next Steps**

1. **Set up environment variables** for your API endpoints
2. **Update components** to use the new GraphQL hooks
3. **Test authentication flow** with your backend
4. **Implement real data fetching** instead of dummy data
5. **Add error boundaries** for better error handling

## 📱 **Provider Setup**

The Apollo Provider has been integrated into the app layout:

```typescript
// src/app/_layout.tsx
<ApolloProviderWrapper>
  <APIProvider>
    {/* Your app components */}
  </APIProvider>
</ApolloProviderWrapper>
```

## 🔍 **Available GraphQL Operations**

### **Queries**
- `GET_CURRENT_USER` - Get current user profile
- `GET_LISTINGS` - Fetch school listings
- `GET_JOBS` - Fetch job listings
- `SEARCH_LISTINGS` - Search school listings
- `SEARCH_JOBS` - Search job listings

### **Mutations**
- `LOGIN` - User authentication
- `REGISTER` - User registration
- `LOGOUT` - User logout
- `CREATE_JOB_APPLICATION` - Apply for jobs
- `BOOKMARK_LISTING` - Bookmark school listings

The Apollo Client setup is now ready to connect to your YoSchools GraphQL API! 🚀
