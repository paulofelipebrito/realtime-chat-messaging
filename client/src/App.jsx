import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import './App.css';
import ChannelListContainer from './components/Channel/ChannelListContainer';
import ChannelContainer from './components/Channel/ChannelContainer';
import Auth from './components/Auth/Auth'

const client = StreamChat.getInstance(process.env.REACT_APP_API_KEY);

const authToken = false;

const App = () => {
    if(!authToken) {
        return <Auth />
    }

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
