import { PropsWithChildren, createContext, useContext, useState } from "react";
export type person = {
    id: string,
    name: string,
    total: number,
}
export type group = {
    name: string,
    people: person[],
}
export const GrpContext = createContext<group[]>([])
export const SetGrpContext = createContext((newGroup: group[]) => { });
export function useGroupCtx() {
    return [useContext(GrpContext), useContext(SetGrpContext)] as [group[], (newGroup: group[]) => void]
}
export default function GroupContextProvider(props: PropsWithChildren) {
    const [groups, setGroups] = useState<group[]>([]);
    return <GrpContext.Provider value={groups}>
        <SetGrpContext.Provider value={(newGroup) => { setGroups(newGroup) }}>
            {props.children}
        </SetGrpContext.Provider>
    </GrpContext.Provider>
}
