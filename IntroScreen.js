import React from 'react';
import { Alert, AsyncStorage, Text, Button, View, Image, Easing ,Animated } from 'react-native';
import firebase from './Config';

export default class IntroScreen extends React.Component {

     constructor() {
            super();

            this.state = {
                logoOpacity: new Animated.Value(0),
                logoScaleX: new Animated.Value(1),
            }
     }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user != null) {

                Animated.sequence([
                    Animated.timing(
                        this.state.logoOpacity,
                        {
                            duration: 1000,
                            toValue: 1
                        }
                    ),

                     Animated.timing(
                        this.state.logoOpacity,
                        {
                            duration: 1000,
                            toValue: 0
                        }
                     ),

                     Animated.timing(
                        this.state.logoOpacity,
                        {
                            duration: 1000,
                            toValue: 1
                        }
                    ),


                ]).start(this.goToMain.bind(this));

            }
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