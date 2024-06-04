import { EvilIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Typography } from './Typography';
interface ITransactionCardProps {
  personFrom: string;
  personTo: string;
  total: string;

}

const TransactionCard = ({ personFrom, personTo, total }: ITransactionCardProps) => {
  total = total.replace(/\.?0+$/, "")
  return (
    <View className='flex bg-[#DDE2E5]  w-full rounded-lg justify-between items-center flex-row px-4 py-4' >
      <View className='flex flex-row items-center gap-3 '>
        {/* <View className={'w-4 h-4 rounded-full')}></View> */}
        <Typography variant={"h2"} className='font-bold text-xl' label={personFrom} />
      </View>
      <View className='flex flex-row-reverse  items-center justify-center' >
        <EvilIcons name="arrow-right" size={32} color="green" />
        <Typography className='text-xl' label={total} />
      </View>
      <Typography variant={"h2"} className='font-bold text-xl' label={personTo} />
    </View>
  )
}
export default TransactionCard