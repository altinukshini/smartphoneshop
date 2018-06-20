import React from 'react';
import {
    ActivityIndicator,
    Alert,
    StatusBar,
    StyleSheet,
} from 'react-native';
import {Container, Content, Body, Text, Button, Header, Left, Card, CardItem, Right, Icon, Title, Image, Spinner } from 'native-base';
import { Constants, ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';
import firebase from './Config';

console.disableYellowBox = true;

export default class ImagePickerExample extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            image: null,
            uploading: false,
            imageURL: null,
            pickerResult: null,
            pickImageName: "No image picked"
        };
    }

    async componentDidMount() {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
    }

    render() {
        let { image } = this.state;

        return (
            <Container contentContainerStyle={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
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

                            <Button primary full style={{marginTop:5, marginBottom:5}} onPress={() => this._pickImage()}><Text>Pick an image from camera roll</Text></Button>
                            <Text>Image: {this.state.pickImageName}</Text>

                            <Button primary full style={{marginTop:5, marginBottom:5}} onPress={() => this._takePhoto()} ><Text>Take a photo</Text></Button>
                            <Text>Image: {this.state.pickImageName}</Text>
                            <Text></Text>


                            <Button primary full style={{marginTop:5, marginBottom:5}} onPress={() => this._uploadImage()} ><Text>UPLOAD</Text></Button>

                            <Button primary full style={{marginTop:5, marginBottom:5}} onPress={() => { console.log(this.state.image);} }><Text>SHOW URL</Text></Button>

                </Content>
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
            this.setState({
                image: uploadUrl,
                pickerResult: null
            });
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

const DayStyle = StyleSheet.create({
    content: {
        flex: 1,
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
    content: {
        flex: 1,
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