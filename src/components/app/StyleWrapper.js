import React from 'react';
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import { StyleProvider } from "native-base";

export default class StyleWrapper extends React.Component {
    render() {
        return (<StyleProvider style={getTheme(platform)}>
            {this.props.children}
        </StyleProvider>);
    }
}