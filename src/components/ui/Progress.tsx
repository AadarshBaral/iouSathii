import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography } from './Typography';
const ProgressBar = ({ progress }: { progress: number }) => {
    const barWidth: number = 230;
    const progressWidth = (progress / 100) * barWidth;

    return (
        <View className='w-[60%] h-[100px] bg-[#090a10] m-10 flex flex-col justify-evenly items-center shadow-sm shadow-[#999] rounded-xl'>
            <Typography className='text-[#cfcfcf] text-lg' label="Uploading Image" />
            <View className='self-start ml-8' style={[styles.progressBar, { width: progressWidth }]}>
            </View>
            <Typography className='text-[#cfcfcf]' label={`${progress}%`} />
        </View>
    )
}
export default ProgressBar
const styles = StyleSheet.create({
    progressBar: {
        backgroundColor: "#908de9",
        width: "100%",
        height: "10%",
        borderRadius: 4,
    },
});