import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

export const DECKS_STORAGE_KEY = '@storage:decks';
const NOTIFICATION_KEY = '@notifications';

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

export const clearLocalNotification = () => {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync)
}

const createNotification = () => {
	return {
		title: 'Hey!',
		body: 'Don\'t forget to study today.',
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true,
		}
	}
}

export const setLocalNotification = () => {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data) => {
			if (data === null){
				Permissions.askAsync(Permissions.NOTIFICATIONS)
					.then(({ status }) => {
						if (status === 'granted'){
							Notifications.cancelAllScheduledNotificationsAsync();

							let tomorrow = new Date();
							tomorrow.setDate(tomorrow.getDate() + 1);
							tomorrow.setHours(20);
							tomorrow.setMinutes(0);

							Notifications.scheduleLocalNotificationAsync(
								createNotification(),
								{
									time: tomorrow,
									repeat: 'day',
								}
							)

							AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
						}
					})
			}
		})
}