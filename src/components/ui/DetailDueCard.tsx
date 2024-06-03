import { Typography } from '@/components/ui/Typography';
import { db } from '@/config/fireConfig';
import { IdueCardProps } from '@/screens/home/DueCard';
import { cn } from '@/utils/cn';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
import { Alert, Pressable, View } from 'react-native';

export const indicatorColor: Record<string, string> = {
  orange: 'text-orange',
  green: "text-green-500"
};
const DetailDueCard = ({ name, purpose, total, cardDecision, onDelete, id }: IdueCardProps) => {
  const navigation = useNavigation();
  const color = cardDecision === 'owe' ? 'orange' : 'green'
  const deleteBill = async (id: string) => {

    console.log("Delete press")
    const billsCollection = collection(db, "billRecords");
    const billIdQuery = query(billsCollection, where("billId", "==", id));
    getDocs(billIdQuery)
      .then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          // Document reference
          const docRef = doc(db, "billRecords", document.id);
          // Delete the document
          Alert.alert("Delete", "Are you sure you want to delete this bill?", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "OK", onPress: () => {
                deleteDoc(docRef)
                  .then(() => {
                    console.log(`Document with ID ${document.id} deleted successfully`);
                    navigation.navigate("Home" as never)
                  })
                  .catch((error) => {
                    console.error("Error deleting document: ", error);
                  });
              }
            }
          ]);


        });
      })
      .catch((error) => {
        console.error("Error finding documents: ", error);
      });
  }
  return (
    <>
      <View className='bg-[#ebebeb] w-full h-[100px] rounded-xl flex flex-cols p-3 justify-between border-2 relative border-[#DBDBDB]'>
        {/* <Text className='absolute top-4 right-3'>
          <Entypo className='' name="chevron-small-down" size={24} color="#565656" />
        </Text> */}
        <View>
          <Typography style={{ fontFamily: "Poppins_500Medium" }} variant={'h3'} label={purpose as string} className='text-xl ' />
          {/* <Typography label={purpose as string} className='text-xm text-gray-700' /> */}
        </View>
        <Typography variant={'h2'} label={`Rs ${total}`} className={cn(indicatorColor[color])} />
      </View>
      <View className='flex flex-row gap-3 absolute right-0 bottom-4 mb-0 mr-4 rounded-md '>
        <Pressable onPress={() => deleteBill(id as string)}>
          <View className=' p-2 rounded-md bg-[#ffab9f]' >
            <AntDesign name="delete" size={20} color="red" />
          </View>
        </Pressable>
      </View></>
  )
}

export default DetailDueCard