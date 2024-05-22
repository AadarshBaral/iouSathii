
import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { Typography } from '@/components/ui/Typography'

import { Image } from 'expo-image'
// const image = require("../../../../assets/splash.png")
const image = require("../../../assets/splash.png")
const logo = require("../../../assets/logo.svg")
const vect1 = require("../../../assets/Vector1.svg")
const vect2 = require("../../../assets/purple.svg")
const SplashScreen = () => {
  return (
    <View className='h-screen relative'>
      <Image className='absolute h-96 w-[120%] top-0  left-[-20]  translate-x-[-50%] ' source={vect1} />
      <Image className=' h-60 w-60 fixed top-[180] left-[30%] translate-x-[-50%] ' source={logo} />

      {/* <image className='absolute top-[200px] right-10 leading-20 w-[100px] h-[100px]' source={logo}/> */}
      <Image className='absolute  bottom-[150px]  h-[450px] w-[450px] rotate-[-28deg]' source={image} />
      {/* <Image className='absolute h-96 w-[140%] bottom-[-80px] right-[100]  translate-x-[-50%] ' source={vect2}/> */}
      <View className='absolute bottom-32 left-[25%] translate-x-[-80%] flex flex-row gap-2'>

        <ActivityIndicator color={"#4a4a4a"} size={"large"} className="mb-2" />
        <Typography className='text-[#4a4a4a]' label="Please wait" size="2xl" variant="h1" />
      </View>
    </View>
  )
}

export default SplashScreen;