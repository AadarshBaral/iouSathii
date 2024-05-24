import Navigation from '@/navigation';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from '@expo-google-fonts/poppins';
import { useState } from 'react';
import { ANDROID } from 'nativewind/dist/utils/selector';
import GroupContextProvider from '@/context/GroupContext';
import BillsContextProvider from '@/context/BillsContext';
export default function App() {
  const [fontLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });
  if (!fontLoaded) {
    return null;
  }

  return (
    <BillsContextProvider>
      <GroupContextProvider><Navigation /></GroupContextProvider>
    </BillsContextProvider>
  );
}