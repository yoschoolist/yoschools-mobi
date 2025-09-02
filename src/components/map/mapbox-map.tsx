import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
// Try different import approaches
let Mapbox: any = null;
try {
  // Method 1: ES6 import
  const MapboxModule = require('@rnmapbox/maps');
  console.log('✅ Mapbox imported via require');
  
  // Check if components are under 'default' property - handle nested defaults
  let currentMapbox = MapboxModule;
  let depth = 0;
  
  while (currentMapbox && currentMapbox.default && depth < 5) {
    console.log(`🔍 Level ${depth}:`, Object.keys(currentMapbox));
    console.log(`🔍 Level ${depth} has MapView:`, !!currentMapbox.MapView);
    console.log(`🔍 Level ${depth} has Camera:`, !!currentMapbox.Camera);
    console.log(`🔍 Level ${depth} has StyleURL:`, !!currentMapbox.StyleURL);
    currentMapbox = currentMapbox.default;
    depth++;
  }
  
  Mapbox = currentMapbox;
  console.log(`✅ Using Mapbox at level ${depth - 1}`);
  
  console.log('🔍 Final Mapbox keys:', Object.keys(Mapbox));
  console.log('🔍 MapView available:', !!Mapbox.MapView);
  console.log('🔍 Camera available:', !!Mapbox.Camera);
  console.log('🔍 StyleURL available:', !!Mapbox.StyleURL);
  console.log('🔍 setAccessToken available:', !!Mapbox.setAccessToken);
} catch (error) {
  console.error('❌ Failed to import Mapbox:', error);
  // Fallback: try to create a minimal working version
  Mapbox = {
    MapView: null,
    Camera: null,
    StyleURL: null,
    setAccessToken: null
  };
}
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window');

interface MapboxMapProps {
  onMapLoad?: () => void;
  onMapError?: (error: string) => void;
}

