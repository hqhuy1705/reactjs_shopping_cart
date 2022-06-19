import { useState, useEffect } from "react"
import ShopList from "../component/ShopList"
import shopApi from "../api/shop-api"
import useToast from "../hook/useToast"

const Shops = () => {
  const { toastError } = useToast()
  const [shops, setShops] = useState([])

  useEffect(() => {
    shopApi
      .GetAll()
      .then(response => {
        stores = setShops(response.data)
      })
      .catch(error => {
        if (error.response) {
          toastError(error.response.data)
        }
      })
  }, [])

  return (
    <>
      <div className="store-search"></div>
      <div className="store-list">
        {shops && <ShopList shops={shops}></ShopList>}
      </div>
    </>
  )
}

export default Shops
