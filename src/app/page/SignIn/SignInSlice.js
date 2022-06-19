import { createSlice } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"

const initialState = { isShop: false, signInInfor: {}, cartHubConnection: {} }

const SignInSlice = createSlice({
  name: "SignIn",
  initialState: initialState,
  reducers: {
    setIsShopFlag: (state, action) => {
      state.isShop = action.payload
    },

    setSignInInformation: (state, action) => {
      state.signInInfor = action.payload
    },

    clearStore: state => {
      storage.removeItem("persist:root")
      state = initialState
    },

    setCartHubConnection: (state, action) => {
      state.cartHubConnection = action.payload
    },
  },
})

const { actions, reducer } = SignInSlice
export const {
  setIsShopFlag,
  setSignInInformation,
  clearStore,
  setCartHubConnection,
} = actions

export default reducer
