import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserBill } from '@/screens/home/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const BillsContext = createContext<{
    allBills: UserBill[];
    addBill: (newBill: UserBill) => void;
    total: number;
} | null>(null);
export const useBillsContext = () => {
    const context = useContext(BillsContext);
    if (!context) {
        throw new Error("useBillsContext must be used within a BillsContextProvider");
    }
    return context;
}
interface BillsContextProviderProps {
    children: ReactNode;
}
const BillsContextProvider: React.FC<BillsContextProviderProps> = ({ children }) => {
    const [allBills, setUserBills] = useState<UserBill[]>([]);
    const [total, setTotal] = useState<number>(0);
    const addBill = (newBill: UserBill) => {
        setUserBills((prevBills) => [...prevBills, newBill]);
    }

    useEffect(() => {
        const  setBills = async () => {
            AsyncStorage.setItem('bills', JSON.stringify(allBills));
            console.log("bills set")
        }
        setBills();
    }, [allBills])
    useEffect(() => {
        const fetchBills = async () => {
            const bills = await AsyncStorage.getItem('bills');
            if (bills) {
                console.log("bills", bills)
                setUserBills(JSON.parse(bills));
            }
        }
        fetchBills();
    }, [])
    // console.log("from context",allBills)

    return (
        <BillsContext.Provider value={{ allBills, addBill, total }}>
            {children}
        </BillsContext.Provider>
    );
}
export default BillsContextProvider;
