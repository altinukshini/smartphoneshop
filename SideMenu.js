import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { DrawerItems } from 'react-navigation';
import { Container, Content, Body, Header} from 'native-base'
import {Image, StyleSheet} from 'react-native';

export default class SideMenu extends Component {

    render () {
        return (
            <Container>
                <Header style={styles.menuHeader}>
                    <Body style={styles.menuHeaderBody}>
                        <Image style={styles.menuLogo} source={require('./assets/twitter.png')} />
                    </Body>
                </Header>
                <Content>
                    <DrawerItems {...this.props}/>
                </Content>
            </Container>
        );
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};

const styles = StyleSheet.create({
    menuHeader:{
        height: 150,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ebebeb",
        backgroundColor: "#ebebeb"
    },
    menuHeaderBody: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuLogo: {
        height: 100,
        width: 100,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        paddingTop: 20,
        flex: 1
    }
});
