import { Card } from "semantic-ui-react"
import ShopCard from "./ShopCard"

const ShopList = ({ shops }) => {
  return (
    <Card.Group itemsPerRow={4}>
      {shops.map(s => (
        <ShopCard shop={s} key={s.shopId} />
      ))}
    </Card.Group>
  )
}

export default ShopList
