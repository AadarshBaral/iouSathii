import { Button } from '@/components/ui/Button';
import Input2 from '@/components/ui/InputWithBorder';
import RadioButton from '@/components/ui/Radio';
import TitleBar from '@/components/ui/TitleBar';
import { Typography } from '@/components/ui/Typography';
import { FireAuth, db } from '@/config/fireConfig';
import { useBillsContext } from '@/context/BillsContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Image } from 'expo-image';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { PropsWithChildren, forwardRef, useEffect, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { ActivityIndicator, Pressable, Text, TextInput, TextInputProps, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { generateAlphanumeric } from '../auth/Register';
const person = require("../../../assets/person.jpg");
const schema = z.object({
    name: z.string()
        .min(1, { message: "Name must not be empty" }), // Validates that the name is a non-empty string

    totalMoney: z.preprocess(
        (a) => parseInt(z.string().parse(a), 10),
        z.number().positive().min(1)
    ),

    purpose: z.string()
        .min(1, { message: "Purpose must not be empty" }), // Ensures purpose is a non-empty string

    description: z.string()
        .min(1, { message: "Description must not be empty" }) // Ensures description is a non-empty string
        .max(500, { message: "Description must not exceed 500 characters" }), // Optional: limit the description to 500 characters
    type: z.enum(['owe', 'receive'], { message: "Invalid type selected" }),
});
export const AddBillInput = forwardRef<TextInput, TextInputProps & { control: any, name: string, label: string, border: string, }>((props, ref) => {
    const borderColors: Record<string, string> = {
        'default ': 'border-black',
        'golden': 'border-[#FFBE42]'
    };

    const { control, name, label } = props;
    const { field } = useController({
        control,
        defaultValue: "",
        name,
    })

    return (
        <View className='m-2 w-full ml-0 my-4'>
            <Typography label={label} className='text-lg' />
            <View className='absolute w-[95%] -bottom-2 -left-1 rounded-xl aspect-[9/1] bg-[#d9d9d9] '>
            </View>
            <TextInput onChangeText={field.onChange} {...props} ref={ref} className={twMerge('rounded-xl py-2 text-xl px-2 w-full border-2 border-solid bg-[#f8f8f8] relative', props.className, borderColors[props.border])}>
            </TextInput>
        </View>
    )
})

