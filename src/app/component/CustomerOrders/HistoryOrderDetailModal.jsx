import { AgGridReact } from "ag-grid-react/lib/agGridReact"
import dayjs from "dayjs"
import { forwardRef, useImperativeHandle, useMemo, useState } from "react"
import { Button, Dropdown, Image, Modal, Segment } from "semantic-ui-react"
import orderApi from "../../api/order-api"
import { OrderStatus } from "../../helper/constant-helper"
import { formatCurrency } from "./../../helper/common-helper"

const HistoryOrderDetailModal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [orderInfor, setOrderInfor] = useState({})
  const [rowData, setRowData] = useState([])
  const [statusOrder, setstatusOrder] = useState("")
  const [orderId, setOrderId] = useState("")

  useImperativeHandle(ref, () => ({
    open(orderId) {
      setIsOpen(true)
      setOrderId(orderId)
      getOrder(orderId)
    },
    updateOrderStatus(orderId) {
      if (isOpen && orderId) {
        updateOrderStatus(orderId)
      }
    },
  }))

  const getOrder = orderId => {
    orderApi.GetOrder(orderId).then(response => {
      setOrderInfor(response.data)
      setstatusOrder(response.data.status)
      setRowData(response.data.itemsInCart)
    })
  }

  const updateOrderStatus = orderId => {
    orderApi.GetOrder(orderId).then(response => {
      setstatusOrder(response.data.status)
    })
  }

  const columnDefs = useMemo(() => [
    { field: "customerName", width: 200 },
    { field: "itemName", width: 200 },
    {
      field: "price",
      width: 250,
      // cellRenderer: data => {
      //   return data.value ? formatCurrency(data.value) : ""
      // },
    },
    {
      field: "amount",
      // cellRenderer: data => {
      //   return `x ${data.value}`
      // },
    },
  ])

  const defaultColDef = useMemo(
    () => ({
      resizable: false,
      sortable: true,
    }),
    []
  )

  const {
    orderTime,
    totalPrice,
    customerId,
    shopId,
    phoneNumberOfShop,
    shopName,
  } = orderInfor

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
    >
      <Modal.Header>{`Order #${orderId}`}</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <div className="ui ordered steps" style={{ width: "100%" }}>
            <div
              className={
                [
                  OrderStatus.Confirmed,
                  OrderStatus.SentToKitchen,
                  OrderStatus.ReadyforPickup,
                  OrderStatus.Delivered,
                ].includes(statusOrder)
                  ? "completed step"
                  : "active step"
              }
            >
              <div className="content">
                <div className="title">Confirmed</div>
                <div className="description">Order confirmed</div>
              </div>
            </div>
            <div
              className={
                [
                  OrderStatus.SentToKitchen,
                  OrderStatus.ReadyforPickup,
                  OrderStatus.Delivered,
                ].includes(statusOrder)
                  ? "completed step"
                  : "active step"
              }
            >
              <div className="content">
                <div className="title">Sent To Kitchen</div>
                <div className="description">Finished cooking</div>
              </div>
            </div>
            <div
              className={
                [OrderStatus.ReadyforPickup, OrderStatus.Delivered].includes(
                  statusOrder
                )
                  ? "completed step"
                  : "active step"
              }
            >
              <div className="content">
                <div className="title">Ready for Pickup</div>
                <div className="description">Readly to delivered</div>
              </div>
            </div>
            <div
              className={
                [OrderStatus.Delivered].includes(statusOrder)
                  ? "completed step"
                  : "active step"
              }
            >
              <div className="content">
                <div className="title">Delivered</div>
                <div className="description">Delivered complete</div>
              </div>
            </div>
          </div>

          <Segment raised secondary>
            <div
              className="ag-theme-material order-items"
              style={{ height: 240 }}
            >
              <AgGridReact
                reactUi="true"
                className="ag-theme-material"
                animateRows="true"
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                enableRangeSelection="true"
                rowData={rowData}
                rowSelection="multiple"
                suppressRowClickSelection="true"
              />
            </div>
          </Segment>

          <div className="ui horizontal divider">Sumary</div>
          <div className="ui grid">
            <div className="three column row">
              <div className="right floated column">
                <a className="item">
                  <div className="ui horizontal label">Shop Id: </div>
                  {shopId}
                </a>
                <p></p>
                <a className="item">
                  <div className="ui horizontal label">Shop Name:</div>
                  {shopName}
                </a>
                <p></p>
                <a className="item">
                  <div className="ui horizontal label">Shop Phone Number</div>
                  {phoneNumberOfShop}
                </a>
              </div>
              <div className="right floated column">
                <a className="item">
                  <div className="ui horizontal label">Order Time :&nbsp;</div>
                  {dayjs(orderTime).format("MM/DD/YYYY HH:mm")}
                </a>
                <p></p>
                <a className="item">
                  <div className="ui horizontal label">Order Status:</div>
                  {statusOrder}
                </a>
                <p></p>
                <a className="item">
                  <div className="ui horizontal label">
                    Total: &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                  </div>
                  {totalPrice} vnđ
                </a>
              </div>
            </div>
          </div>
        </Modal.Description>
      </Modal.Content>

      <Modal.Actions>
        <Button color="black" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
})

export default HistoryOrderDetailModal
