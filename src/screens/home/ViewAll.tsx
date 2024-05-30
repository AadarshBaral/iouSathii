import { View, Text, FlatList, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FireAuth, db } from '@/config/fireConfig';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { UserBill } from './Index';
import DueCard from './DueCard';
import TitleBar from '@/components/ui/TitleBar';
import ScreenWrapper from '@/layout/SafreAreaInsets';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { Typography } from '@/components/ui/Typography';
const ViewAll = () => {
    const auth = FireAuth;
    const navigation = useNavigation();
    const [userBills, setUserBills] = useState<UserBill[]>([]);
    const [totals, setTotals] = useState<number[]>([]);
    const billCollection = collection(db, 'billRecords')
    const q = query(billCollection, orderBy('date', 'desc'))
    const currentUser = auth.currentUser;
    useEffect(() => {
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const documents = snapshot.docs.map(doc => doc.data());
            const filteredByCurrentUser = documents.filter((doc) => (doc.currentUser === currentUser?.uid))
            setUserBills(filteredByCurrentUser as never);
            const extractedTotals = filteredByCurrentUser.map(doc => doc.total);
            setTotals(extractedTotals);
        });
        return () => unsubscribe();
    }, []);
    console.log(userBills)

    return (
        <ScreenWrapper>
            <TitleBar back title="All Dues" image='image.png' />
            <View className='my-4'>
                <LineChart
                    data={{
                        labels: userBills.map((_, index) => `Trans ${index + 1}`),
                            datasets: [{ data: totals }]
                    }}
                    width={Dimensions.get("window").width - 20}
                    height={200}
                    withShadow={false}
                    withHorizontalLabels={true}
                    withVerticalLabels={true}


                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        propsForBackgroundLines: { stroke: "#00000000" },
                        propsForLabels: { fill: 'black' },
                        backgroundGradientFrom: "#1E2225",
                        backgroundGradientFromOpacity: 1,
                        backgroundGradientTo: "#161719",
                        fillShadowGradientToOpacity: 0,
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `white`,
                        labelColor: (opacity = 1) => `white`,

                        style: {

                            borderRadius: 16,

                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ccc",

                        }
                    }}
                    bezier
                    style={{
                        marginRight: 10,
                        borderRadius: 20,

                    }}
                />
            </View>
            <Typography className='my-2 text-xl' label="All pending dues" />
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