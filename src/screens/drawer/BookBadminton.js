import React, { useState } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";

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



const Item = ({ item, onPress, style }) => (
	<TouchableOpacity onPress={onPress} style={[styles.item, style]}>
		<Image style={{ width: "100%", height: 200 }} source={item.url} />
		<Text style={styles.title}>{item.title}</Text>
	</TouchableOpacity>
);

BookBadminton = () => {
	const [selectedId, setSelectedId] = useState(null);
	const navigation = useNavigation();
	const route = useRoute();

	const renderItem = ({ item }) => {
		const backgroundColor = item.id === selectedId ? "white" : "white";
		return (
			<Item
				item={item}
				onPress={() =>
					navigation.navigate("BookBadmintonDetail", {
						name: item.title,
						image: item.url,
						user: route.params.user,
						cord: item.key,

					})
				}
				style={{ backgroundColor }}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
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
	},
	title: {
		fontSize: 20,
	},
});

export default BookBadminton;
