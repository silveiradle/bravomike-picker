import { useMemo, useState } from "react"
import type { MapStatus, MatchState, MatchType, Starter, Phase, Picks } from "./match/types"
import { makeDefaultMaps, withStatus } from "./match/utils"
import { MatchCtx } from "./match/context"

const DEFAULT_MAPS: MapStatus[] = [
  { map: "dust2", status: "free" },
  { map: "ancient", status: "free" },
  { map: "mirage", status: "free" },
  { map: "inferno", status: "free" },
  { map: "nuke", status: "free" },
  { map: "overpass", status: "free" },
  { map: "vertigo", status: "free" },
]

export function MatchProvider({ children }: { children: React.ReactNode }) {
  const [teamA, setTeamA] = useState("")
  const [teamB, setTeamB] = useState("")
  const [matchType, setMatchType] = useState<MatchType | "">("")
  const [starter, setStarter] = useState<Starter>("A")
  const [currentTurn, setCurrentTurn] = useState<"A" | "B">("A")
  const [phase, setPhase] = useState<Phase>("ban")
  const [maps, setMaps] = useState<MapStatus[]>(makeDefaultMaps())
  const [picks, setPicks] = useState<Picks>({ A: [], B: [] })
  const [decider, setDecider] = useState<string | undefined>(undefined)

  const setSetup: MatchState["setSetup"] = ({ teamA, teamB, matchType, starter }) => {
    setTeamA(teamA)
    setTeamB(teamB)
    setMatchType(matchType)
    const s = starter === "RANDOM" ? (Math.random() < 0.5 ? "A" : "B") : starter
    setStarter(s)
    setCurrentTurn(s)
    setPhase("ban")
    setMaps(DEFAULT_MAPS)
    setPicks({ A: [], B: [] })
    setDecider(undefined)
  }

  const toggleTurn = () => setCurrentTurn(t => (t === "A" ? "B" : "A"))

  const clickMap: MatchState["clickMap"] = (map) => {
    const m = maps.find(x => x.map === map)
    if (!m || m.status !== "free") return { done: false }

    if (matchType === "BO1") {
      const newMaps = maps.map(x => (x.map === map ? withStatus(x, "banned") : x))
      const remaining = newMaps.filter(x => x.status === "free")
      if (remaining.length === 1) {
        const last = remaining[0].map
        const finalMaps = newMaps.map(x => (x.map === last ? withStatus(x, "picked") : x))
        setMaps(finalMaps)
        setDecider(last)
        return { done: true }
      }
      setMaps(newMaps)
      toggleTurn()
      return { done: false }
    } else {
      if (phase === "ban") {
        const newMaps = maps.map(x => (x.map === map ? withStatus(x, "banned") : x))
        const bannedCount = newMaps.filter(x => x.status === "banned").length
        const remaining = newMaps.filter(x => x.status === "free")
        if (bannedCount >= 4 && remaining.length === 3) {
          setMaps(newMaps)
          setPhase("pick")
          setCurrentTurn(starter === "RANDOM" ? "A" : starter)
          return { done: false }
        }
        setMaps(newMaps)
        toggleTurn()
        return { done: false }
      } else {
        const newMaps = maps.map(x => (x.map === map ? withStatus(x, "picked") : x))
        const nextPicks: Picks = { A: [...picks.A], B: [...picks.B] }
        if (currentTurn === "A") nextPicks.A.push(map)
        else nextPicks.B.push(map)
        const pickedCount = nextPicks.A.length + nextPicks.B.length
        if (pickedCount >= 2) {
          const remaining = newMaps.find(x => x.status === "free")
          if (remaining) setDecider(remaining.map)
          setMaps(newMaps)
          setPicks(nextPicks)
          return { done: true }
        }
        setMaps(newMaps)
        setPicks(nextPicks)
        toggleTurn()
        return { done: false }
      }
    }
  }


  const reset = () => {
    setTeamA("")
    setTeamB("")
    setMatchType("")
    setStarter("A")
    setCurrentTurn("A")
    setPhase("ban")
    setMaps(DEFAULT_MAPS)
    setPicks({ A: [], B: [] })
    setDecider(undefined)
  }

  const value = useMemo(
    () => ({ teamA, teamB, matchType, starter, currentTurn, phase, maps, picks, decider, setSetup, clickMap, reset }),
    [teamA, teamB, matchType, starter, currentTurn, phase, maps, picks, decider]
  )
  return <MatchCtx.Provider value={value}>{children}</MatchCtx.Provider>
}
