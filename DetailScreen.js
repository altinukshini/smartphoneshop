import React from 'react';
import { StyleSheet, View, Alert, Image, Text} from 'react-native';
import { Container, Content, Button, Header, Title, Left, Right, Icon, Body } from 'native-base';

export default class DetailScreen extends React.Component {

    goToList() {
        this.props.navigation.navigate("List");
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
                        <Title>Item details</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='heart' title="Favorite" />
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={style.content}>
                    <Text>This is product details screen</Text>
                    <Button block primary onPress={this.goToList.bind(this)} title="Go to list screen" style={style.button}>
                        <Text style={style.buttonText}>Go to list screen</Text>
                    </Button>
                </Content>
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