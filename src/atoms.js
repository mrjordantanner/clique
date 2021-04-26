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

export const targetChannelState = atom({
	key: "targetChannel",
	default: {}
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

export const socketState = atom({
	key: "socket",
	default: {}
});
