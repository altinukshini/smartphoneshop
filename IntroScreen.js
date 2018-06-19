import React from 'react';
import { Alert, AsyncStorage, Text, Button, View, Image, Animated } from 'react-native';
import firebase from './Config';

export default class IntroScreen extends React.Component {

     constructor() {
            super();

            this.state = {
                logoOpacity: new Animated.Value(0),
                logoBottomPos: new Animated.Value(250),
                logoScaleX: new Animated.Value(1),
                logoRotation: new Animated.Value(0)
            }
     }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user != null)
                Animated.parallel([
                    Animated.timing(
                        this.state.logoOpacity,
                        {
                            duration: 2000,
                            toValue: 1
                        }
                    ),
                    Animated.timing(
                        this.state.logoBottomPos,
                        {
                            duration: 1000,
                            toValue: 0
                        }
                    ),
                    Animated.timing(
                        this.state.logoScaleX,
                        {
                            duration: 2000,
                            toValue: 1
                        }
                    )

                ]).start(this.goToMain.bind(this));
            else
                this.props.navigation.navigate('Login');
        });
    }
    goToMain() {
        this.props.navigation.navigate('Main');
    }

    render() {
        return (
            <View style={style.container}>
                <Animated.Image source={require('./assets/ssh.png')}

                style={{
                    opacity: this.state.logoOpacity,
                    bottom: this.state.logoBottomPos,
                    transform: [
                        { scaleX: this.state.logoScaleX }
                    ]
                }}

                />
            </View>
        );
    }
}
const style = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    }
}