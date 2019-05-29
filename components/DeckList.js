import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, } from 'react-native';
import { connect } from 'react-redux';

import { objectToArray } from '../utils/objectToArray';
import { fetchAllDecksThunk } from '../actions/decks';
import DeckListItem from './DeckListItem';

class DeckList extends Component {
	componentDidMount(){
		this.props.dispatch(fetchAllDecksThunk());
	}

	renderItem = ({ item }) => {
		return <DeckListItem item={item} navigation={this.props.navigation}/>
	}

	keyExtractor = (item, index) => {
		return item.id;
	}

	render() {
		const { decks } = this.props;
		return(
			<View style={styles.container}> 
				{decks.length === 0 
					? <Text>There's no decks yet!</Text>
					: <FlatList data={decks} renderItem={this.renderItem} keyExtractor={this.keyExtractor}/>
				}
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
})

function mapStateToProps({ decks }){
	return {
		decks: objectToArray(decks),
	}
}

export default connect(mapStateToProps)(DeckList);