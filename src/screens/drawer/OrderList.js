import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { styles } from "../../css/style";
import {
	useNavigation,
	useRoute,
	useNavigationState,
} from "@react-navigation/native";
import firebase from "firebase";

OrderDetail = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const index = useNavigationState((state) => state.index);
    const test = () => {
		setListOrder(state => {
		  console.log(state);
		  console.log(allowedState);
		  newArr = [...state, ...allowedState]
		  return newArr;
		});
	  }
	
	const initialValue = [{ id: 0, value: " --- Select a State ---" }];



	const [listOrder, setListOrder] = useState(initialValue);
	const user = firebase.auth().currentUser;
	const firebaseRef = firebase.database().ref();
	useEffect(() => {

	}, []);
	// const st = () => {
	// 	firebaseRef.child("mybooks/" + user.uid).once("value").then((listData) => {
	// 	});
	// };

	// useEffect(() => {
	// 	console.log("HelloWolrd");
	//   setListOrder(state => [
	//     { test: "999", id: 1 },
	//     { test: "8888", id: 2 },
	//   ])
	// 	console.log(isListOrder, 1);
	// 	return () => firebaseRef.off();
	// 	// return () => firebaseChild;
	// }, []);


	const listItem = () => {

	}
	const allowedState = [
		{ id: 1, value: "Alabama" },
		{ id: 2, value: "Georgia" },
		{ id: 3, value: "Tennessee" },
	];


	return (
		<View style={styles.containerNotCenter}>
			<Text style={styles.title}>รายการจอง</Text>
			<View style={styles.container}>
				{/* <Text style={styles.title2}>ไม่มีรายการจอง</Text> */}
			</View>
			{/* <TestComp test={listOrder} />
			<Button title="กลับหน้าแรก" onPress={() => console.log(listOrder)} /> */}
		</View>
	);
};

export default OrderDetail;
