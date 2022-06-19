import { AgGridReact } from "ag-grid-react/lib/agGridReact"
import dayjs from "dayjs"
import { forwardRef, useImperativeHandle, useMemo, useState } from "react"
import { Button, Dropdown, Modal } from "semantic-ui-react"
import orderApi from "../../api/order-api"
import { OrderStatus } from "../../helper/constant-helper"

const OrderDetailModal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [orderInfor, setOrderInfor] = useState({})
  const [rowData, setRowData] = useState([])
  const [statusOrder, setstatusOrder] = useState("")
  const [orderId, setOrderId] = useState("")
  const { changeOrderStatus, cancelOrder } = props

  useImperativeHandle(ref, () => ({
    open(orderId) {
      setIsOpen(true)
      setOrderId(orderId)
      orderApi.GetOrder(orderId).then(response => {
        setOrderInfor(response.data)
        setstatusOrder(response.data.status)
        setRowData(response.data.itemsInCart)
      })
    },
  }))

  const columnDefs = useMemo(() => [
    {
      field: "image",
      minWidth: 100,
      width: 100,
      maxWidth: 100,
      fitCell: true,
      cellRenderer: data => {
        return `<img src="data:image/png;base64,${data.value}" width="90px" height="90px">`
      },
    },
    { field: "customerName", minWidth: 100 },
    { field: "itemName" },
    { field: "price" },
    { field: "amount" },
  ])

  const defaultColDef = useMemo(
    () => ({
      resizable: false,
      sortable: true,
    }),
    []
  )

  const options = [
    { key: 0, text: "Confirmed", value: "Confirmed" },
    { key: 1, text: "Sent To Kitchen", value: "Sent To Kitchen" },
    { key: 2, text: "Ready for Pickup", value: "Ready for Pickup" },
    { key: 3, text: "Delivered", value: "Delivered" },
  ]

  const { orderTime, totalPrice, customerId } = orderInfor

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
    >
      <Modal.Header>{`Order #${orderId}`}</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <div className="order-items ag-theme-alpine" style={{ height: 240 }}>
            <AgGridReact
              reactUi="true"
              className="ag-theme-alpine"
              animateRows="true"
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              enableRangeSelection="true"
              rowData={rowData}
              rowSelection="multiple"
              suppressRowClickSelection="true"
            />
          </div>
        </Modal.Description>
      </Modal.Content>
      <div className="ui horizontal divider">Sumary</div>

      <div className="ui grid">
        <div className="three column row">
          <div className="right floated column">
            <a className="item">
              <div className="ui horizontal label">Order Time :</div>
              {dayjs(orderTime).format("MM/DD/YYYY HH:mm")}
            </a>
            <div className="ui horizontal divider" />
            <a className="item">
              <div className="ui horizontal label">
                Total: &nbsp;&nbsp;&nbsp; &nbsp;
              </div>
              {totalPrice} vnđ
            </a>
          </div>
        </div>
      </div>
      <div className="ui horizontal divider" />
      <Modal.Actions>
        <Button color="black" onClick={() => setIsOpen(false)}>
          Close
        </Button>

        {!statusOrder && (
          <Button
            content="Cancel Order"
            labelPosition="left"
            icon="close"
            onClick={() => {
              cancelOrder(orderId, customerId)
              setIsOpen(false)
            }}
            color="red"
          />
        )}

        {statusOrder != OrderStatus.Cancelled && (
          <Button.Group color="teal">
            <Button>Status: {statusOrder}</Button>
            <Dropdown
              className="button icon"
              floating
              options={options}
              onChange={(e, { value }) => {
                setstatusOrder(value)
                changeOrderStatus(orderId, value, customerId)
              }}
              trigger={<></>}
              value={statusOrder}
            />
          </Button.Group>
        )}
      </Modal.Actions>
    </Modal>
  )
})

export default OrderDetailModal
