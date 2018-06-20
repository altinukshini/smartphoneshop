import React from 'react';
import firebase from './Config'
import { StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { Container, Content, Button, Header, Title, Left, Text, Input, Item, Label, Icon, Body, Form, Footer, Picker, FooterTab } from 'native-base';

export default class CreateItemScreen extends React.Component {

    state = { image:'', seller: '', title:'', price: null, discount: null, vendor: '',  SKU:'', review_video:'', description: '', latlon: '42.667542,21.166191' }

    goToList() {
        this.props.navigation.navigate("Products");
    }

    onLatLonChange = (value) => {
        this.setState({
          latlon: value
        });
      }

    onSubmit = () => {

        var cardRef = firebase.database().ref('products');
        const image = this.state.image;
        
        const seller = this.state.seller;
        const title = this.state.title;

        const price = this.state.price;
        const discount = this.state.discount;
        
        const vendor = this.state.vendor;
        const SKU = this.state.SKU;
        const latlon = this.state.latlon;
        
        const review_video = this.state.review_video;
        const description = this.state.description;
        
        
        var product = { image, seller, title, price, discount, vendor, SKU, review_video, description, latlon }

        cardRef.push(product, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('successfully');
                this.goToList();
            }
        })
    }

    render() {
        return (
            <Container contentContainerStyle={{flex:1}}>
                <Header>
                    <Left>
                        <Button transparent onPress={this.goToList.bind(this)}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Create Product</Title>
                    </Body>

                </Header>

                <Content>
        <KeyboardAvoidingView behavior={'padding'} style={{flex:1}}>
                 <Form style={style.form}>
                 <Button full light primary bordered style={{marginTop:10, marginBottom:10}}><Text>Upload Picture from Gallery</Text></Button>
                 <Button full light success bordered style={{marginTop:10, marginBottom:10}}><Text>Take Picture</Text></Button>
                
                 <Item floatingLabel>
                    <Label>Image</Label>
                        <Input
                            key={1} style={style.inputText}
                            onChangeText={(image) => this.setState({ image })}
                            value={this.state.image}
                        />
                    </Item>
                    <Item floatingLabel>
                    <Label>Seller</Label>
                        <Input
                            key={2} style={style.inputText}
                            onChangeText={(seller) => this.setState({ seller })}
                            value={this.state.seller}
                        />
                    </Item>
                 
                  <Item floatingLabel>
                     <Label>Product Name</Label>
                         <Input
                             key={3}  style={style.inputText}
                             onChangeText={(title) => this.setState({ title })}
                             value={this.state.title}
                         />
                     </Item>
                     <Picker
                     style={{height:50, width:100 }}
                iosHeader="Select City:"
                mode="dropdown"
                onValueChange={(latlon) => this.onLatLonChange(latlon)}
                selectedValue={this.state.latlon}
                >
              <Picker.Item label="Prishtine" value="42.667542,21.166191" />
              <Picker.Item label="Prizren" value="42.215260,20.741474" />
              <Picker.Item label="Gjilan" value="42.463486,21.468315" />
                </Picker>
                    <Item floatingLabel>
                <Label>Price</Label>
                    <Input
                        key={4} style={style.inputText}
                        onChangeText={(price) => this.setState({ price:price })}
                        value={this.state.price}
                    />
                    </Item>

                       <Item floatingLabel>
                    <Label>Discount</Label>
                        <Input
                            key={5} style={style.inputText}
                            onChangeText={(discount) => this.setState({ discount })}
                            value={this.state.discount}
                        />
                    </Item>
                 
                    <Item floatingLabel>
                    <Label>Vendor</Label>
                        <Input
                            key={6} style={style.inputText}
                            onChangeText={(vendor) => this.setState({ vendor })}
                            value={this.state.vendor}
                        />
                    </Item>
                    
                    <Item floatingLabel>
                    <Label>SKU</Label>
                        <Input
                            key={7} style={style.inputText}
                            onChangeText={(SKU) => this.setState({ SKU })}
                            value={this.state.SKU}
                        />
                    </Item>

                    <Item floatingLabel>
                    <Label>Review Video</Label>
                        <Input
                            key={8} style={style.inputText}
                            onChangeText={(review_video) => this.setState({ review_video })}
                            value={this.state.review_video}
                        />
                    </Item>
                    <Item floatingLabel>
                    <Label>Description</Label>
                        <Input
                            key={9} style={style.inputText}
                            onChangeText={(description) => this.setState({ description })}
                            value={this.state.description}
                        />
                    </Item>
                    <Button onPress={()=>{console.log(this.state)}}><Text>click</Text></Button>
                    </Form>
            </KeyboardAvoidingView>
                </Content>
                     <Footer>
                        <Button full transparent style={style.button} success onPress={this.onSubmit}><Text style={style.text}> Create </Text></Button>
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

    text: {
        color:'white',
    },
    button: {
        width: "70%",
        alignSelf: "center"
    },
    form: {
        justifyContent: "center",
        alignItems: "center"
    }
});