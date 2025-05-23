import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ReactNode } from "react"

type ThemeProviderProps = {
    children: ReactNode
    attribute?: string
    defaultTheme?: string
    enableSystem?: boolean
}

export function ThemeProvider({
    children,
    attribute = "class",
    defaultTheme = "light",
    enableSystem = true,
    ...props
}: ThemeProviderProps) {
    return (
        <NextThemesProvider attribute={attribute as "class" | undefined} defaultTheme={defaultTheme} enableSystem={enableSystem} {...props}>
            {children}
        </NextThemesProvider>
    )
}
