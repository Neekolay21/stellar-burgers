import { TConstructorIngredient, TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorBun: TConstructorIngredient | null;
  constructorIngredients: TConstructorIngredient[];
  orderRequest: boolean;
  price: number;
  orderModalData: { order: TOrder; name: string } | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
