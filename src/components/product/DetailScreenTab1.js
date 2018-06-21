import React from 'react';
import {StyleSheet, View, Alert, Image, Text, Dimensions, AsyncStorage} from 'react-native';
import { Container, Content, Card, CardItem, Button, Header, Title, Left, Right, Icon, Body, Footer, FooterTab } from 'native-base';
import { Video } from 'expo';
import VideoPlayer from '@expo/videoplayer';

export default class DetailScreenTab1 extends React.Component {

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

    render() {

        const product = this.props.product;
        const dimensions = Dimensions.get('window');
        const imageWidth = dimensions.width;

        return (
            <Container contentContainerStyle={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                <Content contentContainerStyle={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                    <Card style={this.state.nightModeChecked ? NightStyle.cardStyle : DayStyle.cardStyle}>
                        <CardItem cardBody style={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                            <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/smartphoneshop-ubt.appspot.com/o/' + product["image"] + '?alt=media'}} style={{height: 200, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem cardBody style={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                            <Text style={style.title}>{product["name"]}</Text>
                        </CardItem>
                        <CardItem cardBody style={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                            <Text style={this.state.nightModeChecked ? NightStyle.price : DayStyle.price}>{product["price"]} EUR</Text>
                            <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}> / (discount: {product["discount"]} EUR)</Text>
                        </CardItem>
                    </Card>

                    <Card style={this.state.nightModeChecked ? NightStyle.cardStyle : DayStyle.cardStyle}>
                        <CardItem cardBody style={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                            <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}><Text style={style.label}>Vendor: </Text>{product["vendor"]}</Text>
                        </CardItem>
                        <CardItem cardBody style={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                            <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}><Text style={style.label}>SKU: </Text>{product["sku"]}</Text>
                        </CardItem>
                    </Card>

                    <Card style={this.state.nightModeChecked ? NightStyle.cardStyle : DayStyle.cardStyle}>
                        <CardItem cardBody style={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                            <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}><Text style={style.label}>Seller: </Text>{product["seller"]}</Text>
                        </CardItem>
                        <CardItem cardBody style={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                            <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}><Text style={style.label}>Contact: </Text>{product["seller_contact"]}</Text>
                        </CardItem>
                    </Card>

                    <Card style={this.state.nightModeChecked ? NightStyle.cardStyle : DayStyle.cardStyle}>
                        <CardItem cardBody style={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                            <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}><Text style={style.label}>Description: </Text></Text>
                        </CardItem>
                        <CardItem cardBody style={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                            <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}>{product["description"]}</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    content: {
        padding: 10
    },
    text: {
        fontSize: 20
    },
    label: {
        fontWeight: "bold",
        paddingTop: 10,
        paddingBottom: 10
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#039be5",
        paddingTop: 10
    },
    buttonText: {
        color: "#fff"
    },
    button: {
        color: "white",
        alignSelf: "center"
    }
});

const DayStyle = StyleSheet.create({
    content: {
        // flex: 1,
        padding: 10
    },
    buttons:
        {
            alignSelf: "center"
        },
    price:
        {
            fontSize: 20,
            color: 'black',
            fontWeight: 'bold',
            paddingTop: 10,
            paddingBottom: 10
        },
    textStyle:
        {
            fontSize: 18,
            color: 'black',
            paddingTop: 10,
            paddingBottom: 10
        },
    cardStyle: {
    },
    cardStyle: {
    }
});

const NightStyle = StyleSheet.create({
    content: {
        // flex: 1,
        padding: 10,
        backgroundColor: '#303033'
    },
    price:
        {
            fontSize: 20,
            color: 'white',
            fontWeight: 'bold',
            paddingTop: 20,
            paddingBottom: 20
        },
    cardStyle: {
        backgroundColor: '#303033',
        borderColor: "#333"
    },
    buttons:
        {
            alignSelf: "center"
        },
    textStyle:
        {
            fontSize: 18,
            color: 'white',
            paddingTop: 20,
            paddingBottom: 20
        },
    cardStyle: {
        backgroundColor: '#303033',
        borderColor: "#333"
    }

});