import { atom } from 'recoil';

export const channelsState = atom({
	key: "channels",
	default: []
});

export const channelState = atom({
	key: "channel",
	default: {}
});

export const generalState = atom({
	key: "general",
	default: {}
});

export const channelViewState = atom({
	key: "channelView",
	default: {}
});

export const messagesState = atom({
	key: "messages",
	default: []
});
