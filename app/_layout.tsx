import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { PortalProvider, TamaguiProvider } from 'tamagui';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import config from '../tamagui.config';
import { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import useEffectOnce from 'hooks/useEffectOnce';
import { Provider } from 'react-redux';
import { store } from 'store';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [loaded] = useFonts({
    'Inter-Thin': require('@tamagui/font-inter/otf/Inter-Thin.otf'),
    'Inter-ExtraLight': require('@tamagui/font-inter/otf/Inter-ExtraLight.otf'),
    'Inter-Light': require('@tamagui/font-inter/otf/Inter-Light.otf'),
    'Inter-Regular': require('@tamagui/font-inter/otf/Inter-Regular.otf'),
    'Inter-Medium': require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    'Inter-SemiBold': require('@tamagui/font-inter/otf/Inter-SemiBold.otf'),
    'Inter-Bold': require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    'Inter-ExtraBold': require('@tamagui/font-inter/otf/Inter-ExtraBold.otf'),
    'Inter-Black': require('@tamagui/font-inter/otf/Inter-Black.otf'),
  });

  useEffectOnce(() => {
    async function prepareApp() {
      setTimeout(() => {
        setAppIsReady(true);
      }, 1000);
    }
    prepareApp();
  });

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || !loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <TamaguiProvider config={config}>
          <PortalProvider>
            <SafeAreaProvider>
              <StatusBar style='auto' backgroundColor='#fff' />
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              />
            </SafeAreaProvider>
          </PortalProvider>
        </TamaguiProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
