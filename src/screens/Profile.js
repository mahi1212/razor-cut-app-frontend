import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { spacing } from '../theme/spacing'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: spacing[4]}}>
      <Text>Profile</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})