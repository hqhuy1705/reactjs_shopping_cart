import { Route } from "react-router"
import Header from "../component/DefaultHeader"
import Footer from "../component/Footer"
const Default = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <>
          <Header></Header>
          <Component {...props} />
          <Footer></Footer>
        </>
      )}
    />
  )
}

export default Default
