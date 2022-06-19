import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Image,
  Segment,
} from "semantic-ui-react"
import customerApi from "../api/customer-api"
import useToast from "../hook/useToast"

const CustomerProfile = () => {
  const history = useHistory()
  const { toastSuccess, toastError } = useToast()

  const userInfor = useSelector(state => state.SignIn)
  const { customerId, phoneNumber } = userInfor.signInInfor

  const [customer, setCustomer] = useState({})
  const [file, setFile] = React.useState(null)

  useEffect(() => {
    customerApi
      .Login({ phoneNumber: phoneNumber })
      .then(response => {
        setCustomer(response.data)
      })
      .catch(error => {
        toastError(error)
      })
  }, [])

  const { avatar, name } = customer

  const imgSrc = `data:image/jpeg;base64,${avatar}`

  const UpdateInformation = () => {
    history.push("/shops")
  }

  const submit = event => {
    const form_data = new FormData(document.getElementById("update-form"))
    customerApi
      .Update(form_data)
      .then(response => {
        toastSuccess("Update customer information successfully")
        UpdateInformation()
      })
      .catch(error => {
        if (error.response) {
          toastError(error.response.data)
        }
      })
  }

  const fileHandler = e => {
    setFile(e.target.files[0])
  }

  const labelName = "Customer Name"
  const imageName = "Avatar"

  return (
    <>
      <Header size="medium">Profile</Header>
      <Segment raised>
        <Form id="update-form">
          <Grid columns="equal">
            <Grid.Column width={6}>
              <Form.Field>
                <label>{imageName}</label>
                <div className="item">
                  <Image
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : avatar
                        ? imgSrc
                        : "https://dummyimage.com/900x900/ecf0f1/aaa"
                    }
                    alt={file ? file.name : null}
                  />
                </div>
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={10}>
              <Form.Field>
                <label>{labelName}</label>
                <input
                  placeholder={labelName}
                  name="name"
                  defaultValue={name}
                />
              </Form.Field>

              <Form.Field>
                <input name="customerId" defaultValue={customerId} hidden />
              </Form.Field>

              <Form.Field>
                <label>Phone Number</label>
                <input
                  placeholder="Phone Number"
                  defaultValue={phoneNumber}
                  name="PhoneNumber"
                />
              </Form.Field>

              <Form.Field>
                <Button as="label" htmlFor="file" type="button">
                  Upload {imageName}
                </Button>
                <input
                  type="file"
                  id="file"
                  hidden
                  name={imageName}
                  onChange={fileHandler}
                />
              </Form.Field>

              <Button type="submit" color="green" fluid onClick={submit}>
                Update
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      </Segment>
    </>
  )
}

export default CustomerProfile
