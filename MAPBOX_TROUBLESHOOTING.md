# Mapbox Troubleshooting Guide

## Common Issues and Solutions

### 1. Missing Dependencies Error
**Error**: `Unable to resolve module @turf/helpers`

**Solution**: Install missing Turf.js packages:
```bash
pnpm add @turf/helpers @turf/distance @turf/along
```

### 2. CSS Import Error
**Error**: `Unable to resolve "mapbox-gl/dist/mapbox-gl.css"`

**Solution**: This is expected in React Native. The CSS file is only needed for web platforms.

### 3. Platform-Specific Setup

#### iOS Setup
1. **Pod Installation**: Run `cd ios && pod install`
2. **Info.plist**: Add location permissions:
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app needs access to location to show nearby schools</string>
```

#### Android Setup
1. **Permissions**: Add to `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

### 4. Environment Variables
**Issue**: Mapbox token not found

**Solution**: 
1. Create `.env.development` file
2. Add your token: `EXPO_PUBLIC_MAPBOX_TOKEN=your_token_here`
3. Restart development server

### 5. Metro Bundler Issues
**Error**: Module resolution problems

**Solution**: Clear Metro cache:
```bash
npx expo start --clear
# or
pnpm expo start --clear
```

### 6. Build Issues

#### iOS Build Fails
```bash
cd ios
pod deintegrate
pod install
cd ..
pnpm run ios
```

#### Android Build Fails
```bash
cd android
./gradlew clean
cd ..
pnpm run android
```

## Step-by-Step Setup

### 1. Install Dependencies
```bash
pnpm add @rnmapbox/maps mapbox-gl@^2.9.0 @types/mapbox-gl
pnpm add @turf/helpers @turf/distance @turf/along
```

### 2. Environment Configuration
```bash
# Copy example file
cp env-example .env.development

# Edit .env.development and add your token
EXPO_PUBLIC_MAPBOX_TOKEN=pk.your_actual_token_here
```

### 3. Platform Setup
```bash
# iOS
cd ios && pod install && cd ..

# Android
cd android && ./gradlew clean && cd ..
```

### 4. Test the App
```bash
# Start with clean cache
pnpm expo start --clear

# Run on device/simulator
pnpm run ios
# or
pnpm run android
```

## Alternative Solutions

### If @rnmapbox/maps continues to have issues:

#### Option 1: Use react-native-maps with Mapbox
```bash
pnpm remove @rnmapbox/maps
pnpm add react-native-maps
```

#### Option 2: Use Expo Location with custom map
```bash
pnpm add expo-location
```

#### Option 3: Web-based Mapbox (for testing)
```bash
pnpm add mapbox-gl
# Use web version for development testing
```

## Debug Commands

### Check Dependencies
```bash
pnpm list | grep -E "(mapbox|turf)"
```

### Check Environment
```bash
echo $EXPO_PUBLIC_MAPBOX_TOKEN
```

### Clear All Caches
```bash
# Metro
npx expo start --clear

# Watchman
watchman watch-del-all

# Node modules
rm -rf node_modules
pnpm install
```

## Getting Help

1. **Check Expo Logs**: Look for specific error messages
2. **Mapbox Status**: Check [Mapbox Status Page](https://status.mapbox.com/)
3. **Community**: Post issues on [Expo Forums](https://forums.expo.dev/)
4. **Documentation**: Refer to [@rnmapbox/maps docs](https://github.com/rnmapbox/maps)

## Common Workarounds

### Temporary Map Disable
If Mapbox continues to cause issues, you can temporarily disable it:

```typescript
// In your component
const [mapEnabled, setMapEnabled] = useState(false);

// Render conditional map
{mapEnabled ? (
  <MapboxMap />
) : (
  <View className="flex-1 bg-gray-100 justify-center items-center">
    <Text>Map temporarily disabled</Text>
    <TouchableOpacity onPress={() => setMapEnabled(true)}>
      <Text>Enable Map</Text>
    </TouchableOpacity>
  </View>
)}
```

### Fallback Map
Use a simple image or placeholder until Mapbox is working:

```typescript
<Image 
  source={{ uri: 'https://via.placeholder.com/400x300?text=Map+Loading' }}
  style={{ width: '100%', height: '100%' }}
  resizeMode="cover"
/>
```
