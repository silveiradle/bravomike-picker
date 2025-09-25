/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useMatch } from "./useMatch"
import Layout from "../layout/Layout"
import type { MatchType } from "./match/types"
import logo from "../assets/logo.png"

export default function SetupPage() {
    const { setSetup } = useMatch()
    const nav = useNavigate()
    const [teamA, setTeamA] = useState("")
    const [teamB, setTeamB] = useState("")
    const [matchType, setMatchType] = useState<MatchType | "">("")
    const [starter, setStarter] = useState<"A" | "B" | "RANDOM">("RANDOM")
    const ready = useMemo(() => teamA.trim() && teamB.trim() && matchType, [teamA, teamB, matchType])

    const start = () => {
        if (!ready) return
        setSetup({ teamA: teamA.trim(), teamB: teamB.trim(), matchType: matchType as MatchType, starter })
        nav("/veto")
    }

    return (
        <Layout>
            <div className="max-w-xl mx-auto p-6 space-y-6">
                <img src={logo} className="h-92 hover:scale-105 transition-transform" />
                <h1 className="text-2xl font-bold text-yellow-400">Configurar Partida</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input value={teamA} onChange={e => setTeamA(e.target.value)} placeholder="Time 1" className="h-10 rounded-lg border px-3 md:col-span-1 text-white bg-slate-900" />
                    <input value={teamB} onChange={e => setTeamB(e.target.value)} placeholder="Time 2" className="h-10 rounded-lg border px-3 md:col-span-1 text-white bg-slate-900" />
                    <select
                        value={matchType}
                        onChange={e => setMatchType(e.target.value as MatchType)}
                        className="h-10 rounded-lg border px-3 md:col-span-1 text-white bg-slate-900"
                    >
                        <option value="" className="text-shadow-neutral-900">Tipo</option>
                        <option value="BO1">MD1</option>
                        <option value="BO3">MD3</option>
                    </select>

                    <select value={starter} onChange={e => setStarter(e.target.value as any)} className="h-10 rounded-lg border px-3 md:col-span-1 text-white bg-slate-900">
                        <option value="RANDOM">Início: Aleatório</option>
                        <option value="A">Iniciar com {teamA}</option>
                        <option value="B">Iniciar com {teamB}</option>
                    </select>
                </div>
                <button onClick={start} disabled={!ready} className={`h-10 px-4 text-white cursor-pointer ${ready ? "bg-yellow-500 hover:bg-yellow-400" : "bg-slate-900 cursor-not-allowed"}`}>Iniciar</button>
            </div>
        </Layout>

    )
}
