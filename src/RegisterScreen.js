import React, { useState, useEffect } from "react";
import {
	Image,
	StyleSheet,
	Text,
	View,
	Alert,
	TextInput,
	SafeAreaView,
} from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./css/style";
import * as Font from "expo-font";
import firebase, { database } from "firebase";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createStackNavigator();
RegisterScreen = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const [dataRegis, setDataRegis] = useState({
		email: "",
		name: "",
		password: "",
		passwordConf: "",
	});
	const [validError, setValidError] = useState({
		case1: "",
		case2: "",
		case3: "",
		case4: "",
		case5: "",
	});
	const [case1, setCase1] = useState("");
	const [case2, setCase2] = useState("");
	const [case3, setCase3] = useState("");
	const [case4, setCase4] = useState("");
	const [case5, setCase5] = useState("");
	const [case6, setCase6] = useState("");
	const [userEmail, setUserEmail] = useState("");

	const [count, setCount] = useState(0);

	const auth = firebase.auth();
	const createUser = (value) => {
		const { email, password, name } = value;
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((user) => {
				setCase6("");
				user
					.updateProfile({
						displayName: name,
					})
					.then(function (success) {
						// Update successful.
						console.log(success);
					})
					.catch(function (error) {
						// An error happened.
						console.log(error);
					});
			})
			.catch(function (error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorCode, errorMessage);
				if (errorCode == "auth/invalid-email") {
					setCase6("รูปแบบอีเมลไม่ถูกต้อง");
				}
			});
	};

	const validate = (value) => {
		const { email, name, password, passwordConf } = value;
		let checkErr = 0;
		if (email.length == 0) {
			checkErr++;
			setCase1("กรุณากรอกอีเมล");
			setValidError((state) => {
				state.case1 = "กรุณากรอกอีเมล";
				return state;
			});
		} else {
			setCase1("");
			setValidError((state) => {
				state.case1 = "";
				return state;
			});
		}

		if (name.length == 0) {
			checkErr++;
			setCase2("กรุณากรอกชื่อ");
			setValidError((state) => {
				state.case2 = "กรุณากรอกชื่อ";
				return state;
			});
		} else {
			setCase2("");
			setValidError((state) => {
				state.case2 = "";
				return state;
			});
		}
		if (password.length == 0) {
			checkErr++;
			setCase3("กรุณากรอกรหัสผ่าน");
			setValidError((state) => {
				state.case3 = "กรุณากรอกรหัสผ่าน";
				return state;
			});
		} else {
			setCase3("");
			setValidError((state) => {
				state.case3 = "";
				return state;
			});
		}
		if (passwordConf.length == 0) {
			checkErr++;
			setCase4("กรุณากรอกยืนยันรหัสผ่าน");
			setValidError((state) => {
				state.case4 = "กรุณากรอกยืนยันรหัสผ่าน";
				return state;
			});
		} else {
			setCase4("");
			setValidError((state) => {
				state.case4 = "";
				return state;
			});
		}

		if (
			email.length > 0 &&
			name.length > 0 &&
			password.length > 0 &&
			passwordConf.length > 0
		) {
			if (password !== passwordConf) {
				checkErr++;
				setCase5("รหัสยืนยันไม่ตรงกับรหัสผ่าน");
				setValidError((state) => {
					state.case5 = "รหัสยืนยันไม่ตรงกับรหัสผ่าน";
					return state;
				});
			} else {
				setCase5("");
				setValidError((state) => {
					state.case5 = "";
					return state;
				});
			}
		}

		if (checkErr == 0) {
			createUser(value);
		}
	};

	useEffect(() => {}, []);

	return (
		<SafeAreaView style={[styles.container]}>
			<Input
				placeholder="อีเมล"
				autoCompleteType="email"
				keyboardType="email-address"
				onChangeText={(text) => {
					// setPassword(text);
					setDataRegis((state) => {
						state.email = text;
						return state;
					});
				}}
				inputContainerStyle={{
					borderColor: "#00aeed",
					borderWidth: 1,
					padding: 10,
					borderRadius: 30,
				}}
				leftIcon={{ type: "font-awesome", name: "envelope" }}
				inputStyle={{ marginLeft: 7, fontFamily: "thSarabunNew", fontSize: 28 }}
				errorMessage={case1 + case6}
			/>
			<Input
				placeholder="ชื่อ"
				autoCompleteType="name"
				keyboardType="default"
				onChangeText={(text) => {
					// setPassword(text);
					setDataRegis((state) => {
						state.name = text;
						return state;
					});
				}}
				inputContainerStyle={{
					borderColor: "#00aeed",
					borderWidth: 1,
					padding: 10,
					borderRadius: 30,
				}}
				leftIcon={{ type: "font-awesome", name: "user" }}
				inputStyle={{ marginLeft: 7, fontFamily: "thSarabunNew", fontSize: 28 }}
				errorMessage={case2}
			/>
			<Input
				placeholder="รหัสผ่าน"
				autoCompleteType="password"
				secureTextEntry={true}
				onChangeText={(text) => {
					// setPassword(text);
					setDataRegis((state) => {
						state.password = text;
						return state;
					});
				}}
				inputContainerStyle={{
					borderColor: "#00aeed",
					borderWidth: 1,
					padding: 10,
					borderRadius: 30,
				}}
				leftIcon={<Icon name="lock" size={24} color="black" />}
				// errorMessage={isAltPassword === 1 ? "กรุณาใส่ Password" : ""}
				inputStyle={{ marginLeft: 7, fontFamily: "thSarabunNew", fontSize: 28 }}
				errorMessage={case3}
			/>
			<Input
				placeholder="ยืนยันรหัสผ่าน"
				autoCompleteType="password"
				secureTextEntry={true}
				onChangeText={(text) => {
					// setPassword(text);
					setDataRegis((state) => {
						state.passwordConf = text;
						return state;
					});
				}}
				inputContainerStyle={{
					borderColor: "#00aeed",
					borderWidth: 1,
					padding: 10,
					borderRadius: 30,
				}}
				leftIcon={<Icon name="lock" size={24} color="black" />}
				// errorMessage={isAltPassword === 1 ? "กรุณาใส่ Password" : ""}
				inputStyle={{ marginLeft: 7, fontFamily: "thSarabunNew", fontSize: 28 }}
				errorMessage={case4}
			/>

			<View style={[styles.btn, { justifyContent: "flex-start" }]}>
				<Text
					style={[
						styles.title2,
						{ color: "red", justifyContent: "flex-start" },
					]}
				>
					{case5}
				</Text>
			</View>
			<View style={styles.btn}>
				<TouchableOpacity
					onPress={() => validate(dataRegis)}
					style={{
						backgroundColor: "#BEEEFF",
						alignItems: "center",
						justifyContent: "center",
						height: 60,
						borderColor: "#292268",
						borderWidth: 2,
						borderRadius: 50,
					}}
				>
					<Text
						style={{ color: "black", fontFamily: "thSarabunNew", fontSize: 30 }}
					>
						สมัครสมาชิก
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default RegisterScreen;

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
