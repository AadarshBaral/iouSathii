import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useBillsContext } from '@/context/BillsContext';
import { FireAuth, db } from '@/config/fireConfig';
import { useNavigation } from '@react-navigation/native';
import { collection } from 'firebase/firestore';
import { UserBill } from './Index';
import { User } from 'firebase/auth';
import DueCard from './DueCard';
import TitleBar from '@/components/ui/TitleBar';
import ScreenWrapper from '@/layout/SafreAreaInsets';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ViewAll = () => {
    const navigation = useNavigation();
    const [userBills, setUserBills] = useState<UserBill[]>([]);
    useEffect(()=>{
        const fetchBills = async () => {
         await AsyncStorage.getItem('Bills').then((data)=>{
            if(data){
                setUserBills(JSON.parse(data))
            }
            else{
                console.log("no bills found")
            }
        })
        }
        fetchBills();
    },[])
    console.log(userBills)
    return (
        <ScreenWrapper>
            <TitleBar back title="All Dues" image='image.png' />
            <Text className='my-2 text-xl'>All pending dues</Text>
            <View className=''>
                <FlatList bounces={false}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    data={userBills}
                    //@ts-ignore
                    renderItem={({ item }) => <Pressable onPress={() => navigation.navigate('dueDetail', { data: item })}><DueCard name={item.anonymousUser} total={item.total as any} cardDecision={item.cardDecision as "owe" | "receive"} /></Pressable>}
                    keyExtractor={item => item.date}
                />
            </View>
        </ScreenWrapper>
    )
}

export default ViewAll