import { Image, List, Segment } from "semantic-ui-react"

const Footer = () => {
  return (
    <Segment className="footer" inverted vertical textAlign="center">
      <Image centered size="mini" src="/logo/cart-icon.png" />
      <List horizontal inverted divided link size="small">
        <List.Item as="a" href="#">
          Contact Us
        </List.Item>
        <List.Item as="a" href="#">
          Terms and Conditions
        </List.Item>
        <List.Item as="a" href="#">
          Privacy Policy
        </List.Item>
      </List>
    </Segment>
  )
}

export default Footer
