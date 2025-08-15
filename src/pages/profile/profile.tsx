import { ProfileUI } from '@ui-pages';
import {
  ChangeEvent,
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState
} from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearError,
  selectUser,
  selectUserError,
  selectUserLoading,
  updateUserThunk
} from '../../services/userSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  const [originalData, setOriginalData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  // Обновляем форму при изменении данных пользователя
  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
      setOriginalData({
        name: user.name,
        email: user.email
      });
    }
  }, [user]);

  // Очистка ошибки при размонтировании
  useEffect(
    () => () => {
      dispatch(clearError());
    },
    [dispatch]
  );

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const isFormChanged = useCallback(
    () =>
      formValue.name !== originalData.name ||
      formValue.email !== originalData.email ||
      formValue.password !== '',
    [formValue, originalData]
  );

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      // Валидация
      if (!formValue.name || !formValue.email) {
        return;
      }

      try {
        const updateData: any = {
          name: formValue.name,
          email: formValue.email
        };

        // Добавляем пароль только если он был изменен
        if (formValue.password) {
          updateData.password = formValue.password;
        }

        await dispatch(updateUserThunk(updateData)).unwrap();

        setOriginalData({
          name: formValue.name,
          email: formValue.email
        });
        setFormValue((prev) => ({ ...prev, password: '' }));
      } catch (error) {
        // Ошибка обрабатывается в слайсе
      }
    },
    [dispatch, formValue]
  );

  const handleCancel = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      setFormValue({
        name: originalData.name,
        email: originalData.email,
        password: ''
      });
      dispatch(clearError());
    },
    [originalData, dispatch]
  );

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged()}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      handleInputChange={handleInputChange}
      updateUserError={error}
    />
  );
};
