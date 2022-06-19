import { List } from "semantic-ui-react"
import { generateKey } from "../helper/crypto-helper"
import MenuItem from "./MenuItem"

const MenuItemList = ({ items, editItem, addToCart, deleteItem }) => {
  return (
    <List size={"large"}>
      {items.map(item => (
        <MenuItem
          key={generateKey()}
          item={item}
          editItem={editItem}
          addToCart={addToCart}
          deleteItem={deleteItem}
        ></MenuItem>
      ))}
    </List>
  )
}

export default MenuItemList
