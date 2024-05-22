import { View, Text } from 'react-native'
import React from 'react'
import { Typography } from '@/components/ui/Typography'
import { IMoneyCardProps } from '@/components/ui/MoneyCard'
import { cn } from '@/utils/cn'
export interface IdueCardProps extends IMoneyCardProps {
    name: string;
    purpose? :string;
}
export const indicatorColor: Record<string, string> = {
    orange: 'bg-[#BF6736]',
    green : "bg-[#3E8A61]"
  };
const DueCard = ({name,total, cardDecision}:IdueCardProps) => {
    const color = cardDecision === 'owe' ? 'orange' : 'green'
    return (
        <View className='flex bg-[#DDE2E5] h-[70px] w-full rounded-2xl  padding-2 justify-between items-center flex-row p-4' >
            <View className='flex flex-row items-center gap-3 '>
                <View className={cn(indicatorColor[color],'w-4 h-4 rounded-full')}></View>
                <Typography variant={"h2"} className='font-bold text-textDark text-lg' label={name} />
            </View>
            <Typography variant={"h2"} className='font-bold' label={`Rs ${total}`}/>
        </View>
    )
}

export default DueCard