import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { createDrawerNavigator } from 'react-navigation';
import ProductsList from "./src/components/app/ProductsList";
import SettingsScreen from "./src/components/app/SettingsScreen";
import SignoutScreen from './src/components/app/SignoutScreen';
import SideMenu from './src/components/app/SideMenu';
import MyProducts from './src/components/user/MyProducts';
import CreateItemScreen from './src/components/user/CreateItemScreen';
import DetailScreen from "./src/components/product/DetailScreen";

export default createDrawerNavigator({
    Products: { screen: ProductsList },
    Settings: { screen: SettingsScreen },
    Detail: { screen: DetailScreen },
    MyProducts: { screen: MyProducts },
    Signout: { screen: SignoutScreen },
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