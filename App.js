import { StatusBar } from "expo-status-bar";
import React, { Component, useState, useEffect } from "react";
import * as Font from "expo-font";

import Screen1 from "./src/screens/drawer/Screen1";
import Screen2 from "./src/screens/drawer/Screen2";
import Screen3 from "./src/screens/drawer/Screen3";
import BookBadminton from "./src/screens/drawer/BookBadminton";
import BookBadmintonDetail from "./src/screens/drawer/BookBadmintonDetail";
import OrderList from "./src/screens/drawer/OrderList";
import HistoryList from "./src/screens/drawer/HistoryList";
import RuleScreen from "./src/screens/drawer/RuleScreen";
import CordView from "./src/screens/drawer/CordView";
import Dropdown from "./src/Dropdown";
import ForgotScreen from "./src/ForgotScreen";
import RegisterScreen from "./src/RegisterScreen";
import UserConfig from "./src/UserConfig";
import AddCourt from "./src/screens/drawerAdmin/AddCourt";
import UserList from "./src/screens/drawerAdmin/UserList";
import UserDetail from "./src/screens/drawerAdmin/UserDetail";

// import BookScreen from './src/BookScreen'

import Signout from "./src/screens/drawer/Signout";

import Tab1 from "./src/screens/tabs/Tab1";
import Tab2 from "./src/screens/tabs/Tab2";
import Tab3 from "./src/screens/tabs/Tab3";

