import { atom } from 'recoil';

export const channelsState = atom({
	key: "channels",
	default: []
});

export const channelState = atom({
	key: "channel",
	default: ''
});

export const generalState = atom({
	key: "general",
	default: {}
});

export const channelViewState = atom({
	key: "channelView",
	default: '001'
});

export const messagesState = atom({
	key: "messages",
	default: []
});

export const usersState = atom({
	key: "users",
	default: []
});

export const activeUserState = atom({
	key: "activeUser",
	default: {
		name: null,
		token: null,
		channel: null,
	}
});
