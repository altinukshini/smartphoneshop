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

    saveData() {
        let user = 'Altin Ukshini';
        AsyncStorage.setItem('user', user);
    }

    showData() {
        let user = AsyncStorage.getItem('user')
        Alert.alert(toString(user));
    }

    render() {

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
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
                        <CheckBox/>
                        <Body>
                        <Text>Dark mode</Text>
                        </Body>
                    </ListItem>
                    <Button primary onPress={this.saveData()}>
                        <Text>Save data</Text>
                    </Button>
                    <Button primary onPress={this.showData()}>
                        <Text>Show data</Text>
                    </Button>
                    <Form>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input />
                        </Item>
                    </Form>
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