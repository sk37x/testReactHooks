import React, { Component, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { styles } from "../../css/style";
import { Overlay, Button, Icon } from "react-native-elements";

ButtonFixedBottom = (props) => {
	const [visible, setVisible] = useState(false);
	const toggleOverlay = () => {
		setVisible(!visible);
	};


	return (
		<View
			style={[
				styleView.header_footer_style,
				{
					backgroundColor: props.backgroundcolor,
					borderColor: props.borderColor,
				},
			]}
		>
			<TouchableOpacity
				onPress={() => {
					props.onPress();
				}}
			>
				<Text style={[styleView.textStyle, { color: props.color }]}>
					{props.text}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const styleView = StyleSheet.create({
	header_footer_style: {
		width: "100%",
		height: 45,
	},
	textStyle: {
		textAlign: "center",
		fontFamily: "thSarabunNew",
		fontSize: 26,
		padding: 7,
	},
	colorInfo: {
		color: "#0c5460",
		backgroundColor: "#d1ecf1",
		borderColor: "#bee5eb",
		borderWidth: 2,
	},
	colorSecound: {
		color: "#383d41",
		backgroundColor: "#e2e3e5",
		borderColor: "#d6d8db",
		borderWidth: 2,
	},
});

export default ButtonFixedBottom;
