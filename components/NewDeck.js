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
      navigation.navigate('Home');
    }
  }

  render() {
    const { input } = this.state;
    return (
      <View style={styles.container}>
        <Text>What is the title of your new deck?</Text>
        <TextInput value={input} onChangeText={(input) => this.setState({ input })}/>
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

export default connect()(NewDeck);