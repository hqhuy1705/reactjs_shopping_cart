import { Container, Image, Menu } from "semantic-ui-react"
import { Link } from "react-router-dom"

const DefaultHeader = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as="a" header to="/home">
          <Image
            size="mini"
            src="/logo/cart-icon.png"
            style={{ marginRight: "1.5em" }}
          />
          Shopping Cart
        </Menu.Item>
        <Menu.Item as={Link} to="/home">
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/sign-in">
          Sign In
        </Menu.Item>
        <Menu.Item as={Link} to="/sign-up">
          Sign Up
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default DefaultHeader
