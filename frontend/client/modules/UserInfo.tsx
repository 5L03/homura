import React from "react";
import {useSelector} from "react-redux";
import useAction from "../hooks/useAction";
import {State} from "../state/reducer";

import { login } from '../service';


function UserInfo() {
    const action = useAction();

    async function handleLogin() {
        const user = await login();
        if(user)
            action.setUser(user);
    }

    const user = useSelector((state: State) => state.user);

    return (
        <div>
            {user ? <p>{user._id}</p> : null}
            {user ? <p>{user.userName}</p> : null}
            <button onClick={handleLogin}>
                login
            </button>
        </div>
    )
}

export default UserInfo;
