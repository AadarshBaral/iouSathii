import { Button } from '@/components/ui/Button'
import Input2 from '@/components/ui/InputWithBorder'
import TitleBar from '@/components/ui/TitleBar'
import { Typography } from '@/components/ui/Typography'
import { group, person, useGroupCtx } from '@/context/GroupContext'
import ScreenWrapper from '@/layout/SafreAreaInsets'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FlatList, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Toast from 'react-native-toast-message'
import { generateAlphanumeric } from '../auth/Register'
interface IGroupInputElement {
    number: number;
    groupId: string;
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
const GroupInputElement = ({ groupName, number, control, handleSubmit, groupId }: IGroupInputElement) => {
    const navigation = useNavigation();
    //@ts-ignore
    const dataArray: person[] = Array.from({ length: number }, (v, k) => ({
        id: `${k + 1}`, // Unique ID for each element
        name: `P${k + 1}`,// Title for each item
        total: 0
    }));
    const handleGroupSubmit = () => {

        const newGroup: group = {
            groupId: groupId,
            name: groupName,
            people: dataArray
        }
        handleSubmit(newGroup)
        navigation.navigate({ name: 'GroupConclusion', params: { group: newGroup } } as never)
        Toast.show({
            type: 'success',
            text1: 'Group added successfully🎉',
        });
    };
    return (

        <View>
            <Typography className='text-xl mt-2' label={`${number} People`} />
            <FlatList
                data={dataArray}
                renderItem={({ item }) => (
                    <View className='h-[250px] w-full bg-[#FFF4DF] rounded-xl mt-3 p-2 shdow-lg border-2 border-[#4b3e2711]' >
                        <Input2
                            border='golden'
                            label={`Person ${item.id}`}
                            control={control}
                            name={`person-${item.id}-name`}
                            enterKeyHint="next"
                            onChangeText={(v) => {
                                item.name = v
                                console.log(v)
                            }}
                            autoCorrect={false}
                        />
                        <Input2
                            border='golden'
                            label='Total'
                            control={control}
                            name={`person-${item.id}-total`}
                            enterKeyHint="next"
                            inputMode='numeric'
                            onChangeText={(v) => {
                                item.total = v as string
                            }}
                            autoCorrect={false}
                        />
                    </View>
                )}
                keyExtractor={item => item.id}
            />
            <Button className='mt-3' onPress={handleGroupSubmit}><Typography className='text-xl text-white' label="Continue" /></Button>
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
            if (parsedData <= 15) {
                setSelectedNumber(parsedData);
                showError(false);
            }
            else {
                console.log('Error: Greter than 10');
            }
        }
    };
    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
            <ScreenWrapper>
                <View>
                    <TitleBar back title="Create Group" image={"person.jpg"} />
                    <Input2
                        border='default'
                        label="Enter group name"
                        control={control}
                        name="groupname"
                        enterKeyHint="next"
                        autoCorrect={false}
                    />
                    <View className='flex flex-row items-center gap-2 relative '>
                        {error && <Text className='text-red-600 absolute bottom-[-20px] '>Error! select number</Text>}
                        <View className='w-[70%]'>

                            <Input2
                                border='default'
                                className=''
                                label="Number of People (1-15)"
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
                    {(!error && selectedNumber !== 0) && <GroupInputElement groupId={generateAlphanumeric()} groupName={groupName} handleSubmit={(newGroup) => {
                        setGroups([...groups, newGroup]);
                    }} watch={watch} control={control} number={selectedNumber} />}
                </View>
            </ScreenWrapper>
        </KeyboardAwareScrollView>
    )
}

export default AddGroup