import React, { Component, useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	FlatList,
	ScrollView,
	SafeAreaView,
	Image,
} from "react-native";
import { styles } from "../../css/style";
import {
	useNavigation,
	useRoute,
	useNavigationState,
	useIsFocused,
} from "@react-navigation/native";
import firebase from "firebase";
import { ListItem, Avatar, Overlay } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale"; // https://github.com/kohver/react-native-touchable-scale
import ButtonFixedBottom from "./ButtonFixedBottom"; // https://github.com/kohver/react-native-touchable-scale
import Modal from "modal-react-native-web";
import OverlayScreen from "./OverlayScreen";
import ProgressLoader from "rn-progress-loader";

OrderReport = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const index = useNavigationState((state) => state.index);
	const user = firebase.auth().currentUser;
	const [data, setData] = useState(null);
	const [isVisibleLoading, setVisibleLoading] = useState(false);
	const firebaseRef = firebase.database().ref();
	const isFocused = useIsFocused();
	const toSetData = (newData) =>
		setData((state) => {
			state = newData;
			return state;
		});
	const itemShow = [
		{ id: 1, name: "น้ำเปล่าขวดใหญ่", price: "20" },
		{ id: 2, name: "Sponsor", price: "15" },
		{ id: 3, name: "Coke", price: "20" },
		{ id: 4, name: "น้ำเปล่าขวดเล็ก", price: "10" },
		{ id: 5, name: "Sprite", price: "20" },
	];
	const DATA = [
		{
			id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
			title: "สนามที่ 1",
			url: require("../../images/101748.jpg"),
			key: 1,
		},
		{
			id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
			title: "สนามที่ 2",
			url: require("../../images/101749.jpg"),
			key: 2,
		},
		{
			id: "58694a0f-3da1-471f-bd96-145571e29d72",
			title: "สนามที่ 3",
			url: require("../../images/101750.jpg"),
			key: 3,
		},
		{
			id: "58694a0f-3da1-471f-bd96-145571e29d73",
			title: "สนามที่ 4",
			url: require("../../images/101751.jpg"),
			key: 4,
		},
		{
			id: "58694a0f-3da1-471f-bd96-145571e29d74",
			title: "สนามที่ 5",
			url: require("../../images/101751.jpg"),
			key: 5,
		},
	];

	const showListComponent = (firstBlock, SecoundBlock, key) => {
		return (
			<View style={{ flex: 1, marginLeft: 20, marginRight: 20 }}>
				<View
					style={{
						width: "100%",
						flexDirection: "row",
						padding: 10,
					}}
				>
					<View
						style={{
							width: "50%",
							height: 35,
							alignItems: "flex-start",
							justifyContent: "center",
							// backgroundColor: "brown",
						}}
					>
						<Text style={styleView.styleTextParaGraph}>{firstBlock}</Text>
					</View>
					<View
						style={{
							width: "10%",
							height: 35,
							alignItems: "flex-start",
							justifyContent: "center",
							// backgroundColor: "brown",
						}}
					>
						<Text style={styleView.styleTextParaGraph}></Text>
					</View>
					<View
						style={{
							width: "40%",
							height: 35,
							alignItems: "flex-start",
							justifyContent: "center",
							// backgroundColor: "brown",
						}}
					>
						<Text style={styleView.styleTextParaGraph}>{SecoundBlock}</Text>
					</View>
				</View>
			</View>
		);
	};
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
	useEffect(() => {
		firebaseRef
			.child("mybooks/" + user.uid)
			.once("value")
			.then((snapshot) => {
				const date = new Date();
				var obj = snapshot.val()[route.params.index];
				toSetData(obj);
			});
		return () => {
			firebaseRef.off();
		};
	}, [isFocused]);

	const itemRender = (jsonData) => {
		const dateSuccessOrder = jsonData ? new Date(jsonData.orderTime) : "";
		return jsonData ? (
			<View>
				<Image
					style={styleView.imageFullScreen}
					source={DATA.find(({ key }) => key === jsonData.orderFieldId).url}
				/>
				<View style={{ marginBottom: 25 }}>
					<Text style={styleView.styleTextTitle}>รายละเอียด</Text>
					{showListComponent(
						"สนามที่",
						DATA.find(({ key }) => key === jsonData.orderFieldId).key
					)}
					{showListComponent(
						"ช่วงเวลาที่จอง",
						timer.find(({ value }) => value === jsonData.orderFieldTime).label
					)}
					{showListComponent(
						"วันที่ทำรายการ",
						dateSuccessOrder.getDate() +
							" " +
							monthName[dateSuccessOrder.getMonth()] +
							" " +
							(dateSuccessOrder.getFullYear() + 543)
					)}
					{showListComponent(
						"เวลาที่ทำรายการ",
						dateSuccessOrder.getHours() +
							" " +
							dateSuccessOrder.getMinutes() +
							" น."
					)}
				</View>
				<View>
					<Text style={styleView.styleTextTitle}>รายการเพิ่มเติม</Text>
					{jsonData.itemOrder.map((v, i) => {
						let dataShow = itemShow.find(({ id }) => id == v.id);
						return (
							<View
								style={{ flex: 1, marginLeft: 20, marginRight: 20 }}
								key={i}
							>
								<View
									style={{
										width: "100%",
										flexDirection: "row",
										padding: 10,
									}}
								>
									<View
										style={{
											width: "60%",
											height: 35,
											alignItems: "flex-start",
											justifyContent: "center",
											// backgroundColor: "brown",
										}}
									>
										<Text style={styleView.styleTextParaGraph}>
											{v.name ? v.name : dataShow.name + " / จำนวน " + v.count}
										</Text>
									</View>
									<View
										style={{
											width: "40%",
											height: 35,
											alignItems: "flex-end",
											justifyContent: "center",
											// backgroundColor: "brown",
										}}
									>
										<Text style={styleView.styleTextParaGraph}>
											{v.price} ฿
										</Text>
									</View>
								</View>
							</View>
						);
					})}
				</View>
			</View>
		) : (
			<Text />
		);
	};

	const findAndDeleteData = () => {
		firebaseRef
			.child("mybooks/" + user.uid)
			.once("value")
			.then((snapshot) => {
				const date = new Date();
				var obj = snapshot.val()[route.params.index];
				// console.log(snapshot.ref.parent.child(user.uid+"/"+route.params.index), "###### ref");
				var ref = "";
				firebaseRef
					.child("field/")
					.once("value")
					.then((snap) => {
						let snapArr = snap.val();
						var arr = [];
						snapArr.map((val, index) => {
							if (val.fieldId === obj.orderFieldId) {
								arr.push(val);
								ref += index + "/";
							}
						});
						let orderDate = new Date(obj.orderTime);
						let indexBook = arr[0].fieldBook.findIndex(
							({ date, month, year }) =>
								date == orderDate.getDate() &&
								month == orderDate.getMonth() &&
								year == orderDate.getFullYear()
						);
						let timer = [...arr[0].fieldBook[indexBook].timer];
						let timerIndex = timer.findIndex(
							({ value }) => value == obj.orderFieldTime
						);
						ref += "fieldBook/" + indexBook + "/timer/" + timerIndex;
						let objTime = timer[timerIndex];
						objTime.booking = false
						// console.log(!true)
						// console.log(objTime)
						snap.ref.child(ref).set(objTime, (result) => console.log(result));
					});
					snapshot.ref.child(route.params.index).remove()
			});
			
		isLoading();
		setTimeout(() => {
			navigation.goBack();
		}, 3500);
		return firebaseRef;
	};

	const isLoading = () => {
		setVisibleLoading(true);
		setTimeout(() => {
			setVisibleLoading(false);
		}, 3000);
	};
	const ProgressLoad = () => (
		<ProgressLoader
			visible={isVisibleLoading}
			isModal={true}
			isHUD={true}
			hudColor={"#000000"}
			color={"#FFFFFF"}
		/>
	);
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				style={styleView.scrollContainer}
				contentContainerStyle={styleView.scrollContentContainer}
			>
				<View>{itemRender(data)}</View>
				<ProgressLoad />
			</ScrollView>
			<ButtonFixedBottom
				color={"#721c24"}
				backgroundcolor={"#f8d7da"}
				borderColor={"#f5c6cb"}
				onPress={() => findAndDeleteData()}
				text="ยกเลิกรายการ"
			/>
		</SafeAreaView>
	);
};

