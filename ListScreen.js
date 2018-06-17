import React from 'react';
import { StyleSheet, View, Alert, Console, Image} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
// import firebase from "firebase";
import firebase from './Config';

export default class ListScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            items: []
        };
    }

    componentDidMount() {
        var itemsRef = firebase.database().ref('products');
        itemsRef.on('value', (snapshot) => {
            var products = snapshot.val();

            var newList = Object.values(products);

            this.setState({
                items: newList
            });

        });

    }

    goToDetail() {
        this.props.navigation.navigate("Detail");
    }

    productList() {
        return this.state.items.map((product, index) => {
            return(
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: product["image"]}} />
                            <Body>
                            <Text>{product["name"]}</Text>
                            <Text note>{product["seller"] + " - " + product["seller_contact"]}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={{uri: product["image"]}} style={{height: 200, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Button onPress={this.goToDetail.bind(this)} title="View item">
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
        return (
            <Container>
                <Content contentContainerStyle={style.content}>
                    {this.productList()}
                </Content>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    content: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    price: {
        fontSize: 25
    }
});


