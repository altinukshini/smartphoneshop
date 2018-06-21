import React from 'react';
import {StyleSheet, AsyncStorage, WebView, AppState} from 'react-native';

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
                source={{uri: 'https://www.youtube.com/embed/'+this.state.youtube+'?autoplay=0&rel=0&amp;controls=0&amp;showinfo=0'}}
            />
        );
    }

    render() {
        return (
            this.state.appState == 'active' && this.returnView()
        )
    }
}
