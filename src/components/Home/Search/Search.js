import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Text from '../../text/text'
import { colors } from '../../../theme/colors';
import { Ionicons } from '@expo/vector-icons';


export default function Search(props) {
  const [searchText, setSearchText] = useState("")
  // console.log(searchText)
  const { container, searchContainer } = styles;
  return (
    <View style={container}>
      <View style={searchContainer}>
        <Ionicons name="ios-search-sharp" size={24} color={colors.gray} />
        <TextInput
          onChangeText={(text) =>{props.setSearchText(text)}}
          value={props.searchText}
          returnKeyType = {"next"}
          keyboardAppearance="default"
          autoFocus = {true}
          placeholder="Search"
          style={{ marginLeft: 10, fontSize: 16, width: '100%' }} />
      </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    width: '100%',
    paddingHorizontal: 20,
  }
})
