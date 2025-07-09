import { TOrder } from '@utils-types';

export const mockOrders: TOrder[] = [
  {
    "_id": "686e39c85a54df001b6dd547",
    "ingredients": [
      "643d69a5c3f7b9001cfa093e",
      "643d69a5c3f7b9001cfa093d"
    ],
    "status": "done",
    "name": "Флюоресцентный люминесцентный бургер",
    "createdAt": "2025-07-09T09:43:36.795Z",
    "updatedAt": "2025-07-09T09:43:37.570Z",
    "number": 83948
  },
  {
    "_id": "686e38ce5a54df001b6dd546",
    "ingredients": [
      "643d69a5c3f7b9001cfa0941",
      "643d69a5c3f7b9001cfa093e",
      "643d69a5c3f7b9001cfa093d"
    ],
    "status": "done",
    "name": "Флюоресцентный люминесцентный био-марсианский бургер",
    "createdAt": "2025-07-09T09:39:26.741Z",
    "updatedAt": "2025-07-09T09:39:27.577Z",
    "number": 83947
  },
  {
    "_id": "686e30725a54df001b6dd531",
    "ingredients": [
      "643d69a5c3f7b9001cfa093d",
      "643d69a5c3f7b9001cfa0943",
      "643d69a5c3f7b9001cfa093d"
    ],
    "status": "done",
    "name": "Space флюоресцентный бургер",
    "createdAt": "2025-07-09T09:03:46.104Z",
    "updatedAt": "2025-07-09T09:03:46.952Z",
    "number": 83946
  },
];

export const mockFeedResponse = {
  success: true,
  orders: mockOrders,
  total: mockOrders.length,
  totalToday: mockOrders.length
};
