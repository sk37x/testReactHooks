import React, { Component, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	Button,
	Image,
	ScrollView,
	TouchableOpacity,
	Item,
	SafeAreaView,
	FlatList,
} from "react-native";
import { styles } from "../../css/style";
import {
	useNavigation,
	useRoute,
	useNavigationState,
	useIsFocused,
} from "@react-navigation/native";
import firebase from "firebase";

CordView = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const [selectedId, setSelectedId] = useState(null);
	const index = useNavigationState((state) => state.index);
	const isFocused = useIsFocused();
	useEffect(() => {
		// console.log(route.params.timeArr);
	}, [isFocused]);
	const DATA = [
		{
			value: 0,
			id: "0",
			label: "16.00 - 17.00 น.",
			header: true,
		},
		{
			value: 1,
			id: "1",
			label: "16.00 - 17.00 น.",
			booking: false,
		},
		{
			value: 2,
			id: "2",
			label: "17.00 - 18.00 น.",
			booking: false,
		},
		{
			value: 3,
			id: "3",
			label: "18.00 - 19.00 น.",
			booking: false,
		},
		{
			value: 4,
			id: "4",
			label: "19.00 - 20.00 น.",
			booking: false,
		},
		{
			value: 5,
			id: "5",
			label: "21.00 - 22.00 น.",
			booking: false,
		},
	];

	const Item = ({ item, onPress, style }) => (
		<View>
			{item.booking.toString() == "false" ? (
				<TouchableOpacity
					key={item.value}
					// onPress={onPress}
					style={[styleList.item, style]}
				>
					<Text style={styleList.title}>{item.label}</Text>
				</TouchableOpacity>
			) : (
				<View style={[styleList.item, style]}>
					<Text style={styleList.title}>{item.label}</Text>
				</View>
			)}
		</View>
	);
	const ItemText = ({ item, onPress, style }) => (
		<View style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
			<Text style={styles.title2}>
				ตารางการใช้สนามของวันที่
				{" " +
					date.getDate() +
					" " +
					monthName[date.getMonth()] +
					" " +
					(date.getFullYear() + 543)}
			</Text>
		</View>
	);
	let monthName = [
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
	const date = new Date();
	const renderItem = ({ item }) => {
		const backgroundColor = item.value == 1 ? "white" : "";
		return item.value == 1 ? (
			<ItemText item={item} style={{ backgroundColor }} />
		) : (
			<Item
				item={item}
				style={[
					item.booking.toString() == "false"
						? styleList.colorSuccess
						: styleList.colorDark,
				]}
			/>
		);
	};

	return (
		<SafeAreaView style={styleList.container}>
			<FlatList
				data={route.params.timeArr}
				renderItem={renderItem}
				keyExtractor={(item, index) => index.toString()}
				extraData={selectedId}
			/>
		</SafeAreaView>
	);
};
const styleView = StyleSheet.create({
	container: {
		padding: 20,
		flex: 1,
	},
	scrollContainer: {
		flex: 1,
		paddingHorizontal: 15,
	},
	scrollContentContainer: {
		paddingBottom: 10,
	},
});

const styleList = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight || 0,
	},
	item: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		width: "92%",
		height: 200,
	},
	title: {
		fontSize: 20,
	},
	colorSuccess: {
		color: "#155724",
		backgroundColor: "#d4edda",
		borderColor: "#c3e6cb",
	},
	colorDark: {
		color: "#1b1e21",
		backgroundColor: "#d6d8d9",
		borderColor: "#c6c8ca",
	},
});

export default CordView;
