import React from 'react';
import {StyleSheet, View, Alert, Image, Text, Dimensions, AsyncStorage} from 'react-native';
import { Container, Content, Button, Header, Title, Left, Right, Icon, Body, Footer, FooterTab } from 'native-base';
import { Video } from 'expo';
import VideoPlayer from '@expo/videoplayer';

export default class DetailScreenTab2 extends React.Component {

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
        const product = this.props.product;
        const dimensions = Dimensions.get('window');
        const imageWidth = dimensions.width;

        return (
            <Container contentContainerStyle={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                <Content contentContainerStyle={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                    <VideoPlayer style={{flex: 1}}
                        videoProps={{
                            shouldPlay: false,
                            resizeMode: Video.RESIZE_MODE_CONTAIN,
                            source: {
                                uri: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
                            },
                        }}
                        isPortrait={true}
                        playFromPositionMillis={0}
                    />
                </Content>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    content: {
        flex:1,
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
        flex: 1,
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
        flex: 1,
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