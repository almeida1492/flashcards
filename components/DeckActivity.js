import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

class DeckActivity extends Component {

	static navigationOptions = ({ navigation }) => {
		
		const deck = navigation.getParam('deck', {});

		return {
			title: deck.title,
		}
	}

	onAddPressHandler = () => {
		const { navigation } = this.props;
		const deck = navigation.getParam('deck', {});
		navigation.navigate('AddCardActivity', { deck })
	}

	onStartPressHandler = () => {
		const { navigation } = this.props;
		const deck = navigation.getParam('deck', {});
		navigation.navigate('QuizActivity', { cards: deck.cards })
	}

	render() {
		const { navigation } = this.props;
		const deck = navigation.getParam('deck', {});
		return(
			<View>
				<Text>{deck.title}</Text>
				<Text>{deck.cards.length} cards</Text>
				<TouchableOpacity style={styles.button} onPress={this.onAddPressHandler}>
					<Text>ADD CARD</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={this.onStartPressHandler}>
					<Text>START QUIZ</Text>
				</TouchableOpacity>
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

export default DeckActivity;