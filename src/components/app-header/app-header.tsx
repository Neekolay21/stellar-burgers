import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIsAuthenticated, selectUser } from '../../services/userSlice';

export const AppHeader: FC = () => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const isConstructorActive = location.pathname === '/';
  const isFeedActive = location.pathname === '/feed';
  const isProfileActive =
    location.pathname.startsWith('/profile') ||
    (!isAuthenticated && location.pathname === '/login');

  return (
    <AppHeaderUI
      isConstructorActive={isConstructorActive}
      isFeedActive={isFeedActive}
      isProfileActive={isProfileActive}
      isAuthenticated={isAuthenticated}
      userName={user?.name}
    />
  );
};
