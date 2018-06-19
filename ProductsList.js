import React from 'react';
import {StyleSheet, View, Alert, Console, Image, AsyncStorage} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';
import firebase from './Config';

export default class ProductsList extends React.Component {

    constructor() {
        super();

        this.state = {
            items: [],
            settings: {
                darkmode: false
            }
        };
    }

    async getSettingsFromStorage() {
        try {
            let value = await AsyncStorage.getItem('settings');
            value = JSON.parse(value);
            return value.darkmode;
        }
        catch (error){
            Alert.alert(error);
        }
    }

    componentDidMount() {

        let newSettings = this.getSettingsFromStorage();

        var itemsRef = firebase.database().ref('products');
        itemsRef.on('value', (snapshot) => {
            var products = snapshot.val();

            var newList = Object.values(products);

            this.setState({
                items: newList,
                settings: newSettings
            });

        });

    }

    productList() {
        return this.state.items.map((product, index) => {
            const {bgColor} = this.getSettingsFromStorage() ? '#888' : '#fff';
            return(
                <Card style={{backgroundColor: bgColor}}>
                    <CardItem style={{backgroundColor: bgColor}}>
                        <Left>
                            <Thumbnail source={{uri: product["image"]}} />
                            <Body>
                            <Text>{product["name"]}</Text>
                            <Text note>{product["seller"] + " - " + product["seller_contact"]}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody style={{backgroundColor: bgColor}}>
                        <Image source={{uri: product["image"]}} style={{height: 200, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem style={{backgroundColor: bgColor}}>
                        <Body>
                        <Button onPress={() => this.props.navigation.navigate("Detail", {product: product})} title="View item">
                            <Text>View item</Text>
                        </Button>
                        </Body>
                        <Right>
                            <Text style={style.price}>{product["price"]} EUR</Text>
                        </Right>
                    </CardItem>
                </Card>
            )
        })
    }

    render() {


        let bgColor = this.getSettingsFromStorage() ? '#fff' : '#fff';

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Products</Title>
                    </Body>
                    <Right />
                </Header>
                <Content contentContainerStyle={{backgroundColor: bgColor}}>
                    {this.productList()}
                </Content>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    price: {
        fontSize: 25
    }
});


