import React, { Component, useEffect, useState, useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	Platform,
	TouchableOpacity,
	InteractionManager,
	Image,
	TouchableHighlight,
	Linking,
	Alert,
	ScrollView,
	ToastAndroid,
	AlertIOS,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./css/style";
import firebase from "firebase";
import axios from "axios";
import { Icon } from "react-native-elements";
import ViewContent from "./ViewContent";
import { set } from "react-native-reanimated";
import Toast from "react-native-toast-message";

// clear Timeout Android
const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === "android") {
	// Work around issue `Setting a timer for long time`
	// see: https://github.com/firebase/firebase-js-sdk/issues/97
	const timerFix = {};
	const runTask = (id, fn, ttl, args) => {
		const waitingTime = ttl - Date.now();
		if (waitingTime <= 1) {
			InteractionManager.runAfterInteractions(() => {
				if (!timerFix[id]) {
					return;
				}
				delete timerFix[id];
				fn(...args);
			});
			return;
		}

		const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
		timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
	};

	global.setTimeout = (fn, time, ...args) => {
		if (MAX_TIMER_DURATION_MS < time) {
			const ttl = Date.now() + time;
			const id = "_lt_" + Object.keys(timerFix).length;
			runTask(id, fn, ttl, args);
			return id;
		}
		return _setTimeout(fn, time, ...args);
	};

	global.clearTimeout = (id) => {
		if (typeof id === "string" && id.startWith("_lt_")) {
			_clearTimeout(timerFix[id]);
			delete timerFix[id];
			return;
		}
		_clearTimeout(id);
	};
}
// clear Timeout Android

const supportedURL = "fb://profile/100035064216737";

const supportURL = async () => {
	let url = "fb://profile/100035064216737";
	Linking.canOpenURL(url).then((chk) => {
		// console.log(chk)
		if (Platform.OS == "android") {
			if (chk == false) {
				url = "https://www.facebook.com/profile.php?id=100035064216737";
				Linking.openURL(url);
			} else {
				Linking.openURL(url);
			}
		} else if (Platform.OS == "ios") {
			Linking.openURL(url);
		}
	});
};

