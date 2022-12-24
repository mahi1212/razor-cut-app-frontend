import React, { useState, useMemo } from "react";
import { Calendar } from "react-native-calendars";
import { spacing } from "../theme/spacing";

export default function DatePick(props) {
  const [selected, setSelected] = useState("");
  const marked = useMemo(
    () => ({
      [selected]: {
        selected: true,
        selectedColor: "#222222",
        selectedTextColor: "yellow",
      },
    }),
    [selected]
  );
  return (
    <Calendar
      style={{ marginTop: spacing[4], marginBottom: spacing[4] }}
      markedDates={marked}
      onDayPress={(day) => {
        setSelected(day.dateString);
        props.onDaySelect && props.onDaySelect(day);
      }}
      {...props}
    />
  );
}
