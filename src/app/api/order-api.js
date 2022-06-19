import axiosClient from "./index"

const orderApi = {
  GetOrder(orderId) {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    }
    const url = `Order/${orderId}`
    return axiosClient.get(url, config)
  },

  GetAllOrdersOfCustomer(customerId) {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    }
    const url = `Order/${customerId}/customer/all`
    return axiosClient.get(url, config)
  },

  GetAllOrdersOfShop(shopId) {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    }
    const url = `Order/${shopId}/shop/all`
    return axiosClient.get(url, config)
  },

  PlacedNewOrder(data) {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    }
    const url = "Order"
    return axiosClient.post(url, data, config)
  },

  CancelOrder(data) {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    }
    const url = "Order/cancel"
    return axiosClient.put(url, data, config)
  },

  ChangeOrderStatus(data) {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    }
    const url = "Order/status"
    return axiosClient.put(url, data, config)
  },

}

export default orderApi
