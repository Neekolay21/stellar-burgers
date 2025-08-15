import { Preloader } from '@ui';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  selectIsAuthenticated,
  selectUser,
  selectUserInit,
  selectUserLoading
} from '../../services/userSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isPublic?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isPublic
}) => {
  const user = useSelector(selectUser);
  const isInit = useSelector(selectUserInit);
  const location = useLocation();

  if (!isInit) {
    return <Preloader />;
  }

  if (isPublic && user) {
    const from = location.state?.from || { pathname: '/' };
    return (
      <Navigate to={from} state={{ background: from?.state?.background }} />
    );
  }

  if (!isPublic && !user) {
    return (
      <Navigate
        to='/login'
        state={{
          from: location
        }}
      />
    );
  }

  return <>{children}</>;
};
