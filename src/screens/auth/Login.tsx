// 1060811855340-u3blp7to0l0ekni5svo5khgji5ufvavs.apps.googleusercontent.com

import { set, useForm } from "react-hook-form"
import { View, Text, ScrollView, TextInput, ActivityIndicator, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import PageTitle from "@/components/ui/PageTitle"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button } from "@/components/ui/Button"
import { Typography } from "@/components/ui/Typography"
import Input from "@/components/ui/Input"
import { useNavigation } from "@react-navigation/native"
import { AntDesign } from '@expo/vector-icons';
import { FireAuth } from "@/config/fireConfig"
import { signInWithEmailAndPassword } from "firebase/auth"
import { zodResolver } from '@hookform/resolvers/zod'
import {z} from 'zod'
const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' })
})

type formFields = z.infer<typeof schema>

const Login = () => {
    const auth = FireAuth
    const [isLoading, setLoading] = useState(false)
    const { control, handleSubmit,setError, formState: { errors ,} } = useForm({resolver: zodResolver(schema)})
    const handleRegister = async (data:any) => {
        setLoading(true)
        const { email, password } = data
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log('Login Success', response)
        } catch (e) {
            setError('email', {message: "Invalid Credentials"})
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
                        <Input
                            label="Email"
                            control={control}
                            name="email"
                            enterKeyHint="next"
                            autoCorrect={false}
                            error = {errors?.email?.message as string}
                        />
                        {errors.email && <Typography label={errors.email.message as string} className="text-red-500" variant={'p'} />}
                        <Input
                            label="Password"
                            secureTextEntry={true}
                            control={control}
                            name="password"
                            ref={passwordRef}
                            error = {errors?.password?.message as string}
                            enterKeyHint="done"
                        />

                        {errors.password && <Typography label={errors.password.message as string} className="text-red-500" variant={'p'} />}
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

                    <Button disabled={isLoading} onPress={()=>{console.log('in Progress')}} className="mt-4 flex flex-row justify-center" variant="primary" size="default">
                        <AntDesign className="text-center" name="google" size={28} color="white" />
                        <Typography label="Login With Google" className="text-white ml-2 text-lg text-center" variant={'p'} />
                    </Button>
                </View>

            </SafeAreaView>
        </ScrollView >
    )
}
export default Login