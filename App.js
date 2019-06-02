import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar 
} from 'react-native';
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';

import NewDeck from './components/NewDeck'
import DeckList from './components/DeckList';

import DeckActivity from './components/DeckActivity';
import AddCardActivity from './components/AddCardActivity';
import QuizActivity from './components/QuizActivity';

const store = createStore(reducer, middleware);

class App extends Component {

  render() {
    return(
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <CustomStatusBar backgroundColor='#2D3142' barStyle='light-content'/>
          <StackContainer/>
        </View>
      </Provider>
      
    )
  }
}

function CustomStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: StatusBar.currentHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const TabNavigator = createMaterialTopTabNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Home',
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
    }
  }},
  {
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      style: {
        backgroundColor: '#2D3142',
      },
      indicatorStyle:{
        backgroundColor:'#EF8354'
      },
    },
  }
);
const TabContainer = createAppContainer(TabNavigator);

const StackNavigator = createStackNavigator({
  MainActivity: {
    screen: TabContainer,
    navigationOptions: { 
      header: null,
    },
    headerMode: 'none',
  },
  DeckActivity: {
    screen: DeckActivity,
    navigationOptions: {
      headerTintColor: '#FFFFFF',
      headerStyle: {
        backgroundColor: '#2D3142',
      },
      headerTitleStyle: {
        color: 'white'
      } 
    }
  },
  AddCardActivity: {
    screen: AddCardActivity,
    navigationOptions: { 
      title: 'Add Card',
      headerTintColor: '#FFFFFF',
      headerStyle: {
        backgroundColor: '#2D3142',
      },
      headerTitleStyle: {
        color: 'white'
      }, 
    },
  },
  QuizActivity: {
    screen: QuizActivity,
    navigationOptions: { 
      title: 'Quiz',
      headerTintColor: '#FFFFFF',
      headerStyle: {
        backgroundColor: '#2D3142',
      },
      headerTitleStyle: {
        color: 'white'
      }, 
    },
  },
})
const StackContainer = createAppContainer(StackNavigator);

export default App;
