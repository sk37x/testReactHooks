import React, { Component, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { styles } from "../../css/style";
import { Overlay, Button, Icon } from "react-native-elements";

ButtonFixedBottom = (props) => {
	

	const [visible, setVisible] = useState(false);
	const toggleOverlay = () => {
		setVisible(!visible);
	};

	const OverlayScreen = () => {
		return (
			<Overlay
				isVisible={visible}
				onBackdropPress={toggleOverlay}
				animationType="fade"
			>
				<View>
					<Text>คุณต้องการลบสนามใช่หรือไม่ ?</Text>
					<Button title="ใช่" />
					<Button title="ไม่" />
				</View>
			</Overlay>
		);
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
					toggleOverlay();
				}}
			>
				<Text style={[styleView.textStyle, { color: props.color }]}>
					{props.text}
				</Text>
			</TouchableOpacity>

			<Overlay
				isVisible={visible}
				onBackdropPress={toggleOverlay}
                animationType="fade"
                
			>
				<View style={{width:320, height:210, borderRadius: 20}}>
                    <Icon
                        size={100}
                        type='font-awesome'
                        name={'exclamation-triangle'}
                    />
					<Text style={styleView.textStyle}>คุณต้องการลบสนาม {props.courtName} ?</Text>
					<View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 8, marginHorizontal: 12 }}>
                        <TouchableOpacity onPress={() => {
                            props.onPress();
							toggleOverlay();
							
                            }} style={[styleView.colorInfo ,{ justifyContent:'center', alignItems:'center', borderWidth:2,  width:120, height: 42, marginRight: 7 }]}>
                            <Text style={styleView.textStyle}>ใช่</Text>
                        </TouchableOpacity>
						<TouchableOpacity onPress={() => toggleOverlay()} style={[styleView.colorSecound ,{ justifyContent:'center', alignItems:'center', borderWidth:2,  width:120, height: 42, marginLeft: 7 }]}>
							<Text style={styleView.textStyle}>ไม่</Text>
						</TouchableOpacity>
					</View>
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
		fontSize: 26,
		padding: 7,
    },
    colorInfo: {
        color:"#0c5460",
        backgroundColor: "#d1ecf1",
        borderColor: "#bee5eb",
        borderWidth: 2
    },
    colorSecound: {
        color: "#383d41",
        backgroundColor: "#e2e3e5",
        borderColor: "#d6d8db",
        borderWidth: 2
    },

});

export default ButtonFixedBottom;
