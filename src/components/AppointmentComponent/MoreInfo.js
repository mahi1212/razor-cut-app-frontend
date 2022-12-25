import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { spacing } from '../../theme/spacing';
import { colors } from '../../theme/colors';
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function MoreInfo({title,name}) {
  return (
    <View style={{padding:spacing[2],marginBottom:10,marginTop:spacing[3]}}>
      <View style={styles.catagoryImage}>
      <MaterialCommunityIcons name={name} size={24}  style={{ color: colors.orange }} />
      </View>
      <View style={{marginLeft:6}}>
        <Text preset="title">{title}</Text>
      </View>
    </View>
  
  )
}
const styles = StyleSheet.create({
  
    catagoryImage: {
      marginVertical: spacing[2],
      borderRadius: 50,
      width: 55,
      height: 55,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FDF1DF",
      
    }
  });
  