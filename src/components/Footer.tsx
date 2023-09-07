import { Button, Divider, HStack, Link, VStack } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { newBoard } from "../features/game/gameSlice"

function Footer() {
  const dispatch = useDispatch()

  const handleOnClick = () => {
    dispatch(newBoard())
  }

  return (
    <VStack>
      <Divider />
      <HStack
        width="100vw"
        alignItems={"center"}
        justifyContent="space-between"
        padding={5}
      >
        <Link
          href="https://github.com/carltonLND/Naughts-And-Crosses"
          fontSize="2xl"
          isExternal
        >
          GitHub
        </Link>
        <Button onClick={handleOnClick}>Restart Game</Button>
      </HStack>
    </VStack>
  )
}

export default Footer
