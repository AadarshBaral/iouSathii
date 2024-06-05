import { Button } from '@/components/ui/Button';
import Input2 from '@/components/ui/InputWithBorder';
import TitleBar from '@/components/ui/TitleBar';
import { Typography } from '@/components/ui/Typography';
import { db } from '@/config/fireConfig';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// const schema = z.object({
//   search: z.string().min(8, { message: 'At least 8 characters.' })
// })
const img = require(`../../../assets/person.jpg`)
const Search = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors, }, setError } = useForm(

  );
  const [user, setUser] = useState<any>(null)
  const profilesRef = collection(db, 'profiles')
  const [loading, setLoading] = useState(false)
  const [profileImage, setProfileImage] = useState('')
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
      setProfileImage(userData.docs[0].data().profileImage)
      setLoading(false)
    }
  }
  const handleSearch = () => {
    //@ts-ignore
    navigation.navigate("addBill", { data: user, cameFrom: 'Search' })
  }
  // console.log(user.profileImage)
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
            <Typography label='User Found' className='text-[#0FB900] my-2' />
            <View className=' rounded-full shadow-sm flex  flex-row gap-3 items-center'>
              <Image source={profileImage !== "" ? profileImage : img} className='h-20 w-20 object-cover rounded-full' />
              <View>
                <Typography className='text-[#00256E] text-xl' label={user?.username} />
                <Typography className='text-[#7D7D7D]' label={user?.id} />
              </View>
            </View>
            <Button onPress={handleSearch} className='mt-6 '><Typography className='text-xl text-white' label='Continue' /></Button>
          </View>

          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Search