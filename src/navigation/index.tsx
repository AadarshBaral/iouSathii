import { FireAuth } from '@/config/fireConfig';
import toastConfig from '@/config/toastConfig';
import SplashScreen from '@/screens/home/splash'; // Ensure you have this component
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import AfterAuth from './AfterAuth';
import BeforeAuth from './BeforeAuth';
const Navigation = () => {
  const [onboarded, setOnboarded] = useState(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);  // State to handle loading
  const getStorage = async () => {
    const ob = await AsyncStorage.getItem('onboarding');
    //@ts-ignore
    setOnboarded(JSON.parse(ob));
  };
  useEffect(() => {
    getStorage();
  }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FireAuth, (user) => {
      setUser(user);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      {user ? <AfterAuth /> : <BeforeAuth onboarded={onboarded} />}
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};
export default Navigation;
