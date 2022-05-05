import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from './login';
import Library from './library';
import MainMenu from './mainMenu';
import Notebook from './notebook';
import Chapters from './chapters';
import { Image,TouchableOpacity,Button,View } from 'react-native';
const Stack=createStackNavigator({
    Login:{
        screen: Login,
        navigationOptions:{title: 'Login'}
    },
    MainMenu:{
        screen: MainMenu,
        navigationOptions:{title: 'Main Menu'},
        
    },
    Library:{
        screen: Library,
        navigationOptions:({ navigation }) => ({ title: navigation.getParam('name') })
    },
    Notebook:{
        screen:Notebook,
        navigationOptions:({ navigation }) => ({ title: navigation.getParam('name') })
        
    },
    Chapters:{
        screen:Chapters,
        navigationOptions:({ navigation }) => ({ title: navigation.getParam('name')}),
        
        
    
    }
}
    
);
const StackNavigator = createAppContainer(Stack);
export default StackNavigator;
