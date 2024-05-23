import Login from "@/screens/auth/Login";
import Register from "@/screens/auth/Register";
import Index from "@/screens/home/Index";
import index from "@/screens/home/Index";
import SplashScreen from "@/screens/home/splash";
import { Onboard1, Onboard2, Onboard3, Onboard4 } from "@/screens/onboarding/Onboard";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNavigatorFactory } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { TabBar, TabBarIndicator } from "react-native-tab-view";
import { Text } from "react-native";
import { onboardingTabsMap } from "@/screens/onboarding/colorMap";
const Stack = createNativeStackNavigator();




export type OnboardingTabs = {
    onboard1: {},
    onboard2: {},
    onboard3: {},
    onboard4: {}
}
const Tab = createMaterialTopTabNavigator<OnboardingTabs>();





const indicatorColor = "#263238"




function Onboarding() {
    return <Tab.Navigator tabBarPosition="bottom"
        tabBar={
            (props) => {
                const { state, descriptors, jumpTo, layout, navigation, position } = props;
                console.log(state.index)
                const colors = onboardingTabsMap[state.index];
                console.log(colors)
                return <TabBar
                    style={{
                        backgroundColor: colors.bottomColor,
                        shadowRadius: 0,
                        shadowColor: "transparent"
                    }}
                    navigationState={state}
                    renderLabel={(props) => {
                        const { focused } = props;
                        return <View style={
                            {
                                height: 20,
                                width: 50,
                            }
                        } className={` rounded-l-full rounded-r-full ${focused ? "bg-transparent " : " bg-[#7696a8]"}`}>
                        </View>
                    }}
                    renderIndicator={(props) => {
                        const { getTabWidth, jumpTo, layout, navigationState, position, width, gap, style } = props;

                        return <View className="flex justify-center items-center align-middle w-full h-full ">

                            <TabBarIndicator {...props} style={{
                                top: "27%",
                                left: "5%",
                                height: 20,
                                width: 50,
                                borderTopLeftRadius: 100,
                                borderBottomLeftRadius: 100,
                                borderTopRightRadius: 100,
                                borderBottomRightRadius: 100,
                                backgroundColor: indicatorColor
                            }}></TabBarIndicator>
                        </View>
                    }}
                    {...props}>

                </TabBar>
            }}
        initialRouteName="onboard1"
    >
        <Tab.Group>
            {/* @ts-ignore */}
            <Tab.Screen name="onboard1" component={Onboard1} ></Tab.Screen>
            <Tab.Screen name="onboard2" component={Onboard2}></Tab.Screen>
            <Tab.Screen name="onboard3" component={Onboard3}></Tab.Screen>
            <Tab.Screen name="onboard4" component={Onboard4}></Tab.Screen>
        </Tab.Group>

    </Tab.Navigator>
}


const BeforeAuth = () => {

    return (

        <Stack.Navigator initialRouteName="onboarding" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="onboarding" component={
                Onboarding
            }>
            </Stack.Screen>

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