import { fetchAllDecksAPI, submitDeckAPI, removeDeckAPI } from '../utils/api';

export const FETCH_ALL_DECKS = 'FETCH_ALL_DECKS';
export const SUBMIT_DECK = 'SUBMIT_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';

function fetchAllDecks(decks){
	return {
		type: FETCH_ALL_DECKS,
		decks,
	}
}

export function fetchAllDecksThunk(){
	return (dispatch) => {
		return fetchAllDecksAPI().then((decks) => 
			decks != null 
				? dispatch(fetchAllDecks(decks)) 
				: dispatch(fetchAllDecks({})))
	}
}

export function submitDeck(deck, id){
	return {
		type: SUBMIT_DECK,
		deck,
		id,
	}
}

export function submitDeckThunk(deck, id){
	return (dispatch) => {
		dispatch(submitDeck(deck, id))
		return submitDeckAPI(deck, id).then((results) => 
			results === null ? dispatch(removeDeck(id)) : null)
	}
}

function removeDeck(id){
	return {
		type: REMOVE_DECK,
		id,
	}
}

export function removeDeckThunk(item){
	return (dispatch) => {
		dispatch(removeDeck(item.id))
		return removeDeckAPI(item.id).then((results) => 
			results === null ? dispatch(submitDeck(item, item.id)) : null)
	}
}