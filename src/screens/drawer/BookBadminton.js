import React, { useState, useEffect } from "react";
import {
	FlatList,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
} from "react-native";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import * as firebase from 'firebase'


const DATA = [
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
		title: "สนามที่ 1",
		url: require("../../images/101748.jpg"),
		key: 1
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
		title: "สนามที่ 2",
		url: require("../../images/101749.jpg"),
		key: 2
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d72",
		title: "สนามที่ 3",
		url: require("../../images/101750.jpg"),
		key: 3
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d73",
		title: "สนามที่ 4",
		url: require("../../images/101751.jpg"),
		key: 4
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d74",
		title: "สนามที่ 5",
		url: require("../../images/101751.jpg"),
		key: 5
	},
];





BookBadminton = () => {
	const [selectedId, setSelectedId] = useState(null);
	const navigation = useNavigation();
	const route = useRoute();
	const user = firebase.auth().currentUser;
	const firebaseRef = firebase.database().ref();
	const isFocused = useIsFocused();
	const [isDataCourt, setDataCourt] = useState(null);

	const toSetArray = (newData) => {
		setDataCourt((state) => {
			state = newData;
			return state;
		});
	};


	const fetchData = () => {
		let arrToSet = [];
		firebaseRef.child('field/').on('value', (snapshot) => {
			let snapArr = snapshot.val();
			let obj = {};
			snapArr.map((val, index) => {
				obj.fieldId = val.fieldId;
				obj.fieldName = val.fieldName;
				// รอแก้ไข
				obj.url = DATA[index].url;
				arrToSet.push(obj)
			})
			// toSetArray(snapshot.val())
		})
	}
	

	

	useEffect(() => {
		let a = fetchData();

		firebaseRef.child('court/').once('value').then((snapshot) => {
			let snapArr = snapshot.val();
			// snapArr.map((val, index) => val.key = index)
			setDataCourt(snapArr)
		})
		return () => {
			firebaseRef.off();
		}
	}, [isFocused])
	
	const Item = ({ item, onPress, style }) => {
		return (
		
		<TouchableOpacity onPress={onPress} style={[styles.item, style]}>
			<Image style={{ width: "100%", height: 200, borderRadius: 50 }} source={{uri:item.imageUri}} />
			<Text style={styles.title}>{item.name}</Text>
		</TouchableOpacity>
	)};
	
	renderItem = ({ item }) => {
		const backgroundColor = item.id === selectedId ? "white" : "white";
		// console.log(item)
		return (
			<Item
				item={item}
				onPress={() =>
					navigation.navigate("BookBadmintonDetail", {
						name: item.name,
						image: item.imageUri,
						// user: route.params.user,
						court: item._id,

					})
				}
				style={{ backgroundColor }}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={isDataCourt}
				renderItem={this.renderItem}
				keyExtractor={(item, index) => index.toString()}
				extraData={selectedId}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight || 0,
	},
	item: {
		// padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		alignItems: 'center'
	},
	title: {
		fontSize: 27,
		fontFamily: 'thSarabunNew'

	},
});

export default BookBadminton;
