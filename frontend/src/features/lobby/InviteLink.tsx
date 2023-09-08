import { Button, Heading, Icon, VStack, useClipboard } from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { AiOutlineCopy } from "react-icons/ai"
import { useAppSelector } from "../../app/hooks"
import { selectLobbyId } from "./lobbySlice"

function InviteLink() {
  const [isCopied, setIsCopied] = useState(false)
  const lobbyId = useAppSelector(selectLobbyId)
  const link = useMemo(
    () => `${window.location.href}?lobby=${lobbyId}`,
    [lobbyId],
  )
  const { onCopy } = useClipboard(link)

  const handleOnClick = () => {
    onCopy()
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 1500)
  }

  return (
    <VStack gap={10} padding={50}>
      <Heading>Invite A Friend</Heading>
      <Button leftIcon={<Icon as={AiOutlineCopy} />} onClick={handleOnClick}>
        {isCopied ? "Link Copied!" : "Copy Link"}
      </Button>
    </VStack>
  )
}

export default InviteLink
