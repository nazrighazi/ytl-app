import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LayoutProps {
  children: React.ReactNode;
  headerTitle: string;
  backgroundColor?: string;
}

export const Skeleton = ({
  children,
  headerTitle = '',
  backgroundColor = 'white',
}: LayoutProps) => {
  const router = useRouter();

  return (
    <View className={`flex px-[16px] pt-[8px] bg-[${backgroundColor}] `} style={{ height: '100%' }}>
      {/* header */}
      <View className="flex-none">
        <View className="flex flex-row justify-between">
          {router.canGoBack() && (
            <Pressable className="p-[4px] rounded-full bg-indigo-100" onPress={() => router.back()}>
              <Ionicons name="arrow-back-outline" size={24} color="black" />
            </Pressable>
          )}
        </View>
        <Text className="font-['LatoBold'] text-[32px] pt-[16px] font-bold pb-[12px]">
          {headerTitle}
        </Text>
      </View>

      {/* content */}

      <View className="flex-1">{children}</View>
    </View>
  );
};
