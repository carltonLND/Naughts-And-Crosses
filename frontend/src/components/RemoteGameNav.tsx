import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Link as ChakraLink,
  Divider,
  Heading,
  VStack,
} from "@chakra-ui/react"
import { Link as ReactRouterLink } from "react-router-dom"

function RemoteGameNav() {
  return (
    <Card userSelect="none">
      <VStack>
        <CardHeader>
          <Heading size="md">Online Play!</Heading>
        </CardHeader>
        <Divider />
        <CardBody>
          <ChakraLink as={ReactRouterLink} to="/remote">
            <Button>Start Game</Button>
          </ChakraLink>
        </CardBody>
      </VStack>
    </Card>
  )
}

export default RemoteGameNav
