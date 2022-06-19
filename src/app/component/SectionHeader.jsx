import { Breadcrumb, Button, Icon } from "semantic-ui-react"

const SectionHeader = ({ title, addItem }) => {
  return (
    <div className="section-header">
      <Breadcrumb>
        <Breadcrumb.Section>Admin</Breadcrumb.Section>
        <Breadcrumb.Divider icon="angle right" />
        <Breadcrumb.Section active>{title}</Breadcrumb.Section>
      </Breadcrumb>
      {addItem && (
        <Button
          icon
          labelPosition="left"
          className="fl-right"
          onClick={addItem}
          color="green"
          size="mini"
        >
          <Icon name="plus" />
          Add Item
        </Button>
      )}
    </div>
  )
}

export default SectionHeader
