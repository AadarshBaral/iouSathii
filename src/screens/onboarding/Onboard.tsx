import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, StatusBar, Text, View } from 'react-native'
import { ImageBackground, Image } from "expo-image";
import { onboardingTabsMap } from "./colorMap";
import { CompositeScreenProps, useNavigation } from "@react-navigation/native";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { Button } from "@/components/ui/Button";
import { AuthScreensParamList, OnboardingTabsParamList } from "@/navigation/BeforeAuth";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackScreenProps } from "@react-navigation/stack";
const onboarding1Img = require("../../../assets/onboard1.png")
const onboarding2Img = require("../../../assets/onboard2.png")
const onboarding3Img = require("../../../assets/onboard3.png")
const onboarding4Img = require("../../../assets/onboard4.png")



type Onboard1Props = CompositeScreenProps<MaterialTopTabScreenProps<OnboardingTabsParamList, 'onboard1'>, StackScreenProps<AuthScreensParamList>>
export function Onboard1(props: Onboard1Props) {
    const { navigation } = props;
    const tabInfo = onboardingTabsMap[0];
    return <SafeAreaView style={
        {
            backgroundColor: tabInfo.bottomColor
        }
    } className="h-full w-screen flex items-center">
        <View style={{
            backgroundColor: tabInfo.topColor
        }} className="h-[60%] w-[150%] rounded-b-full items-center" >
            <View className="w-[66%] justify-center items-center px-4 py-2">
                <View className="w-full flex items-end ">
                    <Pressable onPress={() => {
                        navigation.jumpTo("onboard4", {})
                    }} className="">
                        <Text style={{
                            color: tabInfo.skipColor
                        }} className="text-lg  font-poppins_regular">
                            Skip
                        </Text>
                    </Pressable>
                </View>
                <Image source={onboarding1Img} contentFit="cover" className="w-[100%] aspect-square"></Image>
            </View>
        </View>
        <View className="mt-8 px-4">
            <Text style={{
                color: tabInfo.topColor
            }} className="text-3xl text-center font-poppins_semibold">
                Record the people you owe money to
            </Text>
            <View className="mx-8 mt-4">
                <Text className="text-xl  text-center text-[#a2b2b2] font-poppins_semibold">
                    (Or yourself if you owe them)
                </Text>
            </View>
        </View>
        <View className="absolute top-[92%] flex w-full px-10 mt-5 h-full">
            <Button style={
                {
                    bottom: 20,
                    backgroundColor: tabInfo.topColor
                }
            }
                className="mt-4 py-0"
                onPress={() => {
                    navigation.jumpTo("onboard2", {})
                }}
            >
                <Text className="text-white text-lg font-poppins_semibold">Continue</Text>
            </Button>
        </View>
    </SafeAreaView>
}
type Onboard2Props = CompositeScreenProps<MaterialTopTabScreenProps<OnboardingTabsParamList, 'onboard2'>, StackScreenProps<AuthScreensParamList>>
export function Onboard2(props: Onboard2Props) {
    const tabInfo = onboardingTabsMap[1];
    const { navigation } = props;

    return <SafeAreaView style={
        {
            backgroundColor: tabInfo.bottomColor
        }
    } className="h-full w-screen flex items-center">

        <View style={{
            backgroundColor: tabInfo.topColor
        }} className="h-[60%] w-[150%] rounded-b-full items-center" >
            <View className="w-[66%] justify-center items-center px-4 py-2">
                <View className="w-full flex items-end ">
                    <Pressable onPress={() => {
                        navigation.jumpTo("onboard4", {})
                    }} className="">
                        <Text style={{
                            color: tabInfo.skipColor
                        }} className="text-lg  font-poppins_regular">
                            Skip
                        </Text>
                    </Pressable>
                </View>
                <Image source={onboarding2Img} contentFit="cover" className="w-[110%] aspect-square"></Image>
            </View>
        </View>
        <View className="mt-8 px-4">
            <Text style={{
                color: tabInfo.topColor
            }} className="text-3xl text-center font-poppins_semibold">
                Split Bills
            </Text>
            <View className=" mx-8 mt-4">
                <Text className="text-xl  text-center text-[#a2b2b2] font-poppins_semibold">
                    Easily split money between your group members and know your share

                </Text>
            </View>
        </View>
        <View className="absolute top-[92%] flex w-full px-10 mt-5 h-full">
            <Button style={
                {
                    bottom: 20,
                    backgroundColor: tabInfo.topColor
                }
            }
                className="mt-4 py-0"
                onPress={() => {
                    navigation.jumpTo("onboard3", {})
                }}
            >
                <Text className="text-white text-lg font-poppins_semibold">Continue</Text>
            </Button>
        </View>
    </SafeAreaView>
}

