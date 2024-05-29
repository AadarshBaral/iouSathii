import AddBill from "@/screens/home/AddBill";
import AddGroup from "@/screens/home/AddGroup";
import DetailView from "@/screens/home/DetailView";
import Profile from "@/screens/home/Profile";
import Search from "@/screens/home/Search";
import SplashScreen from "@/screens/home/splash";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from
    "@react-navigation/native-stack";
import HomeTabs from "./TabBarNav";
import ViewAll from "@/screens/home/ViewAll";
import GroupConclusion from "@/screens/home/GroupConclusion";
import ProfileSetup from "@/screens/home/ProfileSetup";
const Stack = createNativeStackNavigator();
const AfterAuth = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeTabs"
                component={HomeTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="profile"
                component={Profile}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ProfileSetup"
                component={ProfileSetup}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="GroupConclusion"
                component={GroupConclusion}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ViewAll"
                component={ViewAll}
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
    )

}
export default AfterAuth;