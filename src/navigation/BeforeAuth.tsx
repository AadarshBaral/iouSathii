import Login from "@/screens/auth/Login";
import Register from "@/screens/auth/Register";
import Onboarding from "@/screens/auth/onboarding/Onboarding";
import SplashScreen from "@/screens/home/splash";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const BeforeAuth = ({ onboarded }: any) => {
    console.log("from", onboarded)
    return (
        <Stack.Navigator
        >
            {onboarded === null &&
                (
                    <Stack.Screen
                        name="Onboarding"
                        component={Onboarding}
                        options={{
                            headerShown: false,
                        }}
                    />
                )
            }
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