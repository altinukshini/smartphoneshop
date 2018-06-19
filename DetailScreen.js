import React from 'react';
import {StyleSheet, View, Alert, Image, Text, Dimensions, AsyncStorage} from 'react-native';
import { Container, Content, Button, Header, Title, Left, Right, Icon, Body, Footer, FooterTab } from 'native-base';

export default class DetailScreen extends React.Component {

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

    goToList() {
        this.props.navigation.navigate("Products");
    }

    render() {
        const { navigation } = this.props;
        const product = navigation.getParam('product', null);
        const dimensions = Dimensions.get('window');
        const imageWidth = dimensions.width;

        return (
            <Container contentContainerStyle={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                <Header style={this.state.nightModeChecked ? NightStyleHeader.headerStyle : DayStyleHeader.headerStyle}>
                    <Left>
                        <Button transparent onPress={this.goToList.bind(this)}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={this.state.nightModeChecked ? NightStyleHeader.textStyle : DayStyleHeader.textStyle}>Product details</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='heart' title="Favorite" />
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                    <Image source={{uri: product["image"]}} style={{width: imageWidth, height: 200, flex: 1}}/>
                    <Text></Text>
                    <Text style={style.title}>{product["name"]}</Text>
                    <Text></Text>
                    <Text></Text>
                    <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}><Text style={style.label}>Vendor: </Text>{product["vendor"]}</Text>
                    <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}><Text style={style.label}>SKU: </Text>{product["sku"]}</Text>
                    <Text></Text>
                    <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}><Text style={style.label}>Seller: </Text>{product["seller"]}</Text>
                    <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}><Text style={style.label}>Contact: </Text>{product["seller_contact"]}</Text>
                    <Text></Text>
                    <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}><Text style={style.label}>Price: </Text>{product["price"]} EUR</Text>
                    <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}><Text style={style.label}>Discount: </Text>{product["discount"]} EUR</Text>
                    <Text></Text>
                    <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}><Text style={style.label}>Description: </Text>{product["description"]}</Text>
                    <Text></Text>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full onPress={this.goToList.bind(this)} title="Go back" style={this.state.nightModeChecked ? NightStyle.buttons : DayStyle.buttons}>
                            <Text style={style.buttonText}>Go back</Text>
                        </Button>
                    </FooterTab>
                </Footer>
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
      fontWeight: "bold"
    },
    title: {
        fontSize: 35,
        color: "#039be5"
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
            color: '#94e1b1',
            alignSelf: "center"
        },
    textStyle:
        {
            fontSize: 20,
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
        // flex: 1,
        padding: 10,
        backgroundColor: '#303033',
        color: "#94e1b1"
    },
    buttons:
        {
            color: '#94e1b1',
            alignSelf: "center"
        },
    textStyle:
        {
            fontSize: 20,
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
        color: "white"
    },
    textStyle: {
        color: "white"
    }
});

const NightStyleHeader = StyleSheet.create({
    headerStyle: {
        color: "white",
        backgroundColor: "#222326"
    },
    textStyle: {
        color: "white"
    }
});