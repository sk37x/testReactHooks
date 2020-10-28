import React, { Component, useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { styles } from "./css/style";
import { useNavigation, useRoute } from "@react-navigation/native";
import LoginScreen from './LoginScreen'
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
DrawerContent = (props) => {
  console.log("drawer")
  console.log(props);
  return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        {/* <DrawerItem
          label="Help"
          onPress={() => Linking.openURL('https://mywebsite.com/help')}
          /> */}
          <Text>TEST</Text>
      </DrawerContentScrollView>
  );
}
export default DrawerContent;
