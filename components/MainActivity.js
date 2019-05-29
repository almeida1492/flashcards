import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { 
	StyleSheet, 
	Text, 
	View,
} from 'react-native';
import DeckListActivity from './DeckListActivity';
import DeckActivity from './DeckActivity';
import AddCardActivity from './AddCardActivity';
import QuizActivity from './QuizActivity';

class MainActivity extends Component {
	render() {
		return (
			<StackContainer/>
		);
	}
}

const StackNavigator = createStackNavigator({
	DeckListActivity: {
		screen: DeckListActivity,
	},
	DeckActivity: {
		screen: DeckActivity,
	},
	AddCardActivity: {
		screen: AddCardActivity,
	},
	QuizActivity: {
		screen: QuizActivity,
	},
},
{
    navigationOptions: {
      header: null,
    },
    headerMode: 'none',
})
const StackContainer = createAppContainer(StackNavigator);

export default MainActivity;