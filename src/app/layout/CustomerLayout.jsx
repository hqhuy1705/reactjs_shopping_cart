import { Route } from "react-router"
import { Container, Grid } from "semantic-ui-react"
import HeaderGuest from "./../component/HeaderGuest"

const CustomerLayout = ({ children }) => {
  return (
    <div className="layout__default">
      <Grid>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={12}>
          <HeaderGuest></HeaderGuest>
          <Container className="app__content" fluid>
            <Container fluid className="app__content-wrapper">
              {children}
            </Container>
          </Container>
        </Grid.Column>
        <Grid.Column width={2}>
        </Grid.Column>
      </Grid>
    </div>
  )
}

const CustomerLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <CustomerLayout>
          <Component {...props} />
        </CustomerLayout>
      )}
    />
  )
}

export default CustomerLayoutRoute
