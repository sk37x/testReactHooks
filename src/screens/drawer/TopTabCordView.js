import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { styles } from "../../css/style";
import {
	useNavigation,
	useRoute,
	useNavigationState,
	useIsFocused,
} from "@react-navigation/native";
import firebase from "firebase";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CordView from "./CordView";
import Detail from "../../Detail";
import ProgressLoader from "rn-progress-loader";

const MaterialTopTabs = createMaterialTopTabNavigator();
const TabTestComp = () => (
	<View>
		<Text>TEST</Text>
	</View>
);

TopTabCordView = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const user = firebase.auth().currentUser;
	const [isDataArr, setDataArr] = useState(null);
	const [isVisibleLoading, setVisibleLoading] = useState(false);
	const isFocused = useIsFocused();

	const toSetArray = (newData) => {
		setDataArr((state) => {
			state = newData;
			return state;
		});
	};
	const insertDatetime = (date) => {
		let courtBook = {
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
		return courtBook;
	};
	useEffect(() => {
		var newArr = [];
		const firebaseRef = firebase.database().ref();
		firebaseRef
			.child("court/")
			.once("value")
			.then((snapshot) => {
				let snapArr = [...snapshot.val()];
				var toDayDate = new Date();
				snapArr.map((val, index) => {
					// if (val.courtBook) console.log(val);
					let obj = {};
					if (val.courtBook) {
						let findToDay = val.courtBook.findIndex(
							({ date, month, year }) =>
								date == toDayDate.getDate() &&
								month == toDayDate.getMonth() &&
								year == toDayDate.getFullYear()
						);

						// console.log(val.courtBook.length)
						let objBook = val.courtBook[findToDay];
						if (objBook) {
							obj._id = val._id;
							obj.courtName = val.name;
							obj.courtBook = objBook;
							obj.name = "Tab" + index;
							newArr.push(obj);
							toSetArray(newArr);
							// console.log(objBook, "objBook");
						} else {
							let setData = insertDatetime(new Date());
							snapshot.ref
								.child(index + "/courtBook/" + val.courtBook.length)
								.set(setData);
							obj._id = val._id;
							obj.courtName = val.courtName;
							obj.courtBook = setData;
							obj.name = "Tab" + index;
							console.log(obj);
							newArr.push(obj);
						}
					} else {
						let setData = insertDatetime(new Date());
						snapshot.ref
							.child(index + "/courtBook/0")
							.set(setData);
						obj._id = val._id;
						obj.courtName = val.courtName;
						obj.courtBook = setData;
						obj.name = "Tab" + index;
						console.log(obj);
						newArr.push(obj);
					}
				});
			});
		isDataArr ? isLoading() : "";
		return () => {
			firebaseRef.off();
		};
	}, [isFocused]);
	const isLoading = () => {
		setVisibleLoading(true);
		setTimeout(() => {
			setVisibleLoading(false);
		}, 2000);
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
		<MaterialTopTabs.Navigator>
			{isDataArr ? (
				isDataArr.map((value, index) => {
					console.log(value.courtBook.timer);
					return (
						<MaterialTopTabs.Screen
							name={value.name}
							children={CordView}
							options={{ title: value.courtName }}
							initialParams={{ timeArr: value.courtBook.timer }}
							key={index}
						/>
					);
				})
			) : (
				<MaterialTopTabs.Screen
					name="loading ..."
					component={ProgressLoad}
					options={{ title: "Loading ..." }}
				/>
			)}
			{/* <MaterialTopTabs.Screen
				name="Tab 1"
				children={CordView}
				options={{ title: "สนามที่ 1" }}
			/>
			<MaterialTopTabs.Screen
				name="Tab 2"
				children={TabTestComp}
				options={{ title: "สนามที่ 2" }}
			/> */}
		</MaterialTopTabs.Navigator>
	);
};
export default TopTabCordView;
