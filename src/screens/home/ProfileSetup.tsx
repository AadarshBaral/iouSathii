import { Button } from "@/components/ui/Button";
import TitleBar from "@/components/ui/TitleBar";
import { Typography } from "@/components/ui/Typography";
import UploadingProgress from "@/components/ui/UploadingProgress";
import { FireAuth, db } from "@/config/fireConfig";
import { useBillsContext } from "@/context/BillsContext";
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { signOut } from "firebase/auth";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { Alert, Dimensions, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { IProfileProps } from "./Profile";
const image = require("../../../assets/person.jpg")
const dimension = Dimensions.get('window');

export default function ProfileSetup() {
    const { profile } = useBillsContext();
    const auth = FireAuth;
    const currentUser: IProfileProps | null = auth.currentUser;
    const [permission, requestPermission] = ImagePicker.useCameraPermissions();
    const [profileImage, setProfileImage] = useState(null);
    const [qrImage, setQrImage] = useState(null);
    const [uploading, setUploading] = useState({
        state: false,
        value: 0,
    });
    useEffect(() => {
        (async () => {
            const { status } = await requestPermission();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []);
    const handleSignOut = async () => {
        Alert.alert('Logging Out', 'Are you sure you want to logout of the app?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: async () => {
                    signOut(auth).then(() => {
                        console.log("signout success")
                    }).catch((error) => {
                        console.log("Error")
                    });
                }
            },
        ]);

    }
    const handleImagePick = async (field: string) => {

        if (permission?.status !== 'granted') {
            alert('Camera roll access is required to select photos.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1,
        });

        if (!result.canceled) {
            const { uri } = result.assets[0];
            const fileName = uri.split("/").pop();
            const fileRef = ref(getStorage(), `images/${fileName}`);
            const response = await fetch(uri);
            const blob = await response.blob();
            const uploadTask = uploadBytesResumable(fileRef, blob);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (progress === 100) {
                        setUploading({ state: false, value: 0 });
                        Toast.show({
                            type: 'success',
                            text1: 'Image updated!🎉',
                        });
                    } else {
                        setUploading({ state: true, value: progress });
                    }

                },
                (error) => {
                    console.error('Upload failed:', error);
                },

                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log("Upload complete, URL:", downloadURL);
                        field === "profile" ? setProfileImage(downloadURL as any) : setQrImage(downloadURL as any);
                        updateProfile(downloadURL, field);
                    });
                }
            );
        }
    };

    const updateProfile = async (imageUrl: string, field: string) => {
        const currentUser = auth.currentUser;
        if (currentUser && currentUser.uid) { // Check if currentUser and currentUser.uid are not undefined
            const profilesCol = collection(db, "profiles");
            const q = query(profilesCol, where("userId", "==", currentUser.uid));
            try {
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    await updateDoc(userDoc.ref, { [field === "profile" ? "profileImage" : "qrImage"]: imageUrl });
                    console.log(`${field === "profile" ? "Profile" : "QR"} image updated with URL:`, imageUrl);

                } else {
                    console.log('No profile found for the user');
                }
            } catch (error) {
                console.error('Failed to update image:', error);
            }
        } else {
            console.log('No user logged in or UID is undefined');
        }
    };
    return (
        <SafeAreaView className="p-4">
            <TitleBar back image="person.img" title="Settings" />
            {uploading.state && <View className="absolute bottom-[-100px] z-10  w-full " >
                <UploadingProgress progress={uploading.value} />
            </View>}
            <View className="flex flex-col gap-y-6  font-poppins_regular">
                {permission?.status !== ImagePicker.PermissionStatus.GRANTED && (
                    <View >
                        <Text>Permission Not Granted - {permission?.status}</Text>
                        <StatusBar />
                        <Button onPress={requestPermission}><Typography label="Grant Permission" className="text-xl text-white" /></Button>
                    </View>
                )
                }

                <View className="flex flex-col gap-y-2 ">
                </View>
                {/* <View className="flex flex-col justify-center items-center  ">

                    <View className='h-52 w-52 aspect-square shadow-lg rounded-full  flex justify-center items-center  gap-4'>

                        {<Image source={profile?.profileImage ? profile?.profileImage : image} className='rounded-full h-full w-full object-cover' />}
                    </View>
                    <Typography className="text-xl mt-8" label={currentUser?.displayName as string} />
                    <View className='h-[2px] mt-10 w-full bg-[#DADADA]'></View>
                </View> */}

                <View className=" flex gap-1">


                    <View className="flex flex-row items-center gap-4">
                        <AntDesign name="user" size={38} color="black" />
                        <Pressable onPress={() => { handleImagePick("profile") }}>
                            <Typography size={'xl'} className="text-lg" label="Change Profile Picture" />
                        </Pressable>
                    </View>

                    <View className="flex flex-row items-center gap-4" >
                        <FontAwesome name="qrcode" size={38} color="black" />
                        <Pressable onPress={() => { handleImagePick("qr") }}>
                            <Typography size={'xl'} className="text-lg" label="Change QR Image" />
                        </Pressable>
                    </View>
                    <View className="flex flex-row items-center gap-4">
                        <MaterialIcons name="logout" size={38} color="#E6404A" />
                        <Pressable onPress={handleSignOut}>
                            <Typography size={'xl'} className="text-lg" label="Logout" />
                        </Pressable>
                    </View>
                </View>
                {/* <Pressable onPress={() => { handleImagePick("profile") }}>
                    <View className="flex flex-col  items-center">
                        <Typography variant={'h3'} className="text-xl  pb-4" label="Click to add a profile picture" />
                        <View className="bg-gray-500 h-40 w-40 rounded-full flex flex-row justify-center items-center">
                            <AntDesign style={{
                            }} name="camerao" size={54} color="white" />
                        </View>
                    </View>
                </Pressable> */}
                {/* <Pressable onPress={() => handleImagePick("qr")}>
                    <View className="flex flex-col gap-y-10 items-center">
                        <Typography variant={'h3'} className="text-xl " label="Add a qr to receive payments" />
                        <View className="bg-gray-500 p-12 rounded-lg ">
                            <AntDesign style={{
                            }} name="qrcode" size={54} color="white" />
                        </View>
                    </View>
                </Pressable> */}
                {/* <View>
                    <Button className="mt-20"><Typography className="text-white text-xl" label="Setup Profile" /></Button>
                </View> */}

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});