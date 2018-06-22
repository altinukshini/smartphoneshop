import React from 'react';
import { StyleSheet, Alert, Image } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import firebase from '../../../Config';

export default class LoginScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            emailErrorMessage: '',
            passwordErrorMessage: ''
        };
    }

    onEmailInputChanged(val) {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(val)) {
            // console.log("Email is Correct");
            this.setState({ emailErrorMessage: '' })
            this.setState({
                email: val
            });
        }
        else {
            this.setState({ emailErrorMessage: 'email is incorrect' })
            this.setState({ email: '' });
            // console.log("Email is Incorrect");
        }
    }

    onPasswordInputChanged(val) {
        if (val.length > 5 && 20 > val.length) {
            // console.log('correct')
            this.setState({ passwordErrorMessage: '' })
            this.setState({
                password: val
            });
        } else {
            // console.log('password should be atleast 6 characters and max 20 characters')
            this.setState({ passwordErrorMessage: 'password should be atleast 6 characters and max 20 characters' })
            this.setState({ password: '' })
        }
    }

    onSubmitBtnPressed() {
        if (this.state.email == '') {
            Alert.alert('email isn\'t correct or is empty');
        }
        else if (this.state.password == '') {
            Alert.alert('password isn\'t correct or is empty');
        } else {
            firebase.auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => this.props.navigation.navigate('Main'))
                .catch(error => {
                    Alert.alert("Login error", "Invalid email and/or password");
                });
        }
    }

    onSignUpBtnPressed() {
        this.props.navigation.navigate("SignUp");
    }

    render() {
        return (
            <Container>

                <Content contentContainerStyle={style.content}>
                    <Image style={{
                        height: 180,
                        width: 180,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} source={require('../../../assets/ssh.png')} />
                    <Form style={style.form}>

                        <Item stackedLabel style={style.textInput}>
                            <Label>Email</Label>
                            <Input autoCapitalize="none" autoCorrect={false} onChangeText={this.onEmailInputChanged.bind(this)} />
                        </Item>
                        <Text style={style.errorMessage}>{this.state.emailErrorMessage}</Text>
                        <Item stackedLabel style={style.textInput} >
                            <Label>Password</Label>
                            <Input autoCapitalize="none" secureTextEntry onChangeText={this.onPasswordInputChanged.bind(this)} />
                        </Item>
                        <Text style={style.errorMessage}>{this.state.passwordErrorMessage}</Text>
                        <Button block primary onPress={this.onSubmitBtnPressed.bind(this)} style={style.loginButton}>
                            <Text>Login</Text>
                        </Button>
                        <Button block primary onPress={this.onSignUpBtnPressed.bind(this)} style={style.signUpButton}>
                            <Text>Sign up</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const style = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButton: {
        marginTop: 40,
        marginBottom: 20,
        width: "80%",
        alignSelf: "center"
    },
    textInput: {
        width: "100%",
        alignSelf: "center",
        // borderColor: 'red'
    },
    signUpButton: {
        width: "80%",
        alignSelf: "center"
    },
    form: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center"
    },
    errorMessage: {
        color: 'red',
        alignItems: 'center',
        fontSize: 15
    }

});