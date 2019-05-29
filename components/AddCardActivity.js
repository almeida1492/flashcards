import React, { Component } from 'react';
import { View, Text } from 'react-native';

class AddCardActivity extends Component {

	render() {
		const { navigation } = this.props;
		const deck = navigation.getParam('deck', {});
		return(
			<View>
				<Text>Add card to {deck.title}</Text>
			</View>
		)
	}
}

export default AddCardActivity;