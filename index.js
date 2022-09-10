/**
 * @format
 */

import {AppRegistry} from 'react-native';
import codePush from 'react-native-code-push';
import App from './app/index';
import {name as appName} from './app.json';

let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};
// AppRegistry.registerComponent(appName, () => codePush(codePushOptions)(App));
AppRegistry.registerComponent(appName, () => App);
