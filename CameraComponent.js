import React, { Component } from 'react';
import { StyleSheet, Text,Button, View } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraComponent extends Component {

    state = {
        hasCameraPremissions: null,
        type: Camera.Constants.Type.back
    }
    takePicture =  async ()=> {
        const result = await takeSnapshotAsync(this.imageContainer, {
            result: 'file',
            height: pixels,
            width: pixels,
            quality: 1,
            format: 'png',
        });

    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPremissions: status === 'granted' })
    }

    render() {
        const { hasCameraPremissions } = this.state
        if (hasCameraPremissions === null) {
            return <View />
        }
        else if (hasCameraPremissions === false) {
            return <Text>No access to camera</Text>
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={this.state.type} />
                    <Button title="takePicture" onPress={this.takePicture}/>
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});