import { Button } from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import PageTitle from "@/components/ui/PageTitle"
import { Typography } from "@/components/ui/Typography"
import { FireAuth, db } from "@/config/fireConfig"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from "react-hook-form"
import { ActivityIndicator, TextInput, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"
// const vect2 = require("../../../../assets/Vector2.svg")
import { zodResolver } from "@hookform/resolvers/zod"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Toast from "react-native-toast-message"
import { z } from 'zod'
const userSchema = z.object({
    username: z.string()
        .min(6, { message: "Atlest 6 characters" }), // Ensures username is a string and at least 6 characters long.

    email: z.string()
        .email({ message: "Invalid email format" }), // Validates that the string is a valid email.

    password: z.string()
        .min(6, { message: "Atleast 6 characters long" }), // Validates minimum length for the password.
});
type formFields = z.infer<typeof userSchema>

export const generateAlphanumeric = (length = 8) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const Register = () => {
    const auth = FireAuth;
    const [isLoading, setLoading] = useState(false)
    const profileRef = collection(db, 'profiles');



    const { control, handleSubmit, setError, formState: { errors } } = useForm({ resolver: zodResolver(userSchema) })
    const handleRegister = async (data: any) => {
        const { email, password, username } = data
        setLoading(true)
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            //@ts-ignore
            updateProfile(auth.currentUser, {
                displayName: username,
            }).then(() => {
                addDoc(profileRef, {
                    id: generateAlphanumeric(),
                    username: username,
                    userId: response.user.uid,
                    email: email,
                    bio: 'No bio yet',
                    qrImage: "",
                    profileImage: "",
                    createdAt: serverTimestamp()
                })
                console.log("Profile Updated")
            }).catch((error) => {
                console.log("An error occoured", error)
            });
            Toast.show({
                type: 'success',
                text1: 'Registration Success🎉',
            });
        } catch (e) {
            setError('email', { message: "Email already exists" })
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
        <KeyboardAwareScrollView className="h-full relative p-0 ">
            <SafeAreaView className="p-6 mt-10 h-screen flex flex-col">
                <View className="flex flex-col gap-y-20">
                    <View className="">
                        <PageTitle className="" label="Register " />
                    </View>
                    <View className="flex flex-col pt">
                        <Input
                            label="Username"
                            control={control}
                            name="username"
                            enterKeyHint="next"
                            error={errors?.username?.message as string}
                        />
                        {errors.username && <Typography label={errors.username.message as string} className="text-red-500" variant={'p'} />}
                        <Input
                            label="Email"
                            autoCorrect={false}
                            control={control}
                            name="email"
                            enterKeyHint="next"
                            ref={emailRef}
                            error={errors?.email?.message as string}

                        />
                        {errors.email && <Typography label={errors.email.message as string} className="text-red-500" variant={'p'} />}
                        <Input
                            label="Password"
                            secureTextEntry={true}
                            control={control}
                            name="password"
                            enterKeyHint="next"
                            ref={passwordRef}
                            error={errors?.password?.message as string}
                        />
                        {errors.password && <Typography label={errors.password.message as string} className="text-red-500" variant={'p'} />}
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
        </KeyboardAwareScrollView>
    )
}

export default Register