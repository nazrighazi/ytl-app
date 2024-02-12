import { Redirect, Stack } from 'expo-router';

import { useAuth } from '~/services/providers/AuthProvider';

export default function AuthLayout() {
  const { session, unlocked } = useAuth();

  if (session && unlocked) {
    return <Redirect href={'/'} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
