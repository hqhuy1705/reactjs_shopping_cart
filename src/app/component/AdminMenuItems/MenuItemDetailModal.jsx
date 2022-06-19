import { Modal, Button, Image, Form, Icon, Label } from "semantic-ui-react"
import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import itemApi from "../../api/item-api"
import { dataURIToBlob } from "../../helper/common-helper"
import { useSelector } from "react-redux"

const MenuItemDetailModal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [menu, setItem] = useState({})
  const [id, setId] = useState(null)
  const inputFileRef = useRef(null)
  const { refreshData } = props

  useImperativeHandle(ref, () => ({
    open(id) {
      setIsOpen(true)

      if (id) {
        setId(id)
        itemApi.GetItemById(id).then(response => {
          setItem(response.data)
        })
      } else {
        setFile(null)
        setItem({})
      }
    },
  }))

  const signInformation = useSelector(state => state.SignIn)
  const [file, setFile] = useState(null)
  const { image, name, price } = menu
  const imgSrc = `data:image/png;base64,${image}`

  const chooseFile = e => {
    setFile(e.target.files[0])
  }

  const SaveItem = () => {
    if (id) {
      const form_data = new FormData(document.getElementById("ItemData"))
      form_data.append("ShopId", signInformation.signInInfor.shopId)
      form_data.append("ItemId", menu.itemId)
      if (!file) {
        form_data.delete("Image")
        form_data.append("Image", dataURIToBlob(image))
      }
      itemApi.UpdateItem(form_data).then(response => {
        refreshData()
      })
    } else {
      const form_data = new FormData(document.getElementById("ItemData"))
      form_data.append("ShopId", signInformation.signInInfor.shopId)
      itemApi.AddItem(form_data).then(response => {
        refreshData()
      })
    }

    setIsOpen(false)
  }

  const requestChooseFile = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current.click()
  }

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
      className="menu-modify-modal"
    >
      <Modal.Header>Modify Menu</Modal.Header>
      <Modal.Content image>
        {menu && (
          <>
            <Image
              rounded
              fluid
              wrapped
              src={
                file
                  ? URL.createObjectURL(file)
                  : image
                  ? imgSrc
                  : "https://dummyimage.com/900x900/ecf0f1/aaa"
              }
              alt={file ? file.name : null}
            />
            <Modal.Description>
              <Form size={"small"} id="ItemData">
                <Form.Field>
                  <label>Name</label>
                  <input placeholder="Name" defaultValue={name} name="Name" />
                </Form.Field>
                <Form.Field>
                  <label>Price</label>
                  <input
                    placeholder="Price"
                    defaultValue={price}
                    name="Price"
                    type="number"
                  />
                </Form.Field>
                <Form.Field>
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={requestChooseFile}
                  >
                    <Button>
                      <Icon name="upload" />
                      Upload File
                    </Button>
                    <Label basic pointing="left">
                      {"Please select image"}
                    </Label>
                  </Button>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    ref={inputFileRef}
                    onChange={chooseFile}
                    accept="image/*"
                    name="Image"
                  />
                </Form.Field>
              </Form>
            </Modal.Description>
          </>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={() => SaveItem()}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
})

export default MenuItemDetailModal
