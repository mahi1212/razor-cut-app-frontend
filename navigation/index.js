import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../src/theme/colors";
import { SimpleLineIcons, Octicons, AntDesign } from "@expo/vector-icons";
import Home from "../src/screens/Home/Home";
import Explore from "../src/screens/Explore";
import Inbox from "../src/screens/Inbox";
import Signin from "../src/screens/Signin";
import { useState } from "react";
import Signup from "../src/screens/Signup";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import Bookmark from "../src/screens/Home/Bookmark";
import SearchPage from "../src/screens/Home/SearchPage";
import CatagoryPage from "../src/screens/Home/CatagoryPage";
import SeeAll from "../src/screens/Home/SeeAllPage";
import ShopDetails from "../src/screens/Home/ShopDetails";
import WelcomePage from "../src/screens/WelcomePage";
import OnboardingScreen from "../src/screens/OnboardingScreen";
import Profile from "../src/screens/Profile/Profile";
import EditProfile from "../src/screens/Profile/EditProfile";
import Privacy from "../src/screens/Profile/Privacy";
import Language from "../src/screens/Profile/Language";
import Appointment from "../src/screens/Appointment/Appointment";
import axios from "axios";
import AdminPanel from "../src/screens/AdminPanel/CreateShop";
import DeleteShop from "../src/screens/AdminPanel/DeleteShop";
import UpdateShop from "../src/screens/AdminPanel/UpdateShop";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, TouchableOpacity, View } from "react-native";

const THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

const Tab = createBottomTabNavigator();

const AuthStack = createNativeStackNavigator();
function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="welcome" component={WelcomePage} />
      <AuthStack.Screen name="onboarding" component={OnboardingScreen} />
      <AuthStack.Screen name="Signin" component={Signin} />
      <AuthStack.Screen name="Signup" component={Signup} />
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
      <HomeStack.Screen name="SeeAll" component={SeeAll} />
      <HomeStack.Screen name="shopDetails" component={ShopDetails} />
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
      <BookingStack.Screen name="Booking" component={Appointment} />
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
      <ProfileStack.Screen name="Edit" component={EditProfile} />
      <ProfileStack.Screen name="Privacy" component={Privacy} />
      <ProfileStack.Screen name="Language" component={Language} />
      <ProfileStack.Screen name="Appointment" component={Appointment} />
      {/* <ProfileStack.Screen name="Notification" component={Notification} /> */}
    </ProfileStack.Navigator>
  );
}

