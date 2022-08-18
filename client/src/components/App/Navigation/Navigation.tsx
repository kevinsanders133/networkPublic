import React from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { Link } from "react-router-dom";
import './Navigation.sass';

const Navigation: React.FC = () => {
    const userId = useAppSelector(state => state.userInfo.value?.id);
    return (
    <nav className='navigation'>
        <ul className="navigation__list">
            <li className="navigation__item">
                <Link to={`/profile/${userId}`}>Profile</Link>
            </li>
            <li className="navigation__item">
                <Link to="/">News</Link>
            </li>
            <li className="navigation__item">
                <Link to="/messenger">Messenger</Link>
            </li>
            <li className="navigation__item">
                <Link to="/followers">Followers</Link>
            </li>
            <li className="navigation__item">
                <Link to="/settings">Settings</Link>
            </li>
        </ul>
    </nav>
    );
};

export default Navigation;