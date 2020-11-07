import React, { Component, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { styles } from "../../css/style";
import Modal from "modal-react-native-web";
import { Overlay } from "react-native-elements";

OverlayScreen = (props) => {
	const [visible, setVisible] = useState(false);

	const toggleOverlay = () => {
		setVisible(!visible);
	};

	return (
		<View>
			<Button title="Open Overlay" onPress={toggleOverlay} />

			<Overlay
				isVisible={visible}
				onBackdropPress={toggleOverlay}
				animationType="fade"
			>
				<View>
					<Text>คุณต้องการยกเลิกการจองนี้หรือไม่ ?</Text>
					<Button title="ใช่" />
					<Button title="ไม่" />
				</View>
			</Overlay>
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
		color: "#fff",
		fontSize: 26,
		padding: 7,
	},
});

export default OverlayScreen;
