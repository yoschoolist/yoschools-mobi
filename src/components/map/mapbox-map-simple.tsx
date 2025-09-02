import React from 'react';
import { View, Text } from 'react-native';

interface MapboxMapProps {
  onMapLoad?: () => void;
  onMapError?: (error: string) => void;
}

export const MapboxMapSimple: React.FC<MapboxMapProps> = ({ onMapLoad, onMapError }) => {
  // For now, just show a placeholder to test if the component can be imported
  return (
    <View style={{ flex: 1, backgroundColor: '#e5e7eb', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, color: '#6b7280' }}>Mapbox Map Loading...</Text>
      <Text style={{ fontSize: 14, color: '#9ca3af', marginTop: 8 }}>Component imported successfully</Text>
    </View>
  );
};
