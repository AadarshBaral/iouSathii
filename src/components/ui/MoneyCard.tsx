import { View, Text } from 'react-native'
import React from 'react'
import { Typography } from './Typography'
import { cn } from '@/utils/cn';
import { ColorSchemeStore } from 'nativewind/dist/style-sheet/color-scheme';

export interface IMoneyCardProps {
    total : string;
    cardDecision : "owe" | "receive";

}
export const strokeColor: Record<string, string> = {
    orange: 'border-[#BF6736]',
    green : "border-[#3E8A61]"
  };

const MoneyCard = ({total, cardDecision}:IMoneyCardProps) => {
const color = cardDecision === 'owe' ? 'orange' : 'green'
  return (
    <View className=" relative my-2 mb-4">
    <View  className={cn(
          "justify-center  w-full h-[170px] bg-[#1E2225] rounded-3xl border-[5px] ",
          strokeColor[color],
        )}>
    <Typography  label={`You ${cardDecision}`} className='text-white mx-6 text-3xl mb-2' />
        <View className='flex flex-row gap-4 mx-2 items-center'>
            <Typography variant={'h3'} label="Rs" className='text-white text-4xl leading-[60px]' />
            <Typography variant={'h3'} label={total} className='text-6xl leading-[70px] text-white ' />
        </View>
        <Typography className='text-gray-400 text-xl absolute right-3 bottom-[32%] translate-y-[-50%]' label="NPR" />
    </View>

</View>
  )
}

export default MoneyCard