import {
  Button,
  Center,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { setClientName } from "./lobbySlice"

interface CreateLobbyProps {
  isOpen: boolean
  onClose: () => void
}

function CreateLobby({ isOpen, onClose }: CreateLobbyProps) {
  const [name, setName] = useState("Player One")
  const dispatch = useAppDispatch()

  const inputRef = useRef(null)

  const handleOnClick = () => {
    if (name === "") return
    dispatch(setClientName(name))
    onClose()
  }

  return (
    <Modal initialFocusRef={inputRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <VStack>
          <ModalHeader>Set Display Name</ModalHeader>
        </VStack>
        <ModalBody pb={6}>
          <VStack gap={5}>
            <Input
              ref={inputRef}
              placeholder="Player One..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={handleOnClick}>Save</Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CreateLobby
