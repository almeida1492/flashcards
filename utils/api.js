import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = '@storage:decks';

export const fetchAllDecksAPI = async () => {
	try {
		return await AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => JSON.parse(results));
	} catch (error) {
		console.log('Failed in retrieving data');
		console.log(error);
		return null;
	}
}

export const submitDeckAPI = async (deck, id) => {
	try {
		return await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
			[id]: deck,
		})).then((results) => id)
	} catch (error) {
		console.log('Failed in submiting data');
		console.log(error);
		return null;
	}	
}

export const removeDeckAPI = async (id) => {
	try {
		return await AsyncStorage.getItem(DECKS_STORAGE_KEY).then((results) => {
			const decks = JSON.parse(results);
			decks[id] = undefined;
			delete decks[id];
			AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({...decks}))
		})
	} catch (error) {
		console.log('Failed in removing data');
		console.log(error);
		return null;
	}
}