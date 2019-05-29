import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { 
	StyleSheet, 
	Text, 
	View,
	FlatList, 
} from 'react-native';
import DeckListItem from './DeckListItem';
import { fetchAllDecksThunk } from '../actions/decks';
import { objectToArray } from '../utils/objectToArray';
import DeckListActivity from './DeckListActivity';
import DeckActivity from './DeckActivity';
import AddCardActivity from './AddCardActivity';
import QuizActivity from './QuizActivity';

class MainActivity extends Component {

	componentDidMount(){
		this.props.dispatch(fetchAllDecksThunk());
	}

	renderItem = ({ item }) => {
		return <DeckListItem item={item}/>
	}

	keyExtractor = (item, index) => {
		return item.id;
	}

	render() {
		const { decks } = this.props;
		return (
			<View style={styles.container}> 
				{decks.length === 0 
					? <Text>There's no decks yet!</Text>
					: <FlatList data={decks} renderItem={this.renderItem} keyExtractor={this.keyExtractor}/>
				}
			</View>
		);
	}
}

const stackNavigator = createStackNavigator({
	DeckListActivity: {
		screen: DeckListActivity,
	},
	DeckActivity: {
		screen: DeckActivity,
	},
	AddCardActivity: {
		screen: AddCardActivity,
	},
	QuizActivity: {
		screen: QuizActivity,
	},
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

function mapStateToProps({ decks }){
	return {
		decks: objectToArray(decks),
	}
}

export default connect(mapStateToProps)(MainActivity);