import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { spacing } from '../theme/spacing'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProfileScreen from './Profile/ProfileScreen'

export default function Profile() {
  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: spacing[4]}}>

    <ProfileScreen/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})