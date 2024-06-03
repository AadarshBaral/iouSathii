import { Button } from '@/components/ui/Button'
import { Typography } from '@/components/ui/Typography'
import { FireAuth, db } from '@/config/fireConfig'
import { useBillsContext } from '@/context/BillsContext'
import ScreenWrapper from '@/layout/SafreAreaInsets'
import { Feather } from '@expo/vector-icons'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'expo-image'
import { User, signOut } from 'firebase/auth'
import { collection } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
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
    <ScreenWrapper>
      <View className='h-full flex items-center justify-center'>
        <View className='absolute top-0 left-0 flex flex-row w-full justify-between'>
          <Text onPress={() => navigation.goBack()} ><Ionicons name="arrow-back" size={32} color="black" /></Text>
          <View className='flex flex-row items-center gap-4 '>
            <Typography variant={"h2"} className='text-textDark text-2xl ' label={currentUser ? currentUser.displayName as string : "Aadarsh"} />
            {/* <AntDesign onPress={() => { navigation.navigate("Search" as never) }} name="search1" size={32} color="black" /> */}
          </View>
          <View className='flex flex-row gap-3 '>
            <Feather onPress={() => { navigation.navigate("ProfileSetup" as never) }} className='text-[#323232]' name="settings" size={32} color="#323232" />
            <MaterialIcons onPress={handleSignOut} className='' name="logout" size={32} color="#E6404A" />
          </View>
        </View>
        <View className='h-44 w-44 bg-slate-400 rounded-full my-2 mt-10 shadow-lg'>
          {/* @ts-ignorei */}
          {loading ? <ActivityIndicator color={"#4a4a4a"} size={"large"} className="top-20" /> : <Image source={profile.profileImage ? profile?.profileImage : image} className='rounded-full h-full w-full object-cover' />}
        </View>
        {/* <Image source={currentUser?.profileImage}/> */}
        {/* @ts-ignore */}
        <Typography variant={"md"} className='text-slate-600 text-xl ' label={`id: ${profile?.id}`} />
        <View className='flex items-center m-3'>
          <Typography variant={"h2"} className='text-[#E6404A] text-4xl ' label={String(followers.followers)} />
          <Typography variant={"p"} className=' text-xl' label='Folowers' />
        </View>
        <Button onPressIn={handleFollow} className={`${followers.isfollowed ? "bg-[#ccc]" : 'bg-[#E6404A]'} w-48 h-12 mb-2`}  ><Typography className='text-white text-center text-xl ' variant={'md'} label={followers.isfollowed ? "Unfollow" : "Follow"} /></Button>
        <View className='h-[2px] w-full bg-[#DADADA]'></View>
        <View className='flex items-center p-2 m-2 mb-12'>
          <Typography variant={"md"} className=' text-xl' label={currentUser ? "Scan to Pay " + currentUser.displayName as string : "User"} />
          <View className='h-52 w-52 bg-slate-400 rounded-md m-3 shadow-sm'>
            {/* @ts-ignore */}
            {loading ? <ActivityIndicator color={"#4a4a4a"} size={"large"} className="top-20" /> : <Image source={profile ? profile?.qrImage : qr} className='rounded-xl h-full w-full object-cover' />}
          </View>
          {/* <Typography variant={"p"} className=' text-xl text-slate-500' label='Scan the QR code to pay' /> */}
        </View>
        {/* <TabBar/> */}
      </View>
    </ScreenWrapper>
  )
}

export default Profile