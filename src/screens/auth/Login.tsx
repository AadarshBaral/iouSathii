import { Button } from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import PageTitle from "@/components/ui/PageTitle"
import { Typography } from "@/components/ui/Typography"
import { FireAuth } from "@/config/fireConfig"
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from "@react-navigation/native"
import { signInWithEmailAndPassword } from "firebase/auth"
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from "react-hook-form"
import { ActivityIndicator, TextInput, View } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { SafeAreaView } from "react-native-safe-area-context"
import Toast from 'react-native-toast-message'
import { z } from 'zod'
const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' })
})
const Login = () => {
    const auth = FireAuth
    const [isLoading, setLoading] = useState(false)
    const { control, handleSubmit, setError, formState: { errors, } } = useForm({ resolver: zodResolver(schema) })
    const handleRegister = async (data: any) => {
        setLoading(true)
        const { email, password } = data
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            Toast.show({
                type: 'success',
                text1: 'Login Success🎉',
            });
        } catch (e) {
            setError('email', { message: "Invalid Credentials" })
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
        <KeyboardAwareScrollView className="h-full relative p-0">
            <SafeAreaView className="p-6 mt-10 h-screen flex flex-col ">
                <View className="flex flex-col gap-y-20">
                    <View className="">
                        <PageTitle className="" label="Login" />
                    </View>
                    <View className="flex flex-col">
                        <Input
                            label="Email"
                            control={control}
                            name="email"
                            enterKeyHint="next"
                            autoCorrect={false}
                            error={errors?.email?.message as string}
                        />
                        {errors.email && <Typography label={errors.email.message as string} className="text-red-500" variant={'p'} />}
                        <Input
                            label="Password"
                            secureTextEntry={true}
                            control={control}
                            name="password"
                            ref={passwordRef}
                            error={errors?.password?.message as string}
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
                    {/* <View className="flex flex-row justify-center gap-2 items-center px-24">
                        <View className="h-[2px] w-full bg-black" />
                        <Typography variant={'p'} label="Or"></Typography>
                        <View className="h-[2px] w-full bg-black" />
                    </View> */}

                    {/* <Button disabled={isLoading} onPress={() => { console.log('in Progress') }} className="mt-4 flex flex-row justify-center" variant="primary" size="default">
                        <AntDesign className="text-center" name="google" size={28} color="white" />
                        <Typography label="Login With Google" className="text-white ml-2 text-lg text-center" variant={'p'} />
                    </Button> */}
                </View>

            </SafeAreaView>
        </KeyboardAwareScrollView >
    )
}
export default Login


