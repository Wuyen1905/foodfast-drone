import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { Vibration, Platform } from 'react-native';

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        // Use Vibration instead of expo-haptics for Expo Go compatibility
        if (Platform.OS !== 'web') {
          Vibration.vibrate(10);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
