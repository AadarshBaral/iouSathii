import TitleBar from '@/components/ui/TitleBar';
import { Typography } from '@/components/ui/Typography';
import { FireAuth, db } from '@/config/fireConfig';
import ScreenWrapper from '@/layout/SafreAreaInsets';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Pressable, View } from 'react-native';
import {
    LineChart,
} from "react-native-chart-kit";
import DueCard from './DueCard';
import { UserBill } from './Index';
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
            const extractedTotals = filteredByCurrentUser.map(doc => doc.total / 100);
            setTotals(extractedTotals);
        });
        return () => unsubscribe();
    }, []);
    return (
        <ScreenWrapper>
            <TitleBar back title="All Dues" image='image.png' />
            <View className='my-4'>
                <LineChart
                    data={{
                        labels: [], // Add labels if necessary
                        datasets: [{ data: totals }]
                    }}
                    width={Dimensions.get("window").width - 30} // Reduced width for better padding
                    height={220} // Increased height for better visual proportion
                    withShadow={false}
                    withHorizontalLabels={true}

                    withVerticalLabels={true}
                    yAxisLabel='रु'
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{

                        backgroundGradientFrom: "#1E2225",
                        backgroundGradientFromOpacity: 1,
                        backgroundGradientTo: "#161719",
                        fillShadowGradientToOpacity: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Ensures white color with configurable opacity
                        labelColor: (opacity = 1) => `pink`, // Label color with opacity handling
                        style: {
                            borderRadius: 16,
                            paddingVertical: 10, // Added vertical padding
                        },
                        propsForDots: {
                            r: "4", // Reduced dot radius for subtlety
                            strokeWidth: "2",
                            stroke: "#fff", // Changed dot stroke to white for better visibility
                        },
                        propsForBackgroundLines: {
                            stroke: "#00000000" // Hiding background lines for a cleaner look
                        },
                        propsForVerticalLabels: {
                            dx: 0,
                            dy: -10
                        }

                    }}
                    bezier // This can be toggled off for a linear chart
                    style={{
                        // Added vertical margin
                        marginTop: -30,
                        paddingTop: 30,
                        borderRadius: 16,
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