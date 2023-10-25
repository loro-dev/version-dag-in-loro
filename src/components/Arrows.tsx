import { ArrowSvg, LineOrientation } from "react-simple-arrows";
import { Change } from "../typed";
import { getEndPointByID, getPointByPeerLamport } from "../model";

const Arrows = ({ changes }: { changes: Change[] }) => {
  return (
    <div>
      {changes.map((c) => {
        const startPoint = getPointByPeerLamport(c.id.peer, c.lamport, true);
        const endPoints = [];
        for (const peer of c.deps.keys()) {
          const point = getEndPointByID([peer, c.deps.get(peer)!]);
          endPoints.push(
            <ArrowSvg
              key={`${startPoint.x}${startPoint.y}${point.x}${point.y}`}
              start={startPoint}
              end={point}
              orientation={LineOrientation.HORIZONTAL}
            />
          );
        }
        return <div key={`${c.id.peer}${c.id.counter}`}>{endPoints}</div>;
      })}
    </div>
  );
};

export default Arrows;
