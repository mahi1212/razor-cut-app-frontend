import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

const data = [
  { label: "Male", value: "1" },
  { label: "Female", value: "2" },
  { label: "Others", value: "3" },
];

const DropDown = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={styles.container}>
      {/* {renderLabel()} */}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "#FB9400" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        // search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropdown: {
    justifyContent: "center",
    borderColor: colors.gray,
    marginBottom: 15,
    marginTop: spacing[7],
    borderBottomWidth: 0.5,
  },
  label: {
    backgroundColor: "white",
    left: 22,
    top: 8,
  },

  placeholderStyle: {
    fontSize: 15,
    color: "grey",
    paddingHorizontal: 20,
  },
  selectedTextStyle: {
    fontSize: 14,
    paddingHorizontal: 5,
  },

  iconStyle: {
    width: 20,
    height: 20,
    marginLeft: 20,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