Feed = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const user = firebase.auth().currentUser;
	// const viewElement = useRef(null);

	useEffect(() => {}, []);

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
				label: "21.00 - 22.00 น.",
				value: 5,
				key: 5,
			},
		];
		return obj;
	};
	const insertOrder = (orderLength, fieldId, timeId) => {
		let obj = {};
		obj.orderBy = user.uid;
		obj.orderByName = user.displayName;
		obj.orderId = orderLength;
		obj.orderTime = new Date().toString();
		obj.orderFieldId = fieldId;
		obj.orderFieldTime = timeId;
		return obj;
	};

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

	const testDB = () => {
		const dataRef = firebase.database().ref();
		const date = new Date();

		var mean = false;
		var insertIndex;
		let selTime = 5;
		let selField = 1;

		dataRef
			.child("field/")
			.once("value")
			.then((snapshot) => {
				var arr = [...snapshot.val()];

				let findField = arr.find(({ fieldId }) => fieldId == selField);
				let findFieldIndex = arr.findIndex(
					({ fieldId }) => fieldId == selField
				);

				findField.fieldBook.map((v, i) => {
					if (
						v.date == date.getDate() &&
						v.month == date.getMonth() &&
						v.year == date.getFullYear()
					) {
						mean = true;
						// console.log(snapshot.ref.child(findFieldIndex+"/fieldBook/"+ i));
						let timer = v.timer;
						timer.map((val, index) => {
							if (val.value == selTime) {
								// console.log(snapshot.ref.child('books/'+i+'/timer/'+index).set({booking:true}));

								let obj = val;
								obj.booking = true;
								snapshot.ref
									.child(findFieldIndex + "/fieldBook/" + i + "/timer/" + index)
									.set(obj);
								dataRef.ref
									.child("Order/")
									.once("value")
									.then((childVal) => {
										let prepareData = insertOrder(
											childVal.val().length,
											findField.fieldId,
											val.value
										);
										// childVal.ref.child(childVal.val().length).set(prepareData)
										childVal.ref.parent
											.child("mybooks/" + user.uid)
											.once("value")
											.then((bookData) => {
												console.log(bookData.val());
												if (!bookData.val()) {
													bookData.ref.child(0).set(prepareData);
												} else {
													bookData.ref
														.child(bookData.val().length)
														.set(prepareData);
												}
											});
									});

								// dataRef.child('mybooks/' + user.uid).set()
							}
						});
					} else {
						// insertDatetime()
						// console.log(snapshot.ref.child(findFieldIndex + "/fieldBook/" + i));
					}
				});
				// console.log(snapshot.ref.child(findFieldIndex+"/fieldBook/"+))

				if (!mean) {
					console.log("!mean");
					let childRef = snapshot.ref.child(
						findFieldIndex + "/fieldBook/" + findField.fieldBook.length
					);
					let pathSave =
						findFieldIndex + "/fieldBook/" + findField.fieldBook.length;
					childRef.set(insertDatetime(date));
					childRef.once("value").then((snap2) => {
						let timer = snap2.val().timer;
						timer.map((val, index) => {
							if (val.value == selTime) {
								// console.log(snapshot.ref.child('books/'+i+'/timer/'+index).set({booking:true}));
								let obj = val;
								console.log(obj);
								obj.booking = true;
								snapshot.ref.child(pathSave + "/timer/" + index).set(obj);
								dataRef.ref
									.child("Order/")
									.once("value")
									.then((childVal) => {
										let prepareData = insertOrder(
											childVal.val().length,
											findField.fieldId,
											val.value
										);
										// childVal.ref.child(childVal.val().length).set(prepareData)
										childVal.ref.parent
											.child("mybooks/" + user.uid)
											.once("value")
											.then((bookData) => {
												console.log(bookData.val());
												if (!bookData.val()) {
													bookData.ref.child(0).set(prepareData);
												} else {
													bookData.ref
														.child(bookData.val().length)
														.set(prepareData);
												}
											});
									});
							}
						});
					});
				}
			});

		// dataRef
		// 	.child("books")
		// 	.once("value")
		// 	.then((snapshot) => {
		// 		let arr = [...snapshot.val()];
		// 		let mean = false;
		// 		arr.map((v, i) => {
		// 			if (
		// 				v.date == date.getDate() &&
		// 				v.month == date.getMonth() &&
		// 				v.year == date.getFullYear()
		// 			) {
		// 				mean = true;
		// 				let timer = v.timer;
		// 				timer.map((val, index) => {
		// 					if(val.value == sel){
		// 						// console.log(snapshot.ref.child('books/'+i+'/timer/'+index).set({booking:true}));
		// 						let obj = val;
		// 						obj.booking = true;
		// 						snapshot.ref.child(i+'/timer/'+index).set(obj);
		// 						// dataRef.child('books/'+i+'/timer/'+index).set('')
		// 					}
		// 				})

		// 			}
		// 		});
		// 		if (!mean) {
		// 			let initData = setInitData(date);
		// 			dataRef.child("books/" + arr.length).set(initData);
		// 		}
		// 	});
	};

	const initialValue = [{ id: 0, value: " --- Select a State ---" }];

	const allowedState = [
		{ id: 1, value: "Alabama" },
		{ id: 2, value: "Georgia" },
		{ id: 3, value: "Tennessee" },
	];
	const [listOrder, setListOrder] = useState(initialValue);
	const TestComp = ({ item }) => {
		return <Text>{item.map((v) => v.id + ", ")}</Text>;
	};
	return (
		<View>
			<ScrollView contentContainerStyle={styleView.scrollContentContainer}>
				{/* <TestComp item={listOrder} />
				<Button title="testDB" onPress={() => testDB()} /> */}
				{/* <ViewContent
					count={isCountItem}
					item={itemShow}
					addOrRemove={addOrRemove}
					itemShow={itemShow}
					isCountItem={isCountItem}
					// handlerMount={addTestCount}
					/>
				<ViewContent
					item={isItemResult}
					result="test"
					addOrRemove={addOrRemove}
					itemShow={itemShow}
					isCountItem={isCountItem}
					// handlerMount={addTestCount}
				/> */}
				<Text style={styles.title2}>ข้อมูลข่าวสาร</Text>
				<Image
					source={require("./images/101749.jpg")}
					style={styles.imgFullScreen}
				/>
				<Text></Text>
				<Text style={styles.title2}>Page Facebook</Text>
				<TouchableHighlight onPress={() => supportURL()}>
					<Image
						source={require("./images/fb.png")}
						style={styles.imgFullScreen}
					/>
				</TouchableHighlight>
				<Text></Text>
				<Text style={styles.title2}>อัตราค่าบริการ</Text>
				<Image
					source={require("./images/price.png")}
					style={styles.imgFullScreen}
				/>
			</ScrollView>
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
});

