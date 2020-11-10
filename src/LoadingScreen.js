import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./css/style";
import firebase from "firebase";
import { useNavigation, useRoute } from "@react-navigation/native";

const Splash = () => (
	<View style={styles.container}>
		<Image
			style={{ width: 300, height: 320, resizeMode: "stretch" }}
			source={require("./images/logo.jpg")}
		/>
		{/* <Button title="test" onPress={() => navigation.navigate("LoginScreen")} /> */}
	</View>
);

LoadingScreen = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const firebaseRef = firebase.database().ref();
	useEffect(() => {
		let a = () => {
			firebase.auth().onAuthStateChanged(async (user) => {
				if (user) {
					let findRole = await firebaseRef
						.child("users/" + user.uid)
						.once("value");
					console.log(findRole);
					if (user.uid === "KuRtZKtUqheEoRaT6mZmBvDLt8z2") {
						navigation.reset({
							index: 0,
							routes: [
								{
									name: "AdminFeed",
									params: { someParam: "Admin" },
								},
							],
						});
					} else {
						navigation.reset({
							index: 0,
							routes: [
								{
									name: "Feed",
									params: { someParam: "Param1", user: { ...user.toJSON() } },
								},
							],
						});
					}
				} else {
					navigation.reset({
						index: 0,
						routes: [
							{
								name: "LoginScreen",
								params: { someParam: "Param1" },
							},
						],
					});
				}
			});
		};

		setTimeout(() => a(), 1000);
		// return firebaseRef.off();
	}, []);

	return Splash();
};

export default LoadingScreen;

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
