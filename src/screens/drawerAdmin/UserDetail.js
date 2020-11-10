import React, { Component, useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	TouchableOpacity,
	Image,
	Dimensions,
	FlatList,
	SafeAreaView,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { styles } from "../../css/styleAdmin";
import {
	useNavigation,
	useRoute,
	useNavigationState,
	useIsFocused,
} from "@react-navigation/native";
import firebase from "firebase";
import TouchableScale from "react-native-touchable-scale";
import { ScrollView } from "react-native";

// import Analytics from 'expo-firebase-analytics'

// var admin = require('firebase-admin')

UserDetail = (props) => {
	const navigation = useNavigation();
	const route = useRoute();
	const index = useNavigationState((state) => state.index);
	const user = firebase.auth().currentUser;
	const isFocused = useIsFocused();
	const firebaseRef = firebase.database().ref();

	const [isUserData, setUserData] = useState(JSON.parse(route.params.userData));
	const [isOrderData, setOrderData] = useState(null);
	// const { imageUri, name } = props.data;
	const toSetOrder = (newArr) => {
		setOrderData((state) => {
			return [...newArr];
		});
	};

	const setDataState = async () => {
		let snapshot = await firebaseRef
			.child("mybooks/" + route.params.uid)
			.once("value");
		let courtArr = await snapshot.ref.parent.parent
			.child("court/")
			.once("value");
		let orderArr = Object.values(snapshot.val());;
		let newArr = orderArr.map((val, index) => {
			let findCourt = courtArr.val().find(({ _id }) => _id == val.orderCourtId);
			if (findCourt) {
				val.courtName = findCourt.name;
				val.imageUri = findCourt.imageUri;
				val.index = index;
			}
			return val;
		});
		toSetOrder(newArr);

		// firebaseRef
		// .child("mybooks/" + route.params.uid)
		// .once("value")
		// .then((snapshot) => {
		// 	var obj = Object.values(snapshot.val());;
		// 	if (obj !== null) {
		// 		snapshot.ref.parent.parent
		// 			.child("court/")
		// 			.once("value")
		// 			.then((snap2) => {
		// 				let arr = snap2.val();
		// 				obj.map((val, index) => {
		// 					let findName = arr.find(({ _id }) => _id == val.orderCourtId);
		// 					val.courtName = findName.name;
		// 					val.imageUri = findName.imageUri
		// 					val.index = index;
		// 					toSetOrder(val);
		// 				});
		// 			});
		// 	}
		// });
	};

	useEffect(() => {
		// firebaseRef.child('Order/').orderByChild('orderBy').equalTo(user.uid).once('value').then(async(snapshot) => {
		// let test = (await snapshot.ref.parent.once('value')).val()
		// })
		setDataState();
		return () => {
			firebaseRef.off();
			setDataState();
		};
	}, [isFocused]);
	const timer = [
		{
			value: 1,
			label: "16.00 - 17.00 น.",
			booking: false,
		},
		{
			value: 2,
			label: "17.00 - 18.00 น.",
			booking: false,
		},
		{
			value: 3,
			label: "18.00 - 19.00 น.",
			booking: false,
		},
		{
			value: 4,
			label: "19.00 - 20.00 น.",
			booking: false,
		},
		{
			value: 5,
			label: "20.00 - 21.00 น.",
			booking: false,
		},
		{
			value: 6,
			label: "21.00 - 22.00 น.",
			booking: false,
		},
	];

	keyExtractor = (item, index) => index.toString();
	const monthName = [
		"มกราคม",
		"กุมภาพันธ์",
		"มีนาคม",
		"เมษายน",
		"พฤษภาคม",
		"มิถุนายน",
		"กรกฎาคม",
		"สิงหาคม",
		"กันยายน",
		"ตุลาคม",
		"พฤศจิกายน",
		"ธันวาคม",
	];
	renderItem = (dataObj) => {
		// console.log(dataObj);

		return dataObj !== null ? (
			dataObj.map((item, index) => {
				let date = new Date(item.orderTimeSel);
				return (
					<ListItem
						key={index}
						Component={TouchableScale}
						friction={90} //
						tension={100} // These props are passed to the parent component (here TouchableScale)
						activeScale={0.95}
						onPress={() =>
							navigation.navigate("orderReport", {
								name: "รายละเอียดการจองสนาม",
								index: item.index,
								orderData: JSON.stringify(item),
								uId: item.uid,
								type: "admin",
							})
						}
						containerStyle={{ width: Dimensions.get("window").width - 40 }}
						bottomDivider
					>
						<ListItem.Content>
							<ListItem.Title
								style={{
									fontFamily: "thSarabunNew",
									fontSize: 24,
									color: "black",
									fontWeight: "bold",
								}}
							>
								{`สนาม ${item.courtName}`}
							</ListItem.Title>
							<ListItem.Subtitle
								style={{
									fontFamily: "thSarabunNew",
									fontSize: 20,
									color: "black",
								}}
							>
								{`เวลา ${
									timer.find(({ value }) => value == item.orderFieldTime).label
								} / วันที่จอง ${date.getDate()} ${monthName[date.getMonth()]} ${
									date.getFullYear() + 543
								}`}
							</ListItem.Subtitle>
						</ListItem.Content>
					</ListItem>
				);
			})
		) : (
			<Text />
		);
	};

	return (
		<ScrollView contentContainerStyle={{ flex: 1, backgroundColor: "gray" }}>
			<View
				style={{
					marginHorizontal: 12,
					marginVertical: 20,
					backgroundColor: "#ffffff",
					borderColor: "#00aeef",
					borderWidth: 1,
					borderRadius: 10,
				}}
			>
				<View>
					<Text
						style={[
							styles.title,
							{
								borderBottomColor: "black",
								borderBottomWidth: 1,
								marginVertical: 15,
								marginHorizontal: 9,
							},
						]}
					>
						รายละเอียดทั่วไป
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						marginVertical: 10,
						marginHorizontal: 10,
					}}
				>
					{isUserData.imageUri ? (
						<Image
							source={{ uri: isUserData.imageUri }}
							style={{
								width: Dimensions.get("window").width / 2,
								height: Dimensions.get("window").height / 3,
								borderRadius: 10,
							}}
						/>
					) : (
						<View
							style={{
								width: Dimensions.get("window").width / 2,
								height: Dimensions.get("window").height / 3,
								borderRadius: 10,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text>No Image</Text>
						</View>
					)}
					<View style={{ marginHorizontal: 12 }}>
						<Text style={styles.title}>ชื่อ - นามสกุล</Text>
						<Text style={styles.paragraph}>{isUserData.displayName}</Text>
						<Text style={styles.title}>ชื่อเล่น</Text>
						<Text style={styles.paragraph}>
							{isUserData.nickname ? isUserData.nickname : "-"}
						</Text>
						<Text style={styles.title}>เบอร์โทรศัพท์</Text>
						<Text style={styles.paragraph}>{isUserData.phoneNumber}</Text>
						<Text style={styles.title}>ที่อยู่</Text>
						<Text style={styles.paragraph}>{isUserData.address}</Text>
					</View>
				</View>
			</View>
			<View
				style={{
					marginHorizontal: 12,
					marginVertical: 20,
					backgroundColor: "#ffffff",
					borderColor: "#00aeef",
					borderWidth: 1,
					borderRadius: 10,
				}}
			>
				<Text style={{ fontFamily: "thSarabunNew", fontSize: 30 }}>
					ข้อมูลการจอง
				</Text>
				<View>{this.renderItem(isOrderData)}</View>
			</View>
		</ScrollView>
	);
};

export default UserDetail;
