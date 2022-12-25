import { View, Text } from "react-native";
import React from "react";
import { colors } from "../../../theme/colors";
import { Entypo } from "@expo/vector-icons";
import { spacing } from "../../../theme/spacing";

export default function Aboutus() {
  return (
    <View>
      <Text style={{ margin: spacing[2] }}>
        {" "}
        At aliquyam kasd dolores sadipscing ipsum dolor et aliquyam, dolore
        eirmod duo dolor eos dolores et et tempor. Dolor clita.
      </Text>

      {/* working hours */}
      <View style={{ margin: spacing[2] }}>
        <Text style={{ fontSize: 18 }}>Working Hours</Text>

        <View style={{ display: "flex", flexDirection: "row", padding: 5 }}>
          <Text style={{ color: colors.gray, marginRight: spacing[6] }}>
            Monday - Friday{" "}
          </Text>
          <Text>:08.00 AM - 21:00 PM</Text>
        </View>

        <View style={{ display: "flex", flexDirection: "row", padding: 4 }}>
          <Text style={{ color: colors.gray, marginRight: spacing[4] }}>
            Saturday- Sunday{" "}
          </Text>
          <Text>:10.00 AM - 20:00 PM</Text>
        </View>
      </View>

      {/* end */}
      {/* contact us */}
      <View style={{ margin: spacing[2] }}>
        <Text style={{ fontSize: 19, marginBottom: 5 }}>Contact us</Text>
        <Text
          style={{ color: colors.orange, fontSize: 20, fontWeight: "bold" }}
        >
          {" "}
          017777777
        </Text>
      </View>
      {/* end */}

      {/* location */}
      <View style={{ margin: spacing[2] }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: spacing[3],
          }}
        >
          <Text style={{ fontSize: 19, marginBottom: 5 }}>Our Address</Text>
          <Text style={{ color: colors.orange, fontWeight: "bold" }}>
            See on Maps
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: spacing[3],
          }}
        >
          <Entypo
            name="location"
            size={24}
            style={{ color: colors.orange, marginRight: spacing[2] }}
          />
          <Text>Sylhet,Bangladesh</Text>
        </View>

      </View>
    </View>
  );
}
