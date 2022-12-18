import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { EvilIcons } from "@expo/vector-icons";

export default function Button3({ title, onPress, customStyles}) {
  // const [isFocus, setIsFocus] = useState(false);
  // const [value, setValue] = useState(null);

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.button,
          customStyles,
          // isFocus && { backgroundColor: "#FFF7EB", borderColor: "#FB9400" },
        ]}
        
        onPress={onPress}
        // placeholder={!isFocus ? 'Select item' : '...'}
        // value={value}
        // // data={data}
        // onFocus={() => setIsFocus(true)}
        // onBlur={() => setIsFocus(false)}
        // onChange={item => {
        //   setValue(item.value);
        //   setIsFocus(false);
        // }}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 350,
    height: 55,
    backgroundColor: "FFFFFF",
    justifyContent: "center",
    borderColor: "grey",
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 30,
  },
  title: {
    // fontSize: 10,
    color: "grey",
    fontSize: 15,
    // alignSelf: "center",
    paddingHorizontal: 20,
  },
});
