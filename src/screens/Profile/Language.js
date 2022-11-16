import { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../components/ProfileCommonComponent/ProfileHeader";
import RadioInput from "../components/ProfileCommonComponent/RadioInput";
import Text from "../components/text/text";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

const languageOptions = [
  "Mandarin",
  "Hindi",
  "Spanish",
  "French",
  "Arabic",
  "Bengali",
  "Russian",
];
const suggestedLanguage = ["English(US)", "English(UK)"];

export default function Language({
  label,
  value,
  setValue,
  size = "big",
  backBtn,
  title,
}) {
  const [languageOption, setOption] = useState("English(US)");
  const [language, setLanguage] = useState("");

  return (
    <SafeAreaView>
      <ProfileHeader backBtn={true} title="Language" />

      <ScrollView style={{ padding: spacing[2] }}>
        <View
          style={{ borderBottomColor: colors.gray, borderBottomWidth: 0.5 }}
        >
          <Text preset="h5" style={{ margin: spacing[3], fontWeight: "bold" }}>
            Suggested
          </Text>

          {/* {suggestedLanguage.map((option,index)=>{
              <RadioInput
              key={index}
              label={option}
              value={languageOption}
              setValue={setOption}
              />
            })} */}
          <RadioInput
            label="English(US)"
            value={languageOption}
            setValue={setOption}
          />
          <RadioInput
            label="English(UK)"
            value={languageOption}
            setValue={setOption}
          />
        </View>
        {/* other options */}
        <View>
          <Text preset="h5" style={{ margin: spacing[3], fontWeight: "bold" }}>
            Language
          </Text>

          {languageOptions.map((option, index) => {
            <RadioInput
              key={index}
              label={option}
              value={language}
              setValue={setLanguage}
            />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
