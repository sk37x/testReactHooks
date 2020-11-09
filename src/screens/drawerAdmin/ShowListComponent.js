import React, { useState, useEffect } from "react";
import {
	SafeAreaView,
	View,
	Text,
	Image,
	StyleSheet,
	FlatList,
	Dimensions,
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
import { ListItem, Icon } from "react-native-elements";

ShowListComponent = (props) => {
	const navigation = useNavigation();
	const route = useRoute();
	const isFocused = useIsFocused();
	const firebaseRef = firebase.database().ref();
	const storage = firebase.storage();
	const [isDataList, setDataList] = useState(null);
	const [isNumber, setNumber] = useState(0);
	const toSetDataList = (dataList) => {
		setDataList((state) => {
			state = dataList;
			return state;
		});
	};
	useEffect(() => {
		// console.log(route.params.type);
		// props.isLoading();
		
		if (route.params.type === "court") {
			firebaseRef
				.child(route.params.type + "/")
				.once("value")
				.then((snapshot) => {
					if (snapshot.val() !== null) {
						// console.log("inSnap");
						let arr = [...snapshot.val()];
						console.log(arr);
						arr.map((val, index) => {
							val.index = index;
						});
						// console.log(arr);
						toSetDataList(arr);
					}
				});
		} else if (route.params.type === "timer") {
			let initialData = [
				{
					_id: 1,
					label: "16.00 - 17.00 น.",
					status: false,
				},
				{
					_id: 2,
					label: "17.00 - 18.00 น.",
					status: false,
				},
				{
					_id: 3,
					label: "18.00 - 19.00 น.",
					status: false,
				},
				{
					_id: 4,
					label: "19.00 - 20.00 น.",
					status: false,
				},
				{
					_id: 5,
					label: "21.00 - 22.00 น.",
					status: false,
				},
			];
			firebaseRef
				.child("timer")
				.once("value")
				.then(async (snapshot) => {
					if (snapshot.val() === null) {
						await snapshot.ref.set(initialData);
						snapshot.ref.once("value").then((snap2) => {
							console.log(snap2.val());
						});
						// console.log(snapshot.val());
					} else {
						let newObj = snapshot.val();
						toSetDataList(newObj);
					}
				});
		}

		return () => {
			firebaseRef.off();
		};
	}, [isFocused]);

	const showListOrder = (jsonList) => {
		return jsonList ? (
			<FlatList
				contentContainerStyle={styles.scrollContentContainer}
				style={{ flex: 1, marginHorizontal: 15 }}
				data={jsonList}
				keyExtractor={(item, index) => {
					return index ? index.toString() : 0;
				}}
				numColumns={2}
				renderItem={({ item }) => {
					let objStr = JSON.stringify(item);
					return (
						<TouchableScale
							friction={50}
							tension={100}
							activeScale={0.95}
							style={styles.item}
							onPress={() =>
								navigation.push("addCourt", {
									type: "edit",
									index: item.index,
									obj: objStr,
								})
							}
						>
							{item.imageUri ? (
								<Image
									source={{ uri: item.imageUri }}
									style={{
										width: Dimensions.get("window").width / 2 - 100,
										height: 150,
									}}
								/>
							) : (
								<Icon
									type={"font-awesome"}
									name={"picture-o"}
									onPress={() => showActionSheet()}
									containerStyle={{
										width: Dimensions.get("window").width / 2 - 100,
										height: 150,
									}}
								/>
							)}
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

	return <>{showListOrder(isDataList)}</>;
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
