import { StatusBar } from "expo-status-bar";
import { LogBox, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import store from "./src/store";
// ignore unusefull warning
LogBox.ignoreAllLogs();
export default function App() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigation />
      </SafeAreaView>
      <StatusBar />
    </Provider>
  );
}
