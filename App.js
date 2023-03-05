import { StatusBar } from "expo-status-bar";
import { LogBox, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import Navigation from "./navigation";
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
    <SafeAreaView style={{ flex: 1 }}>
      <Navigation />
      <StatusBar />
    </SafeAreaView>
  );
}
