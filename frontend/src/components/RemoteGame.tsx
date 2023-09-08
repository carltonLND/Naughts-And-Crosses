import { Flex } from "@chakra-ui/react"
import { useEffect, useMemo } from "react"
import { useAppDispatch } from "../app/hooks"
import { configSocket } from "../app/socket"
import Game from "../features/game/Game"
import { setupLobbyController } from "../features/lobby/lobbyHooks"
import Footer from "./Footer"

function RemoteGame() {
  const dispatch = useAppDispatch()

  const socket = useMemo(configSocket, [])

  useEffect(() => {
    socket.connect()

    setupLobbyController(socket, dispatch)
    return () => {
      socket.disconnect()
    }
  }, [])

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

export default RemoteGame
