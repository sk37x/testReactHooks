import React, { Component, useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { styles } from "./css/style";
import { useNavigation, useRoute } from "@react-navigation/native";
import LoginScreen from './LoginScreen'
Splash = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(props);

  const [isLoading, setLoading] = useState(false) ;

    setTimeout(() => {
        setLoading(true);
    }, 2000)
    const handlerLoading = () => isLoading(true);
    console.log(isLoading)
  const Splash = () => (
    <View style={styles.container}>
      <Image
        style={{ width: 300, height: 320, resizeMode: "stretch" }}
        source={require("./images/logo.jpg")}
      />
      <Button title="test" onPress={() => navigation.navigate("LoginScreen")} />
    </View>
  );

  return isLoading ? <LoginScreen /> : Splash();
};

export default Splash;
