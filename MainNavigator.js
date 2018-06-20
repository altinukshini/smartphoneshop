import React, { Component } from "react";
import ProductsList from "./ProductsList";
import SettingsScreen from "./SettingsScreen";
import DetailScreen from "./DetailScreen";
import SignoutScreen from './SignoutScreen';
import CameraComponent from './CameraComponent';
import ImagePicker from './ImagePicker';
import CreateItemScreen from './CreateItemScreen';
import { DrawerNavigator, createDrawerNavigator } from 'react-navigation';

import SideMenu from './SideMenu';
import {AsyncStorage} from "react-native";

export default createDrawerNavigator({
    Products: { screen: ProductsList },
    Settings: { screen: SettingsScreen },
    Detail: { screen: DetailScreen },
    Signout: { screen: SignoutScreen },
    Camera: {screen: CameraComponent},
    ImagePicker: {screen: ImagePicker},
    CreateItemScreen: {screen: CreateItemScreen}
}, {
    headerMode: 'none',
    initialRouteName: 'Products',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentComponent: props => <SideMenu darkmode={ async () => {
        const status = await AsyncStorage.getItem("nightModeChecked");
        return status;
    }} {...props} />
});