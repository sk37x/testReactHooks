import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  TouchableOpacity,
} from "react-native";
import { styles } from "./css/style";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
  useNavigationState
} from "@react-navigation/native";

Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const index = useNavigationState((state) => state.index);
  console.log(`Screen index : ${index}`)
  useFocusEffect(
    React.useCallback(() => {
      fetch("https://restcountries.eu/rest/v2/name/eesti").then((response) => {
        response.json().then((data) => {
          // console.log(data);
        });
      });
      return () => console.log("lost focus");
    })
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 45 }}>{route.params.screenName}</Text>
      {Platform.select({
        ios: (
          <Button
            title="View Bottom Tabs"
            onPress={() =>
              navigation.navigate("Bottom Tabs", { name: "param 1" })
            }
          />
        ),
        android: (
          <TouchableOpacity
            style={{ marginBottom: 16 }}
            onPress={() =>
              navigation.navigate("Bottom Tabs", { name: "param 1" })
            }
          >
            <Text style={{ color: "blue", fontSize: 30 }}>
              View Bottom Tabs
            </Text>
          </TouchableOpacity>
        ),
      })}
      {Platform.select({
        ios: (
          <Button
            title="View Bottom Tabs"
            onPress={() =>
              navigation.navigate("Bottom Tabs", { name: "param 1" })
            }
          />
        ),
        android: (
          <TouchableOpacity
            style={{ marginBottom: 16 }}
            onPress={() =>
              navigation.navigate("Bottom Tabs", { name: "param 1" })
            }
          >
            <Text style={{ color: "blue", fontSize: 30 }}>
              View Bottom Tabs
            </Text>
          </TouchableOpacity>
        ),
      })}
      {Platform.select({
        ios: (
          <Button
            title="View Top Tabs"
            onPress={() => navigation.navigate("Top Tabs", { name: "param 2" })}
          />
        ),
        android: (
          <TouchableOpacity
            style={{ marginBottom: 16 }}
            onPress={() => navigation.navigate("Top Tabs", { name: "param 2" })}
          >
            <Text style={{ color: "blue", fontSize: 30 }}>View Top Tabs</Text>
          </TouchableOpacity>
        ),
      })}
      {Platform.select({
        ios: (
          <Button
            title="Pass Data Back"
            onPress={() =>
              navigation.navigate("Feed", { data: "Wellcome Back" })
            }
          />
        ),
        android: (
          <TouchableOpacity
            style={{ marginBottom: 16 }}
            onPress={() =>
              navigation.navigate("Feed", { data: "Wellcome Back" })
            }
          >
            <Text style={{ color: "blue", fontSize: 30 }}>Pass Data Back</Text>
          </TouchableOpacity>
        ),
      })}
    </View>
  );
};

export default Detail;
