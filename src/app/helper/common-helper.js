import numeral from "numeral"
export const dataURIToBlob = dataURI => {
  const byteString = atob(dataURI)

  const mimeString = "image/png"

  const ia = new Uint8Array(byteString.length)

  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i)

  return new Blob([ia], { type: mimeString })
}

export const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

export const formatMoney = value =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value)

export const formatDate = date => {
  const year = date.getFullYear(),
    month = date.getMonth() + 1, // months are zero indexed
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds(),
    hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
    minuteFormatted = minute < 10 ? "0" + minute : minute,
    morning = hour < 12 ? "am" : "pm"

  return (
    month +
    "/" +
    day +
    "/" +
    year +
    " " +
    hourFormatted +
    ":" +
    minuteFormatted +
    morning
  )
}

export const formatCurrency = (value, currency = "đ") => {
  return `${numeral(value).format("0,0")}${currency}`
}

export const formatPercentage = value => {
  return `${numeral(value).format("0,0")}%`
}
