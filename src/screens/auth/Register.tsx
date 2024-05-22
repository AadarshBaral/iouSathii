import { useForm } from "react-hook-form"
import { View, Text, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import PageTitle from "@/components/ui/PageTitle"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button } from "@/components/ui/Button"
import { Typography } from "@/components/ui/Typography"
import { Image } from "expo-image"
import InputWithEye from "@/components/ui/InputWithEye"
import { useNavigation } from "@react-navigation/native"
import { FireAuth } from "@/config/fireConfig"
// const vect2 = require("../../../../assets/Vector2.svg")
import { updateProfile } from "firebase/auth"
import { createUserWithEmailAndPassword } from "firebase/auth"
const Register = () => {
    const auth = FireAuth;
    const [isLoading, setLoading] = useState(false)
    const { control, handleSubmit, formState: { errors } } = useForm()
    const handleRegister = async (data: any) => {
        const { email, password, username } = data
        setLoading(true)
        console.log(email, password, username)
        console.log(username)
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            //@ts-ignore
            updateProfile(auth.currentUser, {
                displayName: username,
            }).then(() => {
                console.log("Profile Updated")
            }).catch((error) => {
                console.log("An error occoured", error)
            });
            console.log('Registration Success', response)
        } catch (e) {
            console.log('Registration Failed', e)
        } finally {
            setLoading(false)
        }
    }
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const emailRef = useRef<TextInput>(null)
    const passwordRef = useRef<TextInput>(null)
    return (
        <ScrollView className="h-full relative p-0 ">
            <SafeAreaView className="p-6 mt-10 h-screen flex flex-col">
                <View className="flex flex-col gap-y-20">
                    <PageTitle className="mt-20" label="Register " />
                    <View className="flex flex-col pt">
                        <InputWithEye
                            label="Username"
                            control={control}
                            name="username"
                            enterKeyHint="next"
                        />
                        <InputWithEye
                            label="Email"
                            autoCorrect={false}
                            control={control}
                            name="email"
                            enterKeyHint="next"
                            ref={emailRef}

                        />
                        <InputWithEye
                            label="Password"
                            secureTextEntry={true}
                            control={control}
                            name="password"
                            enterKeyHint="next"
                            ref={passwordRef}

                        />
                        <Button onPressIn={handleSubmit(handleRegister)} className="mt-4 flex flex-row justify-center items-center" variant="primary" size="default">
                            {isLoading ? <ActivityIndicator color={"#fff"} size={"large"} className="" /> : <Typography label="Register" className="text-white text-xl" variant={'p'} />}
                        </Button>
                    </View>
                </View>
                <View className="flex flex-row justify-center mt-10">
                    <View>
                        <Typography variant={'p'} className="text-lg " label="Already have an account? " />
                    </View>
                    <View>
                        <Typography onPress={() => navigation.navigate('Login' as never)} variant={'p'} className="text-lg text-purple-500 " label="Login" />
                    </View>
                </View>

            </SafeAreaView>
        </ScrollView>
    )
}

export default Register