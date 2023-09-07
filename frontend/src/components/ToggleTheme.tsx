import { Button, useColorMode } from "@chakra-ui/react"

function ToggleTheme() {
  const { toggleColorMode } = useColorMode()
  return <Button onClick={toggleColorMode}>Toggle Theme</Button>
}

export default ToggleTheme
