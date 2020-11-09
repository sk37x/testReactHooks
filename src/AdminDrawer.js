import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./css/style";
import firebase from "firebase";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
	createDrawerNavigator,
	DrawerItemList,
	DrawerItem,
	DrawerContentScrollView,
} from "@react-navigation/drawer";
import ProgressLoader from "rn-progress-loader";

// import admin Component
// import showListComponent from "./screens/drawerAdmin/showListComponent";

const Drawer = createDrawerNavigator();

AdminDrawer = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const firebaseRef = firebase.database().ref();
	const [isVisible, setVisible] = useState(false);




	const ProgressLoad = () => (
		<ProgressLoader
			visible={isVisible}
			isModal={true}
			isHUD={true}
			hudColor={"#000000"}
			color={"#FFFFFF"}
		/>
	);
	const DrawerContent = (props) => (
		<DrawerContentScrollView {...props}>
			{/* <View style={{marginHorizontal:12, marginVertical: 10}}>
				<Text>TEST</Text>
			</View> */}
			<DrawerItemList
				{...props}
				labelStyle={{ fontFamily: "thSarabunNew", fontSize: 22 }}
			/>

			<DrawerItem
				label="ออกจากระบบ"
				labelStyle={{ fontFamily: "thSarabunNew", fontSize: 22 }}
				onPress={() => {
					firebase.auth().signOut();
					//   props.navigation.navigate('Contacts')
				}}
			/>
		</DrawerContentScrollView>
	);

	useEffect(() => {
		// console.log(isTitleFirst);
		const unsubscribe = navigation.addListener('focus', (e) => {
			// console.log(e);
		})
		// console.log(route)
		return unsubscribe
	}, []);
	const isLoading = async () => {
		setVisible(true);
		setTimeout(() => {
			setVisible(false);
		}, 1000);
	};

	return (
		<Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
			<Drawer.Screen
				name="AdminFeed"
				component={Feed}
				options={{ title: "หน้าหลัก" }}
			/>
			<Drawer.Screen
				name="showListAndEdit"
				children={() => {
					return <ShowListComponent componentLoad={ProgressLoad} />
				}}
				options={{ title: "สนามแบตมินตัน" }}
				initialParams={{type:"court"}}
			/>
			{/* <Drawer.Screen
				name="showListTimer"
				children={() => {
					return <ShowListComponent componentLoad={ProgressLoad} />
				}}
				options={{ title: "เวลาจอง" }}
				initialParams={{type:"timer"}}
			/> */}
			<Drawer.Screen name="listUser" component={UserList} options={{title:'ผู้ใช้งานทั้งหมด'}} />
			<Drawer.Screen name="checkListTable" component={TopTabCordViewAdmin} options={{title:'ตารางการใช้สนาม'}} />
			<Drawer.Screen name="กฎเกณฑ์การใช้สนาม" component={RuleScreen} />
		</Drawer.Navigator>
	);
};

export default AdminDrawer;

// const styles = StyleSheet.create({
//   container: {
//     // height:"50%",
//     backgroundColor: "#fff",
//     // width: "80%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     textAlign: "center",
//     marginVertical: 8,
//   },
//   btn: {
//     width: "95%",
//     marginVertical: 9,
//   },
//   signIn: {
//     marginVertical: 12,
//     width: "95%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
// });
