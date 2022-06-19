import { useHistory } from "react-router"
import { useEffect, useState } from "react"
import useToast from "../hook/useToast"
import React from "react"
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
} from "semantic-ui-react"
import { useSelector } from "react-redux"
import shopApi from "./../api/shop-api"
import SectionHeader from "../component/SectionHeader"

const AdminProfile = () => {
  const history = useHistory()
  const { toastSuccess, toastError } = useToast()

  const shopId = useSelector(state => state.SignIn).signInInfor.shopId
  const [shop, setShop] = useState({})
  const [file, setFile] = React.useState(null)

  useEffect(() => {
    shopApi
      .getShopInforById(shopId)
      .then(response => {
        setShop(response.data)
      })
      .catch(error => toastError(error))
  }, [])

  const { image, name, phoneNumber } = shop

  const imgSrc = `data:image/jpeg;base64,${image}`

  const UpdateInformation = () => {
    history.push("/admin")
  }

  const submit = event => {
    const form_data = new FormData(document.getElementById("update-form"))
    shopApi
      .Update(form_data)
      .then(response => {
        toastSuccess("Update shop information successfully")
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

  const labelName = "Shop Name"
  const imageName = "Logo"

  return (
    <>
      <SectionHeader title="Profile"></SectionHeader>
      <Segment raised>
        <Form id="update-form">
          <Grid columns="equal">
            <Grid.Column width={6}>
              <Form.Field>
                <label>{imageName}</label>
                <div className="item" style={{ padding: "5px" }}>
                  <Image
                    rounded
                    fluid
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : image
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
                <label>Phone Number</label>
                <input
                  placeholder="Phone Number"
                  defaultValue={phoneNumber}
                  name="PhoneNumber"
                  readOnly
                />
              </Form.Field>

              <Form.Field>
                <label>New Phone Number</label>
                <input placeholder="New Phone Number" name="NewPhoneNumber" />
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

export default AdminProfile
