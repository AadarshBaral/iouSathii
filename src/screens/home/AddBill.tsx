import React, { Fragment, PropsWithChildren, ReactNode, forwardRef, useEffect, useState } from 'react';
import { Pressable, TextInput, TextInputProps, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { set, useController, useForm } from 'react-hook-form';
import Input from '@/components/ui/Input';
import RadioButton from '@/components/ui/Radio';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import ScreenWrapper from '@/layout/SafreAreaInsets';
import TitleBar from '@/components/ui/TitleBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FireAuth, db } from '@/config/fireConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useBillsContext } from '@/context/BillsContext';
import { serverTimestamp } from 'firebase/firestore';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActivityIndicator } from 'react-native';
import { generateAlphanumeric } from '../auth/Register';
import { twMerge } from 'tailwind-merge';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';



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

const AddBillInput = forwardRef<TextInput, TextInputProps & { control: any, name: string, label: string }>((props, ref) => {
    const { control, name, label } = props;
    const { field } = useController({
        control,
        defaultValue: "",
        name,
    })

    return <View className='relative flex flex-col mb-2 gap-y-1 w-full'>
        <Typography label={label} className='text-lg' />
        <View className='absolute w-[95%] -bottom-2 -left-1 rounded-xl aspect-[9/1] bg-[#d9d9d9] '>
        </View>
        <TextInput onChange={field.onChange} {...props} ref={ref} className={twMerge('rounded-xl py-2 text-xl px-2 w-full border-2 border-black  border-solid bg-[#f8f8f8]', props.className)}>
        </TextInput>
    </View>
})



const AddBill = () => {
    const { allBills, addBill } = useBillsContext();
    const params = useRoute();
    const auth = FireAuth;
    const navigation = useNavigation();
    const billsCollection = collection(db, 'billRecords')
    const [uid, setUid] = useState<string | null>(null)

    //use user type?
    const [linkedUser, setLinkedUser] = useState<string | undefined>('ram')
    useEffect(() => {
        //@ts-ignore
        // setLinkedUser(params.params?.data)
        //@ts-ignore
        setValue('name', params.params?.data.username)
    }, [params])
    console.log(params)
    useEffect(() => {
        // navigation.setOptions({
        //     headerShown: true,

        // });
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
            console.log('Bill Added')
            addBill(submissionData as any)

            navigation.goBack()
        }).catch((e) => {
            console.log("Error", e)
        }).finally(() => {
            reset()
        }
        )
    };
    return (
        <ScreenWrapper className='relative ' >
            <StatusBar></StatusBar>
            {/* <TitleBar back image='person.jpg' title='Add Bill' /> */}
            <View className='flex flex-row justify-between  '>
                <View className='flex flex-row items-center gap-2'>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name="home" size={32} color="black" />
                    </Pressable>
                    <Typography label={"Add Payment"} className='text-2xl' variant={"p"} />
                </View>
                <Pressable onPressIn={() => navigation.navigate('profile' as never)}>

                    <View className='bg-slate-300 w-14 h-14 rounded-full shadow-sm'>
                        {/* <Image  source={img} className='h-14 w-14  object-cover rounded-full' /> */}
                    </View>
                </Pressable>
            </View>
            <View className='mt-4'>
                <View className='flex flex-col gap-y-1 bg-[#e8f5ff]  rounded-xl pb-2 px-2'>
                    <AddBillInput
                        label='Person Name'
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
                                        removeUser={() => {
                                            setLinkedUser(undefined)
                                        }}>
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
                                    className='flex items-center text-[#2C4456] text-2xl bg-[#85cbff] w-full py-2 rounded-xl'
                                >
                                    <Typography label='Link a user' className='text-black text-xl ' />
                                </Pressable>
                            </View>
                    }

                </View>
                <AddBillInput
                    label="Total Money"
                    control={control}
                    defaultValue=''
                    name="totalMoney"
                    enterKeyHint="next"
                    autoCorrect={false}
                    keyboardType='numeric'
                />
                {errors.totalMoney && <Typography label={errors.totalMoney.message as string} className="text-red-500" variant={'p'} />}
                <AddBillInput
                    label="Purpose"
                    control={control}
                    name="purpose"
                    defaultValue=''
                    enterKeyHint="next"
                    autoCorrect={false}
                />
                {errors.purpose && <Typography label={errors.purpose.message as string} className="text-red-500" variant={'p'} />}
                <AddBillInput
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
                <Button onPressIn={handleSubmit(onSubmit)} className="mt-4 bg-[#3a3453]" variant="primary" size="default">
                    {isSubmitting ? <ActivityIndicator color={"#fff"} size={"large"} className="" /> : <Typography label="Add Bill" className="text-white text-lg" variant={'p'} />}
                </Button>
            </View>
        </ScreenWrapper>
    );
};



function AddedUserThumbnail(props: PropsWithChildren<{
    goToProfile: () => void,
    removeUser: () => void,
}>) {
    const { children, removeUser, goToProfile } = props;
    return (
        <Pressable onPress={goToProfile} className='bg-slate-300 w-16 h-16 rounded-full shadow-sm'>
            {children}
            <Pressable onPress={removeUser} className='absolute  top-0 right-0 bg-red-500 w-5 aspect-square rounded-full flex justify-center items-center'>
                <Typography label='X' className='text-white text-md' />
            </Pressable>
        </Pressable>
    )
}


function AddBillRadioButton({ options, selectedOption, onSelect, label }: any) {
    return (
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10, fontSize: 16 }}>{label}</Text>
            {options.map((option: any) => (
                <View key={option.value} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                    <TouchableOpacity
                        onPress={() => onSelect(option.value)}
                        style={{
                            height: 24,
                            width: 24,
                            borderRadius: 12,
                            borderWidth: 2,
                            borderColor: '#000',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 5,
                        }}
                    >
                        {selectedOption === option.value && (
                            <View style={{
                                height: 12,
                                width: 12,
                                borderRadius: 6,
                                backgroundColor: '#000',
                            }} />
                        )}
                    </TouchableOpacity>
                    <Text style={{ fontSize: 15 }}>{option.label}</Text>
                </View>
            ))}
        </View>
    );
}


export default AddBill;
