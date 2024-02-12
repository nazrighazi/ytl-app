import { FontAwesome } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, View, Text, RefreshControl, Platform } from 'react-native';

import { Skeleton } from '~/components/Skeleton';
import { SuccessResponse } from '~/domain/entities/ApiResponse.entity';
import { Transaction, TransactionsResponse } from '~/domain/entities/TransactionHistory.entity';
import { transactionService } from '~/services/api/transactions';
import { useAuth } from '~/services/providers/AuthProvider';
import formatDate from '~/utils/formatDate';

const transactionData: SuccessResponse<TransactionsResponse> = require('../../../../services/mocks/transaction-history.json');

type SortedTransactions = (string | Transaction)[];

export default function TransactionHistory() {
  const [isBiometricAuthenticated, setIsBiometricAuthenticated] = useState(false);
  const [showMask, setShowMask] = useState(true);
  const [sortedTransactions, setSortedTransactions] = useState<SortedTransactions>([]);
  const { onAuthenticateUser } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await transactionService.getTransactions.execute();
      console.log(res);
    };

    getData();
    getSortedTransactions();
  }, []);

  const getSortedTransactions = () => {
    // Sort transactions by date
    transactionData.data.transactions.sort(
      (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
    );

    // Extract unique months from the transactions
    const uniqueMonths = [
      ...new Set(
        transactionData.data.transactions.map((transaction) => transaction.date.substring(0, 7))
      ),
    ];

    // Create a new array with transactions sorted by month
    const sortedTransactions: SortedTransactions = [];

    uniqueMonths.forEach((month) => {
      sortedTransactions.push(
        `${new Date(month + '-01').toLocaleString('en-US', { month: 'long', year: 'numeric' })}`
      );

      transactionData.data.transactions
        .filter((transaction) => transaction.date.startsWith(month))
        .forEach((transaction) => sortedTransactions.push(transaction));
    });

    setSortedTransactions(sortedTransactions);
  };

  const onRefreshList = () => {
    setIsRefreshing(true);

    // to mock the refresh, we will use a setTimeout
    setTimeout(() => {
      getSortedTransactions();
      setIsRefreshing(false);
    }, 2000);
  };

  const onSuccessfulAuthentication = () => {
    setIsBiometricAuthenticated(true);
    setShowMask(!showMask);
  };

  const showHiddenMask = () => {
    if (isBiometricAuthenticated) {
      setShowMask(!showMask);
    } else {
      onAuthenticateUser(onSuccessfulAuthentication, () => {});
    }
  };

  const stickyHeaderIndices = useMemo(
    () =>
      sortedTransactions
        .map((item, index) => {
          if (typeof item === 'string') {
            return index;
          } else {
            return null;
          }
        })
        .filter((item) => item !== null) as number[],
    [sortedTransactions]
  );

  const CardItem = ({ transactions }: { transactions: Transaction }) => {
    return (
      <Link href={{ pathname: '/transaction-details', params: transactions }} asChild>
        <Pressable className="flex flex-row justify-between items-center py-[16px] border-b-[0.5px] border-gray-400">
          <View className="flex flex-col">
            <Text className="font-['Lato'] text-black text-[14px] mb-[4px]">
              {transactions.description}
            </Text>
            <Text className="font-['Lato'] text-black text-[14px] mb-[8px]">
              via {transactions.type}
            </Text>

            <Text className="font-['Lato'] text-gray-500 mb-[8px]">
              {formatDate(transactions.date)}
            </Text>

            {transactions.transaction_status !== 'success' &&
              transactions.transaction_status !== 'pending' && (
                <View className="rounded-full overflow-hidden self-start  px-[10px] py-[4px] bg-red-500">
                  <Text className=" text-white font-['Lato'] ">Unsuccessful</Text>
                </View>
              )}
          </View>
          <View className="flex flex-row justify-center items-center space space-x-[16px]">
            <Text
              className={`font-['LatoBold'] text-[18px] ${transactions.transaction_type === 'deposit' ? 'text-indigo-500' : 'text-red-500'}`}>
              {transactions.transaction_type === 'deposit' ? '+' : '-'} RM
              {showMask ? '****' : transactions.amount}
            </Text>
            <FontAwesome name="angle-right" size={24} color="black" />
          </View>
        </Pressable>
      </Link>
    );
  };

  return (
    <Skeleton headerTitle="Transactions History" backgroundColor="#f3f4f6">
      <View className="pt-[12px] flex-1">
        {sortedTransactions.length >= 1 && (
          <Pressable
            className="flex flex-row items-center space-x-2"
            onPress={() => showHiddenMask()}>
            <Text className="font-['Lato'] underline text-indigo-400">
              {showMask ? 'See More Info' : 'Hide Info'}
            </Text>
            <FontAwesome name="angle-right" size={18} color="#818cf8" />
          </Pressable>
        )}
        <FlashList
          showsVerticalScrollIndicator={false}
          data={sortedTransactions}
          extraData={showMask}
          renderItem={({ item }) => {
            if (typeof item === 'string') {
              // Rendering header
              return (
                <Text className="bg-[#f3f4f6] font-['LatoBold'] text-[20px] py-[10px] ">
                  {item}
                </Text>
              );
            } else {
              // Render item
              return <CardItem transactions={item} />;
            }
          }}
          stickyHeaderIndices={stickyHeaderIndices}
          getItemType={(item) => {
            return typeof item === 'string' ? 'sectionHeader' : 'row';
          }}
          estimatedItemSize={100}
          ListFooterComponent={<View style={{ height: 20 }} />}
          nestedScrollEnabled
          // refreshing={isRefreshing}
          // onRefresh={() => onRefreshList()}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => onRefreshList()}
              progressViewOffset={Platform.OS === 'android' ? 50 : 0}
            />
          }
        />
      </View>
    </Skeleton>
  );
}
