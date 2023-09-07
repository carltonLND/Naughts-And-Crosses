import { Button, Divider, HStack, Link, VStack } from "@chakra-ui/react"
import { AiOutlineGithub } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { newBoard } from "../features/game/gameSlice"
import { Icon } from "@chakra-ui/react"

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
          <Icon as={AiOutlineGithub} /> GitHub
        </Link>
        <Button onClick={handleOnClick}>Restart Game</Button>
      </HStack>
    </VStack>
  )
}

export default Footer
