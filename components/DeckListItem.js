import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	StyleSheet, 
	Text, 
	View, 
	TouchableOpacity, 
} from 'react-native';
import { removeDeckThunk } from '../actions/decks';
import generateCountText from '../utils/generateCountText';

class DeckListItem extends Component {
	render() {
		const { item } = this.props
		return(
			<View>
				<TouchableOpacity 
					style={styles.body} 
					onPress={() => this.props.navigation.navigate('DeckActivity', { id: item.id })}>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={styles.count}>{generateCountText(item)}</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	body: {
		backgroundColor: '#FFFFFF',
		padding: 10,
		paddingLeft: 50,
		paddingRight: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 17,
		marginTop: 20,
	},
	count: {
		fontSize: 14,
		color: '#9E9E9E',
		marginTop: 10,
		marginBottom: 20,
	},
});

export default connect()(DeckListItem);