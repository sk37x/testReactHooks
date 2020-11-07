import React, { Component, useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	TouchableOpacity,
	Image,
	Dimensions,
} from "react-native";
import { Icon, Input } from "react-native-elements";
import { styles } from "../../css/styleAdmin";
import {
	useNavigation,
	useRoute,
	useNavigationState,
	useIsFocused,
} from "@react-navigation/native";
import firebase from "firebase";
import CustomActionSheet from "./CustomActionSheet";
// import Analytics from 'expo-firebase-analytics'

// var admin = require('firebase-admin')

AddCourt = (props) => {
	const navigation = useNavigation();
	const route = useRoute();
	const index = useNavigationState((state) => state.index);
	const user = firebase.auth().currentUser;
	const isFocused = useIsFocused();
	const firebaseRef = firebase.database().ref();

	const [isImageUri, setImageUri] = useState("");

	const showActionSheet = () => actionSheet.show();

	const test = () => {
		console.log("func Test");
	};

	const { imageUri, name } = props.data;
	useEffect(() => {
		// let a = admin.auth().getUser('yoUjtrb6nXWCstJH2XUZcsi1b6N2')
		// console.log(a, 'a')
	}, [isFocused]);

	return (
		<View style={styles.container}>
			<Text style={[styles.title, { marginBottom: 9 }]}>รูปภาพสนาม</Text>
			{isImageUri.length === 0 ? (
				<Icon
					type={"font-awesome"}
					name={"picture-o"}
					size={256}
					onPress={() => showActionSheet()}
					containerStyle={{ marginBottom: 13 }}
				/>
			) : (
				<TouchableOpacity
					onPress={() => showActionSheet()}
					style={{ alignItems: "center" }}
				>
					<Image
						source={{ uri: props.data.imageUri }}
						style={{
							width: Dimensions.get("window").width - 100,
							height: 200,
							borderRadius: 20,
						}}
					/>
				</TouchableOpacity>
			)}

			<Text style={[styles.title, { marginBottom: 9 }]}>ชื่อสนาม</Text>
			<Input
				onChangeText={(value) => {
					let obj = { name: value };
					props.funcSet(props.funcSetState, obj);
					// props.funcSet
				}}
			/>
			{props.componentLoad()}
			<CustomActionSheet
				funcSet={props.funcSet}
				funcSetState={props.funcSetState}
				data={props.data}
				setImageUri={setImageUri}
			/>
		</View>
	);
};

export default AddCourt;
