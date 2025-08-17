import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders, selectFeeds } from '../../services/feedSlice';
import {
  getUserOrders,
  selectUserOrders
} from '../../services/userOrdersSlice';
import { selectIngredients } from '../../services/ingredientsSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const feeds = useSelector(selectFeeds);
  const userOrders = useSelector(selectUserOrders);
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);

  useEffect(() => {
    if (
      (!feeds || !feeds.orders || feeds.orders.length === 0) &&
      (!userOrders || userOrders.length === 0)
    ) {
      dispatch(getOrders());
      dispatch(getUserOrders());
    }
  }, [feeds, userOrders, dispatch]);

  const orderData = feeds?.orders.find(
    (order) => order.number === Number(number)
  );

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
