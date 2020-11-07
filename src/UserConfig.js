import React, { Component, useState, useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	Button,
	Dimensions,
	SafeAreaView,
	ScrollView,
	// ActionSheetIOS,
	Platform,
	TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
import {
	useNavigation,
	useRoute,
	useIsFocused,
} from "@react-navigation/native";
import LoginScreen from "./LoginScreen";
import {
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from "@react-navigation/drawer";
import { Icon, Input } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { useEffect } from "react";
import CustomActionSheet from "./CustomActionSheet";
import { ActionSheetCustom as ActionSheet } from "react-native-custom-actionsheet";
import { styles } from "./css/style";
import updateUser from "./api/apiUser";
import { ImageBackgroundComponent } from "react-native";
import axios from "axios";

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 4;
const options = [
	{
		component: (
			<Text
				style={{
					marginLeft: 12,
					fontFamily: "thSarabunNew",
					fontSize: 24,
					color: "#0f81ff",
				}}
			>
				ยกเลิก
			</Text>
		),
	},
	{
		component: (
			<View style={{ flexDirection: "row" }}>
				<Icon name={"camera-alt"} size={24} />
				<Text
					style={{
						marginLeft: 12,
						fontFamily: "thSarabunNew",
						fontSize: 24,
						color: "#0f81ff",
					}}
				>
					ถ่ายรูป
				</Text>
			</View>
		),
		height: 50,
	},
	{
		component: (
			<View style={{ flexDirection: "row" }}>
				<Icon name={"collections"} size={24} />
				<Text
					style={{
						marginLeft: 12,
						fontFamily: "thSarabunNew",
						fontSize: 24,
						color: "#0f81ff",
					}}
				>
					รูปจากคลัง
				</Text>
			</View>
		),
		height: 50,
	},
];
const title = (
	<Text style={{ color: "crimson", fontFamily: "thSarabunNew", fontSize: 28 }}>
		อัพโหลดภาพจาก ?
	</Text>
);

UserConfig = (props) => {
	const navigation = useNavigation();
	const route = useRoute();
	const isFocused = useIsFocused();
	const ref = useRef(null);
	const firebaseRef = firebase.database().ref();
	const firebaseStoreRef = firebase.storage().ref();
	const user = firebase.auth().currentUser;

	const [isImageUrl, setImageUrl] = useState(undefined);
	const [hasPermission, setHasPermission] = useState("");
	const [isUserDetail, setUserDetail] = useState(null);

	const toSetUserDetail = (obj) =>
		setUserDetail((state) => {
			let newObj = state ? Object.assign(state, obj) : Object.assign({}, obj);
			return newObj;
		});
	// const []

	const showActionSheet = () => actionSheet.show();

	const getActionSheetRef = (ref) => (actionSheet = ref);

	const handlePress = async (index) => {
		PermissionCheck();
		if (index == 0) {
		} else if (index == 1) {
			let a = await pickImage("camera");
		} else if (index == 2) {
			let a = await pickImage("cameraroll");
			// pickImage("cameraroll");
		}
	};

	const pickImage = async (type) => {
		// ImagePicker.requestCameraPermissionsAsync()
		if (type == "camera") {
			let checkPermission = await ImagePicker.requestCameraPermissionsAsync(); // check Status
			console.log(checkPermission);
			if (hasPermission == "granted") {
				console.log(hasPermission);
				// if (checkPermission.status === "granted") {
				let result = await ImagePicker.launchCameraAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [4, 3],
					quality: 1,
				});
				console.log(result);
				if (!result.cancelled) {
					updateUserDetailStore(result.uri)
						.then((snapshot) => {
							snapshot.ref.getDownloadURL().then((downloadUrl) => {
								// console.log(downloadUrl);
								let objImage = { imageUri: downloadUrl };
								setImageUrl(downloadUrl);
								props.setUserDetail(objImage);
							});
						})
						.catch((err) => {
							console.log(err);
						});

					updateRealTimeDB(user.uid);
				}

				// }
			} else if (hasPermission != "granted") {
				alert("ไม่สามารถเข้าถึงกล้องได้");
			}
		} else if (type === "cameraroll") {
			let checkPermission = await ImagePicker.requestCameraRollPermissionsAsync(); // check Status
			console.log(checkPermission);
			if (hasPermission == "granted") {
				let result = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.All,
					allowsEditing: true,
					aspect: [4, 3],
					quality: 1,
				});

				if (!result.cancelled) {
					if (!result.cancelled) {
						updateUserDetailStore(result.uri)
							.then((snapshot) => {
								snapshot.ref.getDownloadURL().then((downloadUrl) => {
									// console.log(downloadUrl);
									let objImage = { imageUri: downloadUrl };
									setImageUrl(downloadUrl);
									props.setUserDetail(objImage);
								});
							})
							.catch((err) => {
								console.log(err);
							});
	
						updateRealTimeDB(user.uid);
					}
	
				}
			} else if (hasPermission != "granted") {
				alert("ไม่สามารถเข้าถึงคลังภาพได้");
			}
		}
	};
	const updateUserDetailStore = async (imageUri) => {
		if (imageUri) {
			const response = await fetch(imageUri);
			const blob = await response.blob();

			const fileExtension = imageUri.split(".").pop();
			const filename = `${user.uid}.${fileExtension}`;
			// console.log(filename);
			var meta = {
				contentType: "image/jpg",
			};
			let ref = firebaseStoreRef.child(`userImage/${filename}`);
			return ref.put(blob, meta);
			ref.getDownloadURL().then((downloadUrl) => {
				console.log("downLoad link avaliable : " + downloadUrl);
			});
			// return ref.put(blob, meta);
		}
	};
	const updateRealTimeDB = async (
		uid,
		name,
		displayName,
		phoneNumber,
		address,
		imageUri
	) => {
		const ref = await firebaseRef.child(`users/${uid}`).once("value");
		let obj = Object.assign(ref.val());
		if (name) {
			obj.name = name;
		}
		if (displayName) {
			obj.displayName = displayName;
		}
		if (phoneNumber) {
			obj.phoneNumber = phoneNumber;
		}
		if (address) {
			obj.address = address;
		}
		if (imageUri) {
			obj.imageUri = imageUri;
		}

		console.log(obj);
	};
	const PermissionCheck = async () => {
		const perm = await Permissions.askAsync(
			Permissions.CAMERA,
			Permissions.CAMERA_ROLL
		);
		console.log(perm.status);
		if (perm.status === "granted") {
			setHasPermission("granted");
		}
	};

	useEffect(() => {
		console.log(route.params);

		firebaseRef
			.child("users/" + user.uid)
			.once("value")
			.then((snapshot) => {
				let obj = snapshot.val();
				toSetUserDetail(obj);
			});

		PermissionCheck();
		return () => PermissionCheck();
	}, [isFocused]);

	return (
		<SafeAreaView style={[styles.containerNotMargin, { position: "relative" }]}>
			{/* <View
				style={{
					backgroundColor: "#cee397",
					height: Dimensions.get("window").height / 4,
					width: Dimensions.get("window").width,
					position: "absolute",
					top: 0,
					borderRadius: 30,
					
					borderTopStartRadius: 0,
					borderTopRightRadius: 0,
				}}
			>
			</View>
			<View
				style={{
					backgroundColor: "white",
					height: (Dimensions.get("window").height / 2) + (Dimensions.get("window").height / 4),
					width: Dimensions.get("window").width - 20,
					borderRadius: Dimensions.get("window").width / 4,
					borderBottomEndRadius: 0,
					borderBottomLeftRadius: 0,
					position: "absolute",
					bottom: 0,
				}}
			/> */}
			<View style={{ marginHorizontal: 20, flex: 1 }}>
				<ScrollView>
					<View style={{ height: Dimensions.get("window").height / 15 }} />
					<View style={{ justifyContent: "center", alignItems: "center" }}>
						{!props.userDetail.imageUri ? (
							<Icon
								onPress={Platform.select({
									ios: () => showActionSheet(),
									android: () => showActionSheet(),
								})}
								color="black"
								size={150}
								name={"account-circle"}
							/>
						) : (
							<TouchableOpacity
								onPress={Platform.select({
									ios: () => selectAction(),
									android: () => pickImage(),
								})}
							>
								<Image
									source={{ uri: props.userDetail.imageUri }}
									style={{ width: 200, height: 200, borderRadius: 200 }}
								/>
							</TouchableOpacity>
						)}
						<Text> </Text>
					</View>
					<View
						style={{
							justifyContent: "flex-start",
							alignItems: "flex-start",
							flexDirection: "row",
						}}
					>
						<Text
							style={{ fontFamily: "thSarabunNew", fontSize: 26, height: 40 }}
						>
							ชื่อ - นามสกุล
						</Text>
						<Input
							inputStyle={{
								borderBottomColor: "black",
								borderBottomWidth: 1,
								fontFamily: "thSarabunNew",
								fontSize: 28,
								height: 40,
								marginTop: 15,
							}}
							onChangeText={(value) => {
								let obj = {};
								obj.displayName = value;
								props.setUserDetail(obj);
							}}
							defaultValue={
								props.userDetail
									? props.userDetail.displayName
										? props.userDetail.displayName.toString()
										: ""
									: ""
							}
						/>
					</View>

					<View
						style={{
							justifyContent: "flex-start",
							alignItems: "flex-start",
							flexDirection: "row",
						}}
					>
						<Text
							style={{ fontFamily: "thSarabunNew", fontSize: 26, height: 40 }}
						>
							ชื่อเล่น (ถ้ามี)
						</Text>
						<Input
							inputStyle={{
								borderBottomColor: "black",
								borderBottomWidth: 1,
								fontFamily: "thSarabunNew",
								fontSize: 28,
								height: 40,
							}}
							onChangeText={(value) => {
								let obj = {};
								obj.nickname = value;
								props.setUserDetail(obj);
							}}
							defaultValue={
								props.userDetail
									? props.userDetail.nickname
										? props.userDetail.nickname.toString()
										: ""
									: ""
							}
						/>
					</View>
					<View
						style={{
							justifyContent: "flex-start",
							alignItems: "flex-start",
							flexDirection: "row",
						}}
					>
						<Text
							style={{ fontFamily: "thSarabunNew", fontSize: 26, height: 40 }}
						>
							เบอร์โทรศัพท์
						</Text>
						<Input
							inputStyle={{
								borderBottomColor: "black",
								borderBottomWidth: 1,
								fontFamily: "thSarabunNew",
								fontSize: 28,
								height: 40,
							}}
							onChangeText={(value) => {
								let obj = {};
								obj.phoneNumber = value;
								props.setUserDetail(obj);
							}}
							defaultValue={
								props.userDetail
									? props.userDetail.phoneNumber
										? props.userDetail.phoneNumber.toString()
										: ""
									: ""
							}
							maxLength={10}
						/>
					</View>
					<View
						style={{
							justifyContent: "flex-start",
							alignItems: "flex-start",
							flexDirection: "row",
						}}
					>
						<Text
							style={{ fontFamily: "thSarabunNew", fontSize: 26, height: 40 }}
						>
							ที่อยู่
						</Text>
						<Input
							inputStyle={{
								borderBottomColor: "black",
								borderBottomWidth: 1,
								fontFamily: "thSarabunNew",
								fontSize: 28,
								height: 40,
							}}
							onChangeText={(value) => {
								let obj = {};
								obj.address = value;
								props.setUserDetail(obj);
							}}
							defaultValue={
								props.userDetail
									? props.userDetail.address
										? props.userDetail.address.toString()
										: ""
									: ""
							}
						/>
					</View>
					<TouchableOpacity
						onPress={() => {
							let obj = { test: "TESTUpdate State" };
							props.setUserDetail(obj);
						}}
					>
						<Text style={styles2.button}>Custom ActionSheet</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							console.log(props.userDetail);
						}}
					>
						<Text style={styles2.button}>check State</Text>
					</TouchableOpacity>

					<ActionSheet
						ref={getActionSheetRef}
						title={title}
						// message="custom message custom message custom message custom message custom message custom message "
						options={options}
						cancelButtonIndex={CANCEL_INDEX}
						destructiveButtonIndex={DESTRUCTIVE_INDEX}
						onPress={handlePress}
					/>

					{props.componentLoad()}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

const styles2 = StyleSheet.create({
	wrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		width: 200,
		marginBottom: 10,
		paddingTop: 15,
		paddingBottom: 15,
		textAlign: "center",
		color: "#fff",
		backgroundColor: "#38f",
	},
});
export default UserConfig;
