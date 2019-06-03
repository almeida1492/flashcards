import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { removeDeckThunk } from '../actions/decks';
import Toast, { DURATION } from 'react-native-easy-toast';
import generateCountText from '../utils/generateCountText';

class DeckActivity extends Component {

	getDeck = () => {
		const { decks, navigation } = this.props;
		const id = navigation.getParam('id', '');

		if (decks[id] !== undefined) {
			return decks[id];
		} else {
			return { cards: [] };
		}
	}

	onAddPressHandler = () => {
		const { navigation } = this.props;
		const deck = this.getDeck();
		navigation.navigate('AddCardActivity', { deck });
	}

	onStartPressHandler = () => {
		const { navigation } = this.props;
		const deck = this.getDeck();

		if (deck.cards.length > 0) {
			navigation.navigate('QuizActivity', { cards: deck.cards });	
		} else {
			this.refs.toast.show('This deck is empty! Add cards to start a quiz.', 1300);
		}
	}

	onDeletePressHandler = () => {
		const { dispatch, navigation } = this.props;
		const deck = this.getDeck();
		dispatch(removeDeckThunk(deck));
		navigation.goBack();
	}

	render() {
		const { navigation } = this.props;
		const deck = this.getDeck();
		return(
			<View style={styles.body}>
				<Text style={styles.title}>{deck.title}</Text>
				<Text style={styles.count}>{generateCountText(deck)}</Text>
				<View style={styles.buttons}>
					<TouchableOpacity style={styles.button} onPress={this.onAddPressHandler}>
						<Text style={styles.buttonText}>Create New Question</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.mainButton} onPress={this.onStartPressHandler}>
						<Text style={styles.buttonText}>Start a Quiz</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={this.onDeletePressHandler}>
						<Text style={styles.buttonText}>Delete Deck</Text>
					</TouchableOpacity>
				</View>
				<Toast ref="toast" positionValue={180}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	body: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},
	title: {
		fontSize: 30,
		margin: 20,
		fontWeight: 'bold',
	},
	count: {
		fontSize: 17,
		color: '#BFC0C0',
		marginTop: 10,
	},
	button: {
		backgroundColor: '#4F5D75',
		padding: 10,
		paddingLeft: 50,
		paddingRight: 50,
		marginBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
	},
	mainButton: {
		backgroundColor: '#EF8354',
		padding: 10,
		paddingLeft: 50,
		paddingRight: 50,
		marginBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
	},
	buttonText: {
		color: '#fff'
	},
	buttons: {
		marginTop: 50,
	}
});

function mapStateToProps({ decks }){
	return {
		decks: decks,
	}
}

export default connect(mapStateToProps)(DeckActivity);