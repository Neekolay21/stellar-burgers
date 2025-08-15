import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  selectFeeds,
  selectFeedsLoading,
  getOrders,
  getBurgers
} from '../../services/burgerSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const feeds = useSelector(selectFeeds);
  const loading = useSelector(selectFeedsLoading);

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getBurgers());
  }, [dispatch]);

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
