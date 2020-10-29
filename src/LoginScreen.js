import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./css/style";
import * as firebase from "firebase";
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Font from "expo-font";

class LoginScreen2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			altUsername: 0,
			altPassword: 0,
			loading: false,
		};
		this.changeElement = this.changeElement.bind();
		this.checkUserPass = this.checkUserPass.bind();
	}

	checkUserPass = (username, password) => {
		try {
			console.log("HelloWorld");
			firebase
				.auth()
				.signInWithEmailAndPassword(username, password)
				.then((response) => {
					console.log(response);
				}).catch((err) => {
					console.log(err)
				})
		} catch (err) {
			console.log(err.toString());
		}
	};

	// checkUserPass = (username, password) => {
	//     ((!username || !password) && Alert.alert("กรุณากรอก username / password ให้เรียบร้อย"));
	// }

	changeElement = (...toSet) => {
		const { username, password } = this.state;
		toSet[0] == 0
			? this.setState({ altUsername: 1 })
			: this.setState({ altUsername: 0 });
		toSet[1] == 0
			? this.setState({ altPassword: 1 })
			: this.setState({ altPassword: 0 });
		if (toSet[0] == 0 && toSet[1] == 0) {
			this.checkUserPass(username, password);
		} else {
			this.checkUserPass(username, password);
		}
	};




	componentDidMount() {
		setTimeout(() => {
			this.splashSc();
		}, 1500);
	}

	componentDidUpdate() {
		//   this.checkIfLoggedIn();
	}

	splashSc = () => {
		this.setState({ loading: true });
	};

	test = (e) => {
		console.log(e);
		console.log("TEST-----");
	};

	checkIfLoggedIn = () => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				console.log(this);
				// this.props.navigation.push("Feed", { userData: user });
			}
		});
	};

	componentWillUnmount() {
		this.splashSc();
		// this.checkIfLoggedIn();
    }
    
    

	render() {
		let { username, password, altUsername, altPassword } = this.state;
		return this.state.loading ? (
			<View style={styles.container}>
				<Text
					style={{
						justifyContent: "flex-start",
						width: "100%",
						marginVertical: 10,
					}}
				>
					เข้าสู่ระบบ
				</Text>
				<Input
					placeholder="Username"
					autoCompleteType="username"
					onChangeText={(username) => {
						this.setState({ username });
					}}
					leftIcon={<Icon name="user" size={24} color="black" />}
					// errorStyle={{borderColor:"black", borderWidth: 3}}
					errorMessage={altUsername === 1 ? "กรุณาใส่ Username" : ""}
					style={
						altUsername === 1
							? { borderColor: "red", borderWidth: 0 }
							: { borderWidth: 0 }
					}
					label="Username"
				/>
				<Input
					placeholder="Password"
					autoCompleteType="password"
					secureTextEntry={true}
					onChangeText={(password) => {
						this.setState({ password });
					}}
					leftIcon={<Icon name="lock" size={24} color="black" />}
					label="Password"
					style={
						altPassword === 1 ? { borderColor: "red", borderWidth: 0 } : ""
					}
					errorMessage={altPassword === 1 ? "กรุณาใส่ Password" : ""}
				/>
				<View style={styles.btn}>
					<Button
						onPress={(event) => this.changeElement(username, password)}
						title="เข้าสู่ระบบ"
						buttonStyle={{ backgroundColor: "#7ad669" }}
						accessibilityLabel="Learn more about this purple button"
					/>
				</View>
				<View style={styles.signIn}>
					<Text>ลืมรหัสผ่าน ?</Text>
					<Text>สมัครสมาชิก</Text>
				</View>
			</View>
		) : (
			Splash()
		);
	}
}
const Separator = () => {
	<View style={styles.separator} />;
};

const Splash = () => (
	<View style={styles.container}>
		<Image
			style={{ width: 300, height: 320, resizeMode: "stretch" }}
			source={require("./images/logo.jpg")}
		/>
		{/* <Button title="test" onPress={() => navigation.navigate("LoginScreen")} /> */}
	</View>
);


import { AuthContext } from './AuthContext'
import { TouchableOpacity } from "react-native-gesture-handler";



