import { RootState } from '../store';

export function orderSelectorByNumber(numberOrder: number) {
  return (store: RootState) => {
    if (store.feed) {
      return store.feed.feeds?.orders.find(
        (order) => order.number === numberOrder
      );
    }

    if (store.order.userOrders.length) {
      return store.order.userOrders.find(
        (order) => order.number === numberOrder
      );
    }

    if (store.order.orderModalData?.order) {
      return store.order.orderModalData.order;
    }

    return null;
  };
}
