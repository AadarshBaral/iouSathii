import { View, Text } from 'react-native'
import React from 'react'
import { Typography } from '@/components/ui/Typography'
import { AntDesign } from '@expo/vector-icons';
import { IdueCardProps } from '@/screens/home/DueCard';
import { cn } from '@/utils/cn';
import { Entypo } from '@expo/vector-icons';

export const indicatorColor: Record<string, string> = {
  orange: 'text-orange',
  green: "text-green-500"
};
const DetailDueCard = ({ name, purpose, total, cardDecision }: IdueCardProps) => {
  const color = cardDecision === 'owe' ? 'orange' : 'green'
  return (
    <>
      <View className='bg-[#ebebeb] w-full h-[100px] rounded-xl flex flex-cols p-3 justify-between border-2 relative border-[#DBDBDB]'>
        <Text className='absolute top-4 right-3'>
          <Entypo className='' name="chevron-small-down" size={24} color="#565656" />
        </Text>
        <View>
          <Typography variant={'h3'} label={name as string} className='text-xl ' />
          <Typography label={name as string} className='text-xm text-gray-700' />
        </View>
        <Typography variant={'h2'} label={`Rs ${total}`} className={cn(indicatorColor[color])} />
      </View>
      <View className='flex flex-row gap-3 absolute right-0 bottom-5 mb-2 mr-2 rounded-md '>
        <View className=' p-1 rounded-md bg-[#d2f5ca]' >
          <AntDesign name="check" size={20} color="black" />
        </View>
      </View></>
  )
}

export default DetailDueCard