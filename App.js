import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import store from './src/store';
import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyAh-Sejc5c6mcUWyKM3uBokDBuXBmp8fO4",
  authDomain: "test-auth-fd5cb.firebaseapp.com",
  projectId: "test-auth-fd5cb",
  storageBucket: "test-auth-fd5cb.appspot.com",
  messagingSenderId: "181858470620",
  appId: "1:181858470620:web:fec2d699f006623cbe0219",
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);



export default function App() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require('./assets/fonts/Montserrat-Regular.ttf'),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}} >
        <Navigation />
      </SafeAreaView>
      <StatusBar />
    </Provider>
  );
}