import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

class DeckActivity extends Component {

	static navigationOptions = ({ navigation }) => {
		const title = navigation.getParam('title', '');

		return {
			title,
		}
	}

	getDeck = () => {
		const { decks, navigation } = this.props;
		const id = navigation.getParam('id', '');

		return decks[id];
	}

	onAddPressHandler = () => {
		const { navigation } = this.props;
		const deck = this.getDeck();
		navigation.navigate('AddCardActivity', { deck })
	}

	onStartPressHandler = () => {
		const { navigation } = this.props;
		const deck = this.getDeck();

		if (deck.cards.length > 0) {
			navigation.navigate('QuizActivity', { cards: deck.cards })	
		}
	}

	render() {
		const { navigation } = this.props;
		const deck = this.getDeck();
		return(
			<View>
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

function mapStateToProps({ decks }){
	return {
		decks: decks,
	}
}

export default connect(mapStateToProps)(DeckActivity);