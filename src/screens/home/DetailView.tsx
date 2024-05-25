import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import TitleBar from '@/components/ui/TitleBar'
import ScreenWrapper from '@/layout/SafreAreaInsets'
import { Typography } from '@/components/ui/Typography'
import { AntDesign } from '@expo/vector-icons';
import DetailDueCard from '@/components/ui/DetailDueCard'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'
const data = [
  {
    name: 'Khaja In College',
    total: '20000',
    cardDecision: 'owe',
    purpose: "Khaja In College",
  },
  {
    name: 'RUnnig In College',
    total: '20000',
    cardDecision: 'owe',
    purpose: "Khaja In College",
  },
  {
    name: 'Dancing In College',
    total: '20000',
    cardDecision: 'receive',
    purpose: "Khaja In College",
  },
  {
    name: 'Enjoy In College',
    total: '20000',
    cardDecision: 'receive',
    purpose: "Khaja In College",
  },
  {
    name: 'Travel In Collg',
    total: '20000',
    cardDecision: 'owe',
    purpose: "Khaja In College",
  },
  {
    name: 'Travel In Colleg',
    total: '20000',
    cardDecision: 'receive',
    purpose: "Khaja In College",
  },
  {
    name: 'Travel In Coege',
    total: '20000',
    cardDecision: 'owe',
    purpose: "Khaja In College",
  },
]

const DetailView = () => {

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);
  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View>

        <TitleBar  back image='person.jpg' title='Detail View' />
        <Typography variant={"h3"} label='Ramlal Karki' className='text-3xl ' />
        <View className='flex flex-row justify-between items-center'>
        <Typography label='Pending' className='my-4 text-xl' />
        <View className='flex gap-3 flex-row items-center'>
        <View className='h-4 w-4 rounded-md bg-green-500'></View>
        <Typography label='To Get' className='text-sm' />
        <View className='h-4 w-4 rounded-md bg-orange'></View>
        <Typography label='To Pay' className='text-sm' />
        </View>
        </View>

        <FlatList
            className='mt-1'
            scrollEnabled={true}
            ItemSeparatorComponent={() => <View style={{ height:20 }} />}
            data={data}
            renderItem={({ item }) => <DetailDueCard name={item.name} total={item.total as any} purpose={item.purpose} cardDecision={item.cardDecision as 'owe' | 'receive'}/>}
            keyExtractor={item => item.name}
          />

      </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

export default DetailView