import { Typography } from '@/components/ui/Typography'
import React from 'react'
import { View } from 'react-native'


const GroupCard = ({ name }: { name: string }) => {
  return (
    <View className='bg-[#cfd5d8] rounded-2xl flex justify-center items-center h-[70px]'>
      <Typography variant={"h2"} className=' text-lg ' label={name} />
    </View>
  )
}

export default GroupCard