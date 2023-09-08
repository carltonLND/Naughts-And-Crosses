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

function LocalGameNav() {
  return (
    <Card userSelect="none">
      <VStack>
        <CardHeader>
          <Heading size="md">Local Play!</Heading>
        </CardHeader>
        <Divider />
        <CardBody>
          <ChakraLink as={ReactRouterLink} to="/local">
            <Button>Start Game</Button>
          </ChakraLink>
        </CardBody>
      </VStack>
    </Card>
  )
}

export default LocalGameNav
