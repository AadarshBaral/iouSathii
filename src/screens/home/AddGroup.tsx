import { View, Text, FlatList, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@/layout/SafreAreaInsets'
import PageTitle from '@/components/ui/PageTitle'
import TitleBar from '@/components/ui/TitleBar'
import { set, useForm } from 'react-hook-form'
import InputWithEye from '@/components/ui/InputWithEye'
import { Button } from '@/components/ui/Button'
import { Picker } from '@react-native-picker/picker';
import { Typography } from '@/components/ui/Typography'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'

interface IGroupInputElement {
    number: number;
    control: any, //TODO Find control type
    watch: any;
    handleSubmit: any;
}
// Initial state setup using useState
if (__DEV__) {
    const ignoreWarns = ["VirtualizedLists should never be nested inside plain ScrollViews"];
    const errorWarn = global.console.error;
    global.console.error = (...arg) => {
        for (const error of ignoreWarns) {
            if (arg[0].startsWith(error)) {
                return;
            }
        }
        errorWarn(...arg);
    };
}
const GroupInputElement = ({ number, control, handleSubmit }: IGroupInputElement) => {
    const [group, setGroup] = useState({
        groupName: '',
        groupNumber: 0,
        groupMembers: [
            {
                person: '',
                total: 0
            }
        ]
    });
    const dataArray = Array.from({ length: number }, (v, k) => ({
        id: `${k + 1}`, // Unique ID for each element
        person: `P${k + 1}`,// Title for each item
        total: `T${k + 1}`
    }));
    const handleGroupSubmit = async (data: any) => {
        const groupMembers = [];
        const groupNumber = parseInt(data.groupNumber, 10);
        const groupName = data.groupname;

        for (let i = 1; i <= groupNumber; i++) {
            const personKey = `person-${i}-name`;
            const totalKey = `person-${i}-total`;
            if (data[personKey] && data[totalKey]) {
                groupMembers.push({
                    id: i,
                    person: data[personKey],
                    total: data[totalKey]
                });
            }
        }
        setGroup({ groupName, groupNumber, groupMembers })
    };
    return (
        <View>
            <Typography className='text-xl mt-2' label={`${number} People`} />
            <FlatList
                data={dataArray}
                renderItem={({ item }) => (
                    <View className='h-[200px] w-full bg-gray-200 rounded-xl mt-3 p-2 shdow-lg border-2 border-gray-300' >
                        <InputWithEye
                            label={`Person ${item.id}`}
                            control={control}
                            name={`person-${item.id}-name`}
                            enterKeyHint="next"
                            autoCorrect={false}
                        />
                        <InputWithEye
                            label='Total'
                            control={control}
                            name={`person-${item.id}-total`}
                            enterKeyHint="next"
                            autoCorrect={false}
                        />
                    </View>
                )}
                keyExtractor={item => item.id}
            />
            <Button onPressIn={handleSubmit(handleGroupSubmit)}><Typography className='text-xl text-white' label="Continue" /></Button>
        </View>
    )
}
const AddGroup = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);
    const [selectedNumber, setSelectedNumber] = useState(0);
    const [error, showError] = useState(false)
    const { control, handleSubmit, formState: { errors }, register, watch } = useForm()
    const handleNumber = (data: any) => {
        const parsedData = parseInt(watch("groupNumber"));
        if (isNaN(parsedData)) {
            showError(true);
            console.log('Error: Input is not a number');
        } else {
            if (parsedData <= 10) {
                setSelectedNumber(parseInt(watch('groupNumber')));
                showError(false);
            }
            else {
                console.log('Error: Greter than 10');
            }
        }
    };
    return (
        <ScreenWrapper>
            <KeyboardAvoidingView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <TitleBar back title="Create Group" image={"person.jpg"} />
                        <InputWithEye
                            label="Enter group name"
                            control={control}
                            name="groupname"
                            enterKeyHint="next"
                            autoCorrect={false}
                        />
                        <View className='flex flex-row items-center gap-2 relative '>
                            {error && <Text className='text-red-600 absolute bottom-[-20px] '>Error! select number</Text>}
                            <View className='w-[70%]'>

                                <InputWithEye
                                    className=''
                                    label="Enter number of People"
                                    control={control}
                                    name="groupNumber"
                                    enterKeyHint="next"
                                    autoCorrect={false}
                                />
                            </View>
                            <View className='w-[26%]'>
                                <Button onPressIn={handleNumber} className='mt-8'>
                                    <Text className='text-xl text-white text-center'>OK</Text>
                                </Button>
                            </View>
                        </View>
                        {(!error && selectedNumber !== 0) && <GroupInputElement handleSubmit={handleSubmit as never} watch={watch} control={control} number={selectedNumber} />}

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    )
}

export default AddGroup

