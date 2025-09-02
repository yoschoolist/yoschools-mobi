import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FocusAwareStatusBar } from '@/components/ui';
// import { SearchIcon, FilterIcon, ListIcon, MapIcon, LayersIcon, NavigationIcon, DrawIcon } from '@/components/ui/icons';
// import { MapboxMap } from '@/components/map/mapbox-map';

const { width, height } = Dimensions.get('window');

function FindSchools() {
  const [searchQuery, setSearchQuery] = useState('Brooklyn, NY');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [resultsCount, setResultsCount] = useState(6891);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filters = [
    { id: 'filters', label: 'Filters', icon: '🔍' },
    { id: 'price', label: 'Price', icon: '💰' },
    { id: 'rooms', label: 'Rooms', icon: '🛏️' },
    { id: 'propertyType', label: 'Property Type', icon: '🏠' },
  ];

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'map' ? 'list' : 'map');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FocusAwareStatusBar />
      
      {/* Search and Filter Bar */}
      <View className="px-4 pt-2 pb-4 bg-white border-b border-gray-200">
        {/* Search Input */}
        <View className="flex-row items-center mb-3">
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-lg px-3 py-3 mr-3">
            <Text className="text-gray-500 text-lg">🔍</Text>
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search for schools..."
              className="ml-2 text-gray-900 flex-1 text-base"
              placeholderTextColor="#6B7280"
            />
          </View>
          
          {/* View Toggle Button */}
          <TouchableOpacity 
            onPress={toggleViewMode}
            className="flex-row items-center bg-blue-50 px-3 py-2 rounded-lg"
          >
            {viewMode === 'map' ? (
              <>
                <Text className="text-blue-600 text-lg">📋</Text>
                <Text className="ml-1 text-blue-600 font-medium">List</Text>
              </>
            ) : (
              <>
                <Text className="text-blue-600 text-lg">🗺️</Text>
                <Text className="ml-1 text-blue-600 font-medium">Map</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Filter Buttons */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="flex-row space-x-2"
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              onPress={() => toggleFilter(filter.id)}
              className={`px-4 py-2 rounded-full border ${
                activeFilters.includes(filter.id)
                  ? 'bg-blue-500 border-blue-500'
                  : 'bg-white border-gray-300'
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  activeFilters.includes(filter.id)
                    ? 'text-white'
                    : 'text-gray-700'
                }`}
              >
                {filter.icon} {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Map Area */}
      <View className="flex-1 relative">
        {/* Mapbox Map Component - Temporarily disabled for testing */}
        {/* <MapboxMap 
          onMapLoad={() => console.log('Map loaded successfully')}
          onMapError={(error) => console.error('Map error:', error)}
        /> */}
        
        {/* Temporary Placeholder Map */}
        <View className="flex-1 bg-gray-100 justify-center items-center">
          <Text className="text-gray-500 text-lg">Mapbox Map Loading...</Text>
          <Text className="text-gray-400 text-sm mt-2">Interactive map will be displayed here</Text>
          <Text className="text-gray-400 text-xs mt-4 text-center px-4">
            To enable the map, add your Mapbox token to environment variables
          </Text>
        </View>

        {/* Floating Action Buttons (FABs) */}
        <View className="absolute right-4 top-4 space-y-3">
          {/* Layers FAB */}
          <TouchableOpacity className="w-12 h-12 bg-white rounded-full shadow-lg justify-center items-center">
            <Text className="text-gray-700 text-lg">🔲</Text>
          </TouchableOpacity>
          
          {/* Navigation FAB */}
          <TouchableOpacity className="w-12 h-12 bg-white rounded-full shadow-lg justify-center items-center">
            <Text className="text-gray-700 text-lg">📍</Text>
          </TouchableOpacity>
          
          {/* Draw FAB */}
          <TouchableOpacity className="w-12 h-12 bg-white rounded-full shadow-lg justify-center items-center">
            <Text className="text-gray-700 text-lg">✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Results Summary Bar */}
        <View className="absolute bottom-20 left-4 right-4 bg-white rounded-lg shadow-lg p-4">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-lg font-semibold text-gray-900">
              {resultsCount.toLocaleString()} results
            </Text>
            <View className="flex-row space-x-2">
              <TouchableOpacity className="bg-gray-100 px-3 py-2 rounded-lg">
                <Text className="text-gray-700 font-medium">Save search</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-gray-100 px-3 py-2 rounded-lg">
                <Text className="text-gray-700 font-medium">Share</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text className="text-xs text-gray-500">Maps Legal</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

FindSchools.displayName = 'FindSchools';

export default FindSchools;
