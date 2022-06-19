import { useEffect, useRef, useState } from "react"
import { Button, Image } from "semantic-ui-react"
import ShopMetaLabel from "../ShopMetaLabel"
import { useSelector } from "react-redux"
import shopApi from "../../api/shop-api"
import { useHistory } from "react-router"
import useToast from "../../hook/useToast"

const ShopInformationSideBar = () => {
  const [shop, setShop] = useState({})
  const { toastSuccess, toastError } = useToast()

  const shopId = useSelector(state => state.SignIn).signInInfor.shopId

  useEffect(() => {
    const shopInfor = shopApi
      .getShopInforById(shopId)
      .then(response => {
        setShop(response.data)
      })
      .catch(console.error())
  }, [])

  const { image, name, phoneNumber } = shop

  const link = `${window.location.origin}/shop/${shopId}`

  const imgSrc = `data:image/jpeg;base64,${image}`

  const history = useHistory()

  const viewShopProfile = id => {
    history.push("profile")
  }

  const share = () => {
    navigator.clipboard.writeText(link)
    toastSuccess(`Link share was copied to clipboard: ${link}`)
  }

  return (
    <div className="admin-layout_side-bar">
      <Image
        src={
          image
            ? imgSrc
            : "https://dummyimage.com/900x900/aaaaaa/eeeeee.png&text=Logo+Image"
        }
        fluid
        rounded
        onClick={viewShopProfile}
        target="_blank"
      />

      <ShopMetaLabel icon="home" title="Name" label={name}></ShopMetaLabel>
      <ShopMetaLabel
        icon="phone"
        title="Phone Number"
        label={phoneNumber}
      ></ShopMetaLabel>

      <Button
        basic
        content="Share"
        labelPosition="left"
        icon="share alternate"
        onClick={share}
        color="green"
        style={{ marginTop: 15, width: "100%" }}
      />

      <Button
        basic
        content="Edit Profile"
        labelPosition="left"
        icon="briefcase"
        onClick={viewShopProfile}
        color="blue"
        style={{ marginTop: 15, width: "100%" }}
      />
    </div>
  )
}

export default ShopInformationSideBar
