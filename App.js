import React, { Component } from "react";
import { SwitchNavigator } from "react-navigation";
import MainNavigator from "./MainNavigator";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import StyleWrapper from './StyleWrapper';
import IntroScreen from "./IntroScreen";
import { Font, AppLoading } from "expo";
import { Root } from "native-base";



class App extends Component {

    constructor(props) {
      super(props);

      this.state = { loading: true };
    }

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ loading: false });
    }

    render() {
        if (this.state.loading) {
            return (
                <Root>
                    <AppLoading />
                </Root>
            );
        }
        return (
            <StyleWrapper>
                <AppNavigator/>
            </StyleWrapper>);
        }
}

const AppNavigator = SwitchNavigator({
    Intro: { screen: IntroScreen },
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen },
    Main: { screen: MainNavigator }
}, {
    headerMode: 'none'
});

export default App;