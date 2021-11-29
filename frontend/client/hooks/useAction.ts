import { useDispatch } from 'react-redux';
import { ActionTypes } from '../state/action';
import { User, Entry } from '../state/reducer';

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
