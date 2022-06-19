import { Label } from "semantic-ui-react"

const StatusCellRenderer = props => {
  let value = props.value
  let color = null

  switch (value) {
    case "Confirmed":
      color = "orange"
      break
    case "Cancelled":
      color = "grey"
      break
    case "Sent To Kitchen":
      color = "yellow"
      break
    case "Ready for Pickup":
      color = "blue"
      break
    case "Ready for Delivery":
      color = "teal"
      break
    case "Delivered":
      color = "green"
      break
    default:
      color = "black"
      value = "N/A"
      break
  }

  return (
    <Label size={"medium"} color={color}>
      {value}
    </Label>
  )
}

export default StatusCellRenderer
