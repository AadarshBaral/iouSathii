import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';
import { Typography } from '@/components/ui/Typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
interface ITitlebarProps {
    title: string;
    image: string;
    back? : boolean;
}
const img = require(`../../../assets/splash.png`)
const TitleBar = ({ title, image, back }: ITitlebarProps) => {
const navigation = useNavigation();
    return (
            <View className='my-3'>
                {/* Component */}
                <View className='flex flex-row justify-between  '>
                    <View className='flex flex-row items-center gap-2'>
                        {back && <Text  onPress={() =>navigation.goBack()}>
                        <Ionicons name="arrow-back" size={32} color="black" />
                        </Text>
                        }
                        <Typography label={title} className='text-2xl' variant={"p"} />
                    </View>
                    <Pressable onPressIn={()=>navigation.navigate('profile' as never)}>

                    <View className='bg-slate-300 w-14 h-14 rounded-full shadow-sm'>
                        {/* <Image  source={img} className='h-14 w-14  object-cover rounded-full' /> */}
                    </View>
                    </Pressable>
                </View>
            </View>

    )
}

export default TitleBar
