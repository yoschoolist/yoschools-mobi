import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export function getItem<T>(key: string): T | null {
  const value = storage.getString(key);
  console.log(`📥 Getting item "${key}":`, value ? 'Value found' : 'No value');
  if (value) {
    try {
      const parsed = JSON.parse(value);
      console.log(`📋 Parsed value for "${key}":`, parsed);
      return parsed || null;
    } catch (parseError) {
      console.error(`❌ Failed to parse value for "${key}":`, parseError);
      return null;
    }
  }
  return null;
}

export async function setItem<T>(key: string, value: T) {
  console.log(`📤 Setting item "${key}":`, value ? 'Value provided' : 'No value');
  if (value) {
    console.log(`📋 Value details for "${key}":`, {
      hasAccess: !!value.access,
      accessLength: value.access?.length || 0,
      hasRefresh: !!value.refresh,
      refreshLength: value.refresh?.length || 0,
      hasUser: !!value.user,
      userEmail: value.user?.email
    });
  }
  
  const jsonValue = JSON.stringify(value);
  console.log(`📝 JSON string length for "${key}":`, jsonValue.length);
  
  storage.set(key, jsonValue);
  console.log(`✅ Item "${key}" stored successfully`);
}

export async function removeItem(key: string) {
  console.log(`🗑️ Removing item "${key}"`);
  storage.delete(key);
  console.log(`✅ Item "${key}" removed successfully`);
}
