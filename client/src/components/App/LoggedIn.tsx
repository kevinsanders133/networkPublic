import React from 'react';
import AsideMenu from './AsideMenu/AsideMenu';
import Main from './Main/Main';

const LoggedIn: React.FC = () => {
  return (
    <>
      <AsideMenu />
      <Main />
    </>
  )
};

export default LoggedIn;