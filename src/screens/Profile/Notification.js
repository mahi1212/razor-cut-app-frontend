import React from "react";
import { ScrollView, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../components/ProfileCommonComponent/ProfileHeader";
import SwitchInput from "../components/ProfileCommonComponent/SwitchInput";
import { spacing } from "../theme/spacing";


export default function Notification({ title, backBtn ,text}) {
  
  return (
    <SafeAreaView>
   
    <ScrollView style={styles.detailsView}>
    
    <ProfileHeader backBtn={true} title="Notification" />

        
        <SwitchInput text="Sound"/>
        
        <SwitchInput text="Vibrate"/>
        
        <SwitchInput text="Special Offers"/>
        
        <SwitchInput text="Promo & Discount"/>
        
        <SwitchInput text="Payments"/>
        
        <SwitchInput text="Cashback"/>
        
        <SwitchInput text="App Updates"/>
        
        <SwitchInput text="New Service Available"/>
        
        <SwitchInput text="New Tips Available"/>
  
    </ScrollView>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
 
  detailsView:
  {      
   
    padding:spacing[3],
  }
})
