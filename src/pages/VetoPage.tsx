import { useNavigate } from "react-router-dom"
import { useMatch } from "./useMatch"
import MapTile from "../components/MapTile"
import Layout from "../layout/Layout"

export default function VetoPage() {
    const { teamA, teamB, matchType, currentTurn, phase, maps, clickMap } = useMatch()
    const nav = useNavigate()
 
    const handleClick = (map: string) => {
        const res = clickMap(map)
        if (res.done) nav("/result")
    }

    return (
        <Layout>
            <div className="max-w-5xl mx-auto p-6 space-y-6">
                <div className="flex flex-col items-center justify-between">
                    <div className="flex flex-row items-center font-bold gap-4">
                        <p className="text-5xl text-yellow-400">{teamA}</p>
                        <p className="text-2xl text-white">vs</p>
                        <p className="text-5xl text-yellow-400">{teamB}</p>
                    </div>
                    <p className="text-2xl text-slate-400">{matchType}</p>
                    <p className="text-4xl text-yellow-400 font-bold tracking-wide">
                        {currentTurn === "A" ? teamA : teamB} </p>
                    <p className="text-2xl text-slate-400 tracking-wide">
                        {phase === "ban" ? "BANINDO:" : "ESCOLHENDO:"}</p>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                    {maps.map(m => (
                        <MapTile key={m.map} map={m.map} status={m.status} onClick={() => handleClick(m.map)} />
                    ))}
                </div>
            </div>
        </Layout>
    )
}
