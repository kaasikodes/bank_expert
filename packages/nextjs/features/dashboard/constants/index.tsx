import { DUMMY_WALLET_CHAIN_DATA } from "./dummy-data";
import { ArbitrumIcon } from "~~/components/assets/ArbitrumIcon";
import { PolygonIcon } from "~~/components/assets/PolygonIcon";
import { SepoliaIcon } from "~~/components/assets/SepoliaIcon";
import { TetherIcon } from "~~/components/assets/TetherIcon";

export const DEFAULT_WALLET_CHAINS = [
  { key: "ETH", name: "ethereum", icon: <SepoliaIcon /> },
  { key: "BSC", name: "tether", icon: <TetherIcon /> },
  { key: "link", name: "chainlink", icon: <ArbitrumIcon /> },
  { key: "Polygon", name: "polygon", icon: <PolygonIcon /> },
];

export { DUMMY_WALLET_CHAIN_DATA };
