import React from 'react';
import {StyleSheet, Text, AsyncStorage} from 'react-native';
import { Container, Button, Header, Title, Left, Right, Icon, Body, Footer, FooterTab, Tab, Tabs } from 'native-base';
import DetailScreenTab1 from './DetailScreenTab1';
import DetailScreenTab2 from './DetailScreenTab2';
import DetailScreenTab3 from './DetailScreenTab3';

export default class DetailScreen extends React.Component {

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

    goToList() {
        this.props.navigation.navigate("Products");
    }

    render() {
        const { navigation } = this.props;
        const product = navigation.getParam('product', null);

        return (
            <Container contentContainerStyle={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                <Header hasTabs style={this.state.nightModeChecked ? NightStyleHeader.headerStyle : DayStyleHeader.headerStyle}>
                    <Left>
                        <Button transparent onPress={this.goToList.bind(this)}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                    <Title style={this.state.nightModeChecked ? NightStyleHeader.textStyle : DayStyleHeader.textStyle}>Product details</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Tabs initialPage={0}>
                    <Tab heading="Details" tabStyle={this.state.nightModeChecked ? NightStyleHeader.tabStyle : DayStyleHeader.tabStyle} activeTabStyle={this.state.nightModeChecked ? NightStyleHeader.activeTabStyle : DayStyleHeader.activeTabStyle}>
                        <DetailScreenTab1 product={product}/>
                    </Tab>
                    <Tab heading="Review" tabStyle={this.state.nightModeChecked ? NightStyleHeader.tabStyle : DayStyleHeader.tabStyle} activeTabStyle={this.state.nightModeChecked ? NightStyleHeader.activeTabStyle : DayStyleHeader.activeTabStyle}>
                        <DetailScreenTab2 product={product}/>
                    </Tab>
                    <Tab heading="Location" tabStyle={this.state.nightModeChecked ? NightStyleHeader.tabStyle : DayStyleHeader.tabStyle} activeTabStyle={this.state.nightModeChecked ? NightStyleHeader.activeTabStyle : DayStyleHeader.activeTabStyle}>
                        <DetailScreenTab3 product={product}/>
                    </Tab>
                </Tabs>
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
});

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

});
const DayStyleHeader = StyleSheet.create({
    headerStyle: {
        color: "white"
    },
    tabStyle: {
        color: "white"
    },
    activeTabStyle: {
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
    tabStyle: {
        color: "white",
        backgroundColor: "#222326"
    },
    activeTabStyle: {
        color: "white",
        backgroundColor: "#404040"
    },
    textStyle: {
        color: "white"
    }
});