const AddBill = () => {
    const { allBills, addBill } = useBillsContext();
    const [linkedUser, setLinkedUser] = useState<any>();
    const params = useRoute();
    const auth = FireAuth;
    const navigation = useNavigation();
    const billsCollection = collection(db, 'billRecords')
    const [uid, setUid] = useState<string | null>(null)
    useEffect(() => {
        //@ts-ignore
        // setLinkedUser(params.params?.data)
        //@ts-ignore
        setValue('name', params.params?.data.username)
        //@ts-ignore
        params.params?.data.username && setLinkedUser(params.params?.data?.username)
    }, [params])


    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUid(user?.uid || null);
        });
        return unsubscribe;
    }, []);
    const { control, handleSubmit, reset, formState: { errors, isSubmitting }, setValue, watch } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            totalMoney: '',
            purpose: '',
            description: '',
            type: 'owe' // default to 'owe'
        }
    });
    const type = watch('type');
    const onSubmit = async (data: any) => {
        //person is selected if user links a sathi
        const submissionData = {
            billId: generateAlphanumeric(),
            anonymousUser: data.name,
            cardDecision: data.type,
            currentUser: uid,
            purpose: data.description,
            groupId: data.groupId ? data.groupId : "",
            //@ts-ignore
            person: params?.params?.data ? params?.params?.data.userId : generateAlphanumeric(),
            total: data.totalMoney,
            date: serverTimestamp(),
        }
        await addDoc(billsCollection, {
            ...submissionData
        }).then(() => {
            addBill(submissionData as any)
            Toast.show({
                type: 'success',
                text1: 'Bill added successfully🎉',
            });
            navigation.goBack()
        }).catch((e) => {
            console.log("Error", e)
        }).finally(() => {
            reset()
        }
        )


    };
    return (
        <SafeAreaView className='p-4'>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
                <TitleBar back image='person.jpg' title='Add Bill' />
                <View>
                    <Input2
                        border={'default'}
                        label="Name of Person"
                        control={control}
                        name="name"
                        defaultValue=''
                        enterKeyHint="next"
                        autoCorrect={false}
                        //@ts-ignore
                        value={params.params?.data.bio ? params.params?.data.username : watch('name')} // Set value to bio data if it exists
                    />
                    {errors.name && <Typography label={errors.name.message as string} className="text-red-500" variant={'p'} />}
                    {
                        linkedUser
                            ? <View className='flex flex-col gap-y-1'>
                                <Text className='text-[#5CC708] text-md'>Linked User</Text>
                                <View className='flex flex-row gap-2 px-2' >
                                    <AddedUserThumbnail
                                        goToProfile={() => { }}
                                    // removeUser={() => {
                                    //     setLinkedUser(undefined)
                                    //     setValue('name', '')
                                    // }}
                                    >
                                        <View className='h-full w-full flex items-center justify-center'>
                                            <Image source={person} className='h-full aspect-square rounded-full'></Image>
                                        </View>
                                    </AddedUserThumbnail>
                                </View>
                            </View>
                            : <View className='flex flex-col items-center gap-y-1'>
                                <Typography className='text-xl' label='OR' />
                                <Pressable onPress={() => {
                                    navigation.navigate('Search' as never)
                                }}
                                    className='flex items-center text-[#2C4456] text-2xl bg-[#FFF4DF] w-full border-2 border-[#bb8e3a] py-2 rounded-xl'
                                >
                                    <Typography label='Link a user' className='text-[#bb8e3a] text-xl ' />
                                </Pressable>
                            </View>
                    }
                    <Input2
                        border={'default'}
                        label="Total Money"
                        control={control}
                        defaultValue=''
                        name="totalMoney"
                        enterKeyHint="next"
                        autoCorrect={false}
                        keyboardType='numeric'
                    />
                    {errors.totalMoney && <Typography label={errors.totalMoney.message as string} className="text-red-500" variant={'p'} />}
                    <Input2
                        border={'default'}
                        label="Purpose"
                        control={control}
                        name="purpose"
                        defaultValue=''
                        enterKeyHint="next"
                        autoCorrect={false}
                    />
                    {errors.purpose && <Typography label={errors.purpose.message as string} className="text-red-500" variant={'p'} />}
                    <Input2
                        border={'default'}
                        label="Description"
                        control={control}
                        name="description"
                        defaultValue=''
                        enterKeyHint="done"
                        autoCorrect={false}
                    />
                    {errors.description && <Typography label={errors.description.message as string} className="text-red-500" variant={'p'} />}
                    <RadioButton
                        label="Type"
                        options={[
                            { label: 'To pay', value: 'owe' },
                            { label: 'To get', value: 'receive' }
                        ]}
                        selectedOption={type}
                        onSelect={(value: any) => setValue('type', value)}
                    />
                    {errors.type && <Typography label={errors.type.message as string} className="text-red-500" variant={'p'} />}
                    <Button onPressIn={handleSubmit(onSubmit)} className="mt-4 bg-[#3A3453]" variant="primary" size="default">
                        {isSubmitting ? <ActivityIndicator color={"#fff"} size={"large"} className="" /> : <Typography label="Add Bill" className="text-white text-lg" variant={'p'} />}
                    </Button>
                </View>

            </KeyboardAwareScrollView >
        </SafeAreaView>
    );
};

export default AddBill;
function AddedUserThumbnail(props: PropsWithChildren<{
    goToProfile: () => void,
    removeUser?: () => void,
}>) {
    const { children, removeUser, goToProfile } = props;
    return (
        <Pressable onPress={goToProfile} className='bg-slate-300 w-16 h-16 rounded-full shadow-sm'>
            {children}
            {/* <Pressable onPress={removeUser} className='absolute  top-0 right-0 bg-red-500 w-5 aspect-square rounded-full flex justify-center items-center'>
                <Typography label='X' className='text-white text-md' />
            </Pressable> */}
        </Pressable>
    )
}