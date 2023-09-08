import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import Home from "./Home"
import LocalGame from "./LocalGame"
import RemoteGame from "./RemoteGame"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="local" element={<LocalGame />} />
          <Route path="remote" element={<RemoteGame />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
