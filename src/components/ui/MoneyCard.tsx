import { cn } from '@/utils/cn';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, View } from 'react-native';
import { Typography } from './Typography';
export interface IMoneyCardProps {
  total: number;
  // cardDecision : "owe" | "receive";
  group?: boolean;
}
export const strokeColor: Record<string, string> = {
  orange: 'border-[#BF6736]',
  green: "border-[#3E8A61]",
  gray: "border-[#ccc]"
};

const MoneyCard = ({ total, group }: IMoneyCardProps) => {
  const navigation = useNavigation();
  return (
    <View className="  my-2 mb-4">
      <View className={cn(
        "justify-center  w-full h-[170px] bg-[#1E2225] rounded-3xl border-[5px] relative",
        !group ? strokeColor[total !== 0 ? total > 0 ? "green" : "orange" : "green"] : "border-[#e2e2e2]"
      )}>
        {!group && <Pressable onPress={() => navigation.navigate('addBill' as never)} className='absolute  top-4 right-3 z-[20]' >
          <View className=' z-20 w-[40px] h-[40px] rounded-full flex justify-center items-center '>
            <AntDesign name="plus" size={42} color="white" />
          </View>
        </Pressable>}
        {!group ? <Typography label={`You ${total > 0 ? "get" : "owe"}`} className='text-white mx-6 text-3xl mb-2' /> : (<Typography label={`Total Spent`} className='text-white mx-6 text-3xl mb-2' />)}
        <View className='flex flex-row gap-4 mx-2 items-center'>

          <Typography variant={'h3'} label="Rs" className='text-white text-4xl leading-[60px]' />
          <Typography style={{ fontFamily: 'Poppins_600SemiBold' }} label={Math.abs(total) + ''} className='text-6xl leading-[70px] text-white ' />
        </View>
      </View>
    </View>
  )
}

export default MoneyCard