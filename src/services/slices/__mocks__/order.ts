import { TNewOrderResponse } from "../../../utils/burger-api";

export const mockOrderResponse: TNewOrderResponse = {
  success: true,
  order: {
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
  name: 'Флюоресцентный люминесцентный бургер'
};

export const mockError = new Error('Order failed');
