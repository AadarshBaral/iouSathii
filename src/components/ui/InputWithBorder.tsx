import { forwardRef } from "react";
import { useController } from "react-hook-form";
import { TextInputProps, View } from "react-native";
import { TextInput } from "react-native";
import { Typography } from "./Typography";
import { twMerge } from "tailwind-merge";
import { cn } from "@/utils/cn";
const Input2 = forwardRef<TextInput, TextInputProps & { control: any, name: string, label: string, border: string, }>((props, ref) => {
    const borderColors: Record<string, string> = {
    'default ' : 'border-black',
    'golden' : 'border-[#bb8e3a]'
    };
    const textColors: Record<string, string> = {
    'default ' : 'text-black',
    'golden' : 'text-[#bb8e3a]'
    };

    const { control, name, label } = props;
    const { field } = useController({
        control,
        defaultValue: "",
        name,
    })

    return (
        <View className='m-2 w-full ml-0 my-4'>
            <Typography label={label} className={cn('text-lg',textColors[props.border])} />
            <View className='absolute w-[95%] -bottom-2 -left-1 rounded-xl aspect-[9/1] bg-[#d9d9d9] '>
            </View>
            <TextInput onChangeText={field.onChange} {...props} ref={ref} className={twMerge('rounded-xl py-3 text-xl px-2 w-full border-2 border-solid bg-[#f8f8f8] relative leading-[25px]', props.className,borderColors[props.border])}>
            </TextInput>
        </View>
    )
})
export default Input2