import { View, TextInput, StyleSheet, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { spacing } from "../../theme/spacing";
import { colors } from "../../theme/colors";
import Button from "../../components/Button";
import ProfileHeader from "../../components/ProfileCommonComponent/ProfileHeader";
import DatePick from "../../components/DatePick";
import Text from "../../components/Text/Text";
import TimePick from "../../components/TimePick";

export default function BookAppointment({ backBtn, props }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  console.log(errors);

  const onSubmit = (data) => {
    console.log(data);
    // const url = `http://192.168.0.106:5000/updateUser`;
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (res.data.insertedId) {
    //       alert("Book successfully");
    //       reset();
    //     }
    //   });
  };

  return (
    <ScrollView style={styles.detailsView}>
      <ProfileHeader backBtn={true} title="Book Appointment" />
      {/* name */}
      <View>
        <Text preset="h5">Name</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textSection}
              onBlur={onBlur}
              placeholder="Enter Your Name"
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="name"
          rules={{ required: true }}
        />
      </View>
      {/* phone number */}
      <View style={{ marginTop: spacing[3] }}>
        <Text preset="h5">Phone Number</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textSection}
              onBlur={onBlur}
              placeholder="Enter Your Phone Number"
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="number"
          rules={{ required: true }}
        />
      </View>
      <View style={{ marginTop: spacing[3] }}>
        <Text preset="h5">Select Date</Text>
        <Controller
          control={control}
          render={({ field }) => <DatePick />}
          name="date"
          rules={{ required: true }}
        />
      </View>
      
      <Button onPress={handleSubmit(onSubmit)} title="Continue" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  detailsView: {
    padding: spacing[3],
  },

  textSection: {
    marginVertical: spacing[3],

    paddingVertical: spacing[3],

    borderBottomColor: colors.gray,

    borderBottomWidth: 0.5,
  },
});
