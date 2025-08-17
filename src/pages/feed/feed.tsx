import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  selectFeeds,
  selectFeedsLoading,
  getOrders
} from '../../services/feedSlice';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/ingredientsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const feeds = useSelector(selectFeeds);
  const loading = useSelector(selectFeedsLoading);

  const handleGetOrders = () => {
    dispatch(getOrders());
  };

  if (loading || !feeds) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={feeds.orders}
      handleGetFeeds={handleGetOrders}
      total={feeds.total}
      totalToday={feeds.totalToday}
    />
  );
};
