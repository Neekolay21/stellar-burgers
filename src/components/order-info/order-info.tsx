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
import { orderSelectorByNumber } from '../../services/selectors/orderSelecetorByNumber';
import { getOrderByNumber } from '../../services/orderSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const orderData = useSelector(orderSelectorByNumber(Number(number)));
  const feeds = useSelector(selectFeeds);
  const userOrders = useSelector(selectUserOrders);
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);

  useEffect(() => {
    if (!orderData && number) {
      dispatch(getOrderByNumber(parseInt(number)));
    }
  }, [dispatch, number]);

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
