import { createContext } from "react"
import type { MatchState } from "./types"

export const MatchCtx = createContext<MatchState | null>(null)
