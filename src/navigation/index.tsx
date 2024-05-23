import { NavigationContainer } from '@react-navigation/native';
import AfterAuth from './AfterAuth';
import BeforeAuth from './BeforeAuth';
import SplashScreen from '@/screens/home/splash'; // Ensure you have this component
import { FireAuth } from '@/config/fireConfig';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';



const Navigation = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);  // State to handle loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FireAuth, (user) => {
      setUser(user);
      setTimeout(() => {
        setLoading(false);  // Set loading to false after 2 seconds
      }, 2000);  // Delay of 2 seconds
    });

    return () => unsubscribe();  // Cleanup subscription on component unmount
  }, []);

  if (loading) {
    return <SplashScreen />;  // Display splash screen while loading
  }

  return (
    <NavigationContainer>
      {user ? <AfterAuth /> : <BeforeAuth />}
    </NavigationContainer>
  );
};

export default Navigation;
