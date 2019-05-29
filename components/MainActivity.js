import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { 
	StyleSheet, 
	Text, 
	View,
	StatusBar,
} from 'react-native';

import NewDeck from './NewDeck'
import DeckList from './DeckList';

class MainActivity extends Component {
	render() {
		return (
			<TabContainer/>
		);
	}
}

const TabNavigator = createMaterialTopTabNavigator({
  Home: {
    screen: DeckList,
  },
  NewDeck: {
    screen: NewDeck,
  },
});
const TabContainer = createAppContainer(TabNavigator);

export default MainActivity;