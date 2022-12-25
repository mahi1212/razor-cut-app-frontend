import { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../../components/Text/Text";
import ProfileHeader from "../../components/ProfileCommonComponent/ProfileHeader";
import RadioInput from "../../components/ProfileCommonComponent/RadioInput";
import { spacing } from "../../theme/spacing";
import { colors } from "../../theme/colors";

const languageOptions  = [
  {
    id: "1",
    name: "Bengali",
  },
  {
    id: "2",
    name: "Hindi",
  },
  {
    id: "3",
    name: "Spanish",
  },
  {
    id: "4",
    name: "Arabic",
  },
  {
    id: "5",
    name: "Mandarin",
  },
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

           {suggestedLanguage.map((option,index)=>{
            return (
              <RadioInput
              key={index}
              label={option}
              value={languageOption}
              setValue={setOption}
              />
            )
            })} 
        </View>
        {/* other options */}
        <View>
          <Text preset="h5" style={{ margin: spacing[3], fontWeight: "bold" }}>
            Language
          </Text>
          {languageOptions.map((languagename) => {
            return (
                <RadioInput
                  label={languagename.name}
                  value={language}
                  setValue={setLanguage}
                />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
