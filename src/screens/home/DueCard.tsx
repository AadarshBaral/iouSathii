import { IMoneyCardProps } from '@/components/ui/MoneyCard'
import { Typography } from '@/components/ui/Typography'
import { cn } from '@/utils/cn'
import React from 'react'
import { View } from 'react-native'
export interface IdueCardProps extends IMoneyCardProps {
    name: string;
    purpose?: string;
    cardDecision: "owe" | "receive";
    id?: string;
    onDelete?: () => void;
}
export const indicatorColor: Record<string, string> = {
    orange: 'bg-[#BF6736]',
    green: "bg-[#3E8A61]"
};
//person is the person who is assigned to the bill.
// person2 is the person who issued the bill.
const DueCard = ({ name, total, cardDecision }: IdueCardProps) => {
    // const auth = Fir eAuth;
    // const currentUser = auth.currentUser?.uid;
    // person ==currentUser? cardDecision = 'owe' : cardDecision = 'receive'
    // console.log("From groupcard" ,person2)
    // const profileRef = collection(db, 'profile', person2)
    // const [profile,setProfile] = useState<any>({});
    // useEffect (()=>{
    //     const getProfile = async () => {
    //         const profile = await getDocs(profileRef)
    //         console.log(profile)
    //     }
    //     getProfile()

    // },[])


    const color = cardDecision === 'owe' ? 'orange' : 'green'
    return (
        <View className='flex bg-[#DDE2E5] h-[70px] w-full rounded-2xl  padding-2 justify-between items-center flex-row p-4' >
            <View className='flex flex-row items-center gap-3 '>
                <View className={cn(indicatorColor[color], 'w-4 h-4 rounded-full')}></View>
                <Typography variant={'h3'} style={{ fontFamily: "Poppins_500Medium" }} className=' text-textDark text-lg' label={name} />
            </View>
            <Typography style={{ fontFamily: "Poppins_500Medium" }} variant={"h2"} className='text-slate-600' label={`Rs ${total + ''}`} />
        </View>
    )
}

export default DueCard