/*
Feed = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const [isVisible, setVisible] = useState(true)
	let detailResult = route.params;
	// console.log(route)
	const testDB = (user, score) => {
		console.log(this);
		if (user != null) {
			const userData = firebase.database().ref("books/").once("value");
			userData.then((test) => {
				// console.log(test.val(), typeof test.val());
				
				console.log(test.val()[0]);
			});

			// var newPostKey = firebase.database().ref().child('posts').push().key;
			// Get a key for a new Post.
			// var newPostKey = firebase.database().ref('books/').push().key;
			// let postData = {
			//     key : newPostKey,
			//     date: new Date().toString(),
			//     test1: score,
			//     test2: ++score,
			//     test3: ++score,
			//     test4: ++score
			//   }

			// var updates = {};
			// updates['books/' + newPostKey] = postData;
			// console.log(updates)
			// firebase.database().ref().update(updates);
			// let date = new Date();
			// firebase.database().ref('books/').set([
			// 	{
			// 		month: date.getMonth(),
			// 		date : date.getDate(),
			// 		year : date.getFullYear(),
			// 		timer : [
			// 			{
			// 				value: 1,
			// 				label: "16.00 - 17.00 น.",
			// 				booking: false
			// 			},
			// 			{
			// 				value: 2,
			// 				label: "17.00 - 18.00 น.",
			// 				booking: false
			// 			},
			// 			{
			// 				value: 3,
			// 				label: "18.00 - 19.00 น.",
			// 				booking: false
			// 			},
			// 			{
			// 				value: 4,
			// 				label: "19.00 - 20.00 น.",
			// 				booking: false
			// 			},
			// 			{
			// 				value: 5,
			// 				label: "21.00 - 22.00 น.",
			// 				booking: false
			// 			},
			// 		]
			// 	},
			// 	{
			// 		month: date.getMonth(),
			// 		date : (date.getDate() + 1),
			// 		year : date.getFullYear(),
			// 		timer : [
			// 			{
			// 				value: 1,
			// 				label: "16.00 - 17.00 น.",
			// 				booking: false
			// 			},
			// 			{
			// 				value: 2,
			// 				label: "17.00 - 18.00 น.",
			// 				booking: false
			// 			},
			// 			{
			// 				value: 3,
			// 				label: "18.00 - 19.00 น.",
			// 				booking: false
			// 			},
			// 			{
			// 				value: 4,
			// 				label: "19.00 - 20.00 น.",
			// 				booking: false
			// 			},
			// 			{
			// 				value: 5,
			// 				label: "21.00 - 22.00 น.",
			// 				booking: false
			// 			},
			// 		]
			// 	},
			// ]);


		}
	};

	useEffect(() => {
		setInterval(() => {
            isVisible ? setVisible(false): '';
        }, 5000);
	}, [])

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Navigation Drawer</Text>
			{Platform.select({
				ios: (
					<Button
						title="Go To Detail Item"
						onPress={() =>
							navigation.navigate("Detail", {
								screenName: "My Detail Screen",
							})
						}
					/>
				),
				android: (
					<Button
						style={{ marginBottom: 16 }}
						title="Go To Detail Item"
						onPress={() =>
							navigation.navigate("Detail", {
								screenName: "My Detail Screen",
							})
						}
					/>
				),
			})}

			<Button
				title="TEST firebase.db"
				onPress={() => testDB(route.params.user, 100)}
			/>

		</View>
	);
};
*/
export default Feed;
