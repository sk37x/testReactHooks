import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, Alert, TextInput } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./css/style";
import firebase from "firebase";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
ForgotScreen = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const [sendToEmail, setSendToEmail] = useState();
	const [errorMessage, setErrorMessage] = useState("");
	const auth = firebase.auth();
	const resetPassword = (value) => {
		const { emailAddress } = value;
		console.log(emailAddress)
		try {
			auth
				.sendPasswordResetEmail(emailAddress.toString())
				.then(function (user) {
					alert("Sending !!!!");
					console.log(user)
					navigation.goBack();
				})
				.catch(function (error) {
					if (error.code === "auth/user-not-found") {
						setErrorMessage("ไม่พบผู้ใช้งานในระบบ");
					} else if (error.code === "auth/invalid-email") {
						setErrorMessage("รูปแบบอีเมลไม่ถูกต้อง");
					} 
					// An error happened.
				});
		} catch (e) {
			setErrorMessage("กรุณากรอกที่อยู่อีเมล");
		}
	};

	return (
		<View style={styles.containerNotCenter}>
			<Text style={styles.title2}>กรอกอีเมล</Text>
			<Input
				placeholder="กรอกอีเมล"
				autoCompleteType="email"
				keyboardType="email-address"
				onChangeText={(text) => {
					// setPassword(text);
					setSendToEmail(text);
				}}
				inputContainerStyle={{
					borderColor: "#00aeed",
					borderWidth: 1,
					padding: 10,
					borderRadius: 30,
				}}
				leftIcon={{ type: "font-awesome", name: "user" }}
				inputStyle={{ marginLeft: 7, fontFamily: "thSarabunNew", fontSize: 28 }}
				// errorMessage={case2}
			/>
			<Text style={{ color: "red" }}>{errorMessage}</Text>
			{errorMessage.length > 0 ? <Text /> : <></>}
			<Button
				title="รีเซ็ตรหัสผ่าน"
				style={{ marginVertical: 20 }}
				onPress={() => resetPassword({ emailAddress: sendToEmail })}
			/>
		</View>
	);
};

export default ForgotScreen;

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
