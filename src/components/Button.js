import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Text from "./text/text";

export default function Button({ title, onPress, customStyles }) {
  return (
   
   <View>
   
      <TouchableOpacity style={[styles.button, customStyles]} onPress={onPress}>
   
        <Text style={styles.title}>{title}</Text>
   
      </TouchableOpacity>
   
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    width:" 100%",
    height: 50,
    backgroundColor: "#FB9400",
    alignSelf:'center',
    marginTop:40
    
  },
  title: {
    fontSize: 16,
    color:'white',
    fontSize:20,
    alignSelf:'center',
    marginTop:10,
    justifyContent:'center'
  },
});
