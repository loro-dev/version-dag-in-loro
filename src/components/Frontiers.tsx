import { useAtom } from "jotai";
import { frontiersLineIdx } from "../model";
import { changeBaseHeight, changeMargin, changeWidth } from "../constant";

const getXByIdx = (idx: number): number => {
  return idx === -1 ? 0 : (idx + 1) * (changeWidth + 2 * changeMargin);
};

const getYByPeer = (peer: number): number => {
  return (peer - 1) * (changeBaseHeight + (changeMargin * 2) / 3);
};

const Frontiers = () => {
  const [frontiersIdx] = useAtom(frontiersLineIdx);

  let points = "";

  for (const peer of [1, 2, 3]) {
    const idx = frontiersIdx.get(peer)!;
    const x = getXByIdx(idx);
    const y = getYByPeer(peer);
    points += `${x},${y} `;
    points += `${x},${getYByPeer(peer + 1)} `;
  }

  return (
    <div className="w-[1140px] h-[400px]">
      <svg
        viewBox="0 0 1140 400"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <polyline
          points={points}
          style={{ fill: "none", stroke: "black", strokeWidth: 8 }}
        />
      </svg>
    </div>
  );
};

export default Frontiers;
