import { useMemo } from "react"

interface MapTileProps {
  map: string
  status: "free" | "banned" | "picked"
  onClick?: (map: string) => void
}

const MAPS: Record<string, { name: string; img: string }> = {
  dust2: { name: "Dust 2", img: "../src/assets/maps/dust2.png" },
  ancient: { name: "Ancient", img: "../src/assets/maps/ancient.png" },
  mirage: { name: "Mirage", img: "../src/assets/maps/mirage.png" },
  inferno: { name: "Inferno", img: "../src/assets/maps/inferno.png" },
  nuke: { name: "Nuke", img: "../src/assets/maps/nuke.png" },
  overpass: { name: "Overpass", img: "../src/assets/maps/overpass.png" },
  vertigo: { name: "Train", img: "../src/assets/maps/train.png" },
}

const MapTile: React.FC<MapTileProps> = ({ map, status, onClick }) => {
  const meta = useMemo(() => MAPS[map] ?? { name: "Desconhecido", img: "../src/assets/maps/noimage.png" }, [map])

  const border =
    status === "banned"
      ? "border-red-500"
      : status === "picked"
        ? "border-green-500"
        : "border-yellow-400"

  const textBG =
    status === "banned"
      ? "bg-red-500"
      : status === "picked"
        ? "bg-green-500"
        : "bg-yellow-400"

  const cursor =
    status === "banned"
      ? "cursor-not-allowed"
      : "cursor-pointer"

  const shadow =
    status === "picked"
      ? "shadow-[0_0_0_3px_rgba(34,197,94,0.35)]"
      : status === "banned"
        ? "shadow-[0_0_0_3px_rgba(239,68,68,0.25)]"
        : "shadow-[0_6px_18px_rgba(0,0,0,0.15)]"

  const grayscale = status === "banned" ? "grayscale opacity-70" : ""

  return (
    <button
      type="button"
      onClick={() => status !== "banned" && onClick?.(map)}
      aria-label={`${meta.name} ${status === "banned" ? "(banido)" : status === "picked" ? "(escolhido)" : ""}`}
      className={[
        "relative w-[128px] h-[260px] overflow-hidden border-3",
        border,
        shadow,
        cursor,
        "transition-all ease-in-out hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/40",
        status === "banned" ? "hover:scale-100" : ""
      ].join(" ")}
    >
      <img
        src={meta.img}
        alt={meta.name}
        className={["w-full h-5/6 object-cover bg-slate-800", grayscale].join(" ")}
        draggable={false}
      />

      <div className={[
        "w-full h-1/6 flex items-center justify-center uppercase text-sm font-semibold text-white ", textBG
      ].join(" ")}>
        {meta.name}
      </div>

      {status === "banned" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl font-black text-red-500 select-none pointer-events-none">X</span>
        </div>
      )}

      {status === "picked" && (
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-xs font-bold bg-green-500 text-white">
          PICKED
        </div>
      )}
    </button>
  )
}

export default MapTile
