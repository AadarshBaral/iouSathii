import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Input from '@/components/ui/Input'
import { useForm } from 'react-hook-form';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import TitleBar from '@/components/ui/TitleBar';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { FireAuth, db } from '@/config/fireConfig';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
const Search = () => {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();
  const [user, setUser] = useState<any>(null)
  const profilesRef = collection(db, 'profiles')
  const auth = FireAuth;
  const onSearch = async (data: any) => {
    // console.log(data)
    // const dt =await  getDocs(profilesRef);
    // dt.forEach((doc) => {
    //     console.log(doc.data())
    // })
    const q = query(profilesRef, where("id", "==", data.search))
    const userData = await getDocs(q)

    if (userData.empty) {
      console.log('No matching documents.');
      return;
    }

    else {
      console.log("SEaching")
      console.log(userData.docs[0].data())
      //@ts-ignore
      navigation.navigate("addBill" , { data: userData.docs[0].data(), cameFrom: 'Search' })
      setUser(userData.docs[0].data());
    }
  }
  return (
    <SafeAreaView className='p-6'>
      <TitleBar back image='123' title="Search" />
      <View>
        <Input
          control={control}
          name="search"
          label="Enter user's id"
          placeholder="Search"
        />
        <Button className='mt-2' onPress={handleSubmit(onSearch)} ><Typography className='text-white text-xl' label="Search" /></Button>

        <View>
          {user ? (<View>
            <Typography label={`Name: ${user?.username}`} />
          </View>) : (<Typography label="No user found" />)}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Search