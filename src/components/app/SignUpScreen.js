import React from 'react';
import { StyleSheet, Alert, BackHandler } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Left, Body, Icon, Title, Right } from 'native-base';
import firebase from '../../../Config';

export default class SignUpScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            errorMessage: null
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', function() {
            this.goBack();
            return true;
        }.bind(this));
    }

    onEmailInputChanged(val) {
        this.setState({ email: val });
    }

    onPasswordInputChanged(val) {
        this.setState({ password: val });
    }

    onConfirmPwdInputChanged(val) {
        this.setState({ confirmPassword: val });
    }

    onSubmitBtnPressed() {
        if (this.state.password != this.state.confirmPassword) {
            Alert.alert("Error", "Passwords don't match");
            return false;
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Login'))
            .catch(error => {
                Alert.alert("Registration error", error.message);
            });
    }

    goBack() {
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={this.goBack.bind(this)}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Sign up</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content contentContainerStyle={style.content}>
                    <Form style={style.form}>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={style.textInput}
                                onChangeText={this
                                    .onEmailInputChanged
                                    .bind(this)}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input
                                autoCapitalize="none"
                                style={style.textInput}
                                secureTextEntry
                                onChangeText={this
                                    .onPasswordInputChanged
                                    .bind(this)}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Confirm password</Label>
                            <Input
                                autoCapitalize="none"
                                style={style.textInput}
                                secureTextEntry
                                onChangeText={this
                                    .onConfirmPwdInputChanged
                                    .bind(this)}/>
                        </Item>
                        <Button
                            block
                            primary
                            onPress={this
                                .onSubmitBtnPressed
                                .bind(this)}
                            style={style.submitButton}>
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
    submitButton: {
        marginTop: 40,
        marginBottom: 20,
        width: "70%",
        alignSelf: "center"
    },
    form: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center"
    }
});
