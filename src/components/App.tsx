import { Flex } from "@chakra-ui/react"
import Game from "../features/game/Game"
import Footer from "./Footer"

function App() {
  return (
    <Flex
      height="100vh"
      width="100vw"
      justifyContent="space-between"
      direction="column"
      userSelect="none"
    >
      <Game />
      <Footer />
    </Flex>
  )
}

export default App
