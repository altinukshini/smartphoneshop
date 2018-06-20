import React from 'react';
import {StyleSheet, View, Alert, Console, Image, AsyncStorage} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';
import firebase from './Config';
import {Gravatar, GravatarApi} from 'react-native-gravatar';

export default class ProductsList extends React.Component {

    constructor() {
        super();
        this.state = {
            items: [],
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

    productList() {
        return this.state.items.map((product, index) => {
            let gravatar = product["seller_contact"];

            return(
                <Card style={this.state.nightModeChecked ? NightStyle.cardStyle : DayStyle.cardStyle}>
                    <CardItem style={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                        <Left>
                            {/*<Thumbnail source={{uri: product["image"]}} />*/}
                            <Gravatar options={{
                                email: gravatar,
                                parameters: { "s": "100", "d": "robohash" },
                                secure: true
                            }} style={styles.roundedProfileImage} />
                            <Body>
                            <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}>{product["name"]}</Text>
                            <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle} note>{product["seller"] + " - " + product["seller_contact"]}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody style={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                        <Image source={{uri: product["image"]}} style={{height: 200, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem style={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                        <Body>
                        <Button style={this.state.nightModeChecked ? NightStyle.buttons : DayStyle.buttons} onPress={() => this.props.navigation.navigate("Detail", {product: product})} title="View item">
                            <Text>View item</Text>
                        </Button>
                        </Body>
                        <Right>
                            <Text style={this.state.nightModeChecked ? NightStyle.price : DayStyle.price}>{product["price"]} EUR</Text>
                        </Right>
                    </CardItem>
                </Card>
            )
        })
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
                    <Title style={this.state.nightModeChecked ? NightStyleHeader.textStyle : NightStyleHeader.textStyle}>Products</Title>
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
        borderColor: '#ebebeb',
        borderRadius:50
    }
});

const DayStyle = StyleSheet.create({
    content: {
        // flex: 1,
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
    content: {
        // flex: 1,
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


