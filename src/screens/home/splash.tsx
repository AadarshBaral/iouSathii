import React from 'react'
import { ActivityIndicator, View } from 'react-native'

import { Image } from 'expo-image'
// const image = require("../../../../assets/splash.png")
// const image = require("../../../assets/splash.png")r
const logo = require("../../../assets/IOUSathi.svg")
// const vect1 = require("../../../assets/Vector1.svg")
const splash = require("../../../assets/splashNew.png")
// const vect2 = require("../../../assets/purple.svg")
const SplashScreen = () => {
  return (
    <View className='h-screen relative bg-slate-100'>
      {/* <Image className='absolute h-96 w-[120%] top-0  left-[-20]  translate-x-[-50%] ' source={vect1} /> */}
      <Image className=' h-36 w-60 fixed top-24 left-[30%] translate-x-[-50%] ' source={logo} />
      <ActivityIndicator color={"#4a4a4a"} size={"large"} className="mb-2 absolute top-72 left-0 right-0 m-auto" />
      {/* <image className='absolute top-[200px] right-10 leading-20 w-[100px] h-[100px]' source={logo}/> */}
      <View className='absolute left-0 m-2 bottom-[-50px] flex justify-center items-center '>
        <Image className='h-[600px] w-[400px] object-cover' source={splash} />
      </View>
      {/* <Image className='absolute h-96 w-[140%] bottom-[-80px] right-[100]  translate-x-[-50%] ' source={vect2}/> */}
      <View className='absolute bottom-32 left-[25%] translate-x-[-80%] flex flex-row gap-2'>
      </View>
    </View>
  )
}

export default SplashScreen;