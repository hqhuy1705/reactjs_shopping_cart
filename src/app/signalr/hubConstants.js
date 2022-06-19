import { BASE_HUB_URL } from "../environment/environment"

export const HubMethod = {
  NewOrder: "NewOrder",
  CancelOrder: "CancelOrder",
  ChangeOrderStatus: "ChangeOrderStatus",
  SubmitItems: "SubmitItems",
  UnsubmitItems: "UnsubmitItems",
  AddItemToCart: "AddItemToCart",
  RemoveItemFromCart: "RemoveItemFromCart",
  RemovedCustomer: "RemovedCustomer",
  UpdateItemAmount: "UpdateItemAmount",
}

export const HubConnectionUrl = {
  CartHub: `${BASE_HUB_URL}/cart?cart=`,
  ShopHub: `${BASE_HUB_URL}/shop?shop=`,
  OrderHub: `${BASE_HUB_URL}/order?order=`,
}
