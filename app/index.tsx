import { AppRegistry } from 'react-native';
import App from '../App';
import appJson from '../app.json';

const { name: newproject } = appJson.expo;

AppRegistry.registerComponent(newproject, () => App);
