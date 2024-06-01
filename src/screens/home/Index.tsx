
import { View, ScrollView, FlatList, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Typography } from '@/components/ui/Typography';
import TitleBar from '@/components/ui/TitleBar';
import MoneyCard from '@/components/ui/MoneyCard';
import DueCard from './DueCard';
import GroupCard from './GroupCard';
import ScreenWrapper from '@/layout/SafreAreaInsets';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useGroupCtx } from '@/context/GroupContext';
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { FireAuth, db } from '@/config/fireConfig';
import { User } from 'firebase/auth';
import { useBillsContext } from '@/context/BillsContext';
import TabBar from '@/components/ui/TabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Progress from '@/components/ui/Progress';
import ProgressBar from '@/components/ui/Progress';
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
const DueInfo = [
  {
    userId: 1,
    anonymousUser: "Davidson",
    currentUser: "lskfjlkj2123",
    groupId: 123,
    owed: "true",
    person: "Samuel Smith",
    purpose: "Travel",
    name: 'Ramlal Karki',
    total: '20000',
    cardDecision: 'receive'
  },

]
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
  const storeData = async (value:any) => {
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
      const filteredByCurrentUser = documents.filter((doc) => (doc.currentUser === currentUser?.uid ))
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
      <ScrollView showsVerticalScrollIndicator={false} className='h-[500px] '>
      {/* <Pressable onPress={() => navigation.navigate('addBill' as never)} className='absolute bottom-0  right-5 z-[20]' >
        <View className='bg-[#1E2225] z-20 w-[70px] h-[70px] rounded-full flex justify-center items-center shadow-sm shadow-black'>
          <AntDesign name="plus" size={42} color="white" />
        </View>
      </Pressable> */}
        <View className='flex flex-row justify-between '>
          <Typography className='text-lg' variant={'h2'} label='Recent' />
          <Pressable onPress={() => {navigation.navigate("ViewAll" as never)}}>
          <Typography className='text-lg mb-2' variant={'h2'} label='View All' />
          </Pressable>
        </View>
        <View className='h-[250px]'>
          {loading ? <ActivityIndicator color="#3A3453" size='large' /> : <FlatList bounces={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            data={userBills.slice(0, 3)}
            //@ts-ignore
            renderItem={({ item }) => <Pressable onPress={() => navigation.navigate('dueDetail',{data:item})}><DueCard person2 = {item.currentUser} person={item.person} name={item.anonymousUser} total={item.total as any} cardDecision={item.cardDecision as "owe" | "receive"} /></Pressable>}
            keyExtractor={item =>item.date }
          />}
        </View>
        <Pressable onPress={() => navigation.navigate('addGroup' as never)}><GroupCard name="+Add a group" /></Pressable>
        <Typography className='text-lg' variant={'h2'} label='Groups' />
        <View >
          <FlatList
            className='mt-1'
            bounces={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            data={groups}
            renderItem={({ item }) => <Pressable onPress={() => navigation.navigate('GroupConclusion' as never)}><GroupCard name={item.name} /></Pressable>}
            keyExtractor={(item, index) => index.toString()}
          />
        </View >
      </ScrollView>

    </ScreenWrapper>
  )
}
export default Index