import Detail from "./src/Detail.js";
import Feed from "./src/Feed";
import TestPrint from "./src/TestPrint";
import Splash from "./src/Splash";
import LoginScreen from "./src/LoginScreen";
import LoadingScreen from "./src/LoadingScreen";
import AdminDrawer from "./src/AdminDrawer";
import OrderDetail from "./src/screens/drawer/OrderDetail";
import OrderReport from "./src/screens/drawer/OrderReport";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import ShowListComponent from "./src/screens/drawerAdmin/ShowListComponent";
import updateUser from "./src/api/apiUser";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
	useNavigation,
	useRoute,
	DrawerActions,
} from "@react-navigation/native";
import {
	createDrawerNavigator,
	DrawerItemList,
	DrawerItem,
	DrawerContentScrollView,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import {
	Appearance,
	useColorScheme,
	AppearanceProvider,
} from "react-native-appearance";
import TopTabCordView from "./src/screens/drawer/TopTabCordView";
import TopTabCordViewAdmin from "./src/screens/drawerAdmin/TopTabCordViewAdmin";
import { AuthContext } from "./src/AuthContext";
import ProgressLoader from "rn-progress-loader";

import firebase from "firebase";
// import auth from '@react-native-firebase/auth'
import { firebaseConfig } from "./config";
import { styles } from "./src/css/style";
// import Toast from "react-native-toast-message";

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const TestStack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();
const RootStack = createStackNavigator();
const firebaseRef = firebase.database().ref();
App = () => {
	// const navigation = useNavigation();
	// const route = useRoute()
	const colorScheme = useColorScheme();
	const MyTheme = {
		dark: false,
		colors: {
			primary: "white",
			background: "white",
			card: "#00aeed",
			text: "white",
			border: "rgb(199, 199, 204)",
		},
	};

	// const [user, setUser] = useState(null);
	// const [userToken, setUserToken] = useState(null);

	// const checkAuth = () => {
	// 	firebase.auth().onAuthStateChanged(function (userAuth) {
	// 		if (userAuth && !user) {
	// 			setUser(userAuth);
	// 		}
	// 	});
	// };
	// const unSub = firebase.auth().onAuthStateChanged(function (userAuth) {
	// 	if (userAuth && !user) {
	// 		setUser(userAuth);
	// 	}
	// });
	const [isVisible, setVisible] = useState(false);

	const isLoadingApp = async (nav) => {
		setVisible(true);
		setTimeout(() => {
			setVisible(false);
			nav.goBack();
		}, 2500);
	};
	const ProgressLoad = () => (
		<ProgressLoader
			visible={isVisible}
			isModal={true}
			isHUD={true}
			hudColor={"#000000"}
			color={"#FFFFFF"}
		/>
	);
	const [isUserDetail, setUserDetail] = useState(null);

	const updateUserData = async (dataUpdate, navigation) => {
		const user = firebase.auth().currentUser;
		const uid = user.uid;
		const ref = await firebaseRef.child(`users/${uid}`).once("value");
		ref.ref.set(dataUpdate);
		await isLoadingApp(navigation);
		// console.log(dataUpdate);
	};

	const toSetUserDetail = (obj) =>
		setUserDetail((state) => {
			let newObj = state ? Object.assign(state, obj) : Object.assign({}, obj);
			return newObj;
		});

	useEffect(() => {
		// console.log('App update State')

		return firebaseRef.off();
	}, []);

	// console.log(isUserDetail);

	// const Test = () => {
	// 	return <Toast ref={viewElement} />;
	// };

	const [isTitleFirst, setTitle] = useState("Badminton K6 (Admin)");
	const toSetTitle = (str) => {
		setTitle((state) => str);
	};

	// ref addCourt
	const [tableImage, setTableImage] = useState("");
	const [tableName, setTableName] = useState("");
	const [isDataCourt, setDataCourt] = useState({
		imageUri: "",
		imageFullPath: "",
		name: "",
	});
	const defaultDataCourt = {
		imageUri: "",
		imageFullPath: "",
		name: "",
	};
	const [isErr, setErr] = useState(undefined);

	const updateTypeApp = async (
		refChild,
		dataUpdate,
		navigation,
		index = ""
	) => {
		console.log(refChild, " ----- ", dataUpdate);
		const ref = await firebaseRef.child(refChild).once("value");

		var findId = undefined;
		var _id = undefined;
		var obj = undefined;
		var newObj = undefined;
		if (index.length === 0) {
			findId = await firebaseRef
				.child(`countId/${refChild.split("/")[0]}Id`)
				.once("value");
			_id = findId.val();
			obj = { _id: _id };
			newObj = Object.assign(obj, dataUpdate);
		} else {
			newObj = dataUpdate;
			delete newObj.index;
		}

		if (ref.val()) {
			if (dataUpdate.name.length === 0) {
				alert("กรุณากรอกชื่อสนาม");
				return false;
			} else {
				if (index.length === 0) {
					ref.child(ref.val().length + "/").ref.set(newObj);
				} else {
					ref.child(index).ref.set(newObj);
				}
				if (findId) findId.ref.set(_id + 1);
			}
		} else {
			// for(const property in isDataCourt) {
			// 	console.log(` ${property} : ${isDataCourt[property]}`)
			// }

			if (dataUpdate.name.length === 0) {
				alert("กรุณากรอกชื่อสนาม");
				return false;
			} else {
				ref.child("0/").ref.set(newObj);
				if (findId) findId.ref.set(_id + 1);
			}
		}

		let setData = {};
		let clearData = () => {
			for (const property in isDataCourt) {
				setData[property] = "";
			}
		};
		clearData();
		setStateApp(setDataCourt, setData);
		console.log(isDataCourt);
		navigation.goBack();
		// await isLoadingApp(navigation);
	};
	const setStateApp = (funcSet, value = undefined) => {
		// console.log('##### in setStateApp')
		// console.log(value);
		// console.log(typeof value, " : typeof value");
		// console.log('##### in setStateApp')
		if (value) {
			if (typeof value === "text") {
				funcSet((state) => value);
			}
			if (typeof value === "object") {
				funcSet((state) => {
					let newObj = Object.assign(state, value);
					return newObj;
				});
			}
			//  else if(typeof value === 'text' ) {

			// }
		}
	};

	const createHomeStack = () => {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="Loading"
					component={LoadingScreen}
					options={{ headerShown: false, gestureEnabled: false }}
				/>
				<Stack.Screen
					name="LoginScreen"
					component={LoginScreen}
					options={{
						headerShown: false,
						title: (
							<Text style={{ fontFamily: "thSarabunNew", fontSize: 20 }}>
								เข้าสู่ระบบ
							</Text>
						),
					}}
				/>
				<Stack.Screen
					name="ForgotScreen"
					component={ForgotScreen}
					options={{
						title: (
							<Text style={{ fontFamily: "thSarabunNew", fontSize: 20 }}>
								ลืมรหัสผ่าน
							</Text>
						),
					}}
				/>
				<Stack.Screen
					name="RegisterScreen"
					component={RegisterScreen}
					options={{
						title: (
							<Text
								containerStyle={{ fontFamily: "thSarabunNew", fontSize: 30 }}
							>
								สมัครสมาชิก
							</Text>
						),
					}}
				/>
				<Stack.Screen
					name="Feed"
					component={createDrawer}
					options={({ navigation, route }) => ({
						title: <Text style={styles.title2}>Badminton K6</Text>,
						test: route.params.name,
						headerLeft: () => (
							<Icon
								onPress={() =>
									navigation.dispatch(DrawerActions.toggleDrawer())
								}
								containerStyle={[{ marginLeft: 10 }]}
								size={24}
								name={"menu"}
							/>
						),
						headerRight: () => (
							<Icon
								onPress={() => {
									const user = firebase.auth().currentUser;
									firebaseRef
										.child("users/" + user.uid)
										.once("value")
										.then((snapshot) => {
											let obj = snapshot.val();
											toSetUserDetail(obj);

											navigation.navigate("userconfig", { userData: obj });
										})
										.catch((err) => {
											console.log("err | " + err);
										});
								}}
								containerStyle={Platform.select({
									ios: [{ marginRight: 10 }],
									android: [{ paddingRight: 10 }],
								})}
								size={28}
								name={"account-circle"}
							/>
						),
					})}
					initialParams={{}}
				/>

				<Stack.Screen
					name="userconfig"
					children={() => (
						<UserConfig
							userDetail={isUserDetail}
							setUserDetail={toSetUserDetail}
							componentLoad={ProgressLoad}
						/>
					)}
					options={({ navigation, route }) => ({
						title: "แก้ไขข้อมูลผู้ใช้",
						headerRight: () => (
							<TouchableOpacity
								onPress={() => updateUserData(isUserDetail, navigation)}
								style={{
									backgroundColor: "#6a097d",
									borderRadius: 20,
									marginRight: 20,
									width: 79,
									alignItems: "center",
								}}
							>
								<Text
									style={{
										fontFamily: "thSarabunNew",
										fontSize: 24,
										color: "white",
									}}
								>
									บันทึก
								</Text>
							</TouchableOpacity>
						),
					})}
				/>
				<Stack.Screen
					name="AdminFeed"
					children={AdminDrawer}
					options={({ navigation, route }) => ({
						title: <Text style={styles.title2}>{isTitleFirst}</Text>,
						test: route.params.name,
						headerLeft: () => (
							<Icon
								onPress={() =>
									navigation.dispatch(DrawerActions.toggleDrawer())
								}
								containerStyle={[{ marginLeft: 10 }]}
								size={24}
								name={"menu"}
								initialParams={{ setTitle: setTitle }}
							/>
						),
						headerRight: () => {
							return route.state ? (
								route.state.index == 1 ? (
									<Icon
										containerStyle={{ marginRight: 10 }}
										size={24}
										name={"plus"}
										type={"font-awesome"}
										initialParams={{ setTitle: setTitle }}
										onPress={() => navigation.navigate("addCourt")}
									/>
								) : (
									<View />
								)
							) : (
								<View />
							);
						},
					})}
				/>

				<Stack.Screen
					name="addCourt"
					children={() => (
						<AddCourt
							funcSetState={setDataCourt}
							funcSet={setStateApp}
							data={isDataCourt}
							componentLoad={ProgressLoad}
						/>
					)}
					options={({ navigation, route }) => ({
						title: route.params ? (
							route.params.type == "edit" ? (
								<Text style={styles.title2}>แก้ไขข้อมูลสนาม</Text>
							) : (
								<Text style={styles.title2}>เพิ่มสนาม</Text>
							)
						) : (
							<Text style={styles.title2}>เพิ่มสนาม</Text>
						),
						headerRight: () => {
							let obj = route.params
								? JSON.parse(route.params.obj)
								: defaultDataCourt;

							setStateApp(setDataCourt, obj);
							if (!route.params) {
								// console.log(isDataCourt, "######TEST")
								// if(isDataCourt.index) {
								setDataCourt((state) => {
									console.log(state);
									delete state.index;
									return state;
								});
								// console.log('##### TEST')
								// }
							}
							// console.log(isDataCourt, " ### dataCourt ### ");
							return !route.params ? (
								<TouchableOpacity
									onPress={() =>
										updateTypeApp("court/", isDataCourt, navigation)
									}
									style={{
										backgroundColor: "#6a097d",
										borderRadius: 20,
										marginRight: 20,
										width: 79,
										alignItems: "center",
									}}
								>
									<Text
										style={{
											fontFamily: "thSarabunNew",
											fontSize: 24,
											color: "white",
										}}
									>
										เพิ่ม
									</Text>
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									onPress={() =>
										updateTypeApp(
											`court/`,
											isDataCourt,
											navigation,
											route.params.index
										)
									}
									style={{
										backgroundColor: "#6a097d",
										borderRadius: 20,
										marginRight: 20,
										width: 79,
										alignItems: "center",
									}}
								>
									<Text
										style={{
											fontFamily: "thSarabunNew",
											fontSize: 24,
											color: "white",
										}}
									>
										แก้ไข
									</Text>
								</TouchableOpacity>
							);
						},
					})}
				/>
				<Stack.Screen
					name="userDetail"
					children={() => <UserDetail />}
					options={{
						title: <Text style={{fontFamily:'thSarabunNew', fontSize: 26}}>ข้อมูลผู้ใช้งาน</Text>,
					}}
				/>
				{/* Stack Courd */}

				<Stack.Screen
					name="showList"
					children={ShowListComponent}
					options={{
						title: "List",
					}}
				/>

				<Stack.Screen
					name="Detail"
					component={Detail}
					options={{
						title: "Detail Screen",
					}}
				/>
				<Stack.Screen
					name="BookBadmintonDetail"
					component={BookBadmintonDetail}
					options={({ route }) => ({
						title: route.params.name,
					})}
				/>
				<Stack.Screen
					name="orderDetail"
					children={() => <OrderDetail />}
					options={({ route }) => ({
						title: route.params.name,
					})}
				/>
				<Stack.Screen
					name="orderReport"
					children={() => <OrderReport />}
					options={({ navigation, route }) => ({
						title: <Text style={styles.title2}>{route.params.name}</Text>,
					})}
				/>
				{/* <Stack.Screen
					name="Test"
					component={Dropdown}
					options={({ navigation, route }) => ({
						title: "Badminton K6",
					})}
				/> */}

				<Stack.Screen name="Bottom Tabs" component={createBottomTabs} />
				<Stack.Screen name="Top Tabs" component={createTopTabs} />
			</Stack.Navigator>
		);
	};

	const TestStackScreen = () => (
		<TestStack.Navigator>
			<TestStack.Screen name="Home" component={createDrawer} />
		</TestStack.Navigator>
	);

	const createTopTabs = (props) => {
		return (
			<MaterialTopTabs.Navigator>
				<MaterialTopTabs.Screen
					name="Tab 1"
					component={Tab1}
					options={{ title: "สนามที่ 1" }}
				/>
				<MaterialTopTabs.Screen
					name="Tab 2"
					component={Tab2}
					options={{ title: "" }}
				/>
				<MaterialTopTabs.Screen
					name="Tab 3"
					component={Tab3}
					options={{ title: "" }}
				/>
				<MaterialTopTabs.Screen
					name="Tab 4"
					component={Tab3}
					options={{ title: "" }}
				/>
				<MaterialTopTabs.Screen
					name="Tab 5"
					component={Tab3}
					options={{ title: "" }}
				/>
			</MaterialTopTabs.Navigator>
		);
	};

	const createBottomTabs = () => {
		return (
			<MaterialBottomTabs.Navigator>
				<MaterialBottomTabs.Screen name="Screen 1" component={Screen1} />
				<MaterialBottomTabs.Screen name="Screen 2" component={Screen2} />
				<MaterialBottomTabs.Screen name="Screen 3" component={Screen3} />
			</MaterialBottomTabs.Navigator>
		);
	};
	const createBottomTabsHistory = () => {
		return (
			<MaterialBottomTabs.Navigator
				activeColor="white"
				inactiveColor="black"
				barStyle={{ backgroundColor: "#00aeed" }}
			>
				<MaterialBottomTabs.Screen
					name="ListBook"
					children={() => <OrderList />}
					options={{
						tabBarLabel: "รายการจอง",
						tabBarIcon: ({ color }) => (
							<Icon name="list" style="font-awesome" color={color} size={26} />
						),
					}}
				/>
				<MaterialBottomTabs.Screen
					name="HistoryList"
					children={() => <HistoryList />}
					options={{
						tabBarLabel: "ประวัติการจอง",
						tabBarIcon: ({ color }) => (
							<Icon
								name="history"
								style="font-awesome"
								color={color}
								size={26}
							/>
						),
					}}
				/>
			</MaterialBottomTabs.Navigator>
		);
	};

	const DrawerContent = (props) => (
		<DrawerContentScrollView {...props}>
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

	const createDrawer = (props) => {
		return (
			<Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
				<Drawer.Screen
					name="TestPrint"
					component={TestPrint}
					// initialParams={{ ...props.route.params }}
					options={{ title: "หน้าหลัก" }}
				/>
				<Drawer.Screen
					name="Feed"
					component={Feed}
					initialParams={{ ...props.route.params }}
					options={{ title: "หน้าหลัก" }}
				/>
				<Drawer.Screen
					name="BookBadminton"
					children={() => <BookBadminton />}
					options={{ title: "จองสนาม" }}
					initialParams={{ ...props.route.params }}
				/>
				<Drawer.Screen
					name="ListBook"
					component={createBottomTabsHistory}
					options={{ title: "รายการจอง" }}
					initialParams={{ ...props.route.params }}
				/>
				<Drawer.Screen name="ตารางการใช้สนาม" component={TopTabCordView} />
				<Drawer.Screen name="กฎเกณฑ์การใช้สนาม" component={RuleScreen} />
				<Drawer.Screen
					name="#### ทดสอบระบบ ####"
					component={Detail}
					initialParams={{ screenName: "Detail" }}
				/>
			</Drawer.Navigator>
		);
	};

	// Auth
	const authContext = React.useMemo(() => ({
		signIn: () => {
			setUserToken("asdf");
		},
		signUp: () => {
			setUserToken("asdf");
		},
		signOut: () => {
			setUserToken(null);
		},
	}));
	// Auth

	return (
		<AppearanceProvider>
			<AuthContext.Provider value={authContext}>
				<NavigationContainer
					theme={colorScheme == "dark" ? DarkTheme : MyTheme}
				>
					{createHomeStack()}
				</NavigationContainer>
			</AuthContext.Provider>
		</AppearanceProvider>
	);
};

export default App;
