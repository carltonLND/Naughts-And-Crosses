import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react"
import { useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  selectThisClientName,
  selectThisClientToken,
} from "../lobby/lobbySlice"
import { Cell, Player } from "./gameLogic"
import {
  claimCell,
  newBoard,
  selectBoard,
  selectCurrPlayer,
  selectIsOnline,
  selectWinner,
} from "./gameSlice"

function Game() {
  return (
    <>
      <WinnerModal />
      <VStack gap={10} padding={50}>
        <GameTurnIndicator />
        <GameBoard />
      </VStack>
    </>
  )
}

function GameBoard() {
  const board = useAppSelector(selectBoard)

  return (
    <Box border={"0.1em solid"} padding={0} margin={0}>
      {board.map((row, rowIndex) => (
        <BoardRow key={rowIndex} row={row} />
      ))}
    </Box>
  )
}

function BoardRow({ row }: { row: Cell[] }) {
  return (
    <Flex>
      {row.map((cell, cellIndex) => (
        <BoardCell key={cellIndex} cell={cell} />
      ))}
    </Flex>
  )
}

function BoardCell({ cell }: { cell: Cell }) {
  const dispatch = useAppDispatch()

  const handleOnClick = () => {
    dispatch(claimCell(cell.id))
  }

  return (
    <Center
      width="10em"
      height="10em"
      border={"0.1em solid"}
      userSelect="none"
      onClick={handleOnClick}
    >
      <Heading color={getPlayerColor(cell.ownedBy)}>{cell.ownedBy}</Heading>
    </Center>
  )
}

function WinnerModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const winner = useAppSelector(selectWinner)
  const dispatch = useAppDispatch()

  if (winner != null && isOpen === false) {
    onOpen()
  }

  const handleOnClick = () => {
    dispatch(newBoard())
    onClose()
  }

  const headerContent = useMemo(
    () => (winner === "draw" ? "It's a Draw!" : `Player ${winner} Wins!`),
    [winner],
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding={10}
        gap={5}
      >
        <ModalHeader fontSize="2xl">{headerContent}</ModalHeader>
        <Divider />
        <ModalBody>
          <Button colorScheme="blue" mr={3} onClick={handleOnClick}>
            New Game
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

function GameTurnIndicator() {
  const isOnline = useAppSelector(selectIsOnline)

  const playerToken = isOnline
    ? useAppSelector(selectThisClientToken)
    : useAppSelector(selectCurrPlayer)

  const playerName = isOnline ? useAppSelector(selectThisClientName) : null

  return (
    <Heading>
      <Heading as="span" color={getPlayerColor(playerToken)}>
        {playerName ?? playerToken}
      </Heading>
      's Turn
    </Heading>
  )
}

function getPlayerColor(player: Player | undefined) {
  return player === "X" ? "green" : "red"
}

export default Game
