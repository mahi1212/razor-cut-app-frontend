import React, { useState } from "react";
import { View, Switch, StyleSheet, Pressable, Vibration } from "react-native";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import Text from "../Text/Text";

export default function SwitchInput({ text ,onPress}) {
  const [isEnabled, setIsEnabled] = useState();
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <Pressable onPress={onPress} style={styles.liststyle}>

       <View style={styles.switchField}>
      <Text preset="h6">{text}</Text>
      <Switch
    
        trackColor={{ false: "#C2BEBD", true: "#FCB615" }}
    
        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
    
        ios_backgroundColor="#3e3e3e"
    
        onValueChange={toggleSwitch}
    
        value={isEnabled}
      />
        
  </View>
  </Pressable>
  );
}
const styles = StyleSheet.create({
  switchField: {
    display: "flex",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginVertical: spacing[2],

    paddingVertical: spacing[2],

    borderBottomColor: colors.gray,

    borderBottomWidth: 0.5,
  },
});
