import { View, FlatList, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Typography } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import OnboardingComponent from './OnboardingComponent'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
const scr1 = require('../../../../assets/scr1.svg')
const scr2 = require('../../../../assets/scr2.svg')
const scr3 = require('../../../../assets/scr3.svg')
const scr4 = require('../../../../assets/scr4.png')
const width = Dimensions.get('window').width
const onBoardingItems = [
    {
        id: 1,
        title: 'Record the person you owe money to .',
        subTitle: '(Or yourself if you owe them)',
        image: scr1
    },
    {
        id: 2,
        title: 'Split Bills',
        subTitle: "Easily split money between your grop members and know your share",
        image: scr2
    },
    {
        id: 3,
        title: 'We will do the math for you .',
        image: scr3
    },
    {
        id: 4,
        title: 'And help you handle your money better .',
        image: scr4
    }
]
const bgColors: Record<string, string> = {
    0: "bg-[#2D3B42]",
    1: "bg-[#436E8E]",
    2: "bg-[#2B2E58]",
    3: "bg-[#1A2F6C]",
};
const Onboarding = () => {
    const [onboarded, setOnboarded] = useState(null);
    useEffect(() => {
      getStorage();
    }, []);
    const getStorage = async () => {
      const ob = await AsyncStorage.getItem('onboarding');
      //@ts-ignore
      if (ob) {
        navigation.navigate("Login" as never);
      }
    };
    const handleBoarding = async () => {
        await AsyncStorage.setItem('onboarding', 'true');
        navigation.navigate("Login" as never);
    }
    const navigation = useNavigation();
    const ref = useRef<FlatList | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleSkip = () => {
        const lastSlide = onBoardingItems.length - 1;
        const offset = lastSlide * width;
        ref?.current?.scrollToOffset({ offset });
        setCurrentIndex(lastSlide);
    };
    const goNextSlide = () => {
        const nextSlide = currentIndex + 1;
        if (nextSlide !== onBoardingItems.length) {
            const offset = nextSlide * width;
            ref?.current?.scrollToOffset({ offset });
            setCurrentIndex(nextSlide);
        }
    };
    const renderPrimaryButton = () => {
        if (currentIndex !== onBoardingItems.length - 1) {
            return (
                <Button onPress={goNextSlide} variant={'default'} ><Typography className='text-xl  text-white' label="Continue"></Typography></Button>
            );
        } else {
            return (
                <View className='flex gap-2'>
                    <Button onPress={handleBoarding} variant={'default'} ><Typography className='text-xl  text-white' label="Get Started"></Typography></Button>
                </View>
            );
        }
    };
    return (
        <SafeAreaView className='flex  h-[100vh] items-center relative'>
            <View className={`absolute z-[-1] top-[-500px] right-100 h-[1000px] w-[1000px] rounded-full ${bgColors[currentIndex]}`}></View>
            {currentIndex !== onBoardingItems.length - 1 && (
                <Pressable onPress={handleSkip} className='absolute right-7 top-16 z-10  rounded-xl p-2' >
                    <Typography className='text-xl text-white' variant={'p'} label="Skip" />
                </Pressable>)
            }
            <FlatList
                ref={ref}
                bounces={false}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled
                data={onBoardingItems}
                horizontal
                renderItem={({ item }) => <OnboardingComponent index={item.id} subTitle={item.subTitle} title={item.title} image={item.image} />}
                keyExtractor={item => item.title}
                onScroll={(e) => {
                    const x = e.nativeEvent.contentOffset.x / width;
                    setCurrentIndex(Math.ceil(x));
                }}
            />
            <View className='w-full px-6'>{renderPrimaryButton()}</View>
        </SafeAreaView>
    )
}

export default Onboarding
