import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Text from '../../text/text'
import { colors } from '../../../theme/colors';
import { Ionicons } from '@expo/vector-icons';


export default function Search() {
  const [searchText, setSearchText] = useState("")
  console.log(searchText)
  const { container, searchContainer } = styles;
  return (
    <View style={container}>
      <View style={searchContainer}>
        <Ionicons name="ios-search-sharp" size={24} color={colors.gray} />
        <TextInput
          onChangeText={(text) =>{setSearchText(text)}}
          keyboardAppearance="default"
          placeholder="Search"
          style={{ marginLeft: 10, fontSize: 16, width: '100%' }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f4f2',
    width: '96%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    marginTop: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    width: '100%',
    paddingHorizontal: 20,
  }
})
