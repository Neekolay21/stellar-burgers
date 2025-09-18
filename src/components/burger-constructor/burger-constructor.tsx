import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  closeOrderModal,
  createOrder,
  selectOrderModalData,
  selectOrderRequest
} from '../../services/orderSlice';
import {
  clearConstructor,
  selectConstructorBun,
  selectConstructorIngredients
} from '../../services/constructorSlice';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../services/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorBun = useSelector(selectConstructorBun);
  const constructorIngredients = useSelector(selectConstructorIngredients);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/' } } });
      return;
    }

    if (!constructorBun || orderRequest) return;

    const ingredients = [
      constructorBun._id,
      ...constructorIngredients.map((item) => item._id),
      constructorBun._id
    ];

    dispatch(createOrder(ingredients)).then(() => {
      dispatch(clearConstructor());
    });
  };

  const handleCloseOrderModal = () => {
    dispatch(closeOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorBun ? constructorBun.price * 2 : 0) +
      constructorIngredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorBun, constructorIngredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorBun={constructorBun}
      constructorIngredients={constructorIngredients}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
