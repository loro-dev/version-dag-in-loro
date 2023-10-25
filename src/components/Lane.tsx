import { changeMargin, changeWidth } from "../constant";
import { lamports } from "../model";
import { Change } from "../typed";
import ChangeNode from "./Change";

interface LaneProps {
  realID: string;
  peerID: number;
  changes: Change[];
}

const getPositionByLamport = (lamport: number): number => {
  const idx = lamports.indexOf(lamport);
  const x = idx * (changeWidth + 2 * changeMargin);
  return x;
};

const Lane = ({ changes, realID, peerID }: LaneProps) => {
  return (
    <div className="flex w-48 h-28 m-4 " key={peerID}>
      <div className="flex flex-col justify-center">
        <div>
          <span>PeerID</span>:<code>{peerID}</code>
        </div>
        <p>{realID}</p>
      </div>
      <div className="relative">
        {changes.map((c) => {
          return (
            <div
              key={`${c.id.peer}-${c.id.counter}`}
              className={`m-4 absolute`}
              style={{
                left: `${getPositionByLamport(c.lamport)}px`,
                top: "-16px",
              }}
            >
              <ChangeNode change={c} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lane;
