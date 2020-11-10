import React, { Component } from "react";
import {
	AppRegistry,
	Button,
	StyleSheet,
	NativeModules,
	Platform,
	Text,
	View,
} from "react-native";
import * as Print from "expo-print";

const TestPrint = () => {
	const html = `<html>
		<head>
			<link rel='stylesheet' type='text/css' src='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css' />
		</head>
		<body>
			<div class='container'>
				<div class='row'>
					<div class='col-3'>
						<h1>Badminton K6</h1>
					</div>
					<div class='col-3'>
						<h1>Badminton K6</h1>
					</div>
				</div>
			</div>
			
		</body>
	</html>`;
	const html2 = `<html>
		<head></head>
		<body>
			<table width="100%" border="1" cellpadding='2' cellspacing='1'>
				<thead>
					<tr>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</tbody>
			
			</table>
		
		</body>
	</html>`;
	const printHTML = async (html) => {
		const options = {
			html: "<div>Hello World</div>",
		};
		// let a = await DocumentPicker.getDocumentAsync({
		// 	type:'data:application/pdf;base64'
		// })
		const test = await Print.printAsync({
			html: html,
			width: 95,
			height: 210,
		});
		console.log(test);
	};
	return (
		<View style={styles.container}>
			{/* {Platform.OS === 'ios' && this.customOptions()} */}
			<Button onPress={() => printHTML(html)} title="Print HTML" />
		</View>
	);
};

export default TestPrint;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF",
	},
});
