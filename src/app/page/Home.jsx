import React from "react"
import { Container, Header, Image } from "semantic-ui-react"

const Home = () => (
  <Container
    text
    textAlign="center"
    className="main"
    style={{ paddingTop: "5%" }}
  >
    <Header as="h1">Welcome to Shopping Cart</Header>
    <Image src="/cart-logo.png" />
  </Container>
)

export default Home
