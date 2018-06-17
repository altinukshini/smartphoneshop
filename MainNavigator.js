import React, { Component } from "react";
import ListScreen from "./ListScreen";
import DetailScreen from "./DetailScreen";
import { StackNavigator } from 'react-navigation';

export default StackNavigator({
    List: { screen: ListScreen },
    Detail: { screen: DetailScreen }
}, {
    headerMode: 'none'
});