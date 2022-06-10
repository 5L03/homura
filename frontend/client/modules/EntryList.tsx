import React from "react";
import {useSelector} from "react-redux";
import useAction from "../hooks/useAction";
import {State} from "../state/reducer";

import EntryComponent from '../components/Entry';

import { getEntries } from '../service';


function EntryList() {
    const action = useAction();

    async function handleGetEntries() {
        const entries = await getEntries();
        if(entries)
            action.setEntries(entries);
    }

    const entries = useSelector((state: State) => state.entries);

    return (
        <div>
            {entries.map(entry => EntryComponent(entry))}
            <button onClick={handleGetEntries}>
                getEntries
            </button>
        </div>
    )
}

export default EntryList;
