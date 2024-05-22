import AddBill from "@/screens/home/AddBill";
import AddGroup from "@/screens/home/AddGroup";
import DetailView from "@/screens/home/DetailView";
import Index from "@/screens/home/Index";
import index from "@/screens/home/Index";
import Profile from "@/screens/home/Profile";
import SplashScreen from "@/screens/home/splash";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
const Stack = createNativeStackNavigator();

const AfterAuth = () => {

    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    name="index"
                    component={Index}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="profile"
                    component={Profile}
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
                <Stack.Screen
                    name="addGroup"
                    component={AddGroup}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="dueDetail"
                    component={DetailView}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="addBill"
                    component={AddBill}
                    options={{
                        headerShown: false,
                    }}
                />

            </Stack.Navigator>
        </>
    )

}
export default AfterAuth;