import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';

class QuizActivity extends Component {
	state = {
		index: 0,
		correctAnswers: 0,
		isShowingAnswer: false,
		isComplete: false, 
	}

	onPressHandler = (isCorrect) => {
		const { index, correctAnswers } = this.state;
		const { navigation } = this.props;
		const cards = navigation.getParam('cards', []);

		let correctAnswersUpdate = correctAnswers;
		if (isCorrect) {
			correctAnswersUpdate++;
		}

		if (index === cards.length - 1) {
			this.setState({ 
				isComplete: true,
				correctAnswers: correctAnswersUpdate,
			})
		} else {
			this.setState((prevState) => ({
				index: prevState.index + 1, 
				correctAnswers: correctAnswersUpdate,
				isShowingAnswer: false,
			}))
		}
		return;
	}

	render() {
		const { index, correctAnswers, isShowingAnswer, isComplete } = this.state;
		const { navigation } = this.props;
		const cards = navigation.getParam('cards', []);
		return(
			<View>
				{!isComplete ? 
					<View>
						<Text>
							{correctAnswers}/{cards.length}
						</Text>
						<Text>
							{!isShowingAnswer ? cards[index].question : cards[index].answer}
						</Text>
						<Text onPress={() => this.setState({ isShowingAnswer: !isShowingAnswer })}>
							{!isShowingAnswer ? 'Show answer' : 'Show question'}
						</Text>
						<TouchableOpacity style={styles.button} onPress={() => this.onPressHandler(true)}>
							<Text>CORRECT</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button} onPress={() => this.onPressHandler(false)}>
							<Text>INCORRECT</Text>
						</TouchableOpacity>
					</View>
					:
					<View>
						<Text>You finished and your score is {correctAnswers}/{cards.length}</Text>
						<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainActivity')}>
							<Text>HOME</Text>
						</TouchableOpacity>
					</View>
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	body: {
		marginTop: 50,
		marginBottom: 50,
	},
	button: {
		backgroundColor: '#E53224',
		padding: 10,
		paddingLeft: 50,
		paddingRight: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
	},
	buttonText: {
		color: '#fff'
	}
});

export default QuizActivity;