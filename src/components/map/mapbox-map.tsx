import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import Mapbox from '@rnmapbox/maps';

const { width, height } = Dimensions.get('window');

interface MapboxMapProps {
  onMapLoad?: () => void;
  onMapError?: (error: string) => void;
}

export const MapboxMap: React.FC<MapboxMapProps> = ({ onMapLoad, onMapError }) => {
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Set your Mapbox access token here
  // You'll need to add this to your environment variables
  const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN || '';

  useEffect(() => {
    if (MAPBOX_ACCESS_TOKEN) {
      Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);
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
    } else if (Platform.OS === 'android') {
      // Android-specific setup if needed
      console.log('Setting up Mapbox for Android');
    }
  }, []);

  const handleMapLoad = () => {
    setIsMapReady(true);
    onMapLoad?.();
  };

  const handleMapError = (error: any) => {
    const errorMessage = error.message || 'Failed to load map';
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
          centerCoordinate={[-73.935242, 40.730610]} // Brooklyn, NY coordinates
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
