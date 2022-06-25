import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import './App.css';
import ChannelListContainer from './components/ChannelListContainer';
import ChannelContainer from './components/ChannelContainer';

const client = StreamChat.getInstance(process.env.REACT_APP_API_KEY);

const App = () => {
    console.log(process.env.REACT_APP_API_KEY)
    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer 
                />
                <ChannelContainer 
                />
            </Chat>
        </div>
    );
}

export default App;
