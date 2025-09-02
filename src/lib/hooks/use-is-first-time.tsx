import { useMMKVBoolean } from 'react-native-mmkv';

import { storage } from '../storage';

const IS_FIRST_TIME = 'IS_FIRST_TIME';

export const useIsFirstTime = () => {
  const [isFirstTime, setIsFirstTime] = useMMKVBoolean(IS_FIRST_TIME, storage);
  
  // In development, always show onboarding
  if (__DEV__) {
    return [true, setIsFirstTime] as const;
  }
  
  // In production, use the stored value
  if (isFirstTime === undefined) {
    return [true, setIsFirstTime] as const;
  }
  return [isFirstTime, setIsFirstTime] as const;
};
