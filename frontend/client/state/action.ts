import {User, Entry, Room} from './reducer';

export enum ActionTypes {
    SetValue = 'SetValue',
    SetUser = 'SetUser',
    SetRoom = 'SetRoom',
    SetJoined = 'SetJoined',
    SetEntries = 'SetEntries',
    AddEntry = 'AddEntry',
}

export type SetValuePayload = Number;

export type SetUserPayload = User;

export type SetRoomPayload = Room;

export type SetJoinedPayload = Boolean;

export type SetEntriesPayload = Entry[];

export type AddEntryPayload = Entry;

export interface Action {
    type: ActionTypes;
    payload:
        | SetValuePayload
        | SetUserPayload
        | SetRoomPayload
        | SetJoinedPayload
        | SetEntriesPayload
        | AddEntryPayload
        | Object
}
