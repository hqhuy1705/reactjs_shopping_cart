import { useState } from "react"
import { toast } from "react-toastify"

const useToast = (
  initial = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }
) => {
  const [options] = useState(initial)

  const toastSuccess = message => {
    toast.success(message, { ...options })
  }

  const toastError = message => {
    toast.error(message, { ...options })
  }

  const toastWarning = message => {
    toast.warn(message, { ...options })
  }

  const toastDefault = message => {
    toast(message, { ...options })
  }

  const toastInfo = message => {
    toast.info(message, { ...options })
  }

  return { toastSuccess, toastError, toastWarning, toastDefault, toastInfo }
}

export default useToast
