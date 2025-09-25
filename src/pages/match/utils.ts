import type { MapStatus, Status } from "./types";

export function makeDefaultMaps(): MapStatus[] {
  return [
    { map: "dust2", status: "free" },
    { map: "ancient", status: "free" },
    { map: "mirage", status: "free" },
    { map: "inferno", status: "free" },
    { map: "nuke", status: "free" },
    { map: "overpass", status: "free" },
    { map: "vertigo", status: "free" },
  ];
}

export function withStatus(m: MapStatus, s: Status): MapStatus {
  return { ...m, status: s };
}
