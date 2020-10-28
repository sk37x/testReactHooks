import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { styles } from "../../css/style";
import { useNavigation } from '@react-navigation/native'

Signout = () => {
    const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<Text style={styles.title}>TEST</Text>
			<Button
				onPress={() => navigation.navigate("SecondPage")}
				title="TEST"
			/>
		</View>
	);
};

export default Signout;
