import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '../components/text/text'
import { colors } from '../theme/colors'
import { spacing } from '../theme/spacing'

export default function Home() {
  return (
    <View style={{flex: 1,  marginHorizontal: spacing[4], alignItems: 'center', justifyContent:'center' }}>
      <Text preset='h1' style={{ width: '100%', textAlign:'center', backgroundColor: colors.gray}}>THIS IS OUR PRESET</Text>
      <Text preset='h1'>Home</Text>
      <Text preset='title'>Title</Text>
      <Text preset='info'>info</Text>
      <Text preset='catagory'>Catagory</Text>

    </View>
  )
}

const styles = StyleSheet.create({})