import MoneyCard from '@/components/ui/MoneyCard'
import TitleBar from '@/components/ui/TitleBar'
import TransactionCard from '@/components/ui/TransactionCard'
import { Typography } from '@/components/ui/Typography'
import { group, person, useGroupCtx } from '@/context/GroupContext'
import ScreenWrapper from '@/layout/SafreAreaInsets'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { FlatList, Text, View } from 'react-native'

const GroupConclusion = (props: NativeStackScreenProps<{
  group: group
}>) => {
  const [groups, _] = useGroupCtx();
  //@ts-ignore
  const group = props.route.params.group as group

  if (group === undefined) {
    return <Text>No Group Passed</Text>
  }

  const totalPerPerson = group.people.reduce((acc, person) => acc + Number(person.total), 0) / group.people.length;

  type personAndPercent = {
    person: person,
    percent: number
  }

  let overPayers: personAndPercent[] = [];
  let underPayers: personAndPercent[] = [];
  let totalOverpayed = 0;
  group.people.forEach(person => {
    if (Number(person.total) > totalPerPerson) {
      overPayers.push({ person, percent: 0 })
      totalOverpayed += (Number(person.total) - totalPerPerson)
    } else {
      underPayers.push({ person, percent: 0 })
    }
  })


  overPayers = overPayers.map(person => {
    person.percent = (Number(person.person.total) - totalPerPerson) / totalOverpayed
    return person
  })
  underPayers = underPayers.map(person => {
    person.percent = (totalPerPerson - Number(person.person.total)) / totalOverpayed
    return person
  })
  overPayers.sort((a, b) => b.percent - a.percent)
  underPayers.sort((a, b) => b.percent - a.percent)

  type transaction = {
    from: person,
    to: person,
    total: number
  }

  let transactions: transaction[] = []


  while (underPayers[0] && overPayers[0]) {
    const from = underPayers[0].person;
    const to = overPayers[0].person;
    const toPayPercent = Math.min(underPayers[0].percent, overPayers[0].percent)
    const total = toPayPercent * totalOverpayed;

    if (toPayPercent === underPayers[0].percent) {
      underPayers.shift()
    } else {
      underPayers[0].percent -= toPayPercent;
    }
    if (toPayPercent === overPayers[0].percent) {
      overPayers.shift()
    } else {
      overPayers[0].percent -= toPayPercent;
    }
    transactions.push({ from, to, total })
    console.log(transactions)
  }

  // underPayers.forEach(underPayer => {
  //   const from = underPayer.person;
  //   const to = overPayers[0].person;
  //   const toPayPercent = Math.min(underPayer.percent, overPayers[0].percent)
  //   const total = toPayPercent * totalOverpayed;
  //   transactions.push({ from, to, total })
  // })



  console.log(transactions)
  // console.log(overPayers, underPayers);
  return (
    <ScreenWrapper>
      <TitleBar back image='person.png' title={group.name} />
      <View>
        <View>
          <MoneyCard group total={
            group.people.reduce((acc, person) => acc + Number(person.total), 0)
          } />
          <Typography variant={"p"} className='font-bold text-textDark text-lg my-2' label='All transactions' />
          <View className='flex h-auto  justify-between'>
            <FlatList
              data={transactions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                return <TransactionCard personFrom={item.from.name} personTo={item.to.name} total={item.total.toFixed(3).toString()} />
              }}
            >
            </FlatList>



            {/* <TransactionCard personFrom='Ramesh' personTo='Rajesh' total='122' />
            <TransactionCard personFrom='Ashish' personTo='Ganesh' total='301' />
            <TransactionCard personFrom='Amish' personTo='Anamol' total='122' /> */}


          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default GroupConclusion