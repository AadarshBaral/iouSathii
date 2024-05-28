import { View, Pressable } from 'react-native'
import React from 'react'
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const TabBar = () => {
    const navigation = useNavigation();
    return (
        <View className='absolute bottom-0 left-3  bg-[#1E2225] w-full h-[60px] rounded-3xl flex justify-around flex-row items-center'>
            <AntDesign name="home" onPress={() => navigation.navigate('index' as never)} size={32} color="#ccc" />
            <Pressable onPress={() => navigation.navigate('addBill' as never)} className='' >
                <View className='bg-[#1E2225] bottom-4 z-20 w-[70px] h-[70px] rounded-full flex justify-center items-center '>
                    <AntDesign name="plus" size={42} color="white" />
                </View>
            </Pressable>
            <Feather onPress={() => navigation.navigate('profile' as never)} name="user" size={32} color="#ccc" />
        </View>
    )
}

export default TabBar