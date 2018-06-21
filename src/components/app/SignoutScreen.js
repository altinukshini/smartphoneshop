import React from 'react';
import { Alert } from 'react-native';
import { Spinner } from 'native-base';
import firebase from '../../../Config';

export default class SignoutScreen extends React.Component {

    componentDidMount(){
        firebase.auth().signOut()
            .then(() => this.props.navigation.navigate('Login'))
            .catch(error => {
                Alert.alert("Signout error: ", error);
            });
    }

    render() {
        return <Spinner/>;
    }
}
