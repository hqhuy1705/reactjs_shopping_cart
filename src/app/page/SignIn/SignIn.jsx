import { useHistory } from "react-router"
import { useState } from "react"
import useToast from "../../hook/useToast"
import {
  Button,
  Image,
  Form,
  Grid,
  Segment,
  Container,
  Divider,
  Label,
  Icon,
  Rail,
} from "semantic-ui-react"
import customerApi from "../../api/customer-api"
import shopApi from "../../api/shop-api"
import { useDispatch } from "react-redux"
import { setIsShopFlag, setSignInInformation } from "./SignInSlice"

const Login = () => {
  const history = useHistory()
  const [isShop, setIsShop] = useState(true)
  const { toastSuccess, toastError } = useToast()

  const signUp = () => {
    history.push("/sign-up")
  }

  const toggleView = () => {
    setIsShop(!isShop)
  }
  const dispatch = useDispatch()

  const submit = () => {
    const form_data = new FormData(document.getElementById("sign-in-form"))
    const data = { phoneNumber: form_data.get("phoneNumber") }

    if (isShop) {
      shopApi
        .Login(data)
        .then(response => {
          toastSuccess("Log in successfully")

          dispatch(setIsShopFlag(true))

          const actionSetShopId = setSignInInformation(response.data)
          dispatch(actionSetShopId)

          history.push("/admin")
        })
        .catch(error => {
          if (error.response) {
            toastError(error.response.data)
          }
        })
    } else {
      customerApi
        .Login(data)
        .then(response => {
          const { customerId } = response.data

          if (customerId != null) {
            toastSuccess("Log in successfully")

            dispatch(setIsShopFlag(false))

            const actionSetShopId = setSignInInformation(response.data)

            dispatch(actionSetShopId)
            history.push("/shops")
          } else {
            toastError("Customer account is not exits")
          }
        })
        .catch(error => {
          if (error.response) {
            toastError(error.response.data)
          }
        })
    }
  }

  const label = isShop ? "Is Customer?" : "Is Shop Owner?"

  return (
    <Container className="auth-form">
      <Image src="/logo/cart-icon.png" centered size="mini" />
      <Grid columns={3} centered>
        <Grid.Column>
          <Segment raised>
            <Label
              as="a"
              basic
              style={{ width: "100%", textAlign: "center" }}
              color="grey"
              onClick={toggleView}
            >
              {label}
            </Label>
            <Divider />

            <Form id="sign-in-form">
              <Form.Field>
                <label>Phone Number</label>
                <input
                  placeholder="Phone Number"
                  name="phoneNumber"
                  required
                  maxLength={10}
                />
              </Form.Field>
              <Button type="submit" color="green" fluid onClick={submit}>
                Submit
              </Button>
            </Form>

            <Divider />
            <Label
              textAlign="center"
              as="a"
              style={{ width: "100%", textAlign: "center" }}
              color="grey"
              onClick={signUp}
            >
              <Icon name="user plus" /> Register now
            </Label>

            <Rail position="left"></Rail>
            <Rail position="right"></Rail>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default Login
