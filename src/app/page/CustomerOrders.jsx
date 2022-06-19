import { AgGridReact } from "ag-grid-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { useSelector } from "react-redux"
import orderApi from "../api/order-api"
import { formatDate, formatMoney } from "../helper/common-helper"
import useToast from "../hook/useToast"
import { HubConnectionUrl, HubMethod } from "../signalr/hubConstants"
import { getHubConnection } from "../signalr/signalr"
import HistoryOrderDetailModal from "../component/CustomerOrders/HistoryOrderDetailModal"
import ActionCellRenderer from "../component/AdminOrders/ActionCellRenderer"
import StatusCellRenderer from "../component/AdminOrders/StatusCellRenderer"
import { Header } from "semantic-ui-react"

const CustomerOrders = () => {
  const { toastSuccess, toastError } = useToast()

  const userInfor = useSelector(state => state.SignIn)
  const customerId = userInfor.signInInfor.customerId

  const [rowData, setRowData] = useState([])

  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = () => {
    orderApi
      .GetAllOrdersOfCustomer(customerId)
      .then(response => {
        setRowData(response.data.orders)
      })
      .catch(error => {
        toastError(error)
      })
  }

  const [orderHubConnection, setorderHubConnection] = useState(null)
  const connectOrderHub = orderId => {
    if (!orderHubConnection) {
      const orderHub = `${HubConnectionUrl.OrderHub}${orderId}`
      const hubConnection = getHubConnection(orderHub, orderNotifyHandle)
      setorderHubConnection(hubConnection)
    }
  }

  const orderNotifyHandle = orderHubConnection => {
    orderHubConnection.on(HubMethod.ChangeOrderStatus, response => {
      if (response && response.orderId) {
        updateOrderStatus(response.orderId)
        getOrders()
      }
    })

    orderHubConnection.on(HubMethod.CancelOrder, response => {
      if (response) {
        updateOrderStatus(response)
        getOrders()
      }
    })
  }

  // never changes, so we can use useMemo
  const columnDefs = useMemo(
    () => [
      { headerName: "Shop Name", field: "shopName" },
      { headerName: "Shop Phone", field: "phoneNumberOfShop" },
      {
        headerName: "Total",
        field: "totalPrice",
        cellRenderer: data => {
          return data.value ? formatMoney(data.value) : "0"
        },
      },
      {
        headerName: "Status",
        field: "status",
        cellRenderer: "statusCellRenderer",
      },

      {
        headerName: "Delivery Information",
        field: "deliveryInformation",
        cellRenderer: "statusCellRenderer",
      },

      {
        headerName: "Order Time",
        field: "orderTime",
        sort: "desc",
        width: 250,
        cellRenderer: data => {
          return data.value ? formatDate(new Date(data.value)) : ""
        },
      },
      {
        field: "Action",
        pinned: "right",
        cellRenderer: "actionCellRenderer",
        cellRendererParams(params) {
          return {
            onViewOrder: viewOrder,
            data: {
              id: params.data.orderId,
            },
          }
        },
      },
    ],
    []
  )

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
    }),
    []
  )

  // changes, needs to be state
  const gridHeight = window.innerHeight

  const modalRef = useRef(null)

  const viewOrder = orderId => {
    modalRef.current.open(orderId)
    connectOrderHub(orderId)
  }

  const updateOrderStatus = orderId => {
    modalRef.current.updateOrderStatus(orderId)
  }

  return (
    <>
      <Header size="medium">History Orders</Header>
      <div
        className="ag-theme-material grid-order"
        style={{ height: gridHeight - 150 }}
      >
        <AgGridReact
          reactUi="true"
          className="ag-theme-material"
          animateRows="true"
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowData={rowData}
          frameworkComponents={{
            actionCellRenderer: ActionCellRenderer,
            statusCellRenderer: StatusCellRenderer,
          }}
        />
      </div>
      <HistoryOrderDetailModal ref={modalRef}></HistoryOrderDetailModal>
    </>
  )
}

export default CustomerOrders
