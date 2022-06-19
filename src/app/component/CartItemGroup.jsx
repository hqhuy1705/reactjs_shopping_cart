import { Container, Grid, Header, Segment, Checkbox } from "semantic-ui-react"
import { generateKey } from "../helper/crypto-helper"
import CartItem from "./CartItem"

const CartItemGroup = ({ group, deleteItem }) => {
  const isSubmitted = !group.some(a => !a.readyToOrder)
  return (
    <Segment raised>
      <Header size={"small"}>
        {group[0].customerName}{" "}
        <Checkbox
          style={{ float: "right" }}
          label="Completed"
          checked={isSubmitted}
          readOnly
        />
      </Header>
      <Container>
        <Grid>
          {group &&
            group.map(group => (
              <CartItem
                key={generateKey()}
                item={group}
                deleteItem={deleteItem}
                isSubmitted={isSubmitted}
              ></CartItem>
            ))}
        </Grid>
      </Container>
    </Segment>
  )
}

export default CartItemGroup
