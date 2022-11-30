
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import ProfileHeader from '../../components/ProfileCommonComponent/ProfileHeader'
import SwitchInput from '../../components/ProfileCommonComponent/SwitchInput'
import { spacing } from '../../theme/spacing'

export default function Security({ title, backBtn ,text}) {
  
  return (
    <SafeAreaView>
   
    <ScrollView style={styles.detailsView}>
    
    <ProfileHeader backBtn={true} title="Security" />

      <SwitchInput text="Remember me"/>
        
        <SwitchInput text="Face ID"/>
        
        <SwitchInput text="Biometric ID"/>
        
        <SwitchInput text="Google Authentication"/>
        
        <View style={{marginTop:40,marginBottom:40}}>
       
        <Button title="Change Password"/>

          </View>
                    
    </ScrollView>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  detailsView: {      
    padding:spacing[3],
  }
})