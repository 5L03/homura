import React, {useState} from "react";
import {useSelector} from "react-redux";
import useAction from "../hooks/useAction";
import {State} from "../state/reducer";
import Switch from 'react-switch';
import {joinRoom} from "../service";

function UserInfo() {
    const action = useAction();
    const [userName, setUserName] = useState('xiaoyan');
    const [roomName, setRoomName] = useState('default');
    const user = useSelector((state: State) => state.user);
    const room = useSelector((state: State) => state.room);
    const joined = useSelector((state: State) => state.joined);

    async function handleSetUserName() {
        action.setUser({
            _id: "01",
            userName: userName,
        });
    }

    async function handleSetRoomName() {
        action.setRoom({
            _id: "01",
            roomName: roomName,
        });
    }

    async function handleSetJoined(value: boolean) {
        action.setJoined(value);
        joinRoom(userName, roomName);
    }

    return (
        <div>
            {
                user
                    ? <p>User: {user.userName}</p>
                    : <div>
                        <input onChange={(e) => setUserName(e.target.value)} />
                        <button onClick={handleSetUserName}>
                            Set User
                        </button>
                      </div>
            }
            {
                room
                    ? <p>Room: {room.roomName}</p>
                    : <div>
                        <input onChange={(e) => setRoomName(e.target.value)} />
                        <button onClick={handleSetRoomName}>
                            Set Room
                        </button>
                    </div>
            }
            <div>
                <p>join:</p>
                <Switch
                    onChange={(value) => handleSetJoined(value)}
                    disabled={!(user && room) || joined}
                    checked={joined}
                />
            </div>
        </div>
    )
}

export default UserInfo;
