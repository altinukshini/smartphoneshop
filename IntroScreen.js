import React from 'react';
import { Spinner } from 'native-base';
// import firebase from 'firebase';
import firebase from './Config';

export default class IntroScreen extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user != null)
                this.props.navigation.navigate('Main');
            else
                this.props.navigation.navigate('Login');
        });
    }

    render() {
        return <Spinner/>;
    }
}