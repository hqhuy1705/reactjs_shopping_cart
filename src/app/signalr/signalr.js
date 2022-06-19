import * as signalR from "@microsoft/signalr"

export const getHubConnection = async (hubUrl, callback) => {
  // Builds the SignalR connection, mapping it to hubUrl
  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(hubUrl, {
      withCredentials: false,
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build()

  if (callback) callback(hubConnection)

  await startConnection(hubConnection);

  return hubConnection
}

export const startConnection = async (hubConnection) => {
  // Starts the SignalR connection
  await hubConnection
    .start()
    .then(() => console.log("Connection started!"))
    .catch(err => console.log("Connection Fail" + err))
}
