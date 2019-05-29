import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	StyleSheet, 
	Text, 
	View, 
	TouchableOpacity, 
} from 'react-native';
import { removeDeckThunk } from '../actions/decks';

class DeckListItem extends Component {

	onPressHandler = () => {
		const { item, dispatch } = this.props;
		dispatch(removeDeckThunk(item));
	}

	render() {
		const { item } = this.props
		return(
			<View style={styles.body}>
				<Text>{item.title}</Text>
				<TouchableOpacity 
					style={styles.button} 
					onPress={() => this.props.navigation.navigate('DeckActivity', { 
						id: item.id,
						title: item.title,
					})}>
					<Text>OPEN DECK</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={this.onPressHandler}>
					<Text>DELETE</Text>
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

export default connect()(DeckListItem);