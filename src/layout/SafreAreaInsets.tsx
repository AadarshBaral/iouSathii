import React from "react";
import { View } from "react-native";
import { SafeAreaViewProps, useSafeAreaInsets } from "react-native-safe-area-context";

interface IScreenWrapper extends SafeAreaViewProps {
  children: React.ReactNode;

}
const ScreenWrapper = ({ children, className, ...props }: IScreenWrapper) => {
  const insets = useSafeAreaInsets();
  return (
    <View className='p-4 ' style={{ marginTop: insets.top, marginBottom: insets.bottom }} {...props}>
      {children}
    </View>
  );
};

export default ScreenWrapper;
