import React, { Component } from "react";
import { createSwitchNavigator } from "react-navigation";
import MainNavigator from "./MainNavigator";
import LoginScreen from "./src/components/app/LoginScreen";
import SignUpScreen from "./src/components/app/SignUpScreen";
import StyleWrapper from './src/components/app/StyleWrapper';
import IntroScreen from "./src/components/app/IntroScreen";
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

const AppNavigator = createSwitchNavigator({
    Intro: { screen: IntroScreen },
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen },
    Main: { screen: MainNavigator }
}, {
    headerMode: 'none'
});

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Setting a timer']);
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed', 'Setting a timer'];
console.disableYellowBox = true;

const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

export default App;