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
		const { navigation } = this.props;
		const deck = navigation.getParam('deck', {});
		return(
			<View style={styles.container}>
				<Text style={styles.title}>{deck.title}</Text>
				<TextInput
					style={styles.input}
					placeholder='Question'
					value={question} 
					onChangeText={(question) => this.setState({ question })}/>
				<TextInput 
					style={styles.input}
					placeholder='Answer'
					value={answer} 
					onChangeText={(answer) => this.setState({ answer })}/>
				<TouchableOpacity style={styles.button} onPress={this.onPressHandler}>
					<Text style={styles.buttonText}>Submit</Text>
		        </TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
	    flex: 1,
	    backgroundColor: '#fff',
	    alignItems: 'center',
	    justifyContent: 'center',
	},
	button: {
		backgroundColor: '#EF8354',
		padding: 10,
		paddingLeft: 50,
		paddingRight: 50,
		marginTop: 70,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
	},
	buttonText: {
		color: '#fff'
	},
	title: {
		fontSize: 17,
		marginBottom: 40,
	},
	input: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#212121',
    paddingLeft: 10,
    marginTop: 10,
    width: 300,
  },	
});

export default connect()(AddCardActivity);