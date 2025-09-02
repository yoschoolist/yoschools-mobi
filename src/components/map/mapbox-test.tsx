import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Try to import Mapbox components
let MapView: any = null;
let Camera: any = null;
let StyleURL: any = null;
let importError: string | null = null;

// Try different import approaches
try {
  console.log('🔍 Attempting to import @rnmapbox/maps...');
  
  // Method 1: CommonJS require with default export
  const Mapbox = require('@rnmapbox/maps');
  console.log('📦 Mapbox package loaded:', typeof Mapbox);
  console.log('🔍 Mapbox keys:', Object.keys(Mapbox));
  
  // Check if components exist - they are default exports
  if (Mapbox.default && Mapbox.default.MapView) {
    MapView = Mapbox.default.MapView;
    console.log('✅ MapView found via default.MapView');
  } else if (Mapbox.MapView) {
    MapView = Mapbox.MapView;
    console.log('✅ MapView found directly');
  } else {
    console.log('❌ MapView not found in Mapbox');
  }
  
  if (Mapbox.default && Mapbox.default.Camera) {
    Camera = Mapbox.default.Camera;
    console.log('✅ Camera found via default.Camera');
  } else if (Mapbox.Camera) {
    Camera = Mapbox.Camera;
    console.log('✅ Camera found directly');
  } else {
    console.log('❌ Camera not found in Mapbox');
  }
  
  if (Mapbox.default && Mapbox.default.StyleURL) {
    StyleURL = Mapbox.default.StyleURL;
    console.log('✅ StyleURL found via default.StyleURL');
  } else if (Mapbox.StyleURL) {
    StyleURL = Mapbox.StyleURL;
    console.log('✅ StyleURL found directly');
  } else {
    console.log('❌ StyleURL not found in Mapbox');
  }
  
  // Method 2: Try ES6 import simulation
  if (!MapView || !Camera || !StyleURL) {
    console.log('🔄 Trying ES6 import simulation...');
    const { default: MapboxDefault } = Mapbox;
    if (MapboxDefault) {
      if (MapboxDefault.MapView) MapView = MapboxDefault.MapView;
      if (MapboxDefault.Camera) Camera = MapboxDefault.Camera;
      if (MapboxDefault.StyleURL) StyleURL = MapboxDefault.StyleURL;
    }
  }
  
  console.log('✅ Mapbox components import attempt completed');
} catch (error) {
  importError = error instanceof Error ? error.message : 'Unknown error';
  console.error('❌ Failed to import Mapbox components:', importError);
}

interface MapboxTestProps {
  onMapLoad?: () => void;
  onMapError?: (error: string) => void;
}

export const MapboxTest: React.FC<MapboxTestProps> = ({ onMapLoad, onMapError }) => {
  const [showMap, setShowMap] = useState(false);

  if (importError) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fee2e2', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 18, color: '#dc2626', textAlign: 'center', marginBottom: 16 }}>
          Mapbox Import Failed
        </Text>
        <Text style={{ fontSize: 14, color: '#7f1d1d', textAlign: 'center' }}>
          Error: {importError}
        </Text>
      </View>
    );
  }

  if (!MapView || !Camera || !StyleURL) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fef3c7', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 18, color: '#d97706', textAlign: 'center', marginBottom: 16 }}>
          Mapbox Components Not Available
        </Text>
        <Text style={{ fontSize: 14, color: '#92400e', textAlign: 'center' }}>
          MapView: {MapView ? '✅' : '❌'}, Camera: {Camera ? '✅' : '❌'}, StyleURL: {StyleURL ? '✅' : '❌'}
        </Text>
      </View>
    );
  }

  if (!showMap) {
    return (
      <View style={{ flex: 1, backgroundColor: '#dbeafe', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 18, color: '#2563eb', textAlign: 'center', marginBottom: 16 }}>
          Mapbox Ready to Test
        </Text>
        <TouchableOpacity 
          onPress={() => setShowMap(true)}
          style={{ backgroundColor: '#3b82f6', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8 }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
            Load Map
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Try to render the actual map
  try {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          styleURL={StyleURL.Street}
          onDidFinishLoadingMap={() => {
            console.log('✅ Map loaded successfully!');
            onMapLoad?.();
          }}
          onDidFailLoadingMap={(error: any) => {
            console.error('❌ Map failed to load:', error);
            onMapError?.(error.message || 'Map failed to load');
          }}
        >
          <Camera
            zoomLevel={12}
            centerCoordinate={[-73.935242, 40.730610]}
          />
        </MapView>
      </View>
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error rendering map:', errorMessage);
    return (
      <View style={{ flex: 1, backgroundColor: '#fee2e2', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 18, color: '#dc2626', textAlign: 'center', marginBottom: 16 }}>
          Map Rendering Failed
        </Text>
        <Text style={{ fontSize: 14, color: '#7f1d1d', textAlign: 'center' }}>
          Error: {errorMessage}
        </Text>
      </View>
    );
  }
};
