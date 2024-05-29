import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import TitleBar from "@/components/ui/TitleBar";
import { useState } from "react";
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import { storage } from "@/config/fireConfig";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function ProfileSetup() {
    const [file,setFile] = useState(null)

    const uploadFile = () =>{
        if ( file == null){
            return
        }

    }

return <SafeAreaView>
        <ScrollView className="flex flex-col gap-y-6 mt-4 mx-4 font-poppins_regular">
          <TitleBar back image="person.img" title="Profile Setup" />
            <View className="flex flex-col gap-y-2 ">
                {/* <Text className="text-bgPrimary text-4xl">Let's setup Your</Text> */}
                {/* <Text className="text-bgPrimary text-4xl">Profile</Text> */}
            </View>
            <View className="flex flex-col  items-center">
                <Typography variant={'h3'} className="text-xl  pb-4" label="Click to add a profile picture"/>
                <View className="bg-gray-500 h-40 w-40 rounded-full flex flex-row justify-center items-center">
                    <AntDesign style={{
                    }} name="camerao" size={54} color="white" />
                </View>
            </View>
            <View className="flex flex-col gap-y-10 items-center">
            <Typography variant={'h3'} className="text-xl " label="Add a qr to receive payments"/>
                <View className="bg-gray-500 p-12 rounded-lg ">
                    <AntDesign style={{
                    }} name="qrcode" size={54} color="white" />
                </View>
            </View>
            <View>
                <Button className="mt-20"><Typography className="text-white text-xl" label="Setup Profile"/></Button>
            </View>
        </ScrollView>
    </SafeAreaView>
}