import React, { Component, useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	FlatList,
	ScrollView,
	SafeAreaView,
	Platform,
} from "react-native";
import { styles } from "../../css/style";
import {
	useNavigation,
	useRoute,
	useNavigationState,
	useIsFocused,
} from "@react-navigation/native";
import firebase from "firebase";
import { ListItem, Avatar } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale

OrderDetail = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const index = useNavigationState((state) => state.index);
	const user = firebase.auth().currentUser;
	const [data, setData] = useState(null);
	const firebaseRef = firebase.database().ref();
	const isFocused = useIsFocused();
	const toSetData = (newData) =>
		setData((state) => {
			state = newData;
			return state;
		});

	const findOrder = async () => {
		var newArray = [];
		let orderRef = await firebaseRef
			.child("mybooks/" + user.uid)
			.orderByChild("orderTimeSel")
			.once("value");

		let orderArray = orderRef.val();

		let courtRef = await firebaseRef.child("court/").once("value");
		let courtArray = courtRef.val();
		var arr = [];
		// console.log(orderArray);
		if (orderArray) {
			await orderArray.map((val, index) => {
				let courtObj = courtArray.find(({ _id }) => _id === val.orderCourtId);
				val.courtName = courtObj.name;
				val.index = index;
				val.imageUri = courtObj.imageUri;
				let date = new Date();
				let orderTimeSel = new Date(val.orderTimeSel);
				if (date.getTime() < orderTimeSel.getTime()) {
					arr.push(val);
				}
			});
			if(arr.length > 0) {
				toSetData(arr);
			}
		}

		// firebaseRef
		// 	.child("mybooks/" + user.uid)
		// 	.orderByChild("orderTimeSel")
		// 	.once("value")
		// 	.then((snapshot) => {
		// 		const date = new Date();
		// 		var arr = [];
		// 		snapshot.val().map((v, i) => {
		// 			let valDate = new Date(v.orderTimeSel);
		// 			if (valDate >= date) {
		// 				v.key = i;
		// 				arr.push(v);
		// 			}
		// 		});
		// 		// console.log()
		// 		toSetData(arr);
		// });
	};
	useEffect(() => {
		// fetch("https://jsonplaceholder.typicode.com/todos/1")
		// 	.then((response) => response.json())
		// 	.then((json) => toSetData(json));
		findOrder();
		return () => {
			findOrder();
			firebaseRef.off();
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
	const showListOrder = (jsonList) => {
		console.log(jsonList)
		return jsonList ? (
			<FlatList
				ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
				contentContainerStyle={styleView.scrollContentContainer}
				data={jsonList}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => {
					let date = new Date(item.orderTimeSel);
					return (
						<ListItem
							Component={TouchableScale}
							friction={50} //
							tension={100} // These props are passed to the parent component (here TouchableScale)
							activeScale={0.95} //
							containerStyle={{ backgroundColor: "#51adcf", borderRadius: 10 }}
							bottomDivider
							onPress={() =>
								navigation.navigate("orderReport", {
									name: "รายละเอียดการจองสนาม",
									index: item.index,
									orderData: JSON.stringify(item),
								})
							}
						>
							<ListItem.Content>
								<ListItem.Title
									style={{
										fontFamily: "thSarabunNew",
										fontSize: 24,
										color: "white",
										fontWeight: "bold",
									}}
								>
									{`สนาม ${item.courtName}`}
								</ListItem.Title>
								<ListItem.Subtitle
									style={{
										fontFamily: "thSarabunNew",
										fontSize: 20,
										color: "white",
									}}
								>
									{`เวลา ${
										timer.find(({ value }) => value == item.orderFieldTime)
											.label
									} / วันที่จอง ${date.getDate()} ${
										monthName[date.getMonth()]
									} ${date.getFullYear() + 543}`}
								</ListItem.Subtitle>
							</ListItem.Content>
							<ListItem.Chevron color="white" />
						</ListItem>
					);
				}}
			/>
		) : (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text style={styles.title}>ไม่มีข้อมูล</Text>
			</View>
		);
	};
	return (
		<SafeAreaView
			style={Platform.select({
				ios: styles.containerNotCenterIOS,
				android: styles.containerNotCenter,
			})}
		>
			{showListOrder(data)}
		</SafeAreaView>
	);

	// return (
	// 	<View style={styles.containerNotCenter}>
	// 		<Text style={styles.title}>รายการจอง</Text>
	// 		<View style={styles.container}>
	// 			{showListOrder(isListOrder)}
	// 		</View>
	// 		{/* <TestComp test={isListOrder} />
	// 		<Button title="กลับหน้าแรก" onPress={() => console.log(isListOrder)} /> */}
	// 	</View>
	// );
};
const styleView = StyleSheet.create({
	scrollContentContainer: {
		paddingTop: 10,
		paddingBottom: 10,
	},
});

export default OrderDetail;
