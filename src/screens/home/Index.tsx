
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, ScrollView, FlatList, Pressable } from 'react-native'
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
    name: 'Ramlal Karki',
    total: '20000',
    cardDecision: 'receive'
  },
  {
    userId: 1,
    name: 'Ravi Lamichane',
    total: '20000',
    cardDecision: 'owe'

  },
  {
    userId: 1,
    name: 'Rabindra Karki',
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


function Index() {
  return <IndexInner></IndexInner>
}


const IndexInner = () => {


  const [groups, setGroups] = useGroupCtx();

  console.log(groups)

  

  const navigation = useNavigation();
  console.log("in index")
  // Load all groups from AsyncStorage

  return (
    <ScreenWrapper>
      <TitleBar title="Home" image={"person.jpg"} />
      <Pressable onPress={() => navigation.navigate('addBill' as never)} className='absolute bottom-10 right-10 z-20' >
        <View className='bg-slate-800 z-20 w-[70px] h-[70px] rounded-full flex justify-center items-center shadow-sm shadow-black'>
          <AntDesign name="plus" size={42} color="white" />
        </View>
      </Pressable>

      <MoneyCard cardDecision='owe' total='12,231' />
      <ScrollView showsVerticalScrollIndicator={false} className='h-[500px] '>
        <View className='flex flex-row justify-between '>
          <Typography className='text-lg' variant={'h2'} label='Recent' />
          <Typography className='text-lg mb-2' variant={'h2'} label='View All' />
        </View>
        <View className='h-[250px]'>
          <FlatList bounces={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            data={DueInfo}
            renderItem={({ item }) => <Pressable onPress={() => navigation.navigate('dueDetail' as never)}><DueCard name={item.name} total={item.total} cardDecision={item.cardDecision as "owe" | "receive"} /></Pressable>}
            keyExtractor={item => item.name}
          />
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
