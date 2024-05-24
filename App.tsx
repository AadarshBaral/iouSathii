import Navigation from '@/navigation';
<<<<<<< HEAD

=======
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
>>>>>>> d1ecb240c2bb357bd0115fbc3dc5f447926ce01a
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
    <GroupContextProvider><Navigation /></GroupContextProvider>
  );
}