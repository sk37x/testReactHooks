import { StatusBar } from "expo-status-bar";
import { StyleSheet, Dimensions } from "react-native";
import { useEffect } from "react";
import * as Font from "expo-font";
const _loadingFont = async () => {
	await Font.loadAsync({
		thSarabunNew: require("../../assets/font/THSarabunNew.ttf"),
	});
};

_loadingFont();

// useEffect(() => {
// 	_loadingFont();
// 	return () => _loadingFont();
// }, []);

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 24,
	},
	containerCenter: {
		flex: 1,
		margin: 24,
		justifyContent: "center",
		alignItems: "center",
	},
	containerList: {
		flex: 1,
		margin: 24,
	},
	title: {
		fontFamily: "thSarabunNew",
		fontSize: 28,
	},
	paragraph: {
		fontFamily: "thSarabunNew",
		fontSize: 22,
		marginLeft:18
	},
	scrollContentContainer: {
		paddingTop: 10,
		paddingBottom: 10,
	},
	item: {
		backgroundColor: "#dbf6e9",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		margin: 1,
		height: Dimensions.get("window").width / 2, // approximate a square
	},
});
