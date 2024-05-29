import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FireAuth, db } from '@/config/fireConfig';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { UserBill } from './Index';
import DueCard from './DueCard';
import TitleBar from '@/components/ui/TitleBar';
import ScreenWrapper from '@/layout/SafreAreaInsets';
const ViewAll = () => {
    const auth = FireAuth;
    const navigation = useNavigation();
    const [userBills, setUserBills] = useState<UserBill[]>([]);
    const billCollection = collection(db, 'billRecords')
    const q = query(billCollection, orderBy('date', 'desc'))
    const currentUser = auth.currentUser;
    useEffect(() => {
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const documents = snapshot.docs.map(doc => doc.data());
            const filteredByCurrentUser = documents.filter((doc) => (doc.currentUser === currentUser?.uid))
            setUserBills(filteredByCurrentUser as never);
        });
        return () => unsubscribe();
    }, []);
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