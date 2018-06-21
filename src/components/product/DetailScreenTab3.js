import React from 'react';
import {StyleSheet, AsyncStorage} from 'react-native';
import { Container, Content} from 'native-base';
import { MapView } from 'expo';


export default class DetailScreenTab3 extends React.Component {

    constructor() {
        super();

        this.mapRef = null;
        this.state = {
            nightModeChecked: false
        };
    }

    componentDidMount() {
        this.mapRef.fitToSuppliedMarkers(
            [{latitude: parseFloat(this.props.product["latlong"].split(',')[0]), longitude: parseFloat(this.props.product["latlong"].split(',')[1].toString())}],
            true, // not animated
        );
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

    goToList() {
        this.props.navigation.navigate("Products");
    }

    render() {
        const product = this.props.product;

        return (
            <Container contentContainerStyle={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                <Content contentContainerStyle={this.state.nightModeChecked ? NightStyle.content : DayStyle.content}>
                    <MapView
                        style={style.map}
                        showsUserLocation = {false}
                        followUserLocation = {false}
                        zoomEnabled = {true}
                        ref={(ref) => { this.mapRef = ref }}
                        initialRegion={{
                            latitude: parseFloat(product["latlong"].split(',')[0]),
                            longitude: parseFloat(product["latlong"].split(',')[1]),
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <MapView.Marker
                            coordinate={{latitude: parseFloat(product["latlong"].split(',')[0]), longitude: parseFloat(product["latlong"].split(',')[1])}}
                        />
                    </MapView>
                </Content>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    map:{
      flex: 1,
    }
});

const DayStyle = StyleSheet.create({
    content: {
        flex: 1,
        padding: 10
    },
    buttons:
        {
            alignSelf: "center"
        },
    textStyle:
        {
            fontSize: 20,
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
            alignSelf: "center"
        },
    textStyle:
        {
            fontSize: 20,
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

});