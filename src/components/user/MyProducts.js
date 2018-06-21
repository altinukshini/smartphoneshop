import React from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import { Container, Header, Content, Thumbnail, List, ListItem, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';

import firebase from '../../../Config';


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
                    <List key={index} style={this.state.nightModeChecked ? NightStyle.listStyle : DayStyle.listStyle}>
                        <ListItem style={this.state.nightModeChecked ? NightStyle.listStyle : DayStyle.listStyle}>
                            <Button transparent size={80} onPress={() => this.props.navigation.navigate("Detail", { product: product })}>
                                <Thumbnail square size={80}
                                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/smartphoneshop-ubt.appspot.com/o/' + product["image"] + '?alt=media' }} />
                            </Button>
                            <Body>
                                <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}>{product["name"]}</Text>
                                <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle} note>{product["price"]} EUR</Text>
                            </Body>
                            <Right>
                                <Button transparent danger onPress={() => { this.deleteProduct(this.state.itemKeys[index]) }}><Icon name="trash" /></Button>
                            </Right>
                        </ListItem>
                    </List>
                : null
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
                <Content contentContainerStyle={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
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
        borderColor: '#ebebeb'
    }
});

const DayStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    content: {
        paddingRight: 10,
        flex: 1
    },
    cardItem:{
    },
    buttons:
        {
        },
    textStyle:
        {
            color: 'black'
        },
    listStyle: {
    },
    price:{
        fontSize: 25
    }
});

const NightStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#303033'
    },
    content: {
        backgroundColor: '#303033',
        paddingRight: 10,
        flex: 1
    },
    buttons:
        {
        },
    textStyle:
        {
            color: 'white'
        },
    listStyle: {
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