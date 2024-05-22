import Login from "@/screens/auth/Login";
import Register from "@/screens/auth/Register";
import Index from "@/screens/home/Index";
import index from "@/screens/home/Index";
import SplashScreen from "@/screens/home/splash";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
const Stack = createNativeStackNavigator();

const BeforeAuth = () => {

    return (

            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    // @ts-ignore
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="Register"
                    // @ts-ignore
                    component={Register}
                    options={{
                        headerShown: false,
                    }}
                />
                     <Stack.Screen
                    name="splash"
                    component={SplashScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>

    )

}
export default BeforeAuth;