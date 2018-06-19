import React from 'react';
import { StyleSheet, View, Alert, Image, Text, Dimensions} from 'react-native';
import { Container, Content, Button, Header, Title, Left, Right, Icon, Body, Footer, FooterTab } from 'native-base';

export default class DetailScreen extends React.Component {

    goToList() {
        this.props.navigation.navigate("Products");
    }

    render() {
        const { navigation } = this.props;
        const product = navigation.getParam('product', null);
        const dimensions = Dimensions.get('window');
        const imageWidth = dimensions.width;

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.goToList.bind(this)}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Product details</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='heart' title="Favorite" />
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={style.content}>
                    <Image source={{uri: product["image"]}} style={{width: imageWidth, height: 200, flex: 1}}/>
                    <Text></Text>
                    <Text style={style.title}>{product["name"]}</Text>
                    <Text></Text>
                    <Text></Text>
                    <Text style={style.text}><Text style={style.label}>Vendor: </Text>{product["vendor"]}</Text>
                    <Text style={style.text}><Text style={style.label}>SKU: </Text>{product["sku"]}</Text>
                    <Text></Text>
                    <Text style={style.text}><Text style={style.label}>Seller: </Text>{product["seller"]}</Text>
                    <Text style={style.text}><Text style={style.label}>Contact: </Text>{product["seller_contact"]}</Text>
                    <Text></Text>
                    <Text style={style.text}><Text style={style.label}>Price: </Text>{product["price"]} EUR</Text>
                    <Text style={style.text}><Text style={style.label}>Discount: </Text>{product["discount"]} EUR</Text>
                    <Text></Text>
                    <Text style={style.text}><Text style={style.label}>Description: </Text>{product["description"]}</Text>
                    <Text></Text>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full onPress={this.goToList.bind(this)} title="Go back" style={style.button}>
                            <Text style={style.buttonText}>Go back</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    content: {
        padding: 10
    },
    text: {
        fontSize: 20
    },
    label: {
      fontWeight: "bold"
    },
    title: {
        fontSize: 35,
        color: "#039be5"
    },
    buttonText: {
        color: "#fff"
    },
    button: {
        color: "white",
        alignSelf: "center"
    }
});