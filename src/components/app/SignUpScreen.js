import React from 'react';
import { StyleSheet, Alert, BackHandler, Image } from 'react-native';
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
                    <Image style={{height: 180,
                        width: 180,
                        justifyContent: 'center',
                        alignItems: 'center'}} source={require('../../../assets/ssh.png')} />
                    <Form style={style.form}>
                        <Item stackedLabel style={style.textInput}>
                            <Label>Email</Label>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={style.textInput}
                                onChangeText={this
                                    .onEmailInputChanged
                                    .bind(this)}/>
                        </Item>
                        <Item stackedLabel style={style.textInput}>
                            <Label>Password</Label>
                            <Input
                                autoCapitalize="none"
                                style={style.textInput}
                                secureTextEntry
                                onChangeText={this
                                    .onPasswordInputChanged
                                    .bind(this)}/>
                        </Item>
                        <Item stackedLabel style={style.textInput}>
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
        paddingTop: -20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width: "100%",
        alignSelf: "center"
    },
    submitButton: {
        marginTop: 40,
        marginBottom: 20,
        width: "80%",
        alignSelf: "center"
    },
    form: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center"
    }
});
