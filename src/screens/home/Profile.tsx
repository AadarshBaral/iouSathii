import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Typography } from '@/components/ui/Typography'
import { Image } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@/components/ui/Button'
import ScreenWrapper from '@/layout/SafreAreaInsets'
import TitleBar from '@/components/ui/TitleBar'
import { useNavigation, useRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { firebase } from '@react-native-firebase/auth'
import { FireAuth, db } from '@/config/fireConfig'
import { User, signOut } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AntDesign } from '@expo/vector-icons';
import { Firestore, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import TabBar from '@/components/ui/TabBar'
const image = require("../../../assets/splash.png")
const qr = require("../../../assets/splash.png")
const Profile = () => {
  const auth = FireAuth;
  //@ts-ignore
  const currentUser: User | null = auth.currentUser;
  console.log(currentUser?.displayName)
  const [user, setUser] = useState<any>(null)
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
  const handleSignOut = () => {
    signOut(auth).then(() => {
      AsyncStorage.removeItem('onboarding')
      console.log("signout success")
    }).catch((error) => {
      console.log("Error")
    });
  }
  return (
    <ScreenWrapper>

      <View className='h-full flex items-center justify-center'>
        <View className='absolute top-0 left-0 flex flex-row w-full justify-between'>
          <Text onPress={() => navigation.goBack()} ><Ionicons name="arrow-back" size={32} color="black" /></Text>
          <MaterialIcons onPress={handleSignOut} className=' ' name="logout" size={32} color="#E6404A" />
        </View>
        <View className='flex flex-row items-center gap-4 '>
          <Typography variant={"h2"} className='text-textDark text-2xl ' label={currentUser ? currentUser.displayName as string : "Aadarsh"} />
          <AntDesign onPress={() => { navigation.navigate("Search" as never) }} name="search1" size={32} color="black" />
        </View>
        <View className='h-44 w-44 bg-slate-400 rounded-full my-2 shadow-lg'>
          <Image source={image} className='h-full w-full  object-cover rounded-full ' />
        </View>
        <Typography variant={"md"} className='text-slate-600 text-xl ' label={currentUser?.uid as string } />
        <View className='flex items-center m-3'>
          <Typography variant={"h2"} className='text-[#E6404A] text-4xl ' label={String(followers.followers)} />
          <Typography variant={"p"} className=' text-xl' label='Folowers' />
        </View>
        <Button onPressIn={handleFollow} className={`${followers.isfollowed ? "bg-[#ccc]" : 'bg-[#E6404A]'} w-48 h-12 mb-2`}  ><Typography className='text-white text-center text-xl ' variant={'md'} label={followers.isfollowed ? "Unfollow" : "Follow"} /></Button>
        <View className='h-[2px] w-full bg-[#DADADA]'></View>
        <View className='flex items-center p-2 m-2'>
          <Typography variant={"md"} className=' text-xl' label='Pay Aadarsh' />
          <View className='h-52 w-52 bg-slate-400 rounded-md m-3 shadow-sm'>
            <Image source={qr} className=" h-full w-full rounded-md" />
          </View>
          <Typography variant={"p"} className=' text-xl text-slate-500' label='Scan the QR code to pay' />
        </View>
      {/* <TabBar/> */}
      </View>
    </ScreenWrapper>
  )
}

export default Profile