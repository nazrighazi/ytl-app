import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, AppState, Text, Pressable, KeyboardAvoidingView, Platform } from 'react-native';

import { supabase } from '../../utils/supabase';

import { ControllerInput } from '~/components/ControllerInput';
import { useAuth } from '~/services/providers/AuthProvider';
import { getValueFor, save } from '~/utils/secureStore';
import { SafeAreaView } from 'react-native-safe-area-context';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

type FormFields = {
  email: string;
  password: string;
};

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Auth() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setUnlockedValue, unlocked, onAuthenticateUser, session } = useAuth();
  const { register, control, handleSubmit } = useForm<FormFields>();
  const [onboarded, setOnboarded] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const onboarded = await getValueFor('onboarded');
      setOnboarded(onboarded ? true : false);
      //   if (session && onboarded && !unlocked) {
      //     onAuthenticateUser(onSuccessfulAuthentication, () => {});
      //   }
    };

    checkAuthentication();
  }, []);

  const onSuccessfulAuthentication = () => {
    setUnlockedValue(true);
    return <Redirect href={'/'} />;
  };

  const signInWithEmail = async (formData: FormFields) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (data) {
      save('onboarded', 'true');
      setUnlockedValue(true);
    }

    if (error) setError(error.message);

    setLoading(false);
  };

  return (
    <SafeAreaView className="px-[16px] bg-[#f3f4f6]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex flex-col justify-center items-center h-screen">
        <View className="w-full">
          <ControllerInput
            name="email"
            placeholder="Email"
            control={control}
            secureTextEntry={false}
            rules={{
              required: 'Email is required',
              pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
            }}
          />
        </View>
        <View className="pt-[16px] w-full">
          <ControllerInput
            name="password"
            placeholder="Password"
            control={control}
            secureTextEntry
            rules={{
              required: 'Password is required',
            }}
          />
        </View>
        <Pressable
          className={`mt-[24px] w-full rounded-full text-center py-[10px] ${loading ? 'bg-slate-300' : 'bg-indigo-600'}`}
          onPress={handleSubmit(signInWithEmail)}
          disabled={loading}>
          <Text className="text-white text-center text-[18px]">Sign In</Text>
        </Pressable>

        {session && onboarded && !unlocked && (
          <Pressable
            className={`mt-[24px] w-full rounded-full border border-indigo-700 text-center py-[10px] bg-white `}
            onPress={() => onAuthenticateUser(onSuccessfulAuthentication, () => {})}
            disabled={loading}>
            <Text className="text-indigo-600 text-center text-[18px]">Sign In with Biometric</Text>
          </Pressable>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
