import { Typography } from "@/components/ui/Typography";
import { Image } from "expo-image";
import { View } from "react-native";
interface onboardingComponentProps {
    index : number;
    title: string;
    subTitle: string;
    image: string;
  }
const OnboardingComponent = ({title,subTitle,image}:onboardingComponentProps) => {
    return (
      <View className='flex h-screen justify-between items-center w-screen relative '>
        <Image source={image} contentFit="contain" className="h-[40%] top-20 right-[50%] translate-x-[210px] mb-32 aspect-square" />
      <View className= 'h-[260px] w-full  p-6 bottom-[100px] flex justify-between'>
        <View>
        <Typography className='text-3xl text-center font-bold mb-3' variant={'h2'}  label={title}/>
        <Typography className='text-xl text-center text-slate-600'  variant={'p'} label={subTitle}/>
        </View>
      </View>
      </View>
    )
  }

  export default OnboardingComponent;