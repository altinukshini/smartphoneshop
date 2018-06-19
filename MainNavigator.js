import React, { Component } from "react";
import ProductsList from "./ProductsList";
import SettingsScreen from "./SettingsScreen";
import DetailScreen from "./DetailScreen";
import { DrawerNavigator } from 'react-navigation';

import SideMenu from './SideMenu';

export default DrawerNavigator({
    Products: { screen: ProductsList },
    Settings: { screen: SettingsScreen },
    Detail: { screen: DetailScreen }
}, {
    headerMode: 'none',
    initialRouteName: 'Products',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentComponent: props => <SideMenu {...props} />
});