import React, {useState} from "react";
import useAction from "../hooks/useAction";
import {addEntry} from "../service";

function AddEntry() {
    const action = useAction();

    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);

    async function handleAddEntries() {
        let _id: string = await addEntry();
        if(_id) {
            action.addEntry({
                _id: _id,
                categoryId: '002',
                name: name,
                amount: amount,
                createTime: '002',
            });
        }
    }

    return (
        <div>
            <input
                onChange={(e) => setName(e.target.value)}
            />
            <input
                onChange={(e) => setAmount(Number(e.target.value))}
            />
            <button onClick={handleAddEntries}>
                AddEntries
            </button>
        </div>
    )
}

export default AddEntry;
