import NetInfo from '@react-native-community/netinfo';
import { Redirect, Slot, Stack } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '~/services/providers/AuthProvider';
export default function AppLayout() {
  const { session, loading, unlocked } = useAuth();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (loading) {
    return <ActivityIndicator />;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session || (session && !unlocked)) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <SafeAreaView>
      <Slot />
    </SafeAreaView>
  );
}
