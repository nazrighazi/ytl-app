import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

import { Skeleton } from '~/components/Skeleton';
import { Transaction } from '~/domain/entities/TransactionHistory.entity';
import capitalizeWord from '~/utils/capitalizeWord';
import formatDate from '~/utils/formatDate';
import getFirstAlphabet from '~/utils/getFirstAlphabet';

export default function TransactionDetailsPage() {
  const transactions = useLocalSearchParams<Transaction>();
  return (
    <Skeleton headerTitle="Transaction Details" backgroundColor="#f3f4f6">
      <View className="flex flex-col pt-[12px]">
        <View className="flex flex-row space-x-3 items-center">
          <View className="relative inline-flex w-16 items-center justify-center h-16 rounded-full bg-indigo-200">
            <Text className="font-['Lato'] font-medium text-gray-600 text-[32px]">
              {getFirstAlphabet(transactions.merchant)}
            </Text>
          </View>
          <View className="flex flex-col">
            <Text className="font-['LatoBold'] text-[18px] mb-[6px]">{transactions.merchant}</Text>
            <Text className="font-['Lato'] text-[14px] text-gray-400">Malaysia</Text>
          </View>
        </View>
        <View className="mt-[30px] flex flex-col pt-[24px] rounded-[12px] p-[16px] shadow shadow-gray bg-white">
          <View className="flex flex-row justify-between">
            <Text>Invoice</Text>
            <Text>{transactions.transaction_id}</Text>
          </View>
          <View className=" pt-[8px] flex flex-row justify-between">
            <Text>Description</Text>
            <Text>{transactions.description}</Text>
          </View>
          <View className=" pt-[8px] flex flex-row justify-between">
            <Text>Amount</Text>
            <Text>RM {transactions.amount}</Text>
          </View>

          <View className=" pt-[8px] flex flex-row justify-between">
            <Text>Date</Text>
            <Text>{formatDate(transactions.date)}</Text>
          </View>
          <View className="py-[16px]">
            <View className="border-b-[0.5px] border-gray-400" />
          </View>
          <View className=" pt-[8px] flex flex-row justify-between">
            <Text>Card Number</Text>
            <Text>{transactions.card_number}</Text>
          </View>
          <View className=" pt-[8px] flex flex-row justify-between">
            <Text>Payment type</Text>
            {transactions.type === 'debit' ? (
              <FontAwesome name="cc-visa" size={24} color="black" />
            ) : (
              <FontAwesome name="cc-mastercard" size={24} color="black" />
            )}
          </View>
          <View className=" pt-[8px] flex flex-row justify-between">
            <Text>Payment Status</Text>
            <Text
              className={`px-[8px] py-[4px] rounded-full ${transactions.transaction_status === 'success' ? 'text-indigo-400' : transactions.transaction_status === 'failed' ? 'text-red-600' : 'text-amber-600'}`}>
              {capitalizeWord(transactions.transaction_status)}
            </Text>
          </View>
        </View>
      </View>
    </Skeleton>
  );
}
