import React, { Component, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from "react-native";
import { Icon, Input } from 'react-native-elements'
import { styles } from "../../css/styleAdmin";
import {
	useNavigation,
	useRoute,
	useNavigationState,
	useIsFocused,
} from "@react-navigation/native";
import firebase from "firebase";
import CustomActionSheet from './CustomActionSheet'

AddCourt = (props) => {
	const navigation = useNavigation();
	const route = useRoute();
	const index = useNavigationState((state) => state.index);
	const user = firebase.auth().currentUser;
	const isFocused = useIsFocused();



    const showActionSheet = () => actionSheet.show();

	const test = () => {
		console.log('func Test')
	}

	useEffect(() => {
		console.log(props);
		console.log(props.data);
	}, [isFocused]);
	return (
		<View style={styles.container}>
			<Text style={[styles.title, { marginBottom: 9 }]}>รูปภาพสนาม</Text>
			<Icon 
				type={'font-awesome'}
				name={'picture-o'}
				size={256}
				onPress={() => showActionSheet()}
				containerStyle={{marginBottom: 13}}
			/>
			<Text style={[styles.title, { marginBottom: 9 }]}>ชื่อสนาม</Text>
			<CustomActionSheet funcSet={props.funcSet} funcSetState={props.funcSetState} data={props.data} />
		</View>
	);
};

export default AddCourt;
