import { Typography } from '@/components/ui/Typography'
import { FireAuth, db } from '@/config/fireConfig'
import { useBillsContext } from '@/context/BillsContext'
import AntDesign from "@expo/vector-icons/AntDesign"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'expo-image'
import { User, signOut } from 'firebase/auth'
import { collection } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Pressable, StatusBar, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const image = require("../../../assets/person.jpg")
const qr = require("../../../assets/frame.png")
export interface IProfileProps extends User {
  profileImage?: string;
}
const Profile = () => {
  const auth = FireAuth;
  const { profile } = useBillsContext();
  const currentUser: IProfileProps | null = auth.currentUser;
  const [loading, setLoading] = useState(false)
  const profilesRef = collection(db, 'profiles')
  const navigation = useNavigation();

  const [followers, setFollowers] = useState({
    followers: 5,
    isfollowed: false
  })
  const handleFollow = () => {
    if (followers.isfollowed) {
      setFollowers({
        followers: followers.followers - 1,
        isfollowed: !followers.isfollowed
      })
      return
    }
    setFollowers({
      followers: followers.followers + 1,
      isfollowed: !followers.isfollowed
    })
  }
  useEffect(() => {
    getStorage();
  }, []);
  const getStorage = async () => {
    const ob = await AsyncStorage.getItem('onboarding');
  };
  const handleSignOut = async () => {
    await AsyncStorage.removeItem('groups')
    signOut(auth).then(() => {
      console.log("signout success")
    }).catch((error) => {
      console.log("Error")
    });
  }
  return (
    <SafeAreaView>
      <StatusBar></StatusBar>
      <View className='flex flex-row justify-between px-4 py-2'>
        <Pressable onPress={() => {
          navigation.goBack()
        }}>
          <AntDesign name='home' size={32}></AntDesign>
        </Pressable>
        <Pressable onPress={() => {
          navigation.navigate("ProfileSetup" as never)
        }}>
          <AntDesign name='setting' size={32}></AntDesign>
        </Pressable>
      </View>
      <View className='flex flex-col px-10'>
        <View className='flex flex-col items-center border-b border-solid border-gray-300'>
          <Text className='font-poppins_semibold text-xl'>
            {currentUser?.displayName}
          </Text>
          <View className='my-4 '>
            {/* @ts-ignore */}
            <Image source={profile?.profileImage ? profile.profileImage : image} className='h-52 aspect-square rounded-full shadow-lg'></Image>
          </View>
          {/* @ts-ignore */}
          <Typography label={`User ID: ${profile?.id}`} className='mb-8 text-xl' />
        </View>
        <View className='flex flex-col items-center mt-8'>
          <Typography label={`Scan to Pay ${currentUser?.displayName}`} className=' text-red-400 text-xl' />
          <View className='my-4 rounded-xl'>
            {/* @ts-ignore */}
            <Image source={profile?.qrImage ? profile.qrImage : qr} className='h-64 aspect-square rounded-2xl'>
            </Image>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )

}

export default Profile