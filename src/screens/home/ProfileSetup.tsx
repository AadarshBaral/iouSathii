import { useEffect, useState } from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import TitleBar from "@/components/ui/TitleBar";
import * as ImagePicker from 'expo-image-picker';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { FireAuth, db } from "@/config/fireConfig";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import ProgressBar from "@/components/ui/Progress";
import Toast from "react-native-toast-message";

export default function ProfileSetup() {
    const [permission, requestPermission] = ImagePicker.useCameraPermissions();
    const [profileImage, setProfileImage] = useState(null);
    const [qrImage, setQrImage] = useState(null);
    const auth = FireAuth;
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

    const handleImagePick = async (field: string) => {
        if (permission?.status !== 'granted') {
            alert('Camera roll access is required to select photos.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
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
        <SafeAreaView>
            <View className="flex flex-col gap-y-6 mt-4 mx-4 font-poppins_regular">
                {permission?.status !== ImagePicker.PermissionStatus.GRANTED && (

                    <View >
                        <Text>Permission Not Granted - {permission?.status}</Text>
                        <StatusBar />
                        <Button onPress={requestPermission}><Typography label="Permission" /></Button>
                    </View>
                )
                }
                <TitleBar back image="person.img" title="Profile Setup" />
                <View className="flex flex-col gap-y-2 ">
                    {/* <Text className="text-bgPrimary text-4xl">Let's setup Your</Text> */}
                    {/* <Text className="text-bgPrimary text-4xl">Profile</Text> */}
                </View>
                {uploading.state && <View className="absolute top-0 z-10 left-[50%] translate-x-[-150px]" >
                    <ProgressBar progress={uploading.value} />
                </View>}
                <Pressable onPress={() => { handleImagePick("profile") }}>
                    <View className="flex flex-col  items-center">
                        <Typography variant={'h3'} className="text-xl  pb-4" label="Click to add a profile picture" />
                        <View className="bg-gray-500 h-40 w-40 rounded-full flex flex-row justify-center items-center">
                            <AntDesign style={{
                            }} name="camerao" size={54} color="white" />
                        </View>
                    </View>
                </Pressable>
                <Pressable onPress={() => handleImagePick("qr")}>
                    <View className="flex flex-col gap-y-10 items-center">
                        <Typography variant={'h3'} className="text-xl " label="Add a qr to receive payments" />
                        <View className="bg-gray-500 p-12 rounded-lg ">
                            <AntDesign style={{
                            }} name="qrcode" size={54} color="white" />
                        </View>
                    </View>
                </Pressable>
                <View>
                    <Button className="mt-20"><Typography className="text-white text-xl" label="Setup Profile" /></Button>
                </View>

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