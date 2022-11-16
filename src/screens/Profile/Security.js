
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/Button'
import ProfileHeader from '../components/ProfileCommonComponent/ProfileHeader'
import SwitchInput from '../components/ProfileCommonComponent/SwitchInput'
import { spacing } from '../theme/spacing'

export default function Security({ title, backBtn ,text}) {
  
  return (
    <SafeAreaView>
   
    <ScrollView style={styles.detailsView}>
    
    <ProfileHeader backBtn={true} title="Security" />

      <SwitchInput text="Remember me"/>
        
        <SwitchInput text="Face ID"/>
        
        <SwitchInput text="Biometric ID"/>
        
        <SwitchInput text="Google Authentication"/>
        
         <Button title="Change Password"/>
          
    </ScrollView>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  detailsView: {      
    padding:spacing[3],
  }
})