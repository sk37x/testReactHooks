import React, { Component, useRef, useState } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { ActionSheetCustom as ActionSheet } from "react-native-custom-actionsheet";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";

CustomActionSheet = (props) => {
	const firebaseRef = firebase.database().ref();
	const storage = firebase.storage();
	const firebaseStoreRef = firebase.storage().ref();
	const [isFullPath, setFullPath] = useState("");
	const user = firebase.auth().currentUser;

	const CANCEL_INDEX = 0;
	const DESTRUCTIVE_INDEX = 4;
	const defaultOption = [
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
	const options = defaultOption;
	const title = (
		<Text
			style={{ color: "crimson", fontFamily: "thSarabunNew", fontSize: 28 }}
		>
			อัพโหลดภาพจาก ?
		</Text>
	);
	const getActionSheetRef = (ref) => {
		// console.log(ref)
		return (actionSheet = ref);
	};

	// const actionSheet = useRef(null);

	const handlePress = async (index) => {
		if (index == 0) {
		} else if (index == 1) {
			// console.log("camera");
			let a = await pickImage("camera");
		} else if (index == 2) {
			let a = await pickImage("cameraroll");
			// - ref
			// let ts = storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/authenticationtest-9a066.appspot.com/o/imageCourd%2Ftest.jpg?alt=media&token=b57b3788-0b5b-4a0c-a348-8b3fc9c808af').fullPath
			// console.log(ts)
			// // console.log(storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/authenticationtest-9a066.appspot.com/o/imageCourd%2Ftest.jpg?alt=media&token=b57b3788-0b5b-4a0c-a348-8b3fc9c808af'))
			// // console.log(props, ' props ');
			// - ref

			// pickImage("cameraroll");
		}
	};

	const uploadImageToStore = async (imageUri) => {
		if (imageUri) {
			const response = await fetch(imageUri);
			const blob = await response.blob();

			var mongoObjectId = function () {
				var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
				return (
					timestamp +
					"xxxxxxxxxxxxxxxx"
						.replace(/[x]/g, function () {
							return ((Math.random() * 16) | 0).toString(16);
						})
						.toLowerCase()
				);
			};
			// console.log(mongoObjectId());

			const fileExtension = imageUri.split(".").pop();
			const filename = `${mongoObjectId()}.${fileExtension}`;

			// console.log(filename);
			var meta = {
				contentType: "image/jpg",
			};
			let ref = firebaseStoreRef.child(`imageCourt/${filename}`);
			return ref.put(blob, meta);

			// return ref.put(blob, meta);
		}
	};
	const pickImage = async (type) => {
		// ImagePicker.requestCameraPermissionsAsync()
		if (type == "camera") {
			let checkPermission = await ImagePicker.requestCameraPermissionsAsync(); // check Status
			if (checkPermission.status == "granted") {
				let result = await ImagePicker.launchCameraAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [4, 3],
					quality: 1,
				});

				if (!result.cancelled) {
					uploadImageToStore(result.uri)
						.then((snapshot) => {
							snapshot.ref.getDownloadURL().then((downloadUrl) => {
								let objImage = {
									imageFullPath: snapshot.ref.fullPath.toString(),
									imageUri: downloadUrl,
								};
								props.funcSet(props.funcSetState, objImage);
								props.setImageUri(downloadUrl);
							});
						})
						.catch((err) => {
							console.log(err);
						});

					// updateRealTimeDB(user.uid);
				}

				// }
			} else if (checkPermission.status != "granted") {
				alert("ไม่สามารถเข้าถึงกล้องได้");
			}
		} else if (type === "cameraroll") {
			let checkPermission = await ImagePicker.requestCameraRollPermissionsAsync(); // check Status
			if (checkPermission.status == "granted") {
				let result = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.All,
					allowsEditing: true,
					aspect: [4, 3],
					quality: 1,
				});

				if (!result.cancelled) {
					uploadImageToStore(result.uri)
						.then((snapshot) => {
							snapshot.ref.getDownloadURL().then((downloadUrl) => {
								console.log("url :", downloadUrl);
								let objImage = {
									imageFullPath: snapshot.ref.fullPath.toString(),
									imageUri: downloadUrl,
								};
								props.funcSet(props.funcSetState, objImage);
								props.setImageUri(downloadUrl);

								// setImageUrl(downloadUrl);
								// props.setUserDetail(objImage);
							});
						})
						.catch((err) => {
							console.log(err);
						});
				}
			} else if (checkPermission.status != "granted") {
				alert("ไม่สามารถเข้าถึงคลังภาพได้");
			}
		}
	};

	return (
		<ActionSheet
			ref={getActionSheetRef}
			title={title}
			// message="custom message custom message custom message custom message custom message custom message "
			options={options}
			cancelButtonIndex={CANCEL_INDEX}
			destructiveButtonIndex={DESTRUCTIVE_INDEX}
			onPress={handlePress}
		/>
	);
};

export default CustomActionSheet;
