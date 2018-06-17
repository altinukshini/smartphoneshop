import { AppRegistry } from 'react-native';
import App from './App';
{/*<script src="https://www.gstatic.com/firebasejs/5.0.3/firebase.js"></script>*/}

AppRegistry.registerComponent('smartphoneshop', () => App);

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);