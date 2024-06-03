import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

export type person = {
    id: string,
    name: string,
    total: string,
}
export type group = {
    groupId: string,
    name: string,
    people: person[],
}

export const GrpContext = createContext<group[]>([]);
export const SetGrpContext = createContext((newGroup: group[]) => { });

export function useGroupCtx() {
    return [useContext(GrpContext), useContext(SetGrpContext)] as [group[], (newGroup: group[]) => void];
}

export default function GroupContextProvider(props: PropsWithChildren) {
    const [groups, setGroups] = useState<group[]>([]);

    // Load group data from AsyncStorage when the component mounts
    useEffect(() => {
        const loadGroups = async () => {
            const storedGroups = await AsyncStorage.getItem('groups');
            if (storedGroups) {
                setGroups(JSON.parse(storedGroups));
            }
        };

        loadGroups();
    }, []);

    // Save group data to AsyncStorage whenever it changes
    useEffect(() => {
        const saveGroups = async () => {
            await AsyncStorage.setItem('groups', JSON.stringify(groups));
        };

        saveGroups();
    }, [groups]);

    return (
        <GrpContext.Provider value={groups}>
            <SetGrpContext.Provider value={(newGroup) => { setGroups(newGroup) }}>
                {props.children}
            </SetGrpContext.Provider>
        </GrpContext.Provider>
    );
}
