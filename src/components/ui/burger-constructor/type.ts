import { TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: any;
  orderRequest: boolean;
  price: number;
  orderModalData: { order: TOrder; name: string } | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
