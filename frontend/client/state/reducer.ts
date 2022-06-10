import {Action, ActionTypes} from './action';


// 用户信息
export interface User {
    _id: string;
    userName: string;
}

// Information of room
export interface Room {
    _id: string;
    roomName: string;
}

// 条目
export interface Entry {
    _id: string;
    categoryId: string;
    name: string;
    amount: number;
    createTime: string;
}

/** redux store state */
export interface State {
    value: number;

    user: User | null;
    room: Room | null;
    joined: boolean;

    entries: Entry[];
}

export const initialState: State = {
    value: 0,

    user: null,
    room: null,
    joined: false,

    entries: [],
};

function reducer(state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.SetValue: {
            return {
                ...state,
                value: action.payload as number,
            };
        }

        case ActionTypes.SetUser: {
            return {
                ...state,
                user: action.payload as User,
            }
        }

        case ActionTypes.SetRoom: {
            return {
                ...state,
                room: action.payload as Room,
            }
        }

        case ActionTypes.SetJoined: {
            return {
                ...state,
                joined: action.payload as boolean,
            }
        }

        case ActionTypes.SetEntries: {
            return {
                ...state,
                entries: action.payload as Entry[],
            }
        }

        case ActionTypes.AddEntry: {
            return {
                ...state,
                entries: [...state.entries, action.payload as Entry],
            }
        }

        default:
            return state;
    }
}

export default reducer;
