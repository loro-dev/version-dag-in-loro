import { useAtom } from "jotai";
import { currentVersion, versionContainsID } from "../model";
import { Change, Op } from "../typed";

interface ChangeProps {
  change: Change;
}

const ChangeNode = ({ change }: ChangeProps) => {
  const [version] = useAtom(currentVersion);
  const isContain = versionContainsID(version, [
    change.id.peer,
    change.id.counter,
  ]);
  const op = isContain ? "opacity-100" : "opacity-60";
  let bgColor;
  switch (change.type) {
    case "Text":
      bgColor = "bg-amber-600";
      break;
    case "Map":
      bgColor = "bg-red-600";
      break;
    case "List":
      bgColor = "bg-blue-600";
      break;
    case "Tree":
      bgColor = "bg-green-600";
      break;
  }

  return (
    <div className={`w-48 h-28 p-2 ${bgColor} flex flex-col ${op}`}>
      <div className="w-full flex">
        <div>Change</div>
        <div className=" ml-auto">
          ID:{" "}
          <code>
            {change.id.peer}:{change.id.counter}
          </code>
        </div>
      </div>
      <div>
        <span>{change.type}</span>
        <span className="ml-6">
          Lamport : <span>{change.lamport}</span>{" "}
        </span>
        <div>
          {change.ops.map((op) => {
            return <OpView key={`${op.type}${op.props}${op.value}`} op={op} />;
          })}
        </div>
      </div>
    </div>
  );
};

const OpView = ({ op }: { op: Op }) => {
  return (
    <div>
      <code>{op.type}</code>
      <span className="ml-1">{op.props}</span>
      <div>
        <code>{op.value}</code>
      </div>
    </div>
  );
};

export default ChangeNode;
