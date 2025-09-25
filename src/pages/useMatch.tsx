import { useContext } from "react"
import { MatchCtx } from "./match/context"

export function useMatch() {
  const ctx = useContext(MatchCtx)
  if (!ctx) throw new Error("useMatch outside provider")
  return ctx
}
