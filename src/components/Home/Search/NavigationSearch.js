import { Pressable, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Text from '../../Text/Text'
import { colors } from '../../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import theme from '../../../config/theme';
import { useContext } from 'react';
import themeContext from '../../../config/themeContext';


export default function NavigationSearch() {
  const { container, navigationSearchContainer } = styles;
  const navigation = useNavigation()
 //modes
  const theme=useContext(themeContext)

  return (
    <View style={container}>
      <Pressable onPress={
        () => {
            navigation.navigate('SearchPage')
        }
      } style={navigationSearchContainer}>
        <Ionicons name="ios-search-sharp" size={24} color='Black' />
        <Text preset="h3" style={{ marginLeft: 10, fontSize: 16, width: '100%', color: 'gray'}}>Search shop</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f4f2',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    marginTop: 15,
  },
  navigationSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    width: '100%',
    paddingHorizontal: 20,
  }
})
