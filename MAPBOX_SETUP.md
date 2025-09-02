# Mapbox Setup Guide for YoSchools Mobile App

## Overview
This guide explains how to set up Mapbox integration for the Find Schools page in the YoSchools mobile app.

## Prerequisites
- Mapbox account (free tier available)
- Mapbox access token

## Installation Steps

### 1. Dependencies Installed
The following packages have been installed:
```bash
pnpm add @rnmapbox/maps mapbox-gl@^2.9.0 @types/mapbox-gl
```

### 2. Environment Configuration
Add your Mapbox access token to your environment variables:

#### For Development (.env.development):
```bash
EXPO_PUBLIC_MAPBOX_TOKEN=your_mapbox_access_token_here
```

#### For Production (.env.production):
```bash
EXPO_PUBLIC_MAPBOX_TOKEN=your_mapbox_access_token_here
```

### 3. Get Your Mapbox Access Token
1. Go to [Mapbox](https://www.mapbox.com/)
2. Sign up or log in
3. Navigate to Account → Access Tokens
4. Create a new token or use the default public token
5. Copy the token and add it to your environment variables

## Features Implemented

### Find Schools Page
- **Search Bar**: Prominent search input with placeholder text
- **View Toggle**: Switch between Map and List views
- **Filter Buttons**: Filters, Price, Rooms, Property Type
- **Interactive Map**: Mapbox integration with Brooklyn, NY as default location
- **Floating Action Buttons**:
  - Layers: Change map layers/styles
  - Navigation: Center map on user location
  - Draw: Draw custom search areas
- **Results Summary**: Shows result count with Save/Share options

### Map Component
- **MapboxMap**: React Native Mapbox component
- **Default Location**: Centered on Brooklyn, NY
- **Zoom Level**: Set to 12 for good city view
- **Error Handling**: Graceful fallbacks for missing tokens
- **Loading States**: Visual feedback during map initialization

## Usage

### Basic Map Display
```typescript
import { MapboxMap } from '@/components/map';

<MapboxMap 
  onMapLoad={() => console.log('Map loaded')}
  onMapError={(error) => console.error('Map error:', error)}
/>
```

### Adding School Markers
```typescript
// Example of adding a school marker
<Mapbox.PointAnnotation
  id="school-1"
  coordinate={[-73.935242, 40.730610]}
>
  <View style={styles.marker}>
    <Text style={styles.markerText}>🏫</Text>
  </View>
</Mapbox.PointAnnotation>
```

## Customization

### Map Style
Change the map style by modifying the `styleURL` prop:
```typescript
// Available styles:
Mapbox.StyleURL.Street      // Default street view
Mapbox.StyleURL.Outdoors    // Outdoor/terrain view
Mapbox.StyleURL.Light       // Light theme
Mapbox.StyleURL.Dark        // Dark theme
Mapbox.StyleURL.Satellite   // Satellite view
```

### Default Location
Update the default coordinates in `MapboxMap` component:
```typescript
<Mapbox.Camera
  zoomLevel={12}
  centerCoordinate={[-73.935242, 40.730610]} // Change these coordinates
/>
```

## Troubleshooting

### Common Issues

1. **"Mapbox not configured" Error**
   - Ensure `EXPO_PUBLIC_MAPBOX_TOKEN` is set in your environment
   - Restart your development server after adding the token

2. **Map Not Loading**
   - Check your internet connection
   - Verify the access token is valid
   - Check Mapbox account status and usage limits

3. **Performance Issues**
   - Reduce the number of markers on the map
   - Use clustering for large numbers of schools
   - Implement lazy loading for map tiles

### Debug Mode
Enable debug logging by adding console logs:
```typescript
<MapboxMap 
  onMapLoad={() => {
    console.log('Map loaded successfully');
    console.log('Mapbox token:', process.env.EXPO_PUBLIC_MAPBOX_TOKEN);
  }}
  onMapError={(error) => {
    console.error('Map error:', error);
    console.error('Mapbox token:', process.env.EXPO_PUBLIC_MAPBOX_TOKEN);
  }}
/>
```

## Next Steps

1. **Add School Data**: Integrate with your school API to display actual school locations
2. **Search Functionality**: Implement geocoding for address searches
3. **Filtering**: Connect filters to actual school data
4. **Clustering**: Add marker clustering for better performance with many schools
5. **Custom Markers**: Design custom school markers with school information
6. **Directions**: Add navigation and directions to schools

## Resources

- [Mapbox Documentation](https://docs.mapbox.com/)
- [@rnmapbox/maps Documentation](https://github.com/rnmapbox/maps)
- [Mapbox GL JS Examples](https://docs.mapbox.com/mapbox-gl-js/examples/)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
