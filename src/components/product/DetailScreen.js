import React from 'react';
import {StyleSheet, Text, AsyncStorage} from 'react-native';
import { Container, Button, Header, Title, Left, Right, Icon, Body, Tab, Tabs } from 'native-base';
import DetailScreenTab1 from './DetailScreenTab1';
import DetailScreenTab2 from './DetailScreenTab2';
import DetailScreenTab3 from './DetailScreenTab3';

export default class DetailScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            goTo: this.props.navigation.getParam('goTo', 'Products'),
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
        this.props.navigation.navigate(this.state.goTo);
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
    textStyle:
        {
            fontSize: 20
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
        backgroundColor: '#303033'
    },
    buttons:
        {
            alignSelf: "center"
        },
    textStyle:
        {
            fontSize: 20
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
    },
    tabStyle: {
    },
    activeTabStyle: {
    },
    textStyle: {
        color: "white"
    }
});

const NightStyleHeader = StyleSheet.create({
    headerStyle: {
        backgroundColor: "#222326"
    },
    tabStyle: {
        backgroundColor: "#222326"
    },
    activeTabStyle: {
        backgroundColor: "#404040"
    },
    textStyle: {
        color: "white"
    }
});