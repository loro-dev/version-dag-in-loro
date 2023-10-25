import Lane from "./Lane";
import { Change } from "../typed";
import VersionView from "./VersionView";
import { useAtom } from "jotai";
import { peer1Changes, peer2Changes, peer3Changes } from "../model";

const Dag = () => {
  return (
    <div className="flex">
      <VersionView />
      <div>
        <Lane changes={peer1Changes} realID="31289541689321" peerID={1} />
        <Lane changes={peer2Changes} realID="56732167836821" peerID={2} />
        <Lane changes={peer3Changes} realID="67841763812367" peerID={3} />
      </div>
    </div>
  );
};

export default Dag;
