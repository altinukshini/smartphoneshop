import React from 'react';
import {
    ActivityIndicator,
    Alert,
    StatusBar,
    StyleSheet,
    KeyboardAvoidingView
} from 'react-native';
import {Container, Content, Body, Text, Button, Header, Input, Item, Label, Left, Footer, Right, Icon, Title, Spinner, Form, Picker } from 'native-base';
import { Constants, ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';
import firebase from './Config';

console.disableYellowBox = true;

export default class CreateItemScreen extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            image: null,
            uploading: false,
            imageURL: null,
            pickerResult: null,
            pickImageName: "No image picked",
            seller: '',
            title:'',
            price: null,
            discount: null,
            vendor: '',
            SKU:'',
            review_video:'',
            description: '',
            latlon: '42.667542,21.166191'
        };
    }

    async componentDidMount() {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
    }

    onLatLonChange = (value) => {
        this.setState({
            latlon: value
        });
    }

    convertYoutubeLink(value) {
        return value.substr(value.lastIndexOf('/') + 1)
    }

    onSubmit () {

        this._uploadImage();

       // if (this.state.image == null) {
       //     Alert.alert("Card could not be saved");
       //     return;
       // }


    }

    render() {
        let { image } = this.state;

        return (
            <Container contentContainerStyle={this.state.nightModeChecked ? NightStyle.container : DayStyle.container}>
                <Header style={this.state.nightModeChecked ? NightStyleHeader.headerStyle : DayStyleHeader.headerStyle}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                    <Title style={this.state.nightModeChecked ? NightStyleHeader.textStyle : NightStyleHeader.textStyle}>Create product</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content contentContainerStyle={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                    <KeyboardAvoidingView behavior={'padding'} style={{flex:1}}>
                        {image ? null : (
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    marginBottom: 15,
                                    textAlign: 'left',
                                }}>
                                Upload product image
                            </Text>
                        )}
                        <Form style={style.form}>
                            <Button full light primary bordered  style={{marginTop:5, marginBottom:5}} onPress={() => this._pickImage()}><Text>Pick an image from camera roll</Text></Button>
                            <Text>Image: {this.state.pickImageName}</Text>

                            <Button full light success bordered  style={{marginTop:5, marginBottom:5}} onPress={() => this._takePhoto()} ><Text>Take a photo</Text></Button>
                            <Text>Image: {this.state.pickImageName}</Text>

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
                        </Form>
                    </KeyboardAvoidingView>
                </Content>
                <Footer>
                    <Button full transparent style={style.button} success onPress={() => this.onSubmit()}><Text style={style.text}> Create </Text></Button>
                </Footer>
            </Container>
        );
    }

    _maybeRenderUploadingOverlay() {
        if (this.state.uploading) {
            return (
                <Spinner />
            );
        }
    };


    _uploadImage() {
        this._maybeRenderUploadingOverlay();
        this._handleImagePicked(this.state.pickerResult);
    };

    async _takePhoto() {
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        this.setState({
            pickerResult: pickerResult,
            pickImageName: pickerResult["uri"].substr(pickerResult["uri"].lastIndexOf('/') + 1)
        });

        // this._handleImagePicked(pickerResult);
    };

    async _pickImage() {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        this.setState({
            pickerResult: pickerResult,
            pickImageName: pickerResult["uri"].substr(pickerResult["uri"].lastIndexOf('/') + 1)
        });

        // this._handleImagePicked(pickerResult);
    };

    _handleImagePicked = async pickerResult => {
        try {
            this.setState({ uploading: true });

            let uploadUrl = await uploadImageAsync(pickerResult.uri);
            console.log(uploadUrl);
            this.setState({
                image: uploadUrl
            });

            var cardRef = firebase.database().ref('products');
            const image = uploadUrl;

            const seller = this.state.seller;
            const seller_contact = firebase.auth().currentUser.email;
            const title = this.state.title;

            const price = this.state.price;
            const discount = this.state.discount;

            const vendor = this.state.vendor;
            const SKU = this.state.SKU;
            const latlong = this.state.latlon;

            const review_video = this.convertYoutubeLink(this.state.review_video);
            const description = this.state.description;


            var product = { image, seller, seller_contact, title, price, discount, vendor, SKU, review_video, description, latlong }

            cardRef.push(product, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('successfully');
                    this.props.navigation.navigate("MyProducts");
                }
            })

            Alert.alert('Upload success! :)');

        } catch (e) {
            console.log(e);
            Alert.alert('Upload failed, sorry :(');
        } finally {
            this.setState({ uploading: false });
        }
    };
}

async function uploadImageAsync(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
        .storage()
        .ref()
        .child(uuid.v4());

    let snapshot = await ref.put(blob);
    return snapshot.metadata.fullPath;
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

const DayStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    content: {
        padding: 10
    },
    buttons:
        {
        },
    textStyle:
        {
            color: 'black'
        },
    cardStyle: {
    },
    price:{
        fontSize: 25
    }
});

const NightStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#303033'
    },
    content: {
        padding: 10,
        backgroundColor: '#303033'
    },
    buttons:
        {
        },
    textStyle:
        {
            color: 'white'
        },
    cardStyle: {
        backgroundColor: '#303033',
        borderColor: "#333"
    },
    price: {
        fontSize: 25,
        color: "white"
    }

})
const DayStyleHeader = StyleSheet.create({
    headerStyle: {
    },
    textStyle: {
        color: "white"
    }
});

const NightStyleHeader = StyleSheet.create({
    headerStyle: {
        backgroundColor: "#222326"
    },
    textStyle: {
        color: "white"
    }
});