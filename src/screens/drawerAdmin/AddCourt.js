import React, { Component, useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	TouchableOpacity,
	Image,
	Dimensions,
	SafeAreaView,
	ScrollView,
} from "react-native";
import ButtonFixedBottomDeleteCourt from "./ButtonFixedBottomDeleteCourt";
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
import ProgressLoader from "rn-progress-loader";
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
	const [isNameCourt, setNameCourt] = useState("");
	const [isVisible, setVisible] = useState(false);

	const showActionSheet = () => actionSheet.show();

	const test = () => {
		console.log("func Test");
	};

	const ProgressLoad = () => (
		<ProgressLoader
			visible={isVisible}
			isModal={true}
			isHUD={true}
			hudColor={"#000000"}
			color={"#FFFFFF"}
		/>
	);
	const isLoading = (nav) => {
		setVisible(true);
		setTimeout(() => {
			setVisible(false);
			nav.goBack();
		}, 2000);
	};
	deleteDBCourt = async () => {
		let courtArr = await firebaseRef.child("court/").once("value");
		let list = courtArr.val();
		let indexDelete = courtArr
			.val()
			.findIndex(({ _id }) => _id == props.data._id);
		console.log(list.length);
		list.splice(indexDelete, indexDelete);
		console.log(list.length);
	};

	// const { imageUri, name } = props.data;
	useEffect(() => {
		if (props.data) {
			let { name, imageUri } = props.data;
			setNameCourt(name);
			setImageUri(imageUri);
		}
	}, [isFocused]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ marginHorizontal: 15 }}>
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
					defaultValue={isNameCourt}
					style={{ fontFamily: "thSarabunNew", fontSize: 22 }}
				/>
				{props.componentLoad()}
				<CustomActionSheet
					funcSet={props.funcSet}
					funcSetState={props.funcSetState}
					data={props.data}
					setImageUri={setImageUri}
				/>
			</ScrollView>
			{route.params.type === "edit" ? (
				<ButtonFixedBottomDeleteCourt
					color={"#721c24"}
					backgroundcolor={"#f8d7da"}
					borderColor={"#f5c6cb"}
					onPress={() => this.deleteDBCourt()}
					text="ลบสนาม"
					courtName={isNameCourt ? isNameCourt : ""}
				/>
			) : (
				<View />
			)}
			{ProgressLoad()}
		</SafeAreaView>
	);
};

export default AddCourt;
