
import MoneyCard from '@/components/ui/MoneyCard';
import TitleBar from '@/components/ui/TitleBar';
import { Typography } from '@/components/ui/Typography';
import { FireAuth, db } from '@/config/fireConfig';
import { useGroupCtx } from '@/context/GroupContext';
import ScreenWrapper from '@/layout/SafreAreaInsets';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, ScrollView, View } from 'react-native';
import DueCard from './DueCard';
import GroupCard from './GroupCard';
if (__DEV__) {
  const ignoreWarns = ["VirtualizedLists should never be nested inside plain ScrollViews"];
  const errorWarn = global.console.error;
  global.console.error = (...arg) => {
    for (const error of ignoreWarns) {
      if (arg[0].startsWith(error)) {
        return;
      }
    }
    errorWarn(...arg);
  };
}

export interface UserBill {
  anonymousUser: string;
  currentUser: string;
  groupId: string;
  cardDecision: 'owe' | 'receive';
  person: string;
  purpose: string;
  total: string;
  date: string;
}
const Index = () => {
  const auth = FireAuth;
  const [groups, _] = useGroupCtx();
  const navigation = useNavigation();
  const [loading] = useState(false);  // State to handle loading
  const billCollection = collection(db, 'billRecords')
  const [userBills, setUserBills] = useState<UserBill[]>([]);
  const [total, setTotal] = useState<number>(0);
  const currentUser = auth.currentUser;
  const storeData = async (value: any) => {
    try {
      await AsyncStorage.setItem('Bills', JSON.stringify(value));
      console.log("bills stored")
    } catch (e) {
      console.log("Error storing bills", e)
    }
  };
  const q = query(billCollection, orderBy('date', 'desc'))
  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const documents = snapshot.docs.map(doc => doc.data());
      const filteredByCurrentUser = documents.filter((doc) => (doc.currentUser === currentUser?.uid))
      setUserBills(filteredByCurrentUser as never)
      const total = filteredByCurrentUser.reduce((acc, bill) => {
        if (bill.cardDecision === 'owe') {
          return acc - Number(bill.total)
        } else {
          return acc + Number(bill.total)
        }
      }, 0)
      setTotal(total)
    });
    return () => unsubscribe();
  }, []);
  return (
    <ScreenWrapper >
      <TitleBar title="Home" image={"person.jpg"} />
      <MoneyCard total={total} />
      <ScrollView className='h-[500px]' showsVerticalScrollIndicator={false} >
        <View className='flex flex-row justify-between '>
          <Typography className='text-lg' variant={'h2'} label='Recent' />
          <Pressable onPress={() => { navigation.navigate("ViewAll" as never) }}>
            <Typography className='text-lg mb-2' variant={'h2'} label='View All' />
          </Pressable>
        </View>
        <View className='h-[250px]'>
          {userBills.length === 0 && (
            <View className='bg-gray-200 rounded-xl flex justify-center items-center h-[230px]  '>
              <Typography className='text-lg text-gray-500' variant={'h2'} label='No recent transactions' />
              <Pressable onPress={() => navigation.navigate("addBill" as never)} >

                <View className=' rounded-full p-4'>
                  <AntDesign name="plus" size={42} color="#969696" />
                </View>
              </Pressable>
            </View>
          )}
          {loading ? <ActivityIndicator color="#3A3453" size='large' /> : <FlatList bounces={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            data={userBills.slice(0, 3)}
            //@ts-ignore
            renderItem={({ item }) => <Pressable onPress={() => navigation.navigate('dueDetail', { data: item })}><DueCard person2={item.currentUser} person={item.person} name={item.anonymousUser} total={item.total as any} cardDecision={item.cardDecision as "owe" | "receive"} /></Pressable>}
            keyExtractor={item => item.date}
          />}
        </View>
        <Pressable onPress={() => navigation.navigate('addGroup' as never)}><GroupCard name="+Add a group" /></Pressable>
        <Typography className='text-lg' variant={'h2'} label='Groups' />
        <FlatList
          className='mt-1 '
          bounces={false}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          data={groups}
          renderItem={({ item }) => <Pressable onPress={() => navigation.navigate({ name: 'GroupConclusion', params: { group: item } } as never)}><GroupCard name={item.name} /></Pressable>}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>

    </ScreenWrapper>
  )
}
export default Index
