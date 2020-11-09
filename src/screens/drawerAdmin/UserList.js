import React, { Component, useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	TouchableOpacity,
	Image,
	Dimensions,
	FlatList,
	SafeAreaView,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { styles } from "../../css/styleAdmin";
import {
	useNavigation,
	useRoute,
	useNavigationState,
	useIsFocused,
} from "@react-navigation/native";
import firebase from "firebase";
import TouchableScale from "react-native-touchable-scale";

// import Analytics from 'expo-firebase-analytics'

// var admin = require('firebase-admin')

UserList = (props) => {
	const navigation = useNavigation();
	const route = useRoute();
	const index = useNavigationState((state) => state.index);
	const user = firebase.auth().currentUser;
	const isFocused = useIsFocused();
	const firebaseRef = firebase.database().ref();

	const [isUserList, setUserList] = useState(null);

	const toSetUserList = (newArr) => {
		setUserList((state) => {
			return [...newArr];
		});
	};

	// const { imageUri, name } = props.data;
	useEffect(() => {
		firebaseRef
			.child("users/")
			.once("value")
			.then((snapshot) => {
				let obj = Object.values(snapshot.val());
				let objUser = obj.filter(({ role }) => role === "user");
				toSetUserList(objUser);
			});
			return () => {
				firebaseRef.off();
			}
	}, [isFocused]);
	const list = [
		{
			name: "Amy Farha",
			subtitle: "Vice President",
		},
		{
			name: "Chris Jackson",
			avatar_url:
				"https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
			subtitle: "Vice Chairman",
		},
	];

	keyExtractor = (item, index) => index.toString();

	renderItem = ({ item }) => {
		return (
			<ListItem
				Component={TouchableScale}
				friction={90} //
				tension={100} // These props are passed to the parent component (here TouchableScale)
				activeScale={0.95}
				onPress={() => navigation.navigate('userDetail', {userData: JSON.stringify(item), uid: item.uid})}
				
				bottomDivider
			>
				<Avatar
					title={item.displayName}
					source={item.imageUri && { uri: item.imageUri }}
				/>
				<ListItem.Content>
					<ListItem.Title>{item.displayName}</ListItem.Title>
					<ListItem.Subtitle>{item.nickname}</ListItem.Subtitle>
				</ListItem.Content>
				<ListItem.Chevron />
			</ListItem>
		);
	};

	return (
			<FlatList
				style={{backgroundColor:'gray'}}
				keyExtractor={this.keyExtractor}
				data={isUserList}
				renderItem={this.renderItem}
			/>
	);
};

export default UserList;
