import React from 'react';
import { Routes, Route } from 'react-router-dom';
import News from '../../../pages/News/News';
import Chat from '../../../pages/Chat/Chat';
import Profile from '../../../pages/Profile/Profile';
import Followers from '../../../pages/Followers/Followers';
import './Main.sass';

const Main: React.FC = () => {
  return (
    <main className='main'>
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/messenger" element={<Chat />} />
        <Route path="/profile/:creatorId" element={<Profile />} />
        <Route path="/followers" element={<Followers />} />
        {/* <Route path="/settings" element={<Chat />} /> */}
      </Routes>
    </main>
  )
};

export default Main;