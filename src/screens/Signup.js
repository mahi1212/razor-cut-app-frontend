// import { View, Text, Pressable, StyleSheet } from "react-native";
// import React, { useState } from "react";
// import Input from "../components/input";
// import Checkbox from "expo-checkbox";
// import Button from "../components/button";
// import SmallButton from "../components/smallButton";
// import { AntDesign } from "@expo/vector-icons";
// import { FontAwesome } from "@expo/vector-icons";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import auth from "@react-native-firebase/auth";

// export default function Signup({ navigation }) {
//   const navigateToSignIn = () => {
//     navigation.navigate("Signin");
//   };

//   const [agree, setAgree] = useState(false);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   //call post
//   const saveUser = (email, password) => {
//     const user = { email, password };
//     fetch("http://localhost:5012/users", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(user),
//     }).then();
//   };

//   //hadle signup function

//   const handleSignup = async () => {
//     try {
//       const result = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       saveUser(email, password);
//       // const docRef = await addDoc(collection(db,"users2"),{
//       //   email:email,
//       //   password:password,
//       //   uid:result.user.uid,
//       //   // remember:remember,
//       // })
//       console.log("result---->", result);
//     } catch (error) {
//       console.log(error, "error-->");
//     }
//   };

//   return (
//     <>
//       <View>
//         <Text style={styles.title1}>Create Your</Text>
//         <Text style={styles.title1}>Account</Text>
//       </View>
//       <View style={{ paddingHorizontal: 18, paddingVertical: 25 }}>
//         <Input placeholder="Email" title={"phone"} />
//         <Input placeholder="Password" secureTextEntry />
//         <View>
//           <Checkbox
//             value={agree}
//             onValueChange={() => setAgree(!agree)}
//             color={agree ? "#FB9400" : undefined}
//             style={styles.checkbox}
//           />
//           <Text style={styles.checkboxtext}>Remember me</Text>
//           <Button onPress={() => handleSignup()} title={"Sign up"} />
//         </View>
//         <View>
//           <Text style={styles.ortext}>
//             ________________ or continue with _______________{" "}
//           </Text>
//         </View>
//         <View style={styles.view1}>
//           <SmallButton
//             title={[<FontAwesome name="phone" size={48} color="black" />]}
//           />
//           <View style={styles.view2}>
//             <SmallButton
//               title={[<AntDesign name="google" size={48} color="#4285F4" />]}
//             />
//           </View>
//           <View style={styles.view3}>
//             <SmallButton
//               title={[<FontAwesome name="apple" size={48} color="black" />]}
//             />
//           </View>
//         </View>
//       </View>

//       <View>
//         <Pressable
//           onPress={() => {
//             navigation.navigate("Signin");
//           }}
//           style={{ marginTop: "5%", alignSelf: "center" }}
//         >
//           <Text>
//             Already have an account?{""}
//             <Text
//               style={styles.button}
//             >
//               Sign in
//             </Text>
//           </Text>
//         </Pressable>
//       </View>
//     </>
//   );
// }
// const styles = StyleSheet.create({
//   title1: {
//     fontSize: 58,
//     alignSelf: "flex-start",
//     fontWeight: "700",
//     paddingHorizontal: 20,
//   },
//   title2: {
//     fontSize: 58,
//     alignSelf: "flex-start",
//     marginTop: "-5%",
//     fontWeight: "700",
//     paddingHorizontal: 20,
//   },
//   checkbox: {
//     alignSelf: "center",
//     marginRight: "40%",
//     marginBottom: "5%",
//     marginTop: 0,
//   },
//   checkboxtext: {
//     marginTop: "-10%",
//     alignSelf: "center",
//     marginBottom: "20%",
//   },
//   ortext: {
//     color: "grey",
//     marginTop: "30%",
//     alignSelf: "center",
//     fontSize: 20,
//   },
//   view1: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: "10%",
//     marginLeft: "10%",
//   },
//   view2: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: "-22%",
//     marginLeft: "33.5%",
//   },
//   view3: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: "-22%",
//     marginLeft: "66%",
//   },
//   button:{
//     color: "#FB9400",
//     fontWeight: "bold", 
//     marginLeft: "6%" }
  
// });