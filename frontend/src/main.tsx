import { ChakraProvider } from "@chakra-ui/react"
// import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./components/App"
import { themeConfig } from "./utils/themeConfig"

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ChakraProvider theme={themeConfig}>
      <App />
    </ChakraProvider>
  </Provider>,
  // </React.StrictMode>,
)
