import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, } from 'react-native';
import { connect } from 'react-redux';
import { submitDeckThunk } from '../actions/decks';

class AddCardActivity extends Component {
	state = {
		question: '',
		answer: '',
	}

	onPressHandler = () => {
		const { question, answer } = this.state;

		const { navigation, dispatch } = this.props;
		const deck = navigation.getParam('deck', {});

		if (question !== '' && answer !== '') {
			const card = { question, answer }
			deck.cards.push(card);
			dispatch(submitDeckThunk(deck, deck.id))
			navigation.goBack();
		}
	}

	render() {
		const { question, answer } = this.state;
		return(
			<View>
				<TextInput value={question} onChangeText={(question) => this.setState({ question })}/>
				<TextInput value={answer} onChangeText={(answer) => this.setState({ answer })}/>
				<TouchableOpacity style={styles.button} onPress={this.onPressHandler}>
					<Text style={styles.buttonText}>Submit</Text>
		        </TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
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

export default connect()(AddCardActivity);