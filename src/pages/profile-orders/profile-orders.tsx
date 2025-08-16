import { getOrdersApi } from '@api';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getUserOrders,
  selectIngredients,
  selectUserOrders,
  selectUserOrdersLoading
} from '../../services/burgerSlice';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const userOrders = useSelector(selectUserOrders);
  const loading = useSelector(selectUserOrdersLoading);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const processedOrders = (userOrders || []).map((order) => {
    if (!order || !Array.isArray(order.ingredients)) {
      console.warn('Некорректные данные заказа:', order);
      return {
        _id: 'unknown',
        number: 0,
        name: 'Неизвестный заказ',
        status: 'Неизвестно',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ingredients: [],
        total: 0,
        date: new Date()
      };
    }

    const total = order.ingredients.reduce((sum, ingredientId) => {
      if (!ingredientId) return sum;
      const ingredient = ingredients.find((ing) => ing._id === ingredientId);
      return sum + (ingredient?.price || 0);
    }, 0);

    const getStatus = (status: string) => {
      switch (status) {
        case 'done':
          return 'Выполнен';
        case 'pending':
          return 'Готовится';
        case 'cancelled':
          return 'Отменён';
        default:
          return status || 'Неизвестно';
      }
    };

    return {
      ...order,
      total,
      status: getStatus(order.status),
      date: new Date(order.createdAt || Date.now())
    };
  });

  if (loading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={processedOrders} />;
};
