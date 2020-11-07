import React, { useState, useEffect } from "react";
import {
	SafeAreaView,
	View,
	Text,
	Image,
	StyleSheet,
	FlatList,
	Dimensions
} from "react-native";
import {
	useNavigation,
	useRoute,
	useIsFocused,
} from "@react-navigation/native";
import { styles } from "../../css/styleAdmin";
import firebase from "firebase";
import * as Progress from "react-native-progress";
import TouchableScale from "react-native-touchable-scale";
import { ListItem } from "react-native-elements";


ShowListComponent = (props) => {
	const navigation = useNavigation();
	const route = useRoute();
	const isFocused = useIsFocused();
	const firebaseRef = firebase.database().ref();
	const storage = firebase.storage();
	const [isDataList, setDataList] = useState(null);
	const [isNumber, setNumber] = useState(0);
	const toSetData = (dataList) => {
		setDataList((state) => {
			state = dataList;
			return state;
		});
	};
	useEffect(() => {
		// console.log(route.params.type);
		// props.isLoading();
		firebaseRef
			.child(route.params.type + "/")
			.once("value")
			.then((snapshot) => {
				if (snapshot.val() !== null) {
					// console.log("inSnap");
					let arr = [...snapshot.val()];
					// console.log(arr);
					toSetData(arr);
				}
			});
	}, [isFocused]);


	const showListOrder = (jsonList) => {
		return jsonList ? (
			<FlatList
				contentContainerStyle={styles.scrollContentContainer}
				style={{ flex: 1, marginVertical: 20 }}
				data={jsonList}
				keyExtractor={(item, index) => {
					return index ? index.toString() : 0;
				}}
				numColumns={2}
				renderItem={({ item }) => {
					return (
						<TouchableScale
							friction={50}
							tension={100}
							activeScale={0.95}
							style={styles.item}
							onPress={() => navigation.push('addCourt', {type : 'edit'})}
						>
							<Image
								source={{ uri: item.imageUri }}
								style={{
									width: (Dimensions.get("window").width / 2) - 100,
									height: 150,
								}}
							/>
							<Text>{item.name}</Text>
						</TouchableScale>
					);
				}}
			/>
		) : (
			<View style={styles.container} key={0}>
				<Text style={styles.title}>ไม่มีข้อมูล</Text>
			</View>
		);
	};

	return (
		<SafeAreaView style={[styles.containerList]}>
			<Text style={styles.title}>สนามแบดมินตัน</Text>
			{showListOrder(isDataList)}
			{props.componentLoad()}
		</SafeAreaView>
	);
};

export default ShowListComponent;

// return (
//     <View style={styles.item}>
//         <ListItem
//             // Component={TouchableScale}
//             // friction={50} //
//             // tension={100} // These props are passed to the parent component (here TouchableScale)
//             // activeScale={0.95} //
//             containerStyle={{
//                 backgroundColor: "#51adcf",
//             }}
//             bottomDivider
//         >
//             <ListItem.Content>
//                 <ListItem.Title
//                     style={{
//                         fontFamily: "thSarabunNew",
//                         fontSize: 24,
//                         color: "white",
//                         fontWeight: "bold",
//                     }}
//                 >
//                     {item.text}
//                 </ListItem.Title>
//                 <ListItem.Subtitle
//                     style={{
//                         fontFamily: "thSarabunNew",
//                         fontSize: 20,
//                         color: "white",
//                     }}
//                 >
//                     test
//                 </ListItem.Subtitle>
//             </ListItem.Content>
//             <ListItem.Chevron color="white" />
//         </ListItem>
//     </View>
// );
