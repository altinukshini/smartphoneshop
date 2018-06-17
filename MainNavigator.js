import React, { Component } from "react";
import ListScreen from "./ListScreen";
import DetailScreen from "./DetailScreen";
import { StackNavigator } from 'react-navigation';

export default StackNavigator({
    List: { screen: ListScreen, navigationOptions: { title: 'Smartphone Shop' } },
    Detail: { screen: DetailScreen, navigationOptions: { title: 'Item Details' } }
});