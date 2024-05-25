import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/Input';
import RadioButton from '@/components/ui/Radio';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import ScreenWrapper from '@/layout/SafreAreaInsets';
import TitleBar from '@/components/ui/TitleBar';
import { useNavigation } from '@react-navigation/native';
import { FireAuth, db ,serverStamp} from '@/config/fireConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useBillsContext } from '@/context/BillsContext';
import { serverTimestamp } from 'firebase/firestore';
import { server } from 'metro.config';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActivityIndicator } from 'react-native';

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

const AddBill = () => {
    const {allBills, addBill} = useBillsContext();
    const auth = FireAuth;
    const navigation = useNavigation();
    const billsCollection = collection(db, 'billRecords')
    const [uid, setUid] = useState<string | null>(null)
    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUid(user?.uid || null);
        });
        return unsubscribe;
    }, []);
    const { control, handleSubmit,formState: { errors,isSubmitting }, setValue, watch } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            totalMoney: '',
            purpose: '',
            description: '',
            type: 'owe' // default to 'owe'
        }
    });
    const timeNow = serverStamp.fromDate(new Date()).toDate()
    const formattedDate = timeNow.toISOString().substring(0, 10);
    const type = watch('type');
    const onSubmit = async (data: any) => {
        //person is selected if user links a sathi
        const submissionData = {
            anonymousUser: data.name,
            cardDecision: data.type,
            currentUser: uid,
            purpose: data.description,
            groupId: data.groupId ? data.groupId : "",
            person: data.name,
            total: data.totalMoney,
            date :serverTimestamp(),
        }
        console.log('Sub',submissionData)
        await addDoc(billsCollection, {
            ...submissionData
        }).then(() => {
            console.log('Bill Added')
            addBill(submissionData as any)
            navigation.navigate('index' as never)
        }).catch((e) => {
            console.log("Error",e)
        })
    };
    return (
        <ScreenWrapper >
            <TitleBar back image='person.jpg' title='Add Bill' />
            <View>
                <Input
                    label="Name of Person"
                    control={control}
                    name="name"
                    enterKeyHint="next"
                    autoCorrect={false}
                />
                {errors.name && <Typography label={errors.name.message as string} className="text-red-500" variant={'p'} />}
                <View className='flex flex-row gap-2 my-2'>
                    <Typography className='text-xl' label='Or' />
                    <Typography label='Link A User' className='text-blue-500 text-xl' />
                </View>
                <Input
                    label="Total Money"
                    control={control}
                    name="totalMoney"
                    enterKeyHint="next"
                    autoCorrect={false}
                    keyboardType='numeric'
                />
                {errors.totalMoney && <Typography label={errors.totalMoney.message as string} className="text-red-500" variant={'p'} />}
                <Input
                    label="Purpose"
                    control={control}
                    name="purpose"
                    enterKeyHint="next"
                    autoCorrect={false}
                />
                {errors.purpose && <Typography label={errors.purpose.message as string} className="text-red-500" variant={'p'} />}
                <Input
                    label="Description"
                    control={control}
                    name="description"
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
                <Button onPressIn={handleSubmit(onSubmit)} className="mt-4 bg-gray-500" variant="primary" size="default">
                    {isSubmitting ? <ActivityIndicator color={"#fff"} size={"large"} className="" /> : <Typography label="Add Bill" className="text-white text-lg" variant={'p'} />}

                </Button>
            </View>
        </ScreenWrapper>
    );
};

export default AddBill;
