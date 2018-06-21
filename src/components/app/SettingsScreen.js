import React, { Component } from 'react';
import { Container, Header, Content, Left, Right, Body, Button, Icon, Title, ListItem, CheckBox, Text } from 'native-base';
import { StyleSheet, AsyncStorage } from 'react-native';

export default class SettingsScreen extends Component {

    constructor() {
        super();
        this.state = {
            nightModeChecked: false
        };
    }

    componentWillMount() {
        AsyncStorage.getItem("nightModeChecked", function (err, result) {
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
            AsyncStorage.setItem('nightModeChecked', 'false');
        } else if (this.state.nightModeChecked === false) {
            AsyncStorage.setItem('nightModeChecked', 'true');
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
                <Content contentContainerStyle={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                    <ListItem>
                        <CheckBox checked={this.state.nightModeChecked} onPress={() => this.nighModeToggled()}/>
                        <Body>
                        <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}>Dark mode</Text>
                        </Body>
                    </ListItem>
                </Content>
            </Container>
        );
    }

}

const DayStyle = StyleSheet.create({
    content: {
        flex: 1,
    },
    buttons:
        {
        },
    textStyle:
        {
            color: 'black'
        }
})

const NightStyle = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#303033'
    },
    buttons:
        {
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