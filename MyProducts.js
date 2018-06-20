import React from 'react';
import {AsyncStorage, StyleSheet, View} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, List, ListItem, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';

import firebase from './Config';

export default class MyProducts extends React.Component {

    constructor() {
        super();

        this.state = {
            items: [],
            itemKeys: [],
            nightModeChecked: false,
            user: null
        };
    }

    deleteProduct = (key) => {
        console.log(key);

        var itemsRef = firebase.database().ref('products/' + key);
        itemsRef.remove().then(function () {
            console.log('removed');
        })
    }

    componentDidMount() {
        var user = firebase.auth().currentUser;
        if (user) {
            this.setState({ user: user.email })
        }

        var itemsRef = firebase.database().ref('products');
        itemsRef.on('value', (snapshot) => {
            var products = snapshot.val();
            var newList = Object.values(products);
            var newListKey = Object.keys(products)

            this.setState({
                items: newList,
                itemKeys: newListKey

            });

        });

        this.state.items.map((item, index) => { console.log(item) })
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

    productList() {
        return this.state.items.map((product, index) => {
            return (
                this.state.user == product['seller_contact'] ?
                    <Card key={index} style={this.state.nightModeChecked ? NightStyle.cardStyle : DayStyle.cardStyle}>
                        <CardItem style={this.state.nightModeChecked ? NightStyle.cardItem : DayStyle.cardItem}>
                            <Left>
                                <Button transparent onPress={() => this.props.navigation.navigate("Detail", { product: product })}>
                                    <Thumbnail
                                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/smartphoneshop-ubt.appspot.com/o/' + product["image"] + '?alt=media' }} />
                                </Button>
                                <Body>
                                <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}>{product["name"]}</Text>
                                <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle} note>{product["seller"] + " - " + product["seller_contact"]}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem style={this.state.nightModeChecked ? NightStyle.cardItem : DayStyle.cardItem}>
                            <Body>
                                <Button light bordered  danger onPress={() => { this.deleteProduct(this.state.itemKeys[index]) }}><Text>Delete</Text></Button>
                            </Body>
                            <Right>
                                <Text style={this.state.nightModeChecked ? NightStyle.price : DayStyle.price}>{product["price"]} EUR</Text>
                            </Right>
                        </CardItem>
                    </Card> : <Text></Text>
            )
        })
    }

    render() {

        return (
            <Container contentContainerStyle={this.state.nightModeChecked ? NightStyle.container : DayStyle.container}>
                <Header style={this.state.nightModeChecked ? NightStyleHeader.headerStyle : DayStyleHeader.headerStyle}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                    <Title style={this.state.nightModeChecked ? NightStyleHeader.textStyle : NightStyleHeader.textStyle}>My Products</Title>
                    </Body>
                    <Right />
                </Header>
                <Content >
                    {this.productList()}
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    roundedProfileImage: {
        width:65, height:65,
        borderWidth:2,
        borderColor: '#ebebeb',
        borderRadius:50
    }
});

const DayStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1
    },
    cardItem:{
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
});

const NightStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex:1,
        backgroundColor: '#303033'
    },
    buttons:
        {
            color: '#94e1b1'
        },
    textStyle:
        {
            color: 'white'
        },
    cardItem: {
        backgroundColor: '#303033',
        borderColor: "#333"
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
    },
    textStyle: {
        color: "white"
    }
});

const NightStyleHeader = StyleSheet.create({
    headerStyle: {
        backgroundColor: "#222326"
    },
    textStyle: {
        color: "white"
    }
});