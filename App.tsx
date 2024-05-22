import Navigation from '@/navigation';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider,onAuthStateChanged,signInWithCredential } from 'firebase/auth';
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
  WebBrowser.maybeCompleteAuthSession();
  // const [userInfo,setUserInfo] = useState();
  // const [request,response, promptAsync] = Google.useIdTokenAuthRequest({
  //   iosClientId : "",
  //   androidClientId : ""
  // });
  return (
    <Navigation/>
  );
}