type Onboard3Props = CompositeScreenProps<MaterialTopTabScreenProps<OnboardingTabsParamList, 'onboard3'>, StackScreenProps<AuthScreensParamList>>
export function Onboard3(props: Onboard3Props) {
    const tabInfo = onboardingTabsMap[2];
    const { navigation } = props;

    return <SafeAreaView style={
        {
            backgroundColor: tabInfo.bottomColor
        }
    } className="h-full w-screen flex items-center">
        <View style={{
            backgroundColor: tabInfo.topColor
        }} className="h-[60%] w-[150%] rounded-b-full items-center" >
            <View className="w-[66%] justify-center items-center px-4 py-2">
                <View className="w-full flex items-end ">
                    <Pressable onPress={() => {
                        navigation.jumpTo("onboard4", {})
                    }} className="">
                        <Text style={{
                            color: tabInfo.skipColor
                        }} className="text-lg  font-poppins_regular">
                            Skip
                        </Text>
                    </Pressable>
                </View>
                <Image source={onboarding3Img} contentFit="cover" className="w-full translate-y-6 aspect-square"></Image>
            </View>
        </View>
        <View className="mt-8 px-4">
            <Text style={{
                color: tabInfo.topColor
            }} className="text-4xl text-center font-poppins_semibold">
                We will do the Math!
            </Text>
            <View className="mx-8 mt-4">
                {/* <Text className="text-xl  text-center text-[#a2b2b2] font-poppins_semibold">
                    Easily split money between your group members and know your share
                </Text> */}
            </View>
        </View>
        <View className="absolute top-[90%] flex w-full px-10 mt-5 h-full">
            <Button style={
                {
                    bottom: 20,
                    backgroundColor: tabInfo.topColor
                }
            }
                className="mt-8"
                onPress={() => {
                    navigation.jumpTo("onboard4", {})
                }}
            >
                <Text className="text-white text-lg font-poppins_semibold">Continue</Text>
            </Button>
        </View>
    </SafeAreaView>
}


type Onboard4Props = CompositeScreenProps<MaterialTopTabScreenProps<OnboardingTabsParamList, 'onboard4'>, StackScreenProps<AuthScreensParamList>>
export function Onboard4(props: Onboard4Props) {
    const tabInfo = onboardingTabsMap[3];
    const { navigation } = props;

    return <SafeAreaView style={
        {
            backgroundColor: tabInfo.bottomColor
        }
    } className="h-full w-screen flex items-center">
        <View style={{
            backgroundColor: tabInfo.topColor
        }} className="h-[60%] w-[150%] rounded-b-full items-center" >
            <View className="w-[66%] justify-center items-center px-4 py-2">
                <View className="w-full flex items-end ">

                </View>
                <Image source={onboarding4Img} contentFit="cover" className="w-full translate-y-16 aspect-square"></Image>
            </View>
        </View>
        <View className="mt-8 px-4">
            <Text style={{
                color: tabInfo.topColor
            }} className="text-3xl text-center font-poppins_semibold">
                And help you handle your money
            </Text>

        </View>
        <View className="absolute top-[79%] w-full mt-5 px-10  flex flex-col  justify-end">
            <Button style={{
                backgroundColor: tabInfo.topColor
            }}
                onPress={() => {
                    navigation.navigate("Login", {})
                }}
                className="mt-4 py-0"
            >
                <Text className="text-white text-lg font-poppins_semibold" >Login</Text>
            </Button>
            <Button style={{
                backgroundColor: tabInfo.topColor
            }}
                onPress={() => {
                    navigation.navigate("Register", {})
                }}
                className="mt-4"
            >
                <Text className="text-white text-lg font-poppins_semibold">Register</Text>
            </Button>
        </View>
    </SafeAreaView>
}