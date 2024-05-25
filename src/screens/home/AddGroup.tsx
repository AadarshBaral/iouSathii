import { View, Text, FlatList, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@/layout/SafreAreaInsets'
import PageTitle from '@/components/ui/PageTitle'
import TitleBar from '@/components/ui/TitleBar'
import { set, useForm } from 'react-hook-form'
import Input from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Picker } from '@react-native-picker/picker';
import { Typography } from '@/components/ui/Typography'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import GroupContextProvider, { group, person, useGroupCtx } from '@/context/GroupContext'
interface IGroupInputElement {
    number: number;
    control: any, //TODO Find control type
    watch: any;
    groupName: string;
    handleSubmit: (newGroup: group) => void;
}
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
const GroupInputElement = ({ groupName, number, control, handleSubmit }: IGroupInputElement) => {
    const navigation = useNavigation();
    const dataArray: person[] = Array.from({ length: number }, (v, k) => ({
        id: `${k + 1}`, // Unique ID for each element
        name: `P${k + 1}`,// Title for each item
        total: 0
    }));
    const handleGroupSubmit = () => {
        handleSubmit({
            name: groupName,
            people: dataArray
        })
        navigation.navigate('index' as never)
    };
    return (
        <View>
            <Typography className='text-xl mt-2' label={`${number} People`} />
            <FlatList
                data={dataArray}
                renderItem={({ item }) => (
                    <View className='h-[200px] w-full bg-gray-200 rounded-xl mt-3 p-2 shdow-lg border-2 border-gray-300' >
                        <Input
                            label={`Person ${item.id}`}
                            control={control}
                            name={`person-${item.id}-name`}
                            enterKeyHint="next"
                            onChangeText={(v) => {
                                item.name = v
                            }}
                            autoCorrect={false}
                        />
                        <Input
                            label='Total'
                            control={control}
                            name={`person-${item.id}-total`}
                            enterKeyHint="next"
                            inputMode='numeric'
                            onChangeText={(v) => {
                                item.total = Number(v)
                            }}
                            autoCorrect={false}
                        />
                    </View>
                )}
                keyExtractor={item => item.id}
            />
            <Button onPress={handleGroupSubmit}><Typography className='text-xl text-white' label="Continue" /></Button>
        </View>
    )
}


const AddGroup = () => {
    const [groups, setGroups] = useGroupCtx();
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);
    const [selectedNumber, setSelectedNumber] = useState(0);
    const [groupName, setGroupName] = useState("");
    const [error, showError] = useState(false)
    const { control, handleSubmit, formState: { errors }, register, watch } = useForm()
    const handleNumber = (data: any) => {
        const parsedData = parseInt(watch("groupNumber"));
        setGroupName(watch("groupname"))
        if (isNaN(parsedData)) {
            showError(true);
            console.log('Error: Input is not a number');
        } else {
            if (parsedData <= 10) {
                setSelectedNumber(parsedData);
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
                        <Input
                            label="Enter group name"
                            control={control}
                            name="groupname"
                            enterKeyHint="next"
                            autoCorrect={false}
                        />
                        <View className='flex flex-row items-center gap-2 relative '>
                            {error && <Text className='text-red-600 absolute bottom-[-20px] '>Error! select number</Text>}
                            <View className='w-[70%]'>

                                <Input
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
                        {(!error && selectedNumber !== 0) && <GroupInputElement groupName={groupName} handleSubmit={(newGroup) => {
                            setGroups([...groups, newGroup]);
                        }} watch={watch} control={control} number={selectedNumber} />}

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    )
}

export default AddGroup

