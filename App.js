import { StatusBar } from "expo-status-bar";
import React, { Component, useState, useEffect } from "react";
import * as Font from 'expo-font'


import Screen1 from "./src/screens/drawer/Screen1";
import Screen2 from "./src/screens/drawer/Screen2";
import Screen3 from "./src/screens/drawer/Screen3";
import BookBadminton from "./src/screens/drawer/BookBadminton";
import BookBadmintonDetail from "./src/screens/drawer/BookBadmintonDetail";
import OrderList from "./src/screens/drawer/OrderList";
import RuleScreen from "./src/screens/drawer/RuleScreen";
import CordView from "./src/screens/drawer/CordView";
import Dropdown from "./src/Dropdown";
import ForgotScreen from "./src/ForgotScreen";
import RegisterScreen from "./src/RegisterScreen";

// import BookScreen from './src/BookScreen'

import Signout from "./src/screens/drawer/Signout";

import Tab1 from "./src/screens/tabs/Tab1";
import Tab2 from "./src/screens/tabs/Tab2";
import Tab3 from "./src/screens/tabs/Tab3";

import Detail from "./src/Detail.js";
import Feed from "./src/Feed";
import Splash from "./src/Splash";
import LoginScreen from "./src/LoginScreen";
import LoadingScreen from "./src/LoadingScreen";
import OrderDetail from './src/screens/drawer/OrderDetail'
import { Platform, Text } from "react-native";
import { Icon } from "react-native-elements";
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

import { AuthContext } from "./src/AuthContext";

import firebase from "firebase";
// import auth from '@react-native-firebase/auth'
import { firebaseConfig } from "./config";
import { styles } from "./src/css/style";
import Toast from "react-native-toast-message";

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const TestStack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();
const RootStack = createStackNavigator();

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

	const [user, setUser] = useState(null);
	const [userToken, setUserToken] = useState(null);
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



	useEffect(() => {
		
		// console.log(user);
		// if (!user) {
			// checkAuth()
		// }
		// return checkAuth();
		return () => user;
	}, []);

	const Test = () => {
		return (<Toast ref={viewElement} />)
	}

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
					options={{ headerShown: false, title: <Text style={{fontFamily:'thSarabunNew', fontSize:20}}>เข้าสู่ระบบ</Text>}}
				/>
				<Stack.Screen
					name="ForgotScreen"
					component={ForgotScreen}
					options={{ title: <Text style={{fontFamily:'thSarabunNew', fontSize:20}}>ลืมรหัสผ่าน</Text>} }
				/>
				<Stack.Screen
					name="RegisterScreen"
					component={RegisterScreen}
					options={{ title: <Text style={{fontFamily:'thSarabunNew', fontSize:30}}>สมัครสมาชิก</Text>}}
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
								style={[{ color: "white", marginLeft: 10 }]}
								size={24}
								name={"menu"}
							/>
						),
					})}
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
					component={OrderDetail}
					options={({ route }) => ({
						title: route.params.name,
					})}
				/>
				<Stack.Screen
					name="Test"
					component={Dropdown}
					options={({ navigation, route }) => ({
						title: "Badminton K6",
					})}
				/>

				<Stack.Screen name="Bottom Tabs" component={createBottomTabs} />
				<Stack.Screen name="Top Tabs" component={createTopTabs} />
			</Stack.Navigator>
		);
	};

	const TestStackScreen = () => (
		<TestStack.Navigator>
			<TestStack.Screen name='Home' component={createDrawer} />
		</TestStack.Navigator>
	)

	const createTopTabs = (props) => {
		return (
			<MaterialTopTabs.Navigator>
				<MaterialTopTabs.Screen
					name="Tab 1"
					component={Tab1}
					options={{ title: props.route.params.name }}
				/>
				<MaterialTopTabs.Screen name="Tab 2" component={Tab2} />
				<MaterialTopTabs.Screen name="Tab 3" component={Tab3} />
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


	const DrawerContent = (props) => (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} labelStyle={{fontFamily:"thSarabunNew", fontSize:22}} />
			<DrawerItem
				label="ออกจากระบบ"
				labelStyle={{fontFamily:"thSarabunNew", fontSize:22}}
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
					name="Feed"
					component={Feed}
					initialParams={{ ...props.route.params }}
					options={{ title: "หน้าหลัก" }}
				/>
				<Drawer.Screen
					name="BookBadminton"
					children={BookBadminton}
					options={{ title: "จองสนาม" }}
					initialParams={{ ...props.route.params }}
				/>
				<Drawer.Screen
					name="ListBook"
					children={OrderList}
					options={{ title: "รายการจอง" }}
					initialParams={{ ...props.route.params }}
				/>
				<Drawer.Screen name="ตารางการใช้สนาม" component={CordView} />
				<Drawer.Screen name="กฎเกณฑ์การใช้สนาม" component={RuleScreen} />
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
