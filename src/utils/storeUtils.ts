import { group } from '@/context/GroupContext'
import * as SecureStore from 'expo-secure-store'




type StoreMap = {
    groups: group[],
}



export enum LOADSTATE {
    NONE,
    LOADING,
    SUCCESS,
    FAILURE
}

export type Result<V, E> = { value: V } | { error: E }

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>


export function Error<E>(error: E) {
    return {
        error
    }
}
export function OK<V>(value: V) {
    return {
        value
    }
}

export function isError<V, E>(result: Result<V, E>): result is { error: E } {
    return "error" in result;
}



export function getError<E>(result: Result<any, E>) {
    return (result as { error: E }).error;
}


//only after error is handled
export function getValue<V>(result: Result<V, any>) {
    return (result as { value: V }).value;
}
export enum WriteError {
    UNKNOWN,
    UNAVIALABLE,
    WRITE_FAILURE
}







export async function writeToStore<T extends keyof StoreMap>(key: T, value: StoreMap[T]): Promise<Result<void, WriteError>> {
    //TODO Add web code

    console.log("ss = ", SecureStore);

    let isAvialable = SecureStore.isAvailableAsync();

    if (!isAvialable) {
        return Error(WriteError.UNAVIALABLE)
    }

    try {
        return OK(await SecureStore.setItemAsync(key, JSON.stringify(value)));
    } catch (e) {
        console.log("Error while writing");
        console.log(e);
        return Error(WriteError.WRITE_FAILURE);
    }
}



export enum ReadError {
    UNKNOWN,
    UNAVIALABLE,
    EMPTY,
    READ_FAILURE
}

export async function readFromStore<T extends keyof StoreMap>(key: T): Promise<Result<StoreMap[T], ReadError>> {
    //TODO Add web code

    console.log("ss = ", SecureStore);


    let isAvialable = SecureStore.isAvailableAsync();
    if (!isAvialable) {
        return Error(ReadError.UNAVIALABLE)
    }
    try {
        const data = await SecureStore.getItemAsync(key);
        if (data == null) {
            return Error(ReadError.EMPTY);
        }

        return OK(JSON.parse(data) as StoreMap[T]);
    } catch (e) {
        console.log("Error while reading");
        console.log(e);
        return Error(ReadError.READ_FAILURE);
    }
}


export enum DeleteError {
    UNKNOWN,
    UNAVIALABLE,
    DELETE_FAILURE
}




export async function deleteFromStore<T extends keyof StoreMap>(key: T): Promise<Result<void, DeleteError>> {
    //TODO Add web code
    let isAvialable = SecureStore.isAvailableAsync();
    if (!isAvialable) {
        return Error(DeleteError.UNAVIALABLE)
    }
    try {
        return OK(await SecureStore.deleteItemAsync(key));
    } catch (e) {
        console.log("Error while writing");
        console.log(e);
        return Error(DeleteError.DELETE_FAILURE);
    }
}