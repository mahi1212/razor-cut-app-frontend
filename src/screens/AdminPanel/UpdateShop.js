import { KeyboardAvoidingView, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import Text from '../../components/Text/Text'

export default function UpdateShop() {
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 10 }}>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <Text preset='catagory'>asd</Text>

          <StatusBar style='auto' />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}