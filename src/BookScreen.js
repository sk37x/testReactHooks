import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./css/style";
import firebase from "firebase";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack'
import BookBadminton from "./screens/drawer/BookBadminton";
import BookBadmintonDetail from "./screens/drawer/BookBadmintonDetail";


const Stack = createStackNavigator();

BookScreen = (props) => {
	console.log(props)
	return (
		<Stack.Screen>
			<Stack.Screen name='BookBadmintonDetail' component={BookBadmintonDetail}  options={{ title: 'test2' }} />
			{/* {/* <Stack.Screen name='BookBadminton' component={BookBadminton}  options={{ title: props.route.name }} /> */} */}
		</Stack.Screen>
	)
};

export default BookScreen;

// const styles = StyleSheet.create({
//   container: {
//     // height:"50%",
//     backgroundColor: "#fff",
//     // width: "80%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     textAlign: "center",
//     marginVertical: 8,
//   },
//   btn: {
//     width: "95%",
//     marginVertical: 9,
//   },
//   signIn: {
//     marginVertical: 12,
//     width: "95%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
// });
