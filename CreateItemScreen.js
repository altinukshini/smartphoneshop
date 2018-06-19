import React from 'react';
import firebase from './Config'
import { StyleSheet, View, Alert, Image, Text, TextInput } from 'react-native';
import { Container, Content, Button, Header, Form, Item, Input, Textarea, Title, Left, Right, Icon, Body, Footer, FooterTab } from 'native-base';

export default class CreateItemScreen extends React.Component {

    state = { ammount: null, title: '', description: '' }

    goToList() {
        this.props.navigation.navigate("Products");
    }

    onSubmit = () => {

        var cardRef = firebase.database().ref('products');



        const title = this.state.title;
        const ammount = this.state.ammount;
        const description = this.state.description;
        // console.log("name" + name);
        // console.log("surname:" + surname);
        // console.log("About exp:" + aboutExp);
        // console.log("Select:" + select);

        var product = { title, ammount, description }
        cardRef.push(product, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('successfully');
            }
        })
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.goToList.bind(this)}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Create Item</Title>
                    </Body>

                </Header>

                <Content>

                    <TextInput
                        placeholder="ammount"
                        key={1} style={{ height: 40, borderWidth: 1 }}
                        onChangeText={(ammount) => this.setState({ ammount })}
                        value={this.state.ammount}
                    />

                    <TextInput
                        placeholder="title"
                        key={2} style={{ height: 40, borderWidth: 1 }}
                        onChangeText={(title) => this.setState({ title })}
                        value={this.state.title}
                    />

                    <TextInput
                        placeholder="description"
                        key={3} style={{ height: 40, borderWidth: 1 }}
                        onChangeText={(description) => this.setState({ description })}
                        value={this.state.description}
                    />

                </Content>

                <Footer>
                    <FooterTab>
                        <Button success onPress={this.onSubmit}><Text> Create </Text></Button>
                    </FooterTab>
                </Footer>

            </Container>
        );
    }
}

const style = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: "white"
    },
    button: {
        marginTop: 40,
        marginBottom: 20,
        width: "70%",
        alignSelf: "center"
    }
});