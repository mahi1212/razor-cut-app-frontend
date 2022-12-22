import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import store from './src/store';
import { initializeApp, getApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBqBDYYw1zO6LYFIkbMBbv7X6NGcFdi_WQ",
  authDomain: "razor-cut.firebaseapp.com",
  projectId: "razor-cut",
  storageBucket: "razor-cut.appspot.com",
  messagingSenderId: "162435781340",
  appId: "1:162435781340:web:a4ab7acc5501ae82489a19"
};
const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);



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