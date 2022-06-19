import { Button, Grid, Icon, Image, List } from "semantic-ui-react"
import { formatCurrency } from "../helper/common-helper"

const MenuItem = ({ item, editItem, addToCart, deleteItem }) => {
  const { image, name, price, itemId } = item
  return (
    <List.Item className="menu-item">
      <List.Content>
        <Grid>
          <Grid.Column width={4}>
            <Image
              rounded
              src={
                image
                  ? `data:image/jpeg;base64,${image}`
                  : "https://dummyimage.com/900x900/ecf0f1/aaa"
              }
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <List.Header as="a">{name}</List.Header>
            <List.Header style={{ marginTop: "10px" }}>
              {formatCurrency(price)}
            </List.Header>
          </Grid.Column>
          <Grid.Column width={2}>
            <div className="menu-item_actions">
              {editItem && (
                <>
                  <Button
                    icon
                    basic
                    color="blue"
                    onClick={() => editItem(itemId)}
                    title="Modify Item"
                  >
                    <Icon name="pencil" />
                  </Button>
                  <Button
                    icon
                    basic
                    color="red"
                    title="Delete Item"
                    onClick={() => deleteItem(itemId)}
                  >
                    <Icon name="delete" />
                  </Button>
                </>
              )}

              {addToCart && (
                <Button
                  icon
                  color="green"
                  onClick={() => addToCart(itemId)}
                  title="Add to Cart"
                >
                  <Icon name="cart plus" />
                </Button>
              )}
            </div>
          </Grid.Column>
        </Grid>
      </List.Content>
    </List.Item>
  )
}

export default MenuItem
