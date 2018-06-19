import React from 'react';
import { StyleSheet, Alert, Image } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Body, Title, Right } from 'native-base';
// import firebase from 'firebase';
import firebase from './Config'

export default class LoginScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            errorMessage: null
        };
    }

    onEmailInputChanged(val) {
        this.setState({
            email: val
        });
    }

    onPasswordInputChanged(val) {
        this.setState({
            password: val
        });
    }

    onSubmitBtnPressed() {
        firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Main'))
            .catch(error => {
                Alert.alert("Login error", "Invalid email and/or password");
            });
    }

    onSignUpBtnPressed() {
        this.props.navigation.navigate("SignUp");
    }

    render() {
        return (
            <Container>
                    <Header>
                        <Body>
                            <Title>Login</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <Content contentContainerStyle={style.content}>
                        <Form style={style.form}>
                            <Image style={{height: 100,
                                width: 100,
                                borderRadius: 75,
                                justifyContent: 'center',
                                alignItems: 'center'}} source={require('./assets/twitter.png')} />
                            <Item floatingLabel >
                                <Label>Email</Label>
                                <Input autoCapitalize="none" autoCorrect={false} style={style.textInput} onChangeText={this.onEmailInputChanged.bind(this)}/>
                            </Item>
                            <Item floatingLabel >
                                <Label>Password</Label>
                                <Input autoCapitalize="none" style={style.textInput} secureTextEntry onChangeText={this.onPasswordInputChanged.bind(this)}/>
                            </Item>
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
        width: "70%",
        alignSelf: "center"
    },
    signUpButton: {
        width: "70%",
        alignSelf: "center"
    },
    form: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center"
    }
});
