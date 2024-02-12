import { Session } from '@supabase/supabase-js';
import * as LocalAuthentication from 'expo-local-authentication';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

import { getValueFor } from '~/utils/secureStore';
import { supabase } from '~/utils/supabase';

type AuthData = {
  session: Session | null;
  loading: boolean;
  unlocked: boolean;
  setUnlockedValue: (value: boolean) => void;
  onAuthenticateUser: (onSuccess: () => void, onFailed: () => void) => any;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  unlocked: false,
  setUnlockedValue: () => {},
  onAuthenticateUser: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const isOnboard = getValueFor('onboarded');
      if (!isOnboard) {
        setUnlocked(true);
      }

      setSession(session);
      setLoading(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const setUnlockedValue = (value: boolean) => {
    setUnlocked(value);
  };

  const onAuthenticateUser = async (
    onSuccess: () => any = () => {},
    onFailed: () => any = () => {}
  ) => {
    const compatible = await LocalAuthentication.isEnrolledAsync();
    if (!compatible) {
      alert(
        'Biometric authentication is not available on this device. Please enable it in your settings.'
      );
      return onFailed();
    }

    const res = await LocalAuthentication.authenticateAsync();
    console.log(res);
    if (res.success) {
      onSuccess();
      setUnlockedValue(true);
      //   return <Redirect href={'/'} />;
    } else {
      return onFailed();
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, loading, unlocked, setUnlockedValue, onAuthenticateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
