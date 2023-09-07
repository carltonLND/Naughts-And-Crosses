import { ThemeConfig, extendTheme } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
}

export const themeConfig = extendTheme({ config })
