import { SimpleLineIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

export default function IndexPage() {
  return (
    <View className="p-[16px] bg-[#f3f4f6]">
      <View className="flex flex-row space-x-3 items-center">
        <View className="w-14 h-14 flex justify-center items-center rounded-full bg-indigo-300">
          <Text className="text-white font-['LatoBold'] text-[20px]">Y</Text>
        </View>
        <View className="flex flex-col space-y-1">
          <Text>Hello, Lorem Ipsum</Text>
          <Text className="text-lg font-['LatoBold']">Welcome Back!</Text>
        </View>
      </View>
      <View className=" mt-[24px] rounded-xl bg-indigo-700 p-[16px]">
        <View className="flex flex-row justify-end">
          <Text className="font-['LatoBold'] text-white text-[20px]">$2,687.00</Text>
        </View>
        <View className="flex flex-col space-y-1 pt-[32px]">
          <Text className="font-['Lato'] text-white text-[12px]">Card Number</Text>
          <Text className="font-['Lato'] text-white text-[24px]">1234 5678 3592 6390</Text>
        </View>

        <View className="flex flex-row justify-between pt-[32px]">
          <View className="flex flex-col space-y-1 self-start">
            <Text className="font-['Lato'] text-white text-[12px]">Card Holder</Text>
            <Text className="font-['Lato'] text-white text-[16px]">LOREM IPSUM</Text>
          </View>
          <View className="flex flex-col space-y-1 self-start">
            <Text className="font-['Lato'] text-white text-[12px]">Valid Thru</Text>
            <Text className="font-['Lato'] text-white text-[16px]">03/26</Text>
          </View>
        </View>
      </View>

      <View className="flex flex-row space-x-2 mt-[32px]">
        <Link href="/transaction-history/" asChild>
          <Pressable
            className={`basis-1/2 rounded-xl bg-white p-[16px] flex flex-col  ${Platform.OS === 'ios' ? 'shadow shadow-gray' : 'shadow-md shadow-gray-500'}`}>
            <View className="w-[40px] h-[40px] justify-center items-center bg-indigo-200 rounded-full">
              <SimpleLineIcons name="credit-card" size={20} color="black" />
            </View>

            <Text className="font-['LatoBold'] text-lg ">Transaction History</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
