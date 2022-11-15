import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '../components/text/text'
import { colors } from '../theme/colors'
import { spacing } from '../theme/spacing'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Home/Header/Header'
import Search from '../components/Home/Search/Search'

export default function Home() {
  return (
    <SafeAreaView style={{flex: 1,  marginHorizontal: spacing[2],}}>
      <View style={styles.container}>
        <Header />
        <Search />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})