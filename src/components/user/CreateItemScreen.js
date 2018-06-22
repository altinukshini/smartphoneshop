import React from 'react';
import { Alert, StyleSheet, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { Container, Content, Body, Text, Button, Header, Input, Item, Label, Left, Footer, Right, Icon, Title, Form, Picker } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';
import firebase from '../../../Config';

console.disableYellowBox = true;

export default class CreateItemScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nightModeChecked: false,
            image: null,
            uploading: false,
            imageURL: null,
            pickerResult: null,
            pickImageName: null,
            seller: null,
            title: null,
            price: null,
            discount: null,
            vendor: null,
            SKU: null,
            review_video: null,
            description: null,
            latlon: '42.667542,21.166191',
            sellerError: false,
            titleError: false,
            priceError: false,
            discountError: false,
            vendorError: false,
            SKUError: false,
            review_videoError: false,
            descriptionError: false
        };
    }

    componentWillMount() {
        AsyncStorage.getItem("nightModeChecked", function (err, result) {
            if (result == 'true') {
                this.setState({
                    nightModeChecked: true
                });

            }
            if (result == 'false') {
                this.setState({
                    nightModeChecked: false
                });

            }
        }.bind(this));
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

    onSellerInputChanged(seller) {

        let regex = /^(\(?\+?[a-zA-z]*\)?)?[a-zA-z \(\)]*$/g;

        if (regex.test(seller)) {
            this.setState({ seller, sellerError: false });
        }
        else {
            this.setState({ seller: '', sellerError: true })
        }
    }

    onTitleChanged(title) {
        let regex = /^(\(?\+?[a-zA-z]*\)?)?[a-zA-z_\- \(\)]*$/g;

        if (regex.test(title) && title != '') {
            this.setState({ title, titleError: false });
        } else {
            this.setState({ title: '', titleError: true })
        }
    }

    onPriceInputChanged(price) {
        let regex = /^(\(?\+?[0-9]*\)?)?[0-9 \(\)]*$/g;

        if (regex.test(price) && price != '' && price < 3000) {
            this.setState({ price, priceError: false });
        } else {
            this.setState({ price: '', priceError: true })
        }
    }

    onDiscountInputChanged(discount) {
        let regex = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g;

        if (regex.test(discount) && discount < 1000) {
            this.setState({ discount, discountError: false });
        } else {
            this.setState({ discount: '', discountError: true })
        }
    }

    onVendorInputChanged(vendor) {
        let regex = /^(\(?\+?[a-zA-Z]*\)?)?[a-zA-Z \(\)]*$/g;

        if (regex.test(vendor) && vendor != '') {
            this.setState({ vendor, vendorError: false });
        } else {
            this.setState({ vendor: '', vendorError: true })
        }
    }

    onSKUInputChanged(SKU) {
        if (SKU.length > 5) {
            this.setState({ SKU, SKUError: false })
        } else {
            this.setState({ SKU: '', SKUError: true })
        }
    }

    onDescriptionChanged(description) {
        let regex = /^(\(?\+?[a-zA-Z0-9]*\)?)?[a-zA-Z0-9_\-_+_@_._,_*_/_!_?_ \(\)]*$/g;

        if (regex.test(description) && description.length < 50) {
            this.setState({ description, descriptionError: false })
        } else {
            this.setState({ description: '', descriptionError: true })
        }
    }

    onReviewVideoChanged(review_video) {
        let regex = /https:\/\/youtu.be\/?.*/img;
        if (regex.test(review_video)) {
            this.setState({ review_video, review_videoError: false })
        } else {
            this.setState({ review_video: '', review_videoError: false })
        }
    }

    onSubmit() {
        if (!this.state.pickImageName) {
            Alert.alert("No image selected!", "Please pick an image from gallery or take a picture in order to create a product!");
            return;
        }
        if (!(this.state.seller && this.state.title && this.state.price && this.state.discount && this.state.vendor && this.state.SKU && this.state.review_video && this.state.description)) {
            Alert.alert("Form not complete!", "Please fill all fields in order to create a product!");
            return;
        }
        this._uploadImage();
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
                        <Title style={this.state.nightModeChecked ? NightStyleHeader.textStyle : DayStyleHeader.textStyle}>Create product</Title>
                    </Body>
                    <Right />
                </Header>
                <Content contentContainerStyle={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                    <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>

                        <Spinner visible={this.state.uploading} animation='fade' textContent={"Loading..."} textStyle={{ color: '#FFF' }} />

                        {image ? null : (
                            <Text
                                style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}>
                                Select an image for your product:
                            </Text>
                        )}

                        <Form style={style.form}>
                            <Button full primary style={{ marginTop: 5, marginBottom: 5 }} onPress={() => this._pickImage()}><Text>Pick an image from camera roll</Text></Button>
                            <Text></Text>
                            <Button full success style={{ marginTop: 5, marginBottom: 5 }} onPress={() => this._takePhoto()} ><Text>Take a picture</Text></Button>
                            <Text style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}>Image: {this.state.pickImageName ? this.state.pickImageName : "No image selected!"}</Text>

                            {/*-----------------------------------------*/}
                            <Button onPress={() => { console.log(this.state) }}><Text>Check states</Text></Button>
                            {/*-----------------------------------------*/}

                            <Item error={this.state.sellerError} floatingLabel>
                                <Label style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}>Seller name</Label>
                                <Input
                                    style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}
                                    key={2} style={style.inputText}
                                    onChangeText={this.onSellerInputChanged.bind(this)}
                                // value={this.state.seller}
                                />
                            </Item>

                            <Item error={this.state.titleError} floatingLabel>
                                <Label style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}>Product title</Label>
                                <Input
                                    style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}
                                    key={3} style={style.inputText}
                                    onChangeText={this.onTitleChanged.bind(this)}
                                // value={this.state.title}
                                />
                            </Item>

                            <Item style={{ marginTop: 15 }}>
                                <Picker
                                    style={this.state.nightModeChecked ? NightStyle.pickerStyle : NightStyle.pickerStyle}
                                    iosHeader="Select City:"
                                    mode="dropdown"
                                    onValueChange={(latlon) => this.onLatLonChange(latlon)}
                                    selectedValue={this.state.latlon}
                                >
                                    <Picker.Item label="Prishtine" value="42.667542,21.166191" style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle} />
                                    <Picker.Item label="Prizren" value="42.215260,20.741474" style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle} />
                                    <Picker.Item label="Gjilan" value="42.463486,21.468315" style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle} />
                                </Picker>
                            </Item>

                            <Item error={this.state.priceError} success={!this.state.priceError} floatingLabel>
                                <Label style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}>Price</Label>
                                <Input
                                    style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}
                                    key={4} style={style.inputText}
                                    onChangeText={this.onPriceInputChanged.bind(this)}
                                // value={this.state.price}
                                />
                            </Item>

                            <Item error={this.state.discountError} success={!this.state.discountError} floatingLabel>
                                <Label style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}>Discount</Label>
                                <Input
                                    style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}
                                    key={5} style={style.inputText}
                                    onChangeText={this.onDiscountInputChanged.bind(this)}
                                // value={this.state.discount}

                                />
                            </Item>

                            <Item error={this.state.vendorError} success={!this.state.vendorError} floatingLabel>
                                <Label style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}>Vendor</Label>
                                <Input
                                    style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}
                                    key={6} style={style.inputText}
                                    onChangeText={this.onVendorInputChanged.bind(this)}
                                // value={this.state.vendor}
                                />
                            </Item>

                            <Item error={this.state.SKUError} success={!this.state.SKUError} floatingLabel>
                                <Label style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}>SKU</Label>
                                <Input
                                    style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}
                                    key={7} style={style.inputText}
                                    onChangeText={this.onSKUInputChanged.bind(this)}
                                // value={this.state.SKU}
                                />
                            </Item>

                            <Item error={this.state.review_videoError} floatingLabel>
                                <Label style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}>Review (paste YouTube link)</Label>
                                <Input
                                    style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}
                                    key={8} style={style.inputText}
                                    onChangeText={this.onReviewVideoChanged.bind(this)}
                                // value={this.state.review_video}
                                />
                            </Item>
                            <Item error={this.state.descriptionError} floatingLabel>
                                <Label style={this.state.nightModeChecked ? NightStyle.textStyle : DayStyle.textStyle}>Product description</Label>
                                <Input
                                    multiline={true}
                                    rowSpan={5}
                                    style={this.state.nightModeChecked ? NightStyle.textArea : DayStyle.textArea}
                                    key={9} style={style.inputText}
                                    onChangeText={this.onDescriptionChanged.bind(this)}
                                // value={this.state.description}
                                />
                            </Item>
                        </Form>
                    </KeyboardAvoidingView>
                </Content>
                <Footer>
                    <Button full transparent style={style.button} success onPress={() => this.onSubmit()}><Text style={style.text}>Add product</Text></Button>
                </Footer>
            </Container>
        );
    }

    _uploadImage() {
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

    };

    _handleImagePicked = async pickerResult => {
        try {
            this.setState({ uploading: true });

            let uploadUrl = await uploadImageAsync(pickerResult.uri);

            this.setState({
                image: uploadUrl
            });

            var cardRef = firebase.database().ref('products');
            const image = uploadUrl;

            const seller = this.state.seller;
            const seller_contact = firebase.auth().currentUser.email;
            const name = this.state.title;

            const price = this.state.price;
            const discount = this.state.discount;

            const vendor = this.state.vendor;
            const sku = this.state.SKU;
            const latlong = this.state.latlon;

            const review_video = this.convertYoutubeLink(this.state.review_video);
            const description = this.state.description;


            var product = { image, seller, seller_contact, name, price, discount, vendor, sku, review_video, description, latlong }

            cardRef.push(product, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    this.props.navigation.navigate("MyProducts");
                }
            });

        } catch (e) {
            console.log(e);
            Alert.alert('Product creation failed!');
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
        color: '#fff',
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
    textArea:
    {
        color: 'black',
        height: 200
    },
    labelStyle:
    {
        color: '#888'
    },
    pickerStyle:
    {
        height: 50,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#ebebeb"
    },
    cardStyle: {
    },
    price: {
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
    textArea:
    {
        color: 'white',
        height: 200
    },
    cardStyle: {
        backgroundColor: '#303033',
        borderColor: "#333"
    },
    labelStyle:
    {
        color: 'white'
    },
    pickerStyle:
    {
        height: 50,
        borderWidth: 1,
        borderColor: "#ebebeb"
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