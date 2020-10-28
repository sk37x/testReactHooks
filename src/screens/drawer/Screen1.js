import React, { Component, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { styles } from "../../css/style";
import {
	useNavigation,
	useRoute,
	useNavigationState,
} from "@react-navigation/native";
import firebase from 'firebase'


Screen1 = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const index = useNavigationState((state) => state.index);
  console.log(navigation)
  console.log(index);
  const user = firebase.auth().currentUser
  useEffect(() => {
    
  })
	return (
    
		<View style={styles.container}>
			<Text style={styles.title}>{route.name}</Text>
			<Button title="กลับหน้าแรก" />
		</View>
	);
};

export default Screen1;
