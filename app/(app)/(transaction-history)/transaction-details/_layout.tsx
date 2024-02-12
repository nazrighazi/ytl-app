import { Slot, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { useAuth } from '~/services/providers/AuthProvider';

export default function ProtectedLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { onAuthenticateUser } = useAuth();

  useEffect(() => {
    const onSuccess = () => {
      setIsAuthenticated(true);
    };

    const onFailed = () => {
      router.back();
    };
    onAuthenticateUser(onSuccess, onFailed);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return <Slot />;
}
