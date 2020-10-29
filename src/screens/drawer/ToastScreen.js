import React, { Component, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { styles } from "../../css/style";
import {
	useNavigation,
	useRoute,
	useNavigationState,
} from "@react-navigation/native";
import firebase from 'firebase'
import Toast from "react-native-simple-toast";
const TestToast = () => {
	Toast.show("This is a toast.")
	Toast.show("This is a long toast.", Toast.LONG)
}

ToastScreen = () => {
	const TestToast = () => {
		Toast.show("This is a toast.")
		Toast.show("This is a long toast.", Toast.LONG)
	}
		return TestToast;
	
	// render() {
	// 	return (
		
	// 		<View style={styles.container}>
	// 			<Text style={styles.title}>{route.name}</Text>
	// 			<Button title="กลับหน้าแรก" />
	// 		</View>
	// 	);
	// }
};

export default ToastScreen;
