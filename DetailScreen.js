import React from 'react';
import { StyleSheet, View, Alert, Image, Text} from 'react-native';
import { Container, Content, Button } from 'native-base';

export default class DetailScreen extends React.Component {

    goToList() {
        this.props.navigation.navigate("List");
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={style.content}>
                    <Text>This is Detail Screen</Text>
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