import MenuItemDetailModal from "../component/AdminMenuItems/MenuItemDetailModal"
import MenuItemList from "../component/MenuItemList"
import SectionHeader from "../component/SectionHeader"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import shopApi from "../api/shop-api"
import itemApi from "../api/item-api"
import useToast from "../hook/useToast"

const ViewMenu = () => {
  const [rowData, setRowData] = useState([])
  const modalRef = useRef(null)

  const signInformation = useSelector(state => state.SignIn)
  const { toastError, toastSuccess } = useToast()
  const editItem = id => {
    modalRef.current.open(id)
  }

  const addItem = () => {
    modalRef.current.open()
  }
  const data = { ShopId: signInformation.signInInfor.shopId }
  const deleteItem = id => {
    data.ItemId = id
    itemApi
      .Delete(data)
      .then(response => {
        toastSuccess("Delete success")
        fetchData()
      })
      .catch(error => {
        toastError(error)
      })
  }

  const fetchData = async () => {
    try {
      const response = await shopApi.getShopInforById(
        signInformation.signInInfor.shopId
      )
      setRowData(response.data.items.filter(a => a.isActive))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <SectionHeader
        title="View Menu"
        addItem={() => addItem()}
      ></SectionHeader>
      {rowData && (
        <MenuItemList
          items={rowData}
          editItem={editItem}
          deleteItem={deleteItem}
        ></MenuItemList>
      )}

      <MenuItemDetailModal
        ref={modalRef}
        refreshData={fetchData}
      ></MenuItemDetailModal>
    </>
  )
}

export default ViewMenu
