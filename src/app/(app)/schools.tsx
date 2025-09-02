import React from 'react';

import { EmptyList, View } from '@/components/ui';

export default function SchoolsScreen() {
  return (
    <View className="flex-1">
      <EmptyList isLoading={false} />
    </View>
  );
}
