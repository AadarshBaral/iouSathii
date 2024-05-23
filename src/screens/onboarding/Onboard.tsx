import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text, View } from 'react-native'
import { ImageBackground, Image } from "expo-image";
import { onboardingTabsMap } from "./colorMap";
import { useNavigation } from "@react-navigation/native";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { Button } from "@/components/ui/Button";
import { OnboardingTabs } from "@/navigation/BeforeAuth";
const onboarding1Img = require("../../../assets/onboarding_1.png")






export function Onboard1(props: MaterialTopTabScreenProps<OnboardingTabs>) {
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
                <Image source={onboarding1Img} contentFit="cover" className="w-[110%] aspect-square"></Image>
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
                <Button style={
                    {
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
        </View>
    </SafeAreaView>
}

export function Onboard2(props: MaterialTopTabScreenProps<OnboardingTabs>) {
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
                <Image source={onboarding1Img} contentFit="cover" className="w-[110%] aspect-square"></Image>
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
                <Button style={
                    {
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
        </View>
    </SafeAreaView>
}

export function Onboard3(props: MaterialTopTabScreenProps<OnboardingTabs>) {
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
                <Image source={onboarding1Img} contentFit="cover" className="w-[110%] aspect-square"></Image>
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
                <Button style={
                    {
                        backgroundColor: tabInfo.topColor
                    }
                }
                    className="mt-4 py-0"
                    onPress={() => {
                        navigation.jumpTo("onboard4", {})
                    }}
                >
                    <Text className="text-white text-lg font-poppins_semibold">Continue</Text>
                </Button>
            </View>
        </View>
    </SafeAreaView>
}

export function Onboard4(props: MaterialTopTabScreenProps<OnboardingTabs>) {
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
                    {/* <Pressable onPress={()=>{
                        navigation.jumpTo("onboard4",{})
                    }} className="">
                        <Text style={{
                            color: tabInfo.skipColor
                        }} className="text-lg  font-poppins_regular">
                            Skip
                        </Text>
                    </Pressable> */}
                </View>
                <Image source={onboarding1Img} contentFit="cover" className="w-[110%] aspect-square"></Image>
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
    </SafeAreaView>
}