export default OrderReport;

const styleView = StyleSheet.create({
	styleTextTitle: {
		fontSize: 26,
		fontFamily: "thSarabunNew",
	},
	styleTextParaGraph: {
		fontSize: 22,
		fontFamily: "thSarabunNew",
	},
	imageFullScreen: {
		width: "100%",
		height: 300,
		resizeMode: "stretch",
	},
	container: {
		flex: 1,
		backgroundColor: "#cccccc",
	},
	scrollContainer: {
		flex: 1,
		// paddingHorizontal: 15,
	},
	scrollContentContainer: {
		paddingTop: 0,
		paddingBottom: 10,
	},
	MainContainer: {
		justifyContent: "center",
		flex: 1,
		paddingTop: Platform.OS == "ios" ? 20 : 0,
	},

	rowViewContainer: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},

	header_footer_style: {
		width: "100%",
		height: 35,
		backgroundColor: "green",
	},
	blockContent: {
		width: "100%",
		height: 35,
		backgroundColor: "white",
	},

	textStyleInBlock: {
		textAlign: "center",
		color: "red",
		fontSize: 22,
		padding: 7,
	},
	textStyle: {
		textAlign: "center",
		color: "#fff",
		fontSize: 22,
		padding: 7,
	},
});
// const list = [
// 	{
// 		name: "Amy Farha",
// 		avatar_url:
// 			"https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
// 		subtitle: "Vice President",
// 	},
// 	{
// 		name: "Chris Jackson",
// 		avatar_url:
// 			"https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
// 		subtitle: "Vice Chairman",
// 	},
// ];

// const showListOrder = (jsonList) => {
// 	return (
// 		<FlatList
// 			ItemSeparatorComponent={() => (
// 				<View style={{ height: 10 }} />
// 			)}
// 			data={jsonList}
// 			keyExtractor={(item, index) => index.toString()}
// 			renderItem={({ item }) => {
// 				let date = new Date(item.orderTime)

// 				return (
// 					<ListItem
// 						Component={TouchableScale}
// 						friction={50} //
// 						tension={100} // These props are passed to the parent component (here TouchableScale)
// 						activeScale={0.95} //
// 						containerStyle={{backgroundColor: '#51adcf', borderRadius: 10,}}
// 						bottomDivider
// 					>
// 						<ListItem.Content>
// 							<ListItem.Title style={{ fontFamily:'thSarabunNew', fontSize:24, color: "white", fontWeight: "bold" }}>
// 								{`สนามที่ ${item.orderFieldId} `}
// 							</ListItem.Title>
// 							<ListItem.Subtitle style={{fontFamily:'thSarabunNew', fontSize:20, color: "white" }}>
// 								{`เวลา ${timer.find(({value}) => value == item.orderFieldTime).label} / วันที่จอง ${date.getDate()} ${monthName[date.getMonth()]} ${(date.getFullYear() + 543)}`}
// 							</ListItem.Subtitle>
// 						</ListItem.Content>
// 						<ListItem.Chevron color="white" />
// 					</ListItem>
// 				);
// 			}}
// 		/>
// 	);
// };
