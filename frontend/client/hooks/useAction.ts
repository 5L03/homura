import { useDispatch } from 'react-redux';
import { ActionTypes } from '../state/action';
import {User, Entry, Room} from '../state/reducer';

/**
 * 获取 redux action
 */
export default function useAction() {
    const dispatch = useDispatch();

    return {
        setValue(count: number) {
            dispatch({
                type: ActionTypes.SetValue,
                payload: count,
            });
        },

        setUser(user: User) {
            dispatch({
                type: ActionTypes.SetUser,
                payload: user,
            });
        },

        setRoom(room: Room) {
            dispatch({
                type: ActionTypes.SetRoom,
                payload: room,
            });
        },

        setJoined(joined: boolean) {
            dispatch({
                type: ActionTypes.SetJoined,
                payload: joined,
            });
        },

        setEntries(entries: Entry[]) {
            dispatch({
               type: ActionTypes.SetEntries,
                payload: entries,
            });
        },

        addEntry(entry: Entry) {
            dispatch({
               type: ActionTypes.AddEntry,
                payload: entry,
            });
        }
    };
}
