import { Route } from "react-router-dom"
import { Grid, Rail } from "semantic-ui-react"
import ShopInformationSideBar from "../component/AdminLayout/ShopInformationSideBar"
import HeaderAdmin from "./../component/HeaderAdmin"

const AdminLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <div className="admin-layout">
          <HeaderAdmin></HeaderAdmin>
          <Grid>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={11}>
              <Component {...props} />
              <Rail position="left"></Rail>
              <Rail position="right"></Rail>
            </Grid.Column>
            <Grid.Column width={3}>
              <ShopInformationSideBar></ShopInformationSideBar>
            </Grid.Column>
          </Grid>
        </div>
      )}
    />
  )
}

export default AdminLayout
