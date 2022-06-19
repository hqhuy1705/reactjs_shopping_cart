import React from "react"
import Router from "./router"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <React.Fragment>
      <Router></Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </React.Fragment>
  )
}

export default App
