import { Link, Href } from 'expo-router';
import { ComponentProps } from 'react';
import { Platform, Linking } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: Href & string;
};

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        // Only override default behavior on native platforms
        if (Platform.OS !== 'web') {
          event.preventDefault();

          try {
            const url = typeof href === 'string' ? href : String(href);
            const canOpen = await Linking.canOpenURL(url);
            if (canOpen) {
              await Linking.openURL(url);
            } else {
              console.warn('Cannot open URL:', url);
            }
          } catch (e) {
            console.warn('Failed to open URL:', e);
          }
        }
      }}
    />
  );
}
