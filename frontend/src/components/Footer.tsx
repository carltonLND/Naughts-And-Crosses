import { Button, Divider, HStack, Icon, Link, VStack } from "@chakra-ui/react"
import { AiOutlineGithub } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { newBoard } from "../features/game/gameSlice"
import ToggleTheme from "./ToggleTheme"

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
        <ToggleTheme />
        <Link
          href="https://github.com/carltonLND/noughts-and-crosses"
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
