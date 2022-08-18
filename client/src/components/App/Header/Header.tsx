import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Greetings from '../Greetings/Greetings';
import './Header.sass';

const Header: React.FC = memo(() => {
  return (
    <header className='header'>
      <div className="header__container">
        <Link to="/" className="header__logo">
          libchat
        </Link>
        <Greetings />
      </div>
    </header>
  )
});

export default Header;