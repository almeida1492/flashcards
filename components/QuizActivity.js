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
				<Text style={{ backgroundColor: '#4F5D75', padding: 10, color: '#fff' }}>
					{index + 1}/{cards.length}
				</Text>
				{!isComplete ? 
					<View style={styles.body}>
						<Text style={styles.main}>
							{!isShowingAnswer ? cards[index].question : cards[index].answer}
						</Text>
						<Text 
							style={styles.showAnswerText} 
							onPress={() => this.setState({ isShowingAnswer: !isShowingAnswer })}>
								{!isShowingAnswer ? 'Show Answer' : 'Show Question'}
						</Text>
						<TouchableOpacity style={styles.button} onPress={() => this.onPressHandler(true)}>
							<Text style={styles.buttonText}>Correct</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button} onPress={() => this.onPressHandler(false)}>
							<Text style={styles.buttonText}>Incorrect</Text>
						</TouchableOpacity>
					</View>
					:
					<View style={styles.body}>
						<Text style={styles.main}>You finished and your score is {correctAnswers}/{cards.length}</Text>
						<TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
							<Text style={styles.buttonText}>Back to Deck</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button} onPress={() => this.setState({
							index: 0,
							correctAnswers: 0,
							isShowingAnswer: false,
							isComplete: false,
						})}>
							<Text style={styles.buttonText}>Restart Quiz</Text>
						</TouchableOpacity>
					</View>
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	body: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#4F5D75',
	},
	main: {
		fontSize: 17,
		marginBottom: 40,
		color: '#fff',
	},
	showAnswerText: {
		marginBottom: 60,
		padding: 20,
		color: '#fff',
	},
	button: {
		backgroundColor: '#EF8354',
		padding: 10,
		width: 200,
		marginBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
	},
	buttonText: {
		color: '#fff'
	},
});

export default QuizActivity;