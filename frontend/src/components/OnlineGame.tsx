import { Flex, useDisclosure } from "@chakra-ui/react"
import { useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { configSocket } from "../app/socket"
import Game from "../features/game/Game"
import { newBoard, setIsOnline } from "../features/game/gameSlice"
import CreateLobby from "../features/lobby/CreateLobby"
import InviteLink from "../features/lobby/InviteLink"
import { setupLobbyListeners } from "../features/lobby/lobbyController"
import {
  resetLobby,
  selectClients,
  selectThisClientName,
} from "../features/lobby/lobbySlice"
import Footer from "./Footer"

function OnlineGame() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useAppDispatch()
  const playerName = useAppSelector(selectThisClientName)
  const clients = useAppSelector(selectClients)

  const socket = useMemo(configSocket, [])
  useMemo(() => (playerName === "" ? onOpen() : null), [playerName])
  useMemo(() => dispatch(setIsOnline(true)), [socket])

  useEffect(() => {
    setupLobbyListeners(socket, dispatch)

    socket.connect()
    socket.emit("new lobby", playerName)

    return () => {
      socket.disconnect()
      dispatch(setIsOnline(false))
      dispatch(newBoard())
      dispatch(resetLobby())
    }
  }, [socket])

  return (
    <Flex
      height="100vh"
      width="100vw"
      justifyContent="space-between"
      direction="column"
      userSelect="none"
    >
      <CreateLobby isOpen={isOpen} onClose={onClose} />
      {clients.length === 2 ? <Game /> : <InviteLink />}
      <Footer />
    </Flex>
  )
}

export default OnlineGame
