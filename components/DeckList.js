import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
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

	renderSeparatorView = () => {
		return (
			<View style={{
				height: 1, 
				width: "100%",
				backgroundColor: "#2D3142",
				opacity: 0.1,
				}}
			/>
		);
	};

	render() {
		const { decks } = this.props;
		return(
			<View style={styles.list}> 
				{decks.length === 0 ? 
					<Text style={styles.empty}>There are no decks yet!</Text>
					: 
					<FlatList 
						data={decks} 
						renderItem={this.renderItem} 
						keyExtractor={this.keyExtractor}
						ItemSeparatorComponent={this.renderSeparatorView}
					/>
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  empty: {
  	textAlign: 'center',
  	color: '#BDBDBD',
  }
})

function mapStateToProps({ decks }){
	return {
		decks: objectToArray(decks),
	}
}

export default connect(mapStateToProps)(DeckList);