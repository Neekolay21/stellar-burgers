import { FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  clearError,
  loginUserThunk,
  selectIsAuthenticated,
  selectUserError,
  selectUserLoading
} from '../../services/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Редирект если уже авторизован
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Очистка ошибки при размонтировании
  useEffect(
    () => () => {
      dispatch(clearError());
    },
    [dispatch]
  );

  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();

      if (!email || !password) {
        return;
      }

      try {
        await dispatch(
          loginUserThunk({
            email,
            password
          })
        ).unwrap();

        navigate('/');
      } catch (error) {
      }
    },
    [dispatch, email, password, navigate]
  );

  return (
    <LoginUI
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      errorText={error}
      handleSubmit={handleSubmit}
    />
  );
};
