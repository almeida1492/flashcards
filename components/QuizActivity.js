import React, { Component } from 'react';
import { View, Text } from 'react-native';

class QuizActivity extends Component {
	state = {
		currentCard: 1,
		correctAnswers: 0,
	}

	moveToNextCard = () => {

	}

	render() {
		const { currentCard, correctAnswers } = this.state;
		const { navigation } = this.props;
		const cards = navigation.getParam('cards', []);
		return(
			<View>
				<Text>{correctAnswers}/{cards.length}</Text>
			</View>
		)
	}
}

export default QuizActivity;