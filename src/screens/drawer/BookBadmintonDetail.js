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
import {
	useIsFocused,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { styles } from "../../css/style";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import Dropdown from "../../Dropdown";
import firebase from "firebase";
import ProgressLoader from "rn-progress-loader";

// import Dropdown from '../../Dropdown'
BookBadmintonDetail = () => {
	const [selectedId, setSelectedId] = useState(null);
	const navigation = useNavigation();
	const route = useRoute();
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [isDateSelected, setDateSelected] = useState("");
	const [isDateSel, setDateSel] = useState("");
	const [isTimeArray, setTimeArray] = useState(null);
	const [isTimeSel, setTimeSel] = useState(undefined);
	const [isVisible, setVisible] = useState(false);
	const [dataSave, setDataSave] = useState({});
	const [isDataArr, setDataArr] = useState(null);
	const isFocused = useIsFocused();
	const firebaseRef = firebase.database().ref();
	const user = firebase.auth().currentUser;
	const insertDatetime = (date) => {
		let fieldBook = {
			month: date.getMonth(),
			date: date.getDate(),
			year: date.getFullYear(),

			timer: [
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
			],
		};
		return fieldBook;
	};

	const isLoading = () => {
		setVisible(true);
		setTimeout(() => {
			setVisible(false);
		}, 2000);
	};

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date) => {
		// console.warn("A date has been picked: ", date);
		hideDatePicker();

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
		setDateSel(date);
		setDateSelected(
			"วันที่ " +
				date.getDate() +
				" " +
				monthName[date.getMonth()] +
				" " +
				(date.getFullYear() + 543)
		);
		setDataSave.date = date.getDate();
		setDataSave.month = date.getMonth();
		setDataSave.year = date.getFullYear();
		setDataSave.timer = [
			{
				booking: false,
				label: "16.00 - 17.00 น.",
				value: 1,
			},
			{
				booking: false,
				label: "17.00 - 18.00 น.",
				value: 2,
			},
			{
				booking: false,
				label: "18.00 - 19.00 น.",
				value: 3,
			},
			{
				booking: false,
				label: "19.00 - 20.00 น.",
				value: 4,
			},
			{
				booking: false,
				label: "21.00 - 22.00 น.",
				value: 5,
			},
		];

		let date2 = date;
		var arrTime = [];
		firebaseRef
			.child("court/")
			.once("value")
			.then((snap) => {
				let snapArr = snap.val();
				let refIndex = snapArr.findIndex(
					({ _id }) => _id === route.params.court
				);
				snap
					.child(refIndex + "/courtBook/")
					.ref.once("value")
					.then((snap2) => {
						var snap2Arr = Object.values(snap2.val());
						var snap2Index = snap2Arr.findIndex(
							({ date, month, year }) =>
								date == date2.getDate() &&
								month == date2.getMonth() &&
								year == date2.getFullYear()
						);
						snap2
							.child(snap2Index + "/timer/")
							.ref.once("value")
							.then((snap3) => {
								let snap3Arr = Object.values(snap3.val());
								let timeArr = [];
								if (snap3Arr) {
									snap3Arr.map((val, index) => {
										if (!val.booking) {
											val.key = index.toString();
											console.log(val)
											timeArr.push(val);
										}
									});
									setTimeArray((state) => {
										state = timeArr;
										return state;
									});
								} else {
									setTimeArray((state) => null);
								}
							});
					});
			});
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
	const toSetArray = (newData) => {
		setDataArr((state) => {
			state = newData;
			return state;
		});
	};
	useEffect(() => {
		const firebaseRef = firebase.database().ref();
		console.log(isTimeArray);
		var newArr = [];
		firebaseRef
			.child("field")
			.once("value")
			.then((snapshot) => {
				let snapArr = Object.values(snapshot.val());
				var toDayDate = new Date();
				snapArr.map((val, index) => {
					let obj = {};
					let findToDay = val.fieldBook.findIndex(
						({ date, month, year }) =>
							date == toDayDate.getDate() &&
							month == toDayDate.getMonth() &&
							year == toDayDate.getFullYear()
					);

					// console.log(val.fieldBook.length)
					let objBook = val.fieldBook[findToDay];
					if (objBook) {
						obj.fieldId = val.fieldId;
						obj.fieldName = val.fieldName;
						obj.fieldBook = objBook;
						obj.name = "Tab" + index;
						newArr.push(obj);
						toSetArray(newArr);
						// console.log(objBook, "objBook");
					} else {
						let setData = insertDatetime(new Date());
						snapshot.ref
							.child(index + "/fieldBook/" + val.fieldBook.length)
							.set(setData);
						obj.fieldId = val.fieldId;
						obj.fieldName = val.fieldName;
						obj.fieldBook = setData;
						obj.name = "Tab" + index;
						// console.log(obj);
						newArr.push(obj);
					}
				});
			});
		// isDataArr ? isLoading() : "";
		return () => {
			firebaseRef.off();
		};
	}, [isFocused]);

	const inputRefs = {
		selectTime: null,
	};

	const timeRange = () => {
		console.log("useTimeRange")
		let objTime = [
			{
				value: 1,
				label: "16.00 - 17.00 น.",
				key: 1
			},
			{
				value: 2,
				label: "17.00 - 18.00 น.",
				key: 2
			},
			{
				value: 3,
				label: "18.00 - 19.00 น.",
				key: 3
			},
			{
				value: 4,
				label: "19.00 - 20.00 น.",
				key: 4
			},
			{
				value: 5,
				label: "20.00 - 21.00 น.",
				key: 5
			},
			{
				value: 6,
				label: "21.00 - 22.00 น.",
				key: 6
			},
		];

		return objTime;
	};
	const placeholder = {
		label: "เลื่อกช่วงเวลา",
		value: null,
		color: "#9EA0A4",
	};

	const minDate = () => {
		let dateNow = new Date();
		return dateNow;
	};
	const maxDate = () => {
		let dateNow = new Date();
		let maxDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		dateNow.setDate(maxDay[dateNow.getMonth()]);
		return dateNow;
	};

	const setInitData = (date) => {
		let obj = {};
		obj.date = date.getDate();
		obj.month = date.getMonth();
		obj.year = date.getFullYear();
		obj.timer = [
			{
				booking: false,
				label: "16.00 - 17.00 น.",
				value: 1,
				key: 1,
			},
			{
				booking: false,
				label: "17.00 - 18.00 น.",
				value: 2,
				key: 2,
			},
			{
				booking: false,
				label: "18.00 - 19.00 น.",
				value: 3,
				key: 3,
			},
			{
				booking: false,
				label: "19.00 - 20.00 น.",
				value: 4,
				key: 4,
			},
			{
				booking: false,
				label: "20.00 - 21.00 น.",
				value: 5,
				key: 5,
			},
			{
				booking: false,
				label: "21.00 - 22.00 น.",
				value: 6,
				key: 6,
			},
		];
		return obj;
	};

	const timer = [
		{
			value: 1,
			label: "16.00 - 17.00 น.",
			hours: "17",
			minute: "01",
			secound: "01",
		},
		{
			value: 2,
			label: "17.00 - 18.00 น.",
			hours: "18",
			minute: "01",
			secound: "01",
		},
		{
			value: 3,
			label: "18.00 - 19.00 น.",
			hours: "19",
			minute: "01",
			secound: "01",
		},
		{
			value: 4,
			label: "19.00 - 20.00 น.",
			hours: "20",
			minute: "01",
			secound: "01",
		},
		{
			value: 5,
			label: "20.00 - 21.00 น.",
			hours: "21",
			minute: "01",
			secound: "01",
		},
		{
			value: 5,
			label: "21.00 - 22.00 น.",
			hours: "22",
			minute: "01",
			secound: "01",
		},
	];

	const firebaseDB = () => {
		// console.log(isTimeSel);
		// console.log(isDateSel);
		let pathUpdate = "books";
		let date = new Date();
		let initData = setInitData(isDateSel.length > 0 ? isDateSel : date);
		let firebaseRef = firebase.database().ref();
		firebaseRef
			.child("books")
			.once("value")
			.then((value) => {
				// console.log(value.child());
				// console.log(value.val());
				/*
				let parentData = [...value.val()];
				for (let i = 0; i < parentData.length; i++) {
					if (
						parentData[i].date == date.getDate() &&
						parentData[i].month == date.getMonth() &&
						parentData[i].year == date.getFullYear()
					) {
						pathUpdate += '/' + i
						let timer = parentData[i].timer;
						timer.map((val, ind) => {
							if (val.value == isTimeSel) {
								console.log(val);
							}
						});
					} else {
					}
				}
				*/
			});
		// firebaseRef.update
		let fieldBook = {
			month: date.getMonth(),
			date: date.getDate(),
			year: date.getFullYear(),

			timer: [
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
					value: 5,
					label: "21.00 - 22.00 น.",
					booking: false,
				},
			],
		};

		// firebase
		// 	.database()
		// 	.ref("field/")
		// 	.set([
		// 		{
		// 			fieldName: "สนามที่ 1",
		// 			fieldId: 1,
		// 			fieldBook: [
		// 				fieldBook
		// 			],
		// 		},
		// 		{
		// 			fieldName: "สนามที่ 2",
		// 			fieldId: 2,
		// 			fieldBook: [
		// 				fieldBook
		// 			],
		// 		},
		// 		{
		// 			fieldName: "สนามที่ 3",
		// 			fieldId: 3,
		// 			fieldBook: [
		// 				fieldBook
		// 			],
		// 		},
		// 		{
		// 			fieldName: "สนามที่ 4",
		// 			fieldId: 4,
		// 			fieldBook: [
		// 				fieldBook
		// 			],
		// 		},
		// 		{
		// 			fieldName: "สนามที่ 5",
		// 			fieldId: 5,
		// 			fieldBook: [
		// 				fieldBook
		// 			],
		// 		},
		// 	]);

		setVisible(true);
		setTimeout(() => {
			setVisible(false);
		}, 5000);
	};

	return (
		<View style={styleView.container}>
			<ScrollView
				style={styleView.scrollContainer}
				contentContainerStyle={styleView.scrollContentContainer}
			>
				<Text style={{ paddingBottom: 20, fontSize: 16 }}>
					{route.params.name}
				</Text>
				<Image
					style={{ width: "100%", height: 250 }}
					source={{ uri: route.params.image }}
				/>
				<Text></Text>
				<Button
					style={{ paddingBottom: 20, paddingTop: 20 }}
					title="กรุณาเลือกวัน"
					onPress={showDatePicker}
				/>
				<DateTimePickerModal
					isVisible={isDatePickerVisible}
					mode="date"
					locale="th_TH"
					onConfirm={handleConfirm}
					onCancel={hideDatePicker}
					minimumDate={minDate()}
					maximumDate={maxDate()}
				/>
				<Text></Text>
				<Text>{isDateSelected}</Text>
				<Text></Text>
				<View paddingVertical={5} />
				{isDateSelected.length > 0 ? (
					<>
						<Text>ช่วงเวลา</Text>
						<RNPickerSelect
							placeholder={placeholder}
							items={isTimeArray ? isTimeArray : timeRange()}
							onValueChange={(value) => {
								if (value) {
									let objTime = timer.find(({ value }) => value == value);
									let setTime = [
										objTime.hours,
										objTime.minute,
										objTime.secound,
									];
									let dateSel = new Date(isDateSel);
									dateSel.setHours(...setTime);
									setDateSel(dateSel);
									setTimeSel(value);
								} else {
									setTimeSel(undefined);
								}
							}}
							style={pickerSelectStyles}
							value={isTimeSel}
							useNativeAndroidPickerStyle={false}
							ref={(el) => {
								inputRefs.selectTime = el;
							}}
						/>
						{/* <Text></Text>
						<Button
							style={{ paddingBottom: 20, paddingTop: 20 }}
							title="สั่งอุปกรณ์กีฬา - เครื่องดื่ม"
							onPress={() => {
								setVisible(true);
								setTimeout(() => {
									setVisible(false);
								}, 5000);
							}}
						/> */}
					</>
				) : (
					<Text></Text>
				)}

				<Text></Text>
				<ProgressLoad />
			</ScrollView>
			{typeof isTimeSel !== "undefined" ? (
				<View style={styleView.header_footer_style}>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("orderDetail", {
								name: "จองสนาม",
								date: isDateSel.toString(),
								time: isTimeSel,
								court: route.params.court,
							})
						}
					>
						<Text style={styleView.textStyle}>จองสนาม</Text>
					</TouchableOpacity>
				</View>
			) : (
				<Text></Text>
			)}
		</View>
	);
};

const styleView = StyleSheet.create({
	container: {
		flex: 1,
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
export default BookBadmintonDetail;
