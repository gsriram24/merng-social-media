import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);

  const pathname = window.location.pathname;

  const [activeItem, setActiveItem] = useState(
    pathname === '/' ? 'home' : pathname.substr(1)
  );
  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div>
      <Menu pointing secondary size='massive' color='teal'>
        <Menu.Item
          name={user ? user.username : 'home'}
          active={user ? true : activeItem === 'home'}
          as={Link}
          to='/'
        />

        <Menu.Menu position='right'>
          {!user ? (
            <>
              <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as={Link}
                to='/login'
              />
              <Menu.Item
                name='register'
                active={activeItem === 'register'}
                onClick={handleItemClick}
                as={Link}
                to='/register'
              />
            </>
          ) : (
            <Menu.Item name='logout' onClick={logout} />
          )}
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default MenuBar;
