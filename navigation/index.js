import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../src/theme/colors";
import { SimpleLineIcons, Octicons, AntDesign } from '@expo/vector-icons';
import Home from "../src/screens/Home";
import Explore from "../src/screens/Explore";
import Booking from "../src/screens/Booking";
import Inbox from "../src/screens/Inbox";
import Profile from "../src/screens/Profile";
import Bookmark from "../src/screens/Bookmark";
import SearchPage from "../src/screens/SearchPage";
import CatagoryPage from "../src/screens/CatagoryPage";
import Signin from "../src/screens/Signin";
import Signup from "../src/screens/Signup";
import { useState } from "react";
import SeeAllPage from "../src/screens/SeeAllPage";

const THEME = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white'
    }
}

const Tab = createBottomTabNavigator();

const AuthStack = createNativeStackNavigator();
function AuthStackScreen() {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="signin" component={Signin} />
            <AuthStack.Screen name="signup" component={Signup} />
        </AuthStack.Navigator>
    );
}
const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="home" component={Home} />
            <HomeStack.Screen name="Bookmark" component={Bookmark} />
            <HomeStack.Screen name="SearchPage" component={SearchPage} />
            <HomeStack.Screen name="CatagoryPage" component={CatagoryPage} />
            <HomeStack.Screen name="SeeAll" component={SeeAllPage} />
        </HomeStack.Navigator>
    );
}

const ExploreStack = createNativeStackNavigator();
function ExploreStackScreen() {
    return (
        <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
            <ExploreStack.Screen name="Explore" component={Explore} />
        </ExploreStack.Navigator>
    );
}

const BookingStack = createNativeStackNavigator();
function BookingStackScreen() {
    return (
        <BookingStack.Navigator screenOptions={{ headerShown: false }}>
            <BookingStack.Screen name="Booking" component={Booking} />
        </BookingStack.Navigator>
    );
}

const InboxStack = createNativeStackNavigator();
function InboxStackScreen() {
    return (
        <InboxStack.Navigator screenOptions={{ headerShown: false }}>
            <InboxStack.Screen name="Inbox" component={Inbox} />
        </InboxStack.Navigator>
    );
}

const ProfileStack = createNativeStackNavigator();
function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name="Profile" component={Profile} />
        </ProfileStack.Navigator>
    );
}

function TabBarIcon({ fontFamily, name, color }) {
    if (fontFamily === 'AntDesign') {
        return <AntDesign name={name} color={color} size={24} />
    } else if (fontFamily === 'Octicons') {
        return <Octicons name={name} color={color} size={24} />
    } else {
        return <SimpleLineIcons name={name} color={color} size={24} />
    }
}

export default function Navigation() {
    const [user, setUser] = useState('Mahi');

    return (

        <NavigationContainer theme={THEME}>
            {user ?
                (<Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#FD9F1A' }}>
                    <Tab.Screen
                        options={{
                            title: "Home",
                            tabBarIcon: ({ color }) => <TabBarIcon
                                fontFamily={'Octicons'}
                                name="home"
                                color={color}
                            />
                        }}
                        name="HomeTab" component={HomeStackScreen}
                    />
                    <Tab.Screen
                        options={{
                            title: "Explore",
                            tabBarIcon: ({ color }) => <TabBarIcon
                                fontFamily={'SimpleLineIcons'}
                                name="location-pin"
                                color={color}
                            />
                        }}
                        name="ExploreTab" component={ExploreStackScreen}
                    />
                    <Tab.Screen
                        options={{
                            title: "My Booking",
                            tabBarIcon: ({ color }) => <TabBarIcon
                                fontFamily={'SimpleLineIcons'}
                                name="notebook"
                                color={color}
                            />
                        }}
                        name="BookingTab" component={BookingStackScreen}
                    />
                    <Tab.Screen
                        options={{
                            title: "Inbox",
                            tabBarIcon: ({ color }) => <TabBarIcon
                                fontFamily={'AntDesign'}
                                name="message1"
                                color={color}
                            />
                        }}
                        name="InboxTab" component={InboxStackScreen}
                    />

                    <Tab.Screen
                        options={{
                            title: "Profile",
                            tabBarIcon: ({ color }) => <TabBarIcon
                                fontFamily={'AntDesign'}
                                name="user"
                                color={color}
                            />
                        }}
                        name="ProfileTab" component={ProfileStackScreen}
                    />
                </Tab.Navigator>) :
                (
                    <AuthStackScreen />
                    
                )   
            }
        </NavigationContainer>
    )

}