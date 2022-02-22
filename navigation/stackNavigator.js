import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from './login';
import Library from './library';
import MainMenu from './mainMenu';
import Notebook from './notebook'

const Stack=createStackNavigator({
    Login:{
        screen: Login,
        navigationOptions:{title: 'Login'}
    },
    MainMenu:{
        screen: MainMenu,
        navigationOptions:{title: 'Main Menu'}
    },
    Library:{
        screen: Library,
        navigationOptions:({ navigation }) => ({ title: navigation.getParam('name') })
    },
    Notebook:{
        screen:Notebook,
        navigationOptions:{title: 'Notebook'}
    }
}
    
);
const StackNavigator = createAppContainer(Stack);
export default StackNavigator;
