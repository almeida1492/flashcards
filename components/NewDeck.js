import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { submitDeckThunk } from '../actions/decks';

class NewDeck extends Component {
  state = {
    input: '',
  }

  onPressHandler = () => {
    const { dispatch, navigation } = this.props
    const { input } = this.state;
    const key = uuid.v4();

    if (input !== '') {
      dispatch(submitDeckThunk({ id: key, title: input, cards: [] }, key));  
      navigation.navigate('DeckActivity', { id: key });
    }
  }

  render() {
    const { input } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput 
          style={styles.input}
          value={input} 
          placeholder='Deck Title'
          onChangeText={(input) => this.setState({ input })}/>
        <TouchableOpacity style={styles.button} onPress={this.onPressHandler}>
          <Text style={styles.buttonText}>Create Deck</Text>
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
  input: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#212121',
    paddingLeft: 10,
    marginTop: 10,
    width: 300,
  },
  button: {
    backgroundColor: '#EF8354',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  title: {
    fontSize: 17,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff'
  }
});

export default connect()(NewDeck);