const AdminStack = createNativeStackNavigator();
function AdminStackScreen() {
  return (
    <AdminStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminStack.Screen name="Admin" component={AdminPanel} />
      <AdminStack.Screen name="DeleteShop" component={DeleteShop} />
      <AdminStack.Screen name="UpdateShop" component={UpdateShop} />
    </AdminStack.Navigator>
  );
}
function TabBarIcon({ fontFamily, name, color }) {
  if (fontFamily === "AntDesign") {
    return <AntDesign name={name} color={color} size={24} />;
  } else if (fontFamily === "Octicons") {
    return <Octicons name={name} color={color} size={24} />;
  } else if (fontFamily === "MaterialIcons") {
    return <MaterialIcons name={name} color={color} size={24} />;
  } else if (fontFamily === "MaterialCommunityIcons") {
    return <MaterialCommunityIcons name={name} color={color} size={24} />;
  } else {
    return <SimpleLineIcons name={name} color={color} size={24} />;
  }
}
// firebase config by jenny
const firebaseConfig = {
  apiKey: "AIzaSyBqBDYYw1zO6LYFIkbMBbv7X6NGcFdi_WQ",
  authDomain: "razor-cut.firebaseapp.com",
  projectId: "razor-cut",
  storageBucket: "razor-cut.appspot.com",
  messagingSenderId: "162435781340",
  appId: "1:162435781340:web:a4ab7acc5501ae82489a19",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export default function Navigation() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setEmail(user.email);
      } else {
        setUser(null);
      }
    });
  }, []);

  const getUser = () => {
    axios.get(`http://192.168.0.221:5000/users/${email}`)
      .then((res) => {
        setRole(res.data.role);
      });
  };
  getUser();

  // console.log("role", role);
  return (
    <NavigationContainer theme={THEME}>
      {user ? (
        // For admin Navigation
        role === "admin" ? (
          <Tab.Navigator
            screenOptions={{
              headerShown: true,
              headerTitleAlign: "left",
              headerLeft: () => (
                <View style={{ marginLeft: 10 }}>
                  <Image
                    source={require("../assets/images/logo.png")}
                    style={{ width: 40, height: 40 }}
                  />
                </View>
              ),
              // logout function
              headerRight: () => (
                <View style={{ marginRight: 10 }}>
                  <TouchableOpacity
                    onPress={() => {
                      signOut(auth)
                        .then(() => {
                          setUser(null);
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    <MaterialIcons name="logout" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              ),
              tabBarActiveTintColor: "#FD9F1A",
            }}
          >
            <Tab.Screen
              options={{
                title: "Create Shop",
                tabBarIcon: ({ color }) => (
                  <TabBarIcon
                    fontFamily={"MaterialCommunityIcons"}
                    name="hammer-screwdriver"
                    color={color} />
                ),
              }}
              name="CreateTab"
              component={AdminStackScreen}
            />
            <Tab.Screen
              options={{
                title: "Update",
                tabBarIcon: ({ color }) => (
                  <TabBarIcon
                    fontFamily={"MaterialIcons"}
                    name="update"
                    color={color}
                  />
                ),
              }}
              name="UpdateTab"
              component={UpdateShop}
            />
            <Tab.Screen
              options={{
                title: "Delete",
                tabBarIcon: ({ color }) => (
                  <TabBarIcon
                    fontFamily={"MaterialIcons"}
                    name="delete-outline"
                    color={color}
                  />
                ),
              }}
              name="DeleteTab"
              component={DeleteShop}
            />
          </Tab.Navigator>
        ) :
          // user navigation
          (
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#FD9F1A",
              }}
            >
              <Tab.Screen
                options={{
                  title: "Home",
                  tabBarIcon: ({ color }) => (
                    <TabBarIcon fontFamily={"Octicons"} name="home" color={color} />
                  ),
                }}
                name="HomeTab"
                component={HomeStackScreen}
              />
              <Tab.Screen
                options={{
                  title: "Explore",
                  tabBarIcon: ({ color }) => (
                    <TabBarIcon
                      fontFamily={"SimpleLineIcons"}
                      name="location-pin"
                      color={color}
                    />
                  ),
                }}
                name="ExploreTab"
                component={ExploreStackScreen}
              />
              <Tab.Screen
                options={{
                  title: "My Booking",
                  tabBarIcon: ({ color }) => (
                    <TabBarIcon
                      fontFamily={"SimpleLineIcons"}
                      name="notebook"
                      color={color}
                    />
                  ),
                }}
                name="BookingTab"
                component={BookingStackScreen}
              />
              <Tab.Screen
                options={{
                  title: "Inbox",
                  tabBarIcon: ({ color }) => (
                    <TabBarIcon
                      fontFamily={"AntDesign"}
                      name="message1"
                      color={color}
                    />
                  ),
                }}
                name="InboxTab"
                component={InboxStackScreen}
              />

              <Tab.Screen
                options={{
                  title: "Profile",
                  tabBarIcon: ({ color }) => (
                    <TabBarIcon
                      fontFamily={"AntDesign"}
                      name="user"
                      color={color}
                    />
                  ),
                }}
                name="ProfileTab"
                component={ProfileStackScreen}
              />
            </Tab.Navigator>
          ))
        : (
          <AuthStackScreen />
          // <Text> asd</Text>
        )}
    </NavigationContainer>
  );
}
