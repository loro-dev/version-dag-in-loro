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
      <div className="w-full flex px-2">
        <span>{change.type}</span>
        <div className=" ml-auto">
          ID:{" "}
          <code>
            {change.id.counter}@{change.id.peer}
          </code>
        </div>
      </div>
      <div>
        <span>length: {change.contentLength}</span>
        <span className="ml-4">
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
        <pre>
          <code>{op.value}</code>
        </pre>
      </div>
    </div>
  );
};

export default ChangeNode;
