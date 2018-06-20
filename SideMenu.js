import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { DrawerItems } from 'react-navigation';
import { Container, Content, Body, Header, Button, Text, Footer } from 'native-base'
import {Alert, AsyncStorage, Image, StyleSheet } from 'react-native';

export default class SideMenu extends Component {

    constructor() {
        super();
        this.state = {
            nightModeChecked: false
        };
    }

    componentDidMount() {
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


    render () {
        // const {darkmodestatus} = this.props.darkmode();
        const darkmodestatus = this.state.nightModeChecked;

        return (
            <Container contentContainerStyle={darkmodestatus ? NightStyle.content : DayStyle.content}>
                <Header style={darkmodestatus ? NightStyleHeader.headerStyle : DayStyleHeader.headerStyle}>
                    <Body style={styles.menuHeaderBody}>
                        <Image style={styles.menuLogo} source={require('./assets/ssh.png')} />
                    </Body>
                </Header>
                <Content contentContainerStyle={darkmodestatus ? NightStyle.content : DayStyle.content}>
                    {/*<DrawerItems {...this.props}/>*/}
                    <Button style={darkmodestatus ? NightStyle.drawerButton : DayStyle.drawerButton} full transparent light onPress={() => this.props.navigation.navigate('Products')}>
                        <Text style={darkmodestatus ? NightStyle.drawerButton : DayStyle.drawerButton}>Products</Text>
                    </Button>
                    <Button style={darkmodestatus ? NightStyle.drawerButton : DayStyle.drawerButton} full transparent light onPress={() => this.props.navigation.navigate('Settings')}>
                        <Text style={darkmodestatus ? NightStyle.drawerButton : DayStyle.drawerButton}>Settings</Text>
                    </Button>
                </Content>
                <Footer>
                    <Button full transparent light onPress={() => this.props.navigation.navigate('Signout')}>
                        <Text style={darkmodestatus ? NightStyle.footerButton : DayStyle.footerButton}>Signout</Text>
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
        height: 150,
        width: 150,
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
    footerButton: {
        color: "white",
        alignItems: "center"
    },
    content: {
        flex: 1,
    },
    drawerButton: {
        color: "black",
        justifyContent: "flex-start"
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
    footerButton: {
        color: "white",
        alignItems: "center"
    },
    content: {
        flex: 1,
        backgroundColor: '#303033',
        color: "#94e1b1"
    },
    drawerButton: {
        color: "white",
        justifyContent: "flex-start"
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

