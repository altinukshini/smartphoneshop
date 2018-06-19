import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Left, Right, Body, Button, Icon, Title, ListItem, CheckBox, Text } from 'native-base';
// import { AsyncStorage, View, StyleSheet, Button, Text } from 'react-native';
import firebase from "./Config";
import {
    AppRegistry,
    StyleSheet,
    Alert,
    AsyncStorage
} from 'react-native';

export default class SettingsScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            settings: {
                darkmode: false
            }
        };
    }

    componentDidMount() {

        let newSettings = this.getSettingsFromStorage()

        this.setState({
            settings: {
                darkmode: newSettings.darkmode
            }
        });

    }


    saveData(key, value) {
        AsyncStorage.setItem(key, value).then(() => console.log("##### DATA SAVED #####" + value.toString()));
    }

    async showData() {
        try {
            let value = await AsyncStorage.getItem('settings');
            value = JSON.parse(value);
            Alert.alert("Darkmode: " + value.darkmode.toString());
        }
        catch (error){
            Alert.alert(error);
        }
    }

    async getSettingsFromStorage() {
        try {
            let value = await AsyncStorage.getItem('settings');
            value = JSON.parse(value);
            return value;
        }
        catch (error){
            Alert.alert(error);
        }
    }

    changeValue() {
        let settings = this.state.settings;

        if (settings.darkmode == true) {
            settings.darkmode = false;
        } else {
            settings.darkmode = true;
        }

        this.saveData('settings', JSON.stringify(settings));
        this.setState({
            settings: settings
        });
    }

    render() {

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Settings</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <ListItem>
                        <CheckBox checked={this.state.settings.darkmode} onPress={() => this.changeValue()}/>
                        <Body>
                        <Text>Dark mode</Text>
                        </Body>
                    </ListItem>
                    <Button primary onPress={() => this.showData()}>
                        <Text>Show data</Text>
                    </Button>
                </Content>
            </Container>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    formInput: {
        paddingLeft: 5,
        height: 50,
        borderWidth: 1,
        borderColor: "#555555",
    },
    formButton: {
        borderWidth: 1,
        borderColor: "#555555",
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        marginTop: 5,
    },
});