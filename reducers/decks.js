import {
	FETCH_ALL_DECKS,
	SUBMIT_DECK,
	REMOVE_DECK,
} from '../actions/decks'

export default function decks(state = {}, action){

	switch(action.type){
		case FETCH_ALL_DECKS :
			return {
				...state,
				...action.decks,
			}
		case SUBMIT_DECK :
			return {
				...state,
				[action.id]: action.deck,
			}
		case REMOVE_DECK :
			const newState = {...state};
			newState[action.id] = undefined;
			delete newState[action.id];
			return {
				...newState,
			}
		default :
			return state;
	}
}