import { View } from 'react-native'
import React from 'react'
import { Typography } from './Typography'
import { cn } from '@/utils/cn';
export interface IMoneyCardProps {
  total: number;
  // cardDecision : "owe" | "receive";
  group? :boolean;
}
export const strokeColor: Record<string, string> = {
  orange: 'border-[#BF6736]',
  green: "border-[#3E8A61]",
  gray: "border-[#ccc]"
};
const MoneyCard = ({ total,group }: IMoneyCardProps) => {
  return (
    <View className=" relative my-2 mb-4">
      <View className={cn(
        "justify-center  w-full h-[170px] bg-[#1E2225] rounded-3xl border-[5px] ",
        strokeColor[total !== 0 ? total > 0 ? "green" : "orange" : "green"],
      )}>
       {!group ? <Typography label={`You ${total > 0 ? "get" : "owe"}`} className='text-white mx-6 text-3xl mb-2' /> : ( <Typography label={`Total Spent`} className='text-white mx-6 text-3xl mb-2' />)}
        <View className='flex flex-row gap-4 mx-2 items-center'>
          <Typography variant={'h3'} label="Rs" className='text-white text-4xl leading-[60px]' />
          <Typography variant={'h3'} label={Math.abs(total) + ''} className='text-6xl leading-[70px] text-white ' />
        </View>
        <Typography className='text-gray-400 text-xl absolute right-3 bottom-[32%] translate-y-[-50%]' label="NPR" />
      </View>
    </View>
  )
}

export default MoneyCard