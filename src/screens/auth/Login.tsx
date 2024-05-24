// 1060811855340-u3blp7to0l0ekni5svo5khgji5ufvavs.apps.googleusercontent.com

import { useForm } from "react-hook-form"
import { View, Text, ScrollView, TextInput, ActivityIndicator, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import PageTitle from "@/components/ui/PageTitle"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button } from "@/components/ui/Button"
import { Typography } from "@/components/ui/Typography"
import InputWithEye from "@/components/ui/InputWithEye"
import { useNavigation } from "@react-navigation/native"
import { AntDesign } from '@expo/vector-icons';
import { FireAuth } from "@/config/fireConfig"
import { signInWithEmailAndPassword } from "firebase/auth"

const Login = () => {
    const auth = FireAuth
    const [isLoading, setLoading] = useState(false)
    const { control, handleSubmit, formState: { errors } } = useForm()
    const handleRegister = async (data: any) => {
        setLoading(true)
        const { email, password } = data
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log('Login Success', response)
        } catch (e) {
            console.log('Login Failed', e)
        } finally {
            setLoading(false)
        }
    }


    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const passwordRef = useRef<TextInput>(null)
    return (
        <ScrollView className="h-full relative p-0">
            <SafeAreaView className="p-6 mt-10 h-screen flex flex-col ">
                <View className="flex flex-col gap-y-20">
                    <PageTitle className="" label="Login " />
                    <View className="flex flex-col">
                        <InputWithEye
                            label="Email"
                            control={control}
                            name="email"
                            enterKeyHint="next"
                            autoCorrect={false}

                        />
                        <InputWithEye
                            label="Password"
                            secureTextEntry={true}
                            control={control}
                            name="password"
                            ref={passwordRef}
                            enterKeyHint="done"
                        />
                        <Button onPressIn={handleSubmit(handleRegister)} className="mt-4 flex flex-row justify-center items-center" variant="primary" size="default">
                            {isLoading ? <ActivityIndicator color={"#fff"} size={"large"} className="" /> : <Typography label="Login" className="text-white text-xl" variant={'p'} />}
                        </Button>
                    </View>

                </View>
                <View className="flex flex-col gap-4">
                    <View className="flex flex-row justify-center gap-4">
                        <View>
                            <Typography variant={'p'} className="text-lg " label="Don't have an account" />
                        </View>
                        <View>
                            <Typography variant={'p'} onPress={() => navigation.navigate('Register' as never)} className="text-lg text-purple-500 " label="Register" />
                        </View>
                    </View>
                    <View className="flex flex-row justify-center gap-2 items-center px-24">
                        <View className="h-[2px] w-full bg-black" />
                        <Typography variant={'p'} label="Or"></Typography>
                        <View className="h-[2px] w-full bg-black" />
                    </View>

                    <Button onPress={()=>{console.log('in Progress')}} className="mt-4 flex flex-row justify-center" variant="primary" size="default">
                        <AntDesign className="text-center" name="google" size={28} color="white" />
                        <Typography label="Login With Google" className="text-white ml-2 text-lg text-center" variant={'p'} />
                    </Button>
                </View>

            </SafeAreaView>
        </ScrollView >
    )
}
export default Login