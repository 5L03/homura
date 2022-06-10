import IO from 'socket.io-client';

import config from '../config/client';
import store from './state/store';
const { dispatch } = store;

const options = {
    // reconnectionDelay: 1000,
};
const socket = IO();

socket.on('connect', async () => {
    console.log("socket connected")
});

export default socket;
