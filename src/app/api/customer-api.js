import axiosClient from "./index"

const customerApi = {
  Register(data) {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
    const url = "Customer/register"
    return axiosClient.post(url, data, config)
  },

  Update(data) {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
    const url = "Customer"
    return axiosClient.put(url, data, config)
  },

  Login(data) {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    }
    const url = "Customer/login"
    return axiosClient.post(url, data, config)
  },
}

export default customerApi
