import React, { useEffect, useState } from "react";
import {
	FlatList,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
	Button,
	Platform,
	ScrollView,
} from "react-native";
import { useNavigation, useRoute, useNavigationState, DrawerActions } from "@react-navigation/native";
import { styles } from "../../css/style";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import Dropdown from "../../Dropdown";
import ProgressLoader from "rn-progress-loader";
import { Icon } from "react-native-elements";
import ViewContent from "../../ViewContent";

// import Dropdown from '../../Dropdown'
OrderDetail = () => {
	const [selectedId, setSelectedId] = useState(null);
	const navigation = useNavigation();
	const route = useRoute();
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [isDateSelected, setDateSelected] = useState("");
	const [isTimeSel, setTimeSel] = useState(undefined);
	const [isVisible, setVisible] = useState(false);
	const [dataSave, setDataSave] = useState({});
	const index = useNavigationState((state) => state.index);
	console.log(index);
	const [count, setCount] = useState(0);
	const [testCount, setTestCount] = useState([
		{ c: "test", test: 1 },
		{ c: "test2", test: 2 },
	]);
	const [total, setTotal] = useState(0);
	const [isCountItem, setCountItem] = useState([
		{ id: 1, count: 0 },
		{ id: 2, count: 0 },
		{ id: 3, count: 0 },
		{ id: 4, count: 0 },
		{ id: 5, count: 0 },
	]);

	const itemShow = [
		{ id: 1, name: "น้ำเปล่าขวดใหญ่", price: "20" },
		{ id: 2, name: "Sponsor", price: "15" },
		{ id: 3, name: "Coke", price: "20" },
		{ id: 4, name: "น้ำเปล่าขวดเล็ก", price: "10" },
		{ id: 5, name: "Sprite", price: "20" },
	];

	const addOrRemove = (action, val) => {
		switch (action) {
			case "add":
				setCountItem((state) => {
					let a = state.map((value, index) => {
						if (value.id === val.id) {
							value.count++;
							setItemResult((state) => {
								let chkArr = state.find((e) => e.id == value.id);
								let newArr = [...state];
								let sumTotal = 0;
								if (typeof chkArr === "undefined") {
									newArr.splice(newArr.length - 1, 0, {
										...value,
										price: parseFloat(val.price) * parseInt(value.count),
									});
									let arrAdd = newArr.find((e) => e.id == value.id);
									newArr[newArr.length - 1].price =
										parseFloat(newArr[newArr.length - 1].price) +
										parseFloat(arrAdd.price);
								} else {
									chkArr.price = parseFloat(val.price) * parseInt(value.count);
									newArr.map((v) => {
										if (v.name !== "รวม") sumTotal += parseFloat(v.price);
									});
									newArr[newArr.length - 1].price = sumTotal;
								}
								return newArr;
							});
						}
						return value;
					});
					return a;
				});
				break;
			case "remove":
				setCountItem((state) => {
					let a = state.map((value, index) => {
						if (value.id === val.id) {
							if (value.count > 0) {
								value.count--;
								setItemResult((state) => {
									let chkArr = state.find((e) => e.id == value.id);
									let newArr = [...state];
									let sumTotal = 0;
									if (typeof chkArr === "undefined") {
										newArr.splice(newArr.length - 1, 0, {
											...value,
											price: parseFloat(val.price) * parseInt(value.count),
										});
										let arrAdd = newArr.find((e) => e.id == value.id);
										newArr[newArr.length - 1].price =
											parseFloat(newArr[newArr.length - 1].price) +
											parseFloat(arrAdd.price);
									} else {
										if (value.count > 0) {
											chkArr.price =
												parseFloat(val.price) * parseInt(value.count);
											newArr.map((v) => {
												if (v.name !== "รวม") sumTotal += parseFloat(v.price);
											});
											newArr[newArr.length - 1].price = sumTotal;
										} else {
											let indexForRem = newArr.findIndex(
												({ id }) => id == chkArr.id
											);
											newArr.splice(indexForRem, 1);
											newArr.map((v) => {
												if (v.name !== "รวม") sumTotal += parseFloat(v.price);
											});
											newArr[newArr.length - 1].price = sumTotal;
										}
									}
									return newArr;
								});
							}
						}

						return value;
					});
					return a;
				});
				break;
			default:
				// console.log(count);
				break;
		}
	};

	const [isItemResult, setItemResult] = useState([
		{ name: "ค่าสนาม", price: "150" },
		{ name: "รวม", price: "150" },
	]);


	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date) => {
		console.warn("A date has been picked: ", date);
		hideDatePicker();
		console.log(date);
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
		setDateSelected(
			"วันที่ " +
				date.getDate() +
				" " +
				monthName[date.getMonth()] +
				" " +
				(date.getFullYear() + 543)
		);
		console.log(route.params);
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
	useEffect(() => {
		console.log(route.params)
	}, []);

	return (
		<View style={styleView.container}>
			<ScrollView
				style={styleView.scrollContainer}
				contentContainerStyle={styleView.scrollContentContainer}
			>
				<Text>เครื่องดื่ม</Text>
				<ViewContent
					count={isCountItem}
					item={itemShow}
					addOrRemove={addOrRemove}
					itemShow={itemShow}
					isCountItem={isCountItem}
					// handlerMount={addTestCount}
					/>



				<Text></Text>
				<ViewContent
					item={isItemResult}
					result="test"
					addOrRemove={addOrRemove}
					itemShow={itemShow}
					isCountItem={isCountItem}
					// handlerMount={addTestCount}
				/>

				<ProgressLoad />
			</ScrollView>
			<View style={styleView.header_footer_style}>
				<TouchableOpacity onPress={() => navigation.navigate('ListBook')}>
					<Text style={styleView.textStyle}> จองสนาม </Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
const styleView = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#cccccc",
	},
	scrollContainer: {
		flex: 1,
		paddingHorizontal: 15,
	},
	scrollContentContainer: {
		paddingTop: 40,
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
		height: 45,
		backgroundColor: "green",
	},
	blockContent: {
		width: "100%",
		height: 45,
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

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 4,
		color: "black",
		paddingRight: 30, // to ensure the text is never behind the icon
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0.5,
		borderColor: "purple",
		borderRadius: 8,
		color: "black",
		paddingRight: 30, // to ensure the text is never behind the icon
	},
});
export default OrderDetail;