LoginScreen = () => {
	const { signIn } = React.useContext(AuthContext)
	// console.log(signIn)
    const navigation = useNavigation();
    const route = useRoute();
    const [isLoading, setLoading] = useState(true);
    const [isUsername, setUsername] = useState("");
    const [isPassword, setPassword] = useState("");
    const [isAltUsername, setAltUsername] = useState(0);
    const [isAltPassword, setAltPassword] = useState(0);


	// const _loadingFont = async () => {
	// 	await Font.loadAsync({
	// 		thSarabunNew: require("../assets/font/THSarabunNew.ttf"),
	// 	});
	// };
	
    useEffect(() => {

	})
	

	const checkIfLoggedIn = () => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				navigation.push("Feed", { userData: 'yes' });
			}
		});
	};
	const checkUserPass = (username, password) => {
		try {
			console.log("HelloWorld");
			firebase
				.auth()
				.signInWithEmailAndPassword(username, password)
				.then((response) => {
					console.log(response);
				}).catch((err) => {
					const errorCode = err.code;
					console.log(errorCode);
					if(errorCode === 'auth/user-not-found'){
						alert('ข้อมูลอีเมลหรือรหัสผ่านไม่ถูกต้อง')
					} else if(errorCode === 'auth/wrong-password') {
						alert('ข้อมูลอีเมลหรือรหัสผ่านไม่ถูกต้อง')
					} else if(errorCode === 'auth/invalid-email'){
						alert('รูปแบบอีเมลไม่ถูกต้อง')
					}
				})
		} catch (err) {
			console.log(err.toString());
		}
	};
    const changeElement = (...toSet) => {
		toSet[0] == 0
			? setAltUsername(1)
			: setAltUsername(0);
		toSet[1] == 0
			? setAltPassword(1)
			: setAltPassword(0);
		if (toSet[0] == 0 && toSet[1] == 0) {
			checkUserPass(toSet[0], toSet[1]);
		} else {
			checkUserPass(toSet[0], toSet[1]);
		}
	};
	return (
		<View style={styles.container}>
			<Image source={require('./images/logoLogin.jpg')} style={styles.resizeImage} />
			{/* <Text
				style={[styles.title2, {
					justifyContent: "flex-start",
					width: "100%",
					marginVertical: 10,
				}]}
			>
				เข้าสู่ระบบ
			</Text> */}
			<Text />
			<Input
				placeholder="อีเมล"
				autoCompleteType="username"
				onChangeText={(text) => {
					setUsername(text)
				}}
				leftIcon={<Icon name="user" size={24} color="black" />}
				// errorStyle={{borderColor:"black", borderWidth: 3}}
				errorMessage={isAltUsername === 1 ? "กรุณาใส่ Username" : ""}
				inputContainerStyle={{borderColor:'#00aeed', borderWidth:1, padding:10, borderRadius:30}}
				// style={
				// 	isAltUsername === 1
				// 		? { borderColor: "red", borderWidth: 0 }
				// 		: { borderWidth: 0 }
				// }
				label={<Text style={[styles.label]}>อีเมล์ผู้ใช้งาน</Text>}
				inputStyle={{marginLeft:7, fontFamily: 'thSarabunNew', fontSize: 28}}
				/>
			<Input
				placeholder="รหัสผ่าน"
				autoCompleteType="password"
				secureTextEntry={true}
				onChangeText={(text) => {
					setPassword(text);
				}}
				leftIcon={<Icon name="lock" size={24} color="black" />}
				label={<Text style={[styles.label]}>รหัสผ่าน</Text>}
				inputContainerStyle={{borderColor:'#00aeed', borderWidth:1, padding:10, borderRadius:30}}
				// style={isAltPassword === 1 ? { borderColor: "red", borderWidth: 0 } : ""}
				errorMessage={isAltPassword === 1 ? "กรุณาใส่ Password" : ""}
				inputStyle={{marginLeft:7, fontFamily: 'thSarabunNew', fontSize: 24}}
				/>

			<View style={styles.btn}>
				<TouchableOpacity onPress={() => changeElement(isUsername, isPassword)} style={{backgroundColor:"#7ad669", alignItems:'center', justifyContent:'center', height:60, borderColor:"#7ad669", borderWidth:2, borderRadius: 50}}>
					<Text style={{color:'white', fontFamily:'thSarabunNew', fontSize: 30}}>เข้าสู่ระบบ</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.signIn}>
				<TouchableOpacity onPress={() => navigation.navigate('ForgotScreen')}>
					<Text style={styles.label}>ลืมรหัสผ่าน ?</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
				<Text style={styles.label}>สมัครสมาชิก</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default LoginScreen;

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
