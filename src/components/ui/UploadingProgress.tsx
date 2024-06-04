import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography } from './Typography';
const UploadingProgress = ({ progress }: { progress: number }) => {
    const barWidth: number = 230;
    const progressWidth = (progress / 100) * barWidth;

    return (
        <View className='w-[90%] self-center h-[100px] bg-[#1E2225] flex flex-col justify-evenly items-center shadow-sm shadow-[#999] rounded-xl'>
            <Typography className='text-[#cfcfcf] text-lg' label="Uploading Image" />
            <View className='self-start ml-20' style={[styles.progressBar, { width: progressWidth }]}>
            </View>
            <Typography className='text-[#cfcfcf]' label={`${progress}%`} />

        </View>
    )
}
export default UploadingProgress;
const styles = StyleSheet.create({
    progressBar: {
        backgroundColor: "#00C914",
        width: "100%",
        height: "8%",
        borderRadius: 4,
    },
});