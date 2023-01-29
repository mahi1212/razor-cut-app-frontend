import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Text from '../../components/Text/Text'
import { StatusBar } from 'expo-status-bar'
import Picker from 'react-native-picker';

export default function AdminPanel() {

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView >
          <Text preset='catagory' style={styles.text}>Shop Details</Text>
          <TextInput placeholder='Shop Name' style={styles.input} />
          <TextInput placeholder='IMAGE URL' style={styles.input} />
          <TextInput placeholder='Mobile' style={styles.input} />
          <TextInput placeholder='Shop Address (ex: Bondor)' style={styles.input} />
          <TextInput placeholder='Street Address (ex: Jail Road, House - 32/2, Bondor, Sylhet)' style={styles.input} />
          <TextInput placeholder='Website' style={styles.input} />
          <TextInput placeholder='Average waiting time' style={styles.input} />
          <TextInput placeholder='Status' style={styles.input} />
          <TextInput placeholder='Working hours (ex: 10:00 AM - 11:00 PM' style={styles.input} />
          <TextInput placeholder='About' multiline style={styles.input} />

          <Text preset='catagory' style={styles.text}>Get it from - Google</Text>
          <TextInput placeholder='Latitude' style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10 }} />
          <TextInput placeholder='Longitude' style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10 }} />

        </KeyboardAvoidingView>
        <StatusBar style='auto' />
      </ScrollView>
    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  text: {
    marginVertical: 10,
    color: '#999',
    textTransform: 'uppercase',
    fontSize: 16
  }
})