export const MapboxMap: React.FC<MapboxMapProps> = ({ onMapLoad, onMapError }) => {
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Set your Mapbox access token here
  // Access it from Expo Constants
  const MAPBOX_ACCESS_TOKEN = Constants.expoConfig?.extra?.EXPO_PUBLIC_MAPBOX_TOKEN || '';
  
  // Debug logging
  console.log('MapboxMap Debug:', {
    hasConstants: !!Constants,
    hasExpoConfig: !!Constants.expoConfig,
    hasExtra: !!Constants.expoConfig?.extra,
    token: MAPBOX_ACCESS_TOKEN ? 'Present' : 'Missing',
    tokenLength: MAPBOX_ACCESS_TOKEN?.length || 0,
    tokenStart: MAPBOX_ACCESS_TOKEN ? MAPBOX_ACCESS_TOKEN.substring(0, 20) + '...' : 'None',
    tokenEnd: MAPBOX_ACCESS_TOKEN ? '...' + MAPBOX_ACCESS_TOKEN.substring(MAPBOX_ACCESS_TOKEN.length - 10) : 'None'
  });
  
  // Debug Mapbox import - Moved to after import logic
  // This will be logged in the useEffect below

  useEffect(() => {
    // Debug Mapbox import - Now running after import logic
    console.log('Mapbox Import Debug:', {
      hasMapbox: !!Mapbox,
      mapboxType: typeof Mapbox,
      mapboxKeys: Mapbox ? Object.keys(Mapbox) : 'No Mapbox',
      hasMapView: Mapbox ? !!Mapbox.MapView : false,
      hasCamera: Mapbox ? !!Mapbox.Camera : false,
      hasStyleURL: Mapbox ? !!Mapbox.StyleURL : false,
      styleURLKeys: Mapbox?.StyleURL ? Object.keys(Mapbox.StyleURL) : 'No StyleURL',
      // Additional debug info
      hasDefault: Mapbox ? !!Mapbox.default : false,
      defaultKeys: Mapbox?.default ? Object.keys(Mapbox.default) : 'No default'
    });
    
    if (MAPBOX_ACCESS_TOKEN) {
      // Set access token for Mapbox
      console.log('Mapbox access token available');
      try {
        if (Mapbox && Mapbox.setAccessToken) {
          Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);
          console.log('✅ Mapbox access token set successfully');
        } else {
          console.log('⚠️ Mapbox.setAccessToken not available');
          console.log('🔍 Available methods:', Mapbox ? Object.keys(Mapbox) : 'No Mapbox');
        }
      } catch (error) {
        console.error('❌ Failed to set Mapbox access token:', error);
      }
    } else {
      setMapError('Mapbox access token not configured');
      onMapError?.('Mapbox access token not configured');
    }
  }, [MAPBOX_ACCESS_TOKEN, onMapError]);

  // Handle platform-specific setup
  useEffect(() => {
    if (Platform.OS === 'ios') {
      // iOS-specific setup if needed
      console.log('Setting up Mapbox for iOS');
      
      // Check for iOS-specific requirements
      if (!Mapbox || !Mapbox.MapView) {
        console.error('❌ iOS: Mapbox components not available');
        setMapError('iOS: Mapbox components not available');
        onMapError?.('iOS: Mapbox components not available');
        return;
      }
      
      // iOS-specific Mapbox initialization
      try {
        console.log('✅ iOS: Mapbox components available');
        console.log('✅ iOS: MapView available:', !!Mapbox.MapView);
        console.log('✅ iOS: Camera available:', !!Mapbox.Camera);
        console.log('✅ iOS: StyleURL available:', !!Mapbox.StyleURL);
      } catch (error) {
        console.error('❌ iOS: Mapbox initialization failed:', error);
        setMapError('iOS: Mapbox initialization failed');
        onMapError?.('iOS: Mapbox initialization failed');
      }
    } else if (Platform.OS === 'android') {
      // Android-specific setup if needed
      console.log('Setting up Mapbox for Android');
    }
  }, [Mapbox, onMapError]);

  const handleMapLoad = () => {
    setIsMapReady(true);
    onMapLoad?.();
  };

  const handleMapError = (error: any) => {
    const errorMessage = error.message || 'Failed to load map';
    console.error('Mapbox Map Error:', error);
    console.error('Platform:', Platform.OS);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    setMapError(errorMessage);
    onMapError?.(errorMessage);
  };

  if (!MAPBOX_ACCESS_TOKEN) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Mapbox not configured</Text>
        <Text style={styles.errorSubtext}>Please add MAPBOX_ACCESS_TOKEN to your environment variables</Text>
      </View>
    );
  }

  if (mapError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Map Error</Text>
        <Text style={styles.errorSubtext}>{mapError}</Text>
      </View>
    );
  }
  
  // Check if Mapbox components are available
  if (!Mapbox || !Mapbox.MapView || !Mapbox.Camera || !Mapbox.StyleURL) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Mapbox Components Not Available</Text>
        <Text style={styles.errorSubtext}>
          Mapbox: {Mapbox ? 'Yes' : 'No'}, 
          MapView: {Mapbox?.MapView ? 'Yes' : 'No'}, 
          Camera: {Mapbox?.Camera ? 'Yes' : 'No'}, 
          StyleURL: {Mapbox?.StyleURL ? 'Yes' : 'No'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        style={styles.map}
        styleURL={Mapbox.StyleURL.Street}
        onDidFinishLoadingMap={handleMapLoad}
        onDidFailLoadingMap={handleMapError}
        logoEnabled={false}
        attributionEnabled={false}
      >
        <Mapbox.Camera
          zoomLevel={12}
          centerCoordinate={[32.5825, 0.3476]} // Kampala, Uganda coordinates
        />
        
        {/* Add school markers here when you have school data */}
        {/* Example marker:
        <Mapbox.PointAnnotation
          id="school-1"
          coordinate={[-73.935242, 40.730610]}
        >
          <View style={styles.marker}>
            <Text style={styles.markerText}>🏫</Text>
          </View>
        </Mapbox.PointAnnotation>
        */}
      </Mapbox.MapView>
      
      {!isMapReady && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ef4444',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  markerText: {
    fontSize: 16,
  },
});
