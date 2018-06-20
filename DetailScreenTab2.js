import React from 'react';
import {StyleSheet, View, Alert, Image, Text, Dimensions, AsyncStorage, WebView, AppState} from 'react-native';
import { Container, Content, Button, Header, Title, Left, Right, Icon, Body, Footer, FooterTab } from 'native-base';
import { Video } from 'expo';
import VideoPlayer from '@expo/videoplayer';

export default class DetailScreenTab2 extends React.Component {

    constructor() {
        super();
        this.state = {
            youtube: null,
            nightModeChecked: false,
            appState: AppState.currentState
        };
    }

    componentDidMount(){
        this.setState({
            youtube: this.props.product["review_video"]
        });
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        this.setState({appState: nextAppState});
    }

    componentWillMount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
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

    returnView(){
        return(
            <WebView
                style={{flex:1}}
                startInLoadingState
                scalesPageToFit
                mediaPlaybackRequiresUserAction={true}
                javaScriptEnabled={true}
                source={{uri: 'https://www.youtube.com/embed/'+this.state.youtube+'?rel=0&autoplay=0&showinfo=0&controls=0'}}
            />
        );
    }

    render() {
        return (
            this.state.appState == 'active' && this.returnView()
        )
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