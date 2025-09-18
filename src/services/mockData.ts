import {
  TIngredient,
  TConstructorIngredient,
  TOrder,
  TUser
} from '@utils-types';

export const mockBun: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  id: 'bun-1'
};

export const mockIngredient: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  id: 'main-1'
};

export const mockSauce: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  id: 'sauce-1'
};

export const mockIngredientsData: TIngredient[] = [
  mockBun,
  mockIngredient,
  mockSauce
];

export const mockOrderIds: string[] = [
  '643d69a5c3f7b9001cfa093c',
  '643d69a5c3f7b9001cfa0941'
];

export const mockCreateOrderResponse = {
  order: {
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
    _id: '68975947673086001ba82028',
    status: 'done',
    name: 'Краторный био-марсианский бургер',
    createdAt: '2025-08-09T14:20:55.476Z',
    updatedAt: '2025-08-09T14:20:56.333Z',
    number: 86114,
    price: 1679
  },
  name: 'Краторный био-марсианский бургер'
};

export const mockOrderNumber = 86114;

export const mockOrderResponse = {
  orders: [
    {
      _id: '68975947673086001ba82028',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2025-08-09T14:20:55.476Z',
      updatedAt: '2025-08-09T14:20:56.333Z',
      number: 86114
    }
  ]
};

export const mockUserOrders = [
  {
    _id: '68975947673086001ba82028',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
    status: 'done',
    name: 'Краторный био-марсианский бургер',
    createdAt: '2025-08-09T14:20:55.476Z',
    updatedAt: '2025-08-09T14:20:56.333Z',
    number: 86114
  }
];

export const mockFeedsData = {
  orders: mockUserOrders,
  total: 85740,
  totalToday: 77
};

export const mockUserData: TUser = {
  email: 'sedmirvk@mail.ru',
  name: 'Колянчо'
};

export const mockUserRegisterData = {
  email: 'sedmirvk@mail.ru',
  name: 'Колянчо',
  password: 'qwerty11223344'
};

export const mockLoginData = {
  email: 'sedmirvk@mail.ru',
  password: 'qwerty11223344'
};
