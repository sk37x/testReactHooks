import React, { Component, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, ScrollView } from "react-native";
import { styles } from "../../css/style";
import {
	useNavigation,
	useRoute,
	useNavigationState,
} from "@react-navigation/native";
import firebase from 'firebase'


RuleScreen = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const index = useNavigationState((state) => state.index);
  console.log(navigation)
  console.log(index);
  const user = firebase.auth().currentUser
  useEffect(() => {
    
  })
	return (
    
		<View style={styles.containerNotCenter}>
			<ScrollView contentContainerStyle={styleView.scrollContentContainer}>
				<Text style={styles.title}>{route.name}</Text>
				<Image source={require('../../images/Rule.png')} style={{ width: "100%", height: 550, resizeMode: "stretch" }}/>
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
		paddingBottom: 10,
	},
});

export default RuleScreen;
