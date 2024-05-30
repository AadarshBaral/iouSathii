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
import Input2 from '@/components/ui/InputWithBorder';
import { ActivityIndicator } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
const schema = z.object({
  search: z.string().min(8, { message: 'Atleast 8 characters.' })
})
const img = require(`../../../assets/person.jpg`)
const Search = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors, }, setError } = useForm(
    { resolver: zodResolver(schema) }
  );
  const [user, setUser] = useState<any>(null)
  const profilesRef = collection(db, 'profiles')
  const [loading, setLoading] = useState(false)
  const onSearch = async (data: any) => {
    setLoading(true)
    const q = query(profilesRef, where("id", "==", data.search))
    const userData = await getDocs(q)
    if (userData.empty) {
      setError('search', { message: "No user found with this id" })
      setLoading(false)
      return;
    }
    else {
      setUser(userData.docs[0].data());
      setLoading(false)
    }
  }
  const handleSearch=()=>{
     //@ts-ignore
    navigation.navigate("addBill", { data: user, cameFrom: 'Search' })
  }
  return (
    <SafeAreaView className='p-6'>
      <TitleBar back image='123' title="Search" />
      <View>
        <View className='flex flex-row items-center gap-2 relative '>
          <View className='w-[70%]'>
            <Input2
              border='default'
              className=''
              label="Enter Person Id"
              control={control}
              name="search"
              enterKeyHint="next"
              onChangeText={()=>{setUser(null)}}
              autoCorrect={false}
            />
          </View>
          <View className='w-[26%]'>
            <Button onPress={handleSubmit(onSearch)} className='mt-8'>
              {loading ? <ActivityIndicator color="#ccc" size='large' /> : <Text className='text-xl text-white text-center'>OK</Text>}
            </Button>
          </View>
        </View>
        {errors.search && <Typography label={errors.search.message as string} className="text-red-500" variant={'p'} />}
        <View>
          {user && (<View>
            <Typography label='User Found' className='text-[#0FB900] my-2'/>
            <View className=' rounded-full shadow-sm flex  flex-row gap-3 items-center'>
            <Image source={img} className='h-20 w-20  object-cover rounded-full' />
            <View>
              <Typography className='text-[#00256E] text-xl' label={user?.username} />
              <Typography className='text-[#7D7D7D]' label={user?.id} />
            </View>
          </View>
          <Button onPress={handleSearch} className='mt-6 '><Typography className='text-xl text-white' label='Continue'/></Button>
          </View>

        )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Search