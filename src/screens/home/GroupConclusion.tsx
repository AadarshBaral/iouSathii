import { View, Text } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/layout/SafreAreaInsets'
import TitleBar from '@/components/ui/TitleBar'
import { useGroupCtx } from '@/context/GroupContext'
import { Typography } from '@/components/ui/Typography'
import MoneyCard from '@/components/ui/MoneyCard'
import TransactionCard from '@/components/ui/TransactionCard'

const GroupConclusion = () => {
    const [groups, _] = useGroupCtx();

    // console.log(groups[1].people)
  return (
    <ScreenWrapper>
        <TitleBar back image='person.png' title="Sikkim Travel" />
      <View>
        <View>
            <MoneyCard group total={123213} />
            <Typography variant={"p"} className='font-bold text-textDark text-lg my-2' label='All transactions' />
            <View className='flex h-auto  justify-between'>
                <TransactionCard personFrom='Ramesh' personTo='Rajesh' total='122'/>
                <TransactionCard personFrom='Ashish' personTo='Ganesh' total='301'/>
                <TransactionCard personFrom='Amish' personTo='Anamol' total='122'/>


            </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default GroupConclusion