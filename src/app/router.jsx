import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Redirect } from "react-router"

import AdminLayout from "./layout/AdminLayout"
import CustomerLayoutRoute from "./layout/CustomerLayout"
import DefaultLayout from "./layout/DefaultLayout"

import NotFound from "./page/404"
import AdminOrders from "./page/AdminOrders"
import AdminMenuItems from "./page/AdminMenuItems"
import Stores from "./page/Shops"
import Store from "./page/Shop"
import SignIn from "./page/SignIn/SignIn"
import SignUp from "./page/SignUp"
import Home from "./page/Home"
import AdminProfile from "./page/AdminProfile"
import CustomerOrders from "./page/CustomerOrders"
import CustomerProfile from "./page/CustomerProfile"

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/admin" exact>
          <Redirect to="/admin/orders" />
        </Route>

        <DefaultLayout exact path="/home" component={Home} />
        <DefaultLayout exact path="/sign-in" component={SignIn} />
        <DefaultLayout exact path="/sign-up" component={SignUp} />

        <AdminLayout exact path="/admin/profile" component={AdminProfile} />
        <AdminLayout exact path="/admin/orders" component={AdminOrders} />
        <AdminLayout
          exact
          path="/admin/menu-items"
          component={AdminMenuItems}
        />

        <CustomerLayoutRoute exact path="/shops" component={Stores} />
        <CustomerLayoutRoute exact path="/shop/:shopId" component={Store} />
        <CustomerLayoutRoute
          path="/Cart/:cartId/:shopId"
          exact
          component={Store}
        />
        <CustomerLayoutRoute exact path="/history" component={CustomerOrders} />
        <CustomerLayoutRoute
          exact
          path="/customer-profile"
          component={CustomerProfile}
        />

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
