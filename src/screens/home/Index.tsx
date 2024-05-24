
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, ScrollView, FlatList, Pressable, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import { Typography } from '@/components/ui/Typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import TitleBar from '@/components/ui/TitleBar';
import MoneyCard from '@/components/ui/MoneyCard';
import DueCard from './DueCard';
import GroupCard from './GroupCard';
import ScreenWrapper from '@/layout/SafreAreaInsets';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import GroupContextProvider, { useGroupCtx } from '@/context/GroupContext';
import { collection, getDocs,orderBy, query } from 'firebase/firestore';
import { FireAuth, db } from '@/config/fireConfig';
import { firebase } from '@react-native-firebase/auth';
import { Auth, onAuthStateChanged, User } from 'firebase/auth';
import { set } from 'react-hook-form';
import { isLoading } from 'expo-font';
import { useBillsContext } from '@/context/BillsContext';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  {
    userId: 1,
    anonymousUser: "Davidson",
    currentUser: "lskfjlkj2123",
    groupId: 123,
    owed: "true",
    person: "Kale madria",
    purpose: "Travel",
    name: 'Ramlal Karki',
    total: '20000',
    cardDecision: 'receive'

  },
  {
    userId: 1,
    anonymousUser: "Davidson",
    currentUser: "lskfjlkj2123",
    groupId: 123,
    person: "ryan reynolds",
    purpose: "Travel",
    name: 'Ramlal Karki',
    total: '20000',
    cardDecision: 'receive'

  },
]
const GroupInfo = [
  {
    id: 1,
    name: 'Sikkim Travel',
  },
  {
    id: 2,
    name: 'India Travel',
  },
  {
    id: 3,
    name: 'Dhampus Travel',
  },
  {
    id: 4,
    name: 'Pokhara Travel',
  }]

export interface UserBill {
  anonymousUser: string;
  currentUser: string;
  groupId: string;
  cardDecision: 'owe' | 'receive';
  person: string;
  purpose: string;
  total: string;
  date : string;
}
const Index = () => {
  const auth = FireAuth;
  const [groups, _] = useGroupCtx();
  const {allBills} = useBillsContext();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);  // State to handle loading
  const [user, setUser] = useState<User | null>(null);
  const userCollection = collection(db, 'billRecords')
  const [userBills, setUserBills] = useState<UserBill[]>([]);
  const [total,setTotal] = useState<number>(0);
  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged(user => {
      setUser(user);
      const getUserBills = async () => {
        const q = query(userCollection, orderBy('date', 'desc'))
        const data = await getDocs(q);
        const [uid] = data.docs.map(doc => doc.data().currentUser)
        const billsData = data.docs.filter((doc) => (doc.data().currentUser === user?.uid) )
        const bills = billsData.map(doc => doc.data())
        setUserBills(bills as UserBill[])
        const total = bills.reduce((acc, bill) => {
          if(bill.cardDecision === 'owe'){
            return acc - Number(bill.total)
          }else{
            return acc + Number(bill.total)
          }
        },0)
        setTotal(total)
      }
      getUserBills();
      setLoading(false);
    })
  }, [allBills])

  // console.log(user?.uid)
  // useEffect(() => {
  //   getUserBills();
  // }, [allBills,user])
  return (
    <ScreenWrapper>
      <TitleBar title="Home" image={"person.jpg"} />
      <Pressable onPress={() => navigation.navigate('addBill' as never)} className='absolute bottom-10 right-10 z-20' >
        <View className='bg-slate-800 z-20 w-[70px] h-[70px] rounded-full flex justify-center items-center shadow-sm shadow-black'>
          <AntDesign name="plus" size={42} color="white" />
        </View>
      </Pressable>
      <MoneyCard  total={total} />
      <ScrollView showsVerticalScrollIndicator={false} className='h-[500px] '>
        <View className='flex flex-row justify-between '>
          <Typography className='text-lg' variant={'h2'} label='Recent' />
          <Typography className='text-lg mb-2' variant={'h2'} label='View All' />
        </View>
        <View className='h-[250px]'>
          {loading ? <ActivityIndicator color="#3A3453" size='large' /> : <FlatList bounces={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            data={userBills.slice(0, 3)}
            renderItem={({ item }) => <Pressable onPress={() => navigation.navigate('dueDetail' as never)}><DueCard name={item.anonymousUser} total={item.total as any} cardDecision={item.cardDecision as "owe" | "receive"} /></Pressable>}
            keyExtractor={item => item.person}
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
            renderItem={({ item }) => <Pressable onPress={() => navigation.navigate('index' as never)}><GroupCard name={item.name} /></Pressable>}
            keyExtractor={(item, index) => index.toString()}
          />
        </View >
      </ScrollView>
    </ScreenWrapper>
  )
}
export default Index
