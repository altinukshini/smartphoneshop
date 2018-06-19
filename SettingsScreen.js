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

    constructor() {
        super();
        this.state = {
            nightModeChecked: false,
            animationChecked: false
        };
    }

    componentWillMount() {
        AsyncStorage.getItem("nightModeChecked", function (err, result) {
            console.log(result);
            if (result == 'true') {
                this.setState({
                    nightModeChecked: true
                });

            }
            if (result == 'false') {
                this.setState({
                    nightModeChecked: false
                });

            }
        }.bind(this));

    }

    nighModeToggled() {

        if (this.state.nightModeChecked === true) {
            AsyncStorage.setItem('nightModeChecked', 'false').then((value) => {
                console.log("#### Storage set: " + value);
            });
        } else if (this.state.nightModeChecked === false) {
            AsyncStorage.setItem('nightModeChecked', 'true').then((value) => {
                console.log("#### Storage set: " + value);
            });
        }
        this.setState({
            nightModeChecked: !this.state.nightModeChecked
        });
    }


    render() {

        return (
            <Container contentContainerStyle={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                <Header style={this.state.nightModeChecked ? NightStyleHeader.headerStyle : DayStyleHeader.headerStyle}>
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
                        <CheckBox checked={this.state.nightModeChecked} onPress={() => this.nighModeToggled()}/>
                        <Body>
                        <Text>Dark mode</Text>
                        </Body>
                    </ListItem>
                </Content>
            </Container>
        );
    }

}

const DayStyle = StyleSheet.create({
    content: {
        // flex: 1,
    },
    buttons:
        {
            color: '#94e1b1'
        },
    textStyle:
        {
            color: 'black'
        }
})

const NightStyle = StyleSheet.create({
    content: {
        // flex: 1,
        backgroundColor: '#303033'
    },
    buttons:
        {
            color: '#94e1b1'
        },
    textStyle:
        {
            color: 'white'
        }

})
const DayStyleHeader = StyleSheet.create({
    headerStyle: {
    },
});

const NightStyleHeader = StyleSheet.create({
    headerStyle: {
        backgroundColor: "#222326"
    },
});