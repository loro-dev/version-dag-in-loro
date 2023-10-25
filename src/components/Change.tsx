import { Change } from "../typed";

interface ChangeProps {
  change: Change;
}

const ChangeNode = ({ change }: ChangeProps) => {
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
    <div className={`w-48 h-28 p-4 ${bgColor} flex flex-col`}>
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
        <p>Lamport : {change.lamport}</p>
        {/* <p>Timestamp: {change.timestamp}</p> */}
        <div>
          <p>Ops</p>
        </div>
      </div>
    </div>
  );
};

export default ChangeNode;
