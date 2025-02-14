import Index from "@/screens/home/Index";
import Profile from "@/screens/home/Profile";
import { AntDesign, Feather } from '@expo/vector-icons'; // Combined imports for cleaner code
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#ccc', // Vivid tangerine or any color you prefer
        tabBarShowLabel: false,
        tabBarInactiveTintColor: 'gray', // Define inactive color for better UX
        tabBarStyle: {
          justifyContent: 'center',
          backgroundColor: '#1E2225',
          margin: 15,
          borderRadius: 20,
          height: 60,
          position: 'absolute', // Ensures the tab bar does not move on screen change
          borderTopWidth: 0, // Removes the top border of the tabBar
          elevation: 0, // Removes shadow on Android
          shadowOpacity: 0, // Removes shadow on iOS
        },
        headerShown: false, // Apply globally to all screens within the navigator
      }}
    >
      <Tab.Screen
        name="Home"
        component={Index}
        options={{
          tabBarIcon: ({ color, size }) => ( // Use color and size for dynamic styling
            <View className='h-full mt-7'>
              <AntDesign name="home" size={32} color={color} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View className='h-full mt-7'>
              <Feather name="user" size={32} color={color} />
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="addBill"
        component={ProfileSetup}
        options={{
          tabBarIcon: ({ color, size }) => ( // Use color and size for dynamic styling
            <View className='h-full mt-7'>
              <AntDesign name="setting" size={32} color={color} />
            </View>
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default HomeTabs;
