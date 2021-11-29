import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../state/reducer';
import useAction from '../../hooks/useAction';

// @ts-ignore
import Style from "./Counter.less";

function Counter() {
    const action = useAction();
    const count = useSelector((state: State) => state.value);
    const [incrementAmount, setIncrementAmount] = useState('2');

    function handleIncrement() {
        action.setValue(count + 1);
    }

    function handleDecrement() {
        action.setValue(count - 1);
    }

    function handleTncrementByAmount() {
        action.setValue(count + Number(incrementAmount));
    }

    async function handleIncrementAsync() {
        setTimeout(() => action.setValue(count + Number(incrementAmount)), 1000);
    }

    return (
        <div>
            <div className={Style.row}>
                <button
                    className={Style.button}
                    aria-label='Increment value'
                    onClick={handleIncrement}
                >
                    +
                </button>
                <span className={Style.value}>{count}</span>
                <button
                    className={Style.button}
                    aria-label='Decrement value'
                    onClick={handleDecrement}
                >
                    -
                </button>
            </div>
            <div className={Style.row}>
                <input
                    className={Style.textbox}
                    aria-label='Set increment amount'
                    value={incrementAmount}
                    onChange={e => setIncrementAmount(e.target.value)}
                />
                <button
                    className={Style.button}
                    onClick={handleTncrementByAmount}
                >
                    Add Amount
                </button>
                <button
                    className={Style.asyncButton}
                    onClick={handleIncrementAsync}
                >
                    Add Async
                </button>
            </div>
        </div>
    );
}

export default Counter;
