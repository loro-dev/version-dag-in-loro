import Lane from "./Lane";
import VersionView from "./VersionView";
import { allChanges, peer1Changes, peer2Changes, peer3Changes } from "../model";
import Arrows from "./Arrows";
import Frontiers from "./Frontiers";

const Dag = () => {
  return (
    <div className="flex gap-4">
      <VersionView />
      <div>
        <div className="relative">
          <div className="absolute left-36">
            <Arrows changes={allChanges} />
          </div>
          <div className="absolute left-36">
            <Frontiers />
          </div>
        </div>
        <div className="">
          <Lane changes={peer1Changes} realID="31289541689321" peerID={1} />
          <Lane changes={peer2Changes} realID="56732167836821" peerID={2} />
          <Lane changes={peer3Changes} realID="67841763812367" peerID={3} />
        </div>
      </div>
    </div>
  );
};

export default Dag;
