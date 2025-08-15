import { FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  clearError,
  registerUserThunk,
  selectIsAuthenticated,
  selectUserError,
  selectUserLoading
} from '../../services/userSlice';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

 
  useEffect(
    () => () => {
      dispatch(clearError());
    },
    [dispatch]
  );

  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();

     
      if (!userName || !email || !password) {
        return;
      }

      try {
        await dispatch(
          registerUserThunk({
            name: userName,
            email,
            password
          })
        ).unwrap();

       
        navigate('/');
      } catch (error) {
        
      }
    },
    [dispatch, userName, email, password, navigate]
  );

  return (
    <RegisterUI
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      userName={userName}
      setUserName={setUserName}
      errorText={error}
      handleSubmit={handleSubmit}
    />
  );
};
