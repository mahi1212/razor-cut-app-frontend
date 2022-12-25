// import React from "react";
// import {
//   SafeAreaView,
//   View,
//   FlatList,
//   StyleSheet,
//   Text,
//   StatusBar,
//   Button,
//   TouchableOpacity,
//   Pressable,
// } from "react-native";
// import { colors } from "../../../theme/colors";
// import { spacing } from "../../../theme/spacing";

// const DATA = [
//   {
//     id: "1",
//     title: "About Us",
//   },
//   {
//     id: "2",
//     title: "Services",
//   },
//   {
//     id: "3",
//     title: "Packages",
//   },
//   {
//     id: "4",
//     title: "Gallery",
//   },
//   {
//     id: "3",
//     title: "Review",
//   },
// ];

// const onPress = (item) => {
//   navigation.navigate({ item });
// };
// export default function Navbar({  }) {

//   const Item = ({ title }) => (
//     <View style={styles.item}>
//       <Pressable
//         onPress={() => {
//           navigation.navigate("", {});
//         }}
//         style={styles.button}
//       >
//         <Text style={styles.title}>{title}</Text>
//       </Pressable>
//     </View>
//   );
//   const renderItem = ({ item }) => <Item title={item.title} />;

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA}
//         horizontal={true}
//         showsHorizontalScrollIndicator={false}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//       />
//     </SafeAreaView>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   title: {
//     padding: 8,
//     fontSize: 20,
//     color: colors.orange,
//   },
//   button: {
//     borderRadius: 50,
//     margin: spacing[3],
//     alignSelf: "center",
//     borderColor: "#FB9400",
//     borderWidth: 2,
//   },
// });
