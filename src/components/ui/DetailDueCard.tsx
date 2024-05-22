import { View, Text } from 'react-native'
import React from 'react'
import { Typography } from '@/components/ui/Typography'
import { AntDesign } from '@expo/vector-icons';
import { IdueCardProps } from '@/screens/home/DueCard';
import { cn } from '@/utils/cn';




export const indicatorColor: Record<string, string> = {
  orange: 'border-orange',
  green: "border-green-500"
};

const DetailDueCard = ({ name, purpose, total, cardDecision}: IdueCardProps) => {
  const color = cardDecision === 'owe' ? 'orange' : 'green'
  return (
    <>
      <View  className={cn( indicatorColor[color],`bg-[#ebebeb] w-full h-[100px] rounded-xl flex flex-cols p-3 justify-between border-2 relative`)}>
        <View>
          <Typography variant={'h3'} label={name as string} className='text-xl ' />
          <Typography label={name as string} className='text-xm text-gray-700' />
        </View>

        <Typography variant={'h2'} label='Rs 20000' className='text-sm  text-gray-700' />
      </View>
      <View className='flex flex-row gap-3 absolute right-0 bottom-5 mb-2 mr-2 rounded-md '>
        <View className=' p-2 rounded-md' >
          <AntDesign name="checkcircle" size={22} color="green" />
        </View>
        <View className=' p-2 rounded-md'>

          <AntDesign name="delete" size={22} color="red" />
        </View>
      </View></>
  )
}

export default DetailDueCard