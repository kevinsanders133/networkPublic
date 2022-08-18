import React, { memo } from 'react';
import Navigation from '../Navigation/Navigation';
import './AsideMenu.sass';

const AsideMenu: React.FC = memo(() => {
  return (
    <aside className='aside-menu'>
      <Navigation />
    </aside>
  )
});

export default AsideMenu;