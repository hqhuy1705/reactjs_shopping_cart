import { Icon, Label } from "semantic-ui-react"
const ShopMetaLabel = ({ title, label, link, icon }) => {
  return (
    <div className="info-field">
      <h5>{title}</h5>
      {link && (
        <Label size={"large"} as="a" href={link}>
          <Icon name={icon} />
          {label}
        </Label>
      )}
      {!link && (
        <Label size={"large"}>
          <Icon name={icon} />
          {label}
        </Label>
      )}
    </div>
  )
}

export default ShopMetaLabel
