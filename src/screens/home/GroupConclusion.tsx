import MoneyCard from '@/components/ui/MoneyCard'
import TitleBar from '@/components/ui/TitleBar'
import TransactionCard from '@/components/ui/TransactionCard'
import { useBillsContext } from '@/context/BillsContext'
import { group, person, useGroupCtx } from '@/context/GroupContext'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


// function NewTransactionCard({ personFrom, personTo, total, className }: { personFrom: string, personTo: string, total: string, className?: string }) {
//   total = total.replace(/\.?0+$/, "")

//   return (
//     <View className={twMerge("rounded-lg  bg-[#dde2e5] flex flex-row justify-between mx-4 my-2 px-4 items-center", className)}>
//       <Text className='text-xl font-poppins_regular'>
//         {personFrom}
//       </Text>
//       <View className='py-2 flex flex-row'>
//         <View className='flex items-center h-full w-32 bg-[#95ff93] border-y-2 border-l-2 border-r-0 border-white'>
//           <Text className='text-xl font-poppins_regular px-4'>{total}</Text>
//         </View>
//         <View style={
//           {
//             width: 0,
//             height: 0,
//             backgroundColor: "transparent",
//             borderStyle: "solid",
//             borderLeftWidth: 20,
//             borderRightWidth: 20,
//             borderBottomWidth: 30,
//             borderLeftColor: "green",
//             borderRightColor: "blue",
//             borderBottomColor: "red",
//             transform: [{ rotate: "90deg" }],
//           }
//         } className='w-4 bg-[#95ff93]'></View>
//       </View>
//       <Text className='text-xl font-poppins_regular'>
//         {personTo}
//       </Text>
//     </View>
//   )
// }



const GroupConclusion = (props: NativeStackScreenProps<{
  group: group
}>) => {
  const { navigation } = props
  const [groups, _] = useGroupCtx();
  //@ts-ignore
  const group = props.route.params.group as group
  const { profile } = useBillsContext();
  if (group === undefined) {
    return <Text>No Group Passed</Text>
  }
  const total = group.people.reduce((acc, person) => acc + Number(person.total), 0);
  const totalPerPerson = total / group.people.length;

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
    // console.log(transactions)
  }

  // console.log(transactions)

  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView>
        <View className='m-2'>
          <TitleBar home image='person.jpg' title={group.name} />
        </View>
        <View className='mt-4'>
          <View className='px-4'>
            <MoneyCard total={Number(total.toFixed(2))} group={true}>
            </MoneyCard>
          </View>
        </View>
        <View className='flex flex-col px-4'>
          <Text className='text-xl font-poppins_medium'>
            All Transactions
          </Text>
          <FlatList
            data={transactions}
            keyExtractor={(item, index) => index.toString()}
            className='mt-4'
            renderItem={({ item }) => {
              return <View className='my-2'>
                <TransactionCard personFrom={item.from.name} personTo={item.to.name} total={item.total.toFixed(2)} />
              </View>
            }}
          />
        </View>
        <View className='flex flex-col px-4 mt-4'>
          <Text className='text-xl font-poppins_semibold'>
            Details
          </Text>
          <FlatList
            data={group.people}
            className='mt-2 px-2'
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return <View className='flex flex-row justify-between items-center my-2 bg-[#f5f5f5] p-5 rounded-lg border border-[#DBDBDB]'>
                <Text className='font-poppins_regular text-lg'>
                  {item.name}
                </Text>
                <Text className=' text-md text-[#505C6E]'>
                  Rs {item.total}
                </Text>
              </View>
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default GroupConclusion