import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { DrawerItems } from 'react-navigation';
import { Container, Content, Body, Header, Button, Text, Footer } from 'native-base'
import {Alert, AsyncStorage, Image, StyleSheet } from 'react-native';

export default class SideMenu extends Component {

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


    render () {
        return (
            <Container contentContainerStyle={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                <Header style={this.state.nightModeChecked ? NightStyleHeader.headerStyle : DayStyleHeader.headerStyle}>
                    <Body style={styles.menuHeaderBody}>
                        <Image style={styles.menuLogo} source={require('./assets/ssh.png')} />
                    </Body>
                </Header>
                <Content contentContainerStyle={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                    {/*<DrawerItems {...this.props}/>*/}
                    <Button transparent full light onPress={() => this.props.navigation.navigate('Products')}>
                        <Text style={this.state.nightModeChecked ? NightStyle.drawerButton : DayStyle.drawerButton}>Products</Text>
                    </Button>
                    <Button transparent full light onPress={() => this.props.navigation.navigate('Settings')}>
                        <Text style={this.state.nightModeChecked ? NightStyle.drawerButton : DayStyle.drawerButton}>Settings</Text>
                    </Button>
                </Content>
                <Footer>
                    <Button full transparent light onPress={() => this.props.navigation.navigate('Signout')}>
                        <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}>Signout</Text>
                    </Button>
                </Footer>
            </Container>
        );
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};

let styles = StyleSheet.create({
    menuLogo: {
        height: 100,
        width: 100,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center'
    },

    menuHeaderBody: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const DayStyle = StyleSheet.create({
    content: {
        flex: 1,
    },
    drawerButton: {
        color: "black"
    },
    buttons:
    {
        color: '#94e1b1'
    },
    textStyle:
    {
        color: 'black'
    },
    cardStyle: {
    },
    price:{
        fontSize: 25
    }
})

const NightStyle = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#303033',
        color: "#94e1b1"
    },
    drawerButton: {
        color: "white",
    },
    buttons:
    {
        color: '#94e1b1'
    },
    textStyle:
    {
        color: 'white'
    },
    cardStyle: {
        backgroundColor: '#303033',
        borderColor: "#333"
    },
    price: {
        fontSize: 25,
        color: "white"
    }

})
const DayStyleHeader = StyleSheet.create({
    headerStyle: {
        height: 150,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ebebeb",
        backgroundColor: "#ebebeb"
    }
});

const NightStyleHeader = StyleSheet.create({
    headerStyle: {
        height: 150,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ebebeb",
        backgroundColor: "#222326"
    }
});

