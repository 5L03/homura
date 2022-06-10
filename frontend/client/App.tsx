import React from 'react';

import UserInfo from './modules/UserInfo';
import EntryList from "./modules/EntryList";
import AddEntry from "./modules/AddEntry";

import './App.less';

function App() {


    return (
        <div className="App">
            <header className="App-header">
                <UserInfo />
                <EntryList />
                <AddEntry />
            </header>
        </div>
    );
}

export default App;
