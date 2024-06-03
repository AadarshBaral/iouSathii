import { Entypo } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { forwardRef, useState } from "react";
import { useController } from "react-hook-form";
import { Pressable, TextInput, TextInputProps, View } from "react-native";
import { Typography } from "./Typography";

type Input2Props = TextInputProps & {
    label: string,
    control: any,
    name: string
    error?: string,
}
const Input = forwardRef<TextInput, Input2Props>((props, ref) => {
    const { label, control, name, error, secureTextEntry } = props;
    const { field } = useController({
        control,
        defaultValue: "",
        name,
    })
    const [showPassword, setShowPassword] = useState(secureTextEntry)
    // let innerInputRef = useRef<TextInput>(null);
    return <View className="flex flex-col mt-2 ">
        <Typography variant={'p'} className="text-[16px] text-gray-800" label={label}></Typography>
        <View className={`flex flex-row mt-2  rounded-xl ${error ? "border-red-400 " : "border-gray-300"} border-2  `}>
            <TextInput ref={ref} {...props} className={`${secureTextEntry ? 'w-[90%] rounded-l-xl' : 'w-full rounded-xl'}  p-3 px-3 text-xl text-gray-800 bg-gray-200 `} secureTextEntry={showPassword} onChangeText={field.onChange} />
            {secureTextEntry &&
                <Pressable className="w-[10%] flex items-center justify-center bg-gray-200  rounded-r-xl pr-2" onPress={(e) => {
                    e.stopPropagation()
                    setShowPassword(!showPassword)
                }}>
                    {showPassword ? (
                        <Entypo style={{
                        }} name="eye-with-line" size={24} color="black" />
                    ) : (
                        <AntDesign style={{
                        }} name="eye" size={24} color="black" />
                    )}
                </Pressable>
            }
        </View>
    </View>
});
export default Input;


export function InnerInput(props: Input2Props, ref: TextInput) {

}