import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { styles } from "../../css/style";
import { useIsFocused } from "@react-navigation/native";

Tab1 = () => {
  const isFocused = useIsFocused();
  console.log(isFocused);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab1</Text>
    </View>
  );
};

export default Tab1;
