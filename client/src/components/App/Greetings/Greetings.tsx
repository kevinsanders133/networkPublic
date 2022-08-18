import React, { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { setSignedIn } from '../../../redux/slices/signedInSlice';
import axios from 'axios';
import './Greetings.sass';

const Greetings: React.FC = memo(() => {

    const dispatch = useAppDispatch();

    const signedIn = useAppSelector(state => state.signedIn.value);

    const logOut = useCallback(async () => {
        await axios.post('http://localhost:5005/logout');
        dispatch(setSignedIn(false));
    }, []);

    return (
        <div className="header__greetings">
            <div className="header__greetings-container">
                {
                    signedIn
                    ?
                    <div onClick={logOut} className='header__greetings-sign-in'>
                        Log out
                    </div>
                    :
                    <>
                    <Link to="/login" className="header__greetings-sign-in"> 
                        Sign in
                    </Link>
                    <Link to="/registration" className="header__greetings-sign-up">
                        Sign up
                    </Link>
                    </>
                }
            </div>
        </div>
    );
});

export default Greetings;