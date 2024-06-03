import DetailDueCard from '@/components/ui/DetailDueCard'
import TitleBar from '@/components/ui/TitleBar'
import { Typography } from '@/components/ui/Typography'
import { FireAuth, db } from '@/config/fireConfig'
import ScreenWrapper from '@/layout/SafreAreaInsets'
import { useNavigation, useRoute } from '@react-navigation/native'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, View } from 'react-native'
interface IBillsInterface {
  anonymousUser: string;
  currentUser: string;
  groupId: string;
  cardDecision: 'owe' | 'receive';
  person: string;
  purpose: string;
  total: string;
  date: string;
}
const DetailView = () => {
  const navigation = useNavigation();
  const [bills, setBills] = useState<IBillsInterface>([] as never)
  const params = useRoute();
  const auth = FireAuth;
  const currentUser = auth.currentUser;
  const billsRef = collection(db, 'billRecords')
  //@ts-ignore
  const q1 = query(billsRef, where('currentUser', '==', currentUser?.uid), where("person", "==", params.params?.data?.person))

  useEffect(() => {
    const getBills = async () => {
      const bills = await getDocs(q1);
      const billsData = bills.docs.map(doc => doc.data())
      setBills(billsData as any)
    }
    getBills();
  }, [])
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  //@ts-ignore
  // console.log(params.params?.data.username ? params.params?.data.username :  params.params?.data.anonymousUser)
  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {/* @ts-ignore */}
          <TitleBar back image='person.jpg' title={params.params?.data.username ? params.params?.data.username : params.params?.data.anonymousUser} />
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
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            //@ts-ignore
            data={bills as IBillsInterface}
            renderItem={({ item }) => <DetailDueCard id={item.billId} name={item.person} total={item.total as any} purpose={item.purpose} cardDecision={item.cardDecision as 'owe' | 'receive'} />}
            keyExtractor={item => item.name}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

export default DetailView