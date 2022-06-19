import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { Icon, Image, Menu } from "semantic-ui-react"
import { clearStore } from "../page/SignIn/SignInSlice"

const HeaderGuest = () => {
  const history = useHistory()
  const [activeItem] = useState(null)
  const dispatch = useDispatch()

  const signOut = () => {
    dispatch(clearStore())
    history.push("/sign-in")
  }

  return (
    <Menu className="header" pointing secondary widths={5}>
      <Menu.Item
        name="shops"
        active={activeItem === "shops"}
        onClick={() => history.push("/shops")}
      >
        <Icon size={"small"} name="shopping bag" /> Shops
      </Menu.Item>

      <Menu.Item onClick={() => history.push("/history")}>
        <Icon size={"small"} name="history" /> History
      </Menu.Item>

      <Menu.Item
        name="profile"
        active={activeItem === "profile"}
        onClick={() => history.push("/customer-profile")}
      >
        <Icon size={"small"} name="cog" /> Profile
      </Menu.Item>

      <Menu.Item
        name="logoff"
        active={activeItem === "logoff"}
        onClick={() => signOut()}
      >
        <Icon size={"small"} name="log out" /> Sign Out
      </Menu.Item>
    </Menu>
  )
}

export default HeaderGuest
