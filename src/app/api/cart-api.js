import axiosClient from "./index"

const cartApi = {
  GetCartById(cartId) {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    }
    const url = `Cart/${cartId}`
    return axiosClient.get(url, config)
  },

  CreateCart(data) {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    }
    const url = "Cart/create"
    return axiosClient.post(url, data, config)
  },

  AddItemToCart(data) {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    }
    const url = "Cart/add/item"
    return axiosClient.post(url, data, config)
  },

  RemoveItemFromCart(data) {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    }
    const url = "Cart/remove/item"
    return axiosClient.post(url, data, config)
  },

  SubmitItemsInCart(data) {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    }
    const url = "Cart/submit"
    return axiosClient.post(url, data, config)
  },

  UnSubmitItemsIncart(data) {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    }
    const url = "Cart/unsubmit"
    return axiosClient.post(url, data, config)
  },

  GetExistCart(data) {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    }
    const url = "Cart/exist/shop/customer"
    return axiosClient.post(url, data, config)
  },

  RemoveCustomerFromCart(data) {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    }
    const url = "Cart/remove/customer"
    return axiosClient.post(url, data, config)
  },
}

export default cartApi
