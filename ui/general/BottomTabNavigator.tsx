import { HeartIconSvg, HomeIconSvg } from 'assets/icons';
import { router, usePathname } from 'expo-router';
import { useMemo } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { XStack, YStack } from 'tamagui';
import Typography from 'ui/typography';

const BottomTabNavigator = () => {
  const { bottom } = useSafeAreaInsets();
  const pathName = usePathname();

  const btRoutesList = useMemo(() => {
    return [
      {
        id: '/private/products',
        label: 'Products',
        icon: HomeIconSvg,
        onPress: () => {
          router.push('/private/products');
        },
      },
      {
        id: '/private/wishlist',
        label: 'Wishlist',
        icon: HeartIconSvg,
        onPress: () => {
          router.push('/private/wishlist');
        },
      },
    ];
  }, []);
  return (
    <XStack
      maxHeight={70 + bottom}
      w='100%'
      pb={bottom}
      pt='$13'
      bg='white'
      shadowColor='#546374AD'
      shadowOpacity={0.32}
      shadowRadius='$15'
      shadowOffset={{
        width: '$0',
        height: '$-10',
      }}
      elevation={Platform.OS === 'android' ? 3 : 0}
    >
      {btRoutesList.map(route => (
        <YStack
          testID='tab'
          key={route.id}
          f={1}
          ai='center'
          jc='center'
          px='$20'
          py='$2'
          pos='relative'
          disabled={route.id.includes(pathName)}
          onPress={route.onPress}
        >
          <route.icon
            color={route.id.includes(pathName) ? '#610C27' : '#696969'}
            fill={route.id.includes(pathName) ? '#610C27' : 'transparent'}
          />
          <Typography
            size='$12'
            medium
            mt='$6'
            color={route.id.includes(pathName) ? '#610C27' : '#696969'}
          >
            {route.label}
          </Typography>
        </YStack>
      ))}
    </XStack>
  );
};

export default BottomTabNavigator;
