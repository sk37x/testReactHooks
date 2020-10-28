import React, { Component, useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	Platform,
	TouchableOpacity,
	InteractionManager,
	Image,
	TouchableHighlight,
	Linking,
	Alert,
	ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./css/style";
import firebase from "firebase";
import axios from "axios";
import { Icon } from "react-native-elements";

// clear Timeout Android
const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === "android") {
	// Work around issue `Setting a timer for long time`
	// see: https://github.com/firebase/firebase-js-sdk/issues/97
	const timerFix = {};
	const runTask = (id, fn, ttl, args) => {
		const waitingTime = ttl - Date.now();
		if (waitingTime <= 1) {
			InteractionManager.runAfterInteractions(() => {
				if (!timerFix[id]) {
					return;
				}
				delete timerFix[id];
				fn(...args);
			});
			return;
		}

		const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
		timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
	};

	global.setTimeout = (fn, time, ...args) => {
		if (MAX_TIMER_DURATION_MS < time) {
			const ttl = Date.now() + time;
			const id = "_lt_" + Object.keys(timerFix).length;
			runTask(id, fn, ttl, args);
			return id;
		}
		return _setTimeout(fn, time, ...args);
	};

	global.clearTimeout = (id) => {
		if (typeof id === "string" && id.startWith("_lt_")) {
			_clearTimeout(timerFix[id]);
			delete timerFix[id];
			return;
		}
		_clearTimeout(id);
	};
}
// clear Timeout Android

const supportedURL = "fb://profile/100035064216737";


ViewContent = ({ count, item, result = null, addOrRemove, itemShow, isCountItem }) => {
	let showItem = [...item];
	// let price = [...item.price];

	return (
		<View style={{ flex: 1, backgroundColor:'white' }}>
			{showItem.map((val, index) => {
				return (
					<View
						style={{
							width: "100%",
							flex: 1,
							flexDirection: "row",
							paddingLeft: 10,
							paddingRight: 10,
						}}
						key={index}
					>
						<>
							{!result ? (
								<View
									style={{
										width: "20%",
										height: 45,
										flex: 1,
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<Icon
										onPress={() => {
											addOrRemove("remove", val)
										}}
										style={[{ color: "white" }]}
										size={24}
										name={"remove"}
									/>
									<Text>{count[index].count}</Text>
									<Icon
										onPress={() => {
											addOrRemove("add", val)
											// console.log(val.id)
										}}
										style={[{ color: "white" }]}
										size={24}
										name={"add"}
									/>
								</View>
							) : (
								<View />
							)}

							<View
								style={{
									width: "60%",
									height: 45,
									alignContent: "center",
									justifyContent: "center",
								}}
							>
								<Text>
									{!result
										? val.name
										: val.id
										? itemShow.find((v) => v.id == val.id).name +
										  " / จำนวน " +
										  isCountItem.find((v) => v.id == val.id).count
										: val.name}
								</Text>
							</View>

							{result ? <View style={{ width: "20%" }} /> : <View />}

							<View
								style={{
									width: "20%",
									height: 45,
									alignItems: "flex-end",
									justifyContent: "center",
									// backgroundColor: "brown",
								}}
							>
								<Text>{val.price} ฿</Text>
							</View>
						</>
					</View>
				);
			})}
		</View>
	);
};
export default ViewContent;
