import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { spacing } from '../theme/spacing'

export default function Booking() {
  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: spacing[4]}}>
      <Text>Booking</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})