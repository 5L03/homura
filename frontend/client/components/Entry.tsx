import React from 'react';

interface EntryProps {
    _id: string;
    categoryId: string;
    name: string;
    amount: number;
    createTime: string;
}

function Entry(props: EntryProps) {
    const { _id, categoryId, name, amount, createTime } = props;

    return (
        <div>
            <p>--Entry----</p>
            <p>{name}</p>
            <p>{amount}</p>
            <p>-----------</p>
        </div>
    );
}

export default Entry;
