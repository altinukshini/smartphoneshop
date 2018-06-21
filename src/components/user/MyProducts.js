import React from 'react';
import { AsyncStorage, StyleSheet, Alert } from 'react-native';
import { Container, Header, Content, Thumbnail, List, ListItem, Footer, Text, Button, Icon, Left, Body, Right, Title,  } from 'native-base';

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

    deleteProduct = (key, image, productName) => {
        var storageRef = firebase.storage().ref(image);
        var itemsRef = firebase.database().ref('products/' + key);

        Alert.alert('Delete', 'Do you want to delete "' + productName + '" ?',
            [
                {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                {text: 'Delete', onPress: () => storageRef.delete().then(function() {
                        itemsRef.remove()
                    }).catch(function(error) {
                        Alert.alert('Product could not be deleted!' + error);
                    })}
            ]
        );
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
                        <ListItem style={this.state.nightModeChecked ? NightStyle.listStyle : DayStyle.listStyle} onPress={() => this.props.navigation.navigate("Detail", { product: product, goTo: 'MyProducts' })}>
                                <Thumbnail square size={80}
                                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/smartphoneshop-ubt.appspot.com/o/' + product["image"] + '?alt=media' }} />
                            <Body>
                                <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}>{product["name"]}</Text>
                                <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle} note>{product["price"]} EUR</Text>
                            </Body>
                            <Right>
                                <Button transparent danger onPress={() => { this.deleteProduct(this.state.itemKeys[index], product["image"], product["name"]) }}><Icon name="trash" /></Button>
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
                    <Title style={this.state.nightModeChecked ? NightStyleHeader.textStyle : DayStyleHeader.textStyle}>My Products</Title>
                    </Body>
                    <Right />
                </Header>
                <Content contentContainerStyle={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                    { this.state.items != null ? this.productList() : <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}>You don't have any products</Text>}
                </Content>
                <Footer>
                    <Button full transparent style={style.button} success onPress={() => this.props.navigation.navigate('CreateItemScreen')}><Text style={{color: "#fff"}}>Add new product</Text></Button>
                </Footer>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    button: {
        width: "70%",
        alignSelf: "center"
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