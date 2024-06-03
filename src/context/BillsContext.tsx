import { FireAuth, db } from '@/config/fireConfig';
import { UserBill } from '@/screens/home/Index';
import { IProfileProps } from '@/screens/home/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
export const BillsContext = createContext<{
    allBills: UserBill[];
    addBill: (newBill: UserBill) => void;
    total: number;
    profile: object | null;
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
    const auth = FireAuth
    // const currentUser: IProfileProps | null = auth.currentUser;
    const [loading, setLoading] = useState(false)
    const profilesRef = collection(db, 'profiles')
    const [allBills, setUserBills] = useState<UserBill[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [profile, setProfile] = useState<IProfileProps | null>(null);
    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged(user => {
            if (user) {
                // We're sure the user is logged in and user.uid is available
                const profilesRef = collection(db, 'profiles'); // Make sure 'profiles' is the correct name of your collection
                const q = query(profilesRef, where("userId", "==", user.uid));

                const unsubscribeSnap = onSnapshot(q, (snapshot) => {
                    const documents = snapshot.docs.map(doc => doc.data());
                    if (documents.length > 0) {
                        setProfile(documents[0] as any);  // Assuming you want the first document
                    } else {
                        console.log("No profile found for the user.");
                    }
                    setLoading(false);
                });

                return () => {
                    unsubscribeSnap(); // Unsubscribe from firestore snapshot
                };
            } else {
                console.log('No user logged in');
                setLoading(false);
            }
        });

        return () => {
            unsubscribeAuth(); // Unsubscribe from auth state changes
        };
    }, []);

    const addBill = (newBill: UserBill) => {
        setUserBills((prevBills) => [...prevBills, newBill]);
    }
    useEffect(() => {
        const setBills = async () => {
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
        <BillsContext.Provider value={{ allBills, addBill, total, profile }}>
            {children}
        </BillsContext.Provider>
    );
}
export default BillsContextProvider;
