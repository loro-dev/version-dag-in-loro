import { useAtom } from "jotai";
import { currentVersion, frontiers, versions } from "../model";
import { Frontiers, VersionVector } from "../typed";
import { useState } from "react";

const VersionView = () => {
  return (
    <div className="">
      <div>VersionView</div>
      <table className="table-fixed border-separate border-spacing-x-2">
        <thead>
          <tr>
            <th>Frontiers</th>
            <th>VersionVector</th>
          </tr>
        </thead>
        <tbody>
          {frontiers.map((f, i) => {
            return (
              <VersionVectorAndFrontiers
                key={versionToString(versions[i])}
                frontiers={f}
                versionVector={versions[i]}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const VersionVectorAndFrontiers = ({
  frontiers,
  versionVector,
}: {
  frontiers: Frontiers;
  versionVector: VersionVector;
}) => {
  const [_, setVersion] = useAtom(currentVersion);
  const [hover, setHover] = useState(false);
  const bg = hover ? "bg-gray-200" : undefined;
  return (
    <tr
      className={`h-10 ${bg}`}
      onMouseEnter={() => {
        setHover(true);
        setVersion(versionVector);
      }}
      onMouseLeave={() => {
        setHover(false);
        setVersion(versions[versions.length - 1]);
      }}
    >
      <td>{versionToString(frontiers)}</td>
      <td>{versionToString(versionVector)}</td>
    </tr>
  );
};

const versionToString = (v: Map<number, number>): string => {
  let str = "{";
  for (const k of v.keys()) {
    str += `${k}: ${v.get(k)}, `;
  }
  str = str.slice(0, -2);
  str += "}";
  return str;
};

export default VersionView;
