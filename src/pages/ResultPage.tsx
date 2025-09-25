import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useMatch } from "./useMatch"
import Layout from "../layout/Layout"

export default function ResultPage() {
    const { teamA, teamB, matchType, picks, decider, maps, reset } = useMatch()
    const nav = useNavigate()

    const bo1 = matchType === "BO1"
    const picked = useMemo(() => maps.filter(m => m.status === "picked").map(m => m.map), [maps])

    const restart = () => { reset(); nav("/setup") }

    return (
        <Layout>
            <div className="max-w-xl mx-auto p-6 space-y-6">
                <h1 className="text-2xl font-bold text-yellow-400">Resultado</h1>
                <div className="space-y-2">
                    <div className="flex flex-row items-center font-bold gap-4">
                        <p className="text-5xl text-yellow-400">{teamA}</p>
                        <p className="text-2xl text-white">vs</p>
                        <p className="text-5xl text-yellow-400">{teamB}</p>
                    </div>
                    {bo1 ? (
                        <div className="p-3 border border-yellow-400">
                            <div className="text-sm text-slate-500">Mapa</div>
                            <div className="text-lg font-bold text-green-400 uppercase">{picked[0]}</div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="p-3 border border-yellow-400">
                                <div className="text-sm text-slate-500 flex flex-row items-center gap-1">
                                    <p className="text-yellow-400 font-bold">
                                        {teamA}
                                    </p>
                                    Pick
                                </div>
                                <div className="text-lg font-bold uppercase text-white">{picks.A[0]}</div>
                            </div>
                            <div className="p-3 border border-yellow-400">
                                <div className="text-sm text-slate-500 flex flex-row items-center gap-1">
                                    <p className="text-yellow-400 font-bold">
                                        {teamB}
                                    </p>
                                    Pick
                                </div>
                                <div className="text-lg font-bold uppercase text-white">{picks.B[0]}</div>
                            </div>
                            <div className="p-3 border border-yellow-400">
                                <div className="text-sm text-slate-500 flex flex-row items-center gap-1">
                                    <p className="text-yellow-400 font-bold">
                                        DECIDER
                                    </p>
                                </div>
                                <div className="text-lg font-bold uppercase text-white"> {decider}</div>
                            </div>
                        </div>
                    )}
                </div>
                <button onClick={restart} className="h-10 px-4 text-white bg-yellow-500 hover:bg-yellow-600">Voltar ao início</button>
            </div>
        </Layout>
    )
}
