import { Typography } from '@/components/ui/Typography';
import { useBillsContext } from '@/context/BillsContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StatusBar, Text, View } from 'react-native';
interface ITitlebarProps {
    title: string;
    image: string;
    back?: boolean;
}
const img = require(`../../../assets/person.jpg`)
const TitleBar = ({ title, image, back }: ITitlebarProps) => {
    const { profile } = useBillsContext();
    const navigation = useNavigation();
    return (
        <View className=''>
            <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent />
            {/* Component */}
            <View className='flex flex-row justify-between  '>
                <View className='flex flex-row items-center gap-2'>
                    {back && <Text onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={32} color="black" />
                    </Text>
                    }
                    <Typography label={title} className='text-2xl' variant={"p"} />
                </View>
                <Pressable onPressIn={() => navigation.navigate('profile' as never)}>

                    <View className='bg-slate-300 w-14 h-14 rounded-full shadow-sm'>
                        {/* @ts-ignore */}
                        <Image className='rounded-full h-full w-full object-cover' source={profile?.profileImage ? profile?.profileImage : img} />
                    </View>
                </Pressable>
            </View>
        </View>
    )
}
export default TitleBar
