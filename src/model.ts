import { atom } from "jotai";
import { Change } from "./typed";
import { changeBaseHeight, changeMargin, changeWidth } from "./constant";

export const peer1Changes: Change[] = [
  {
    id: { peer: 1, counter: 0 },
    ops: [
      {
        type: "Insert at",
        props: 0,
        value: "Loro",
      },
    ],
    contentLength: 4,
    deps: new Map(),
    lamport: 0,
    type: "Text",
    expanded: false,
  },
  {
    id: { peer: 1, counter: 4 },
    ops: [
      {
        type: "Insert at",
        props: 1,
        value: "ergonomic",
      },
    ],
    contentLength: 1,
    deps: new Map([[2, 0]]),
    lamport: 5,
    type: "List",
    expanded: false,
  },
  {
    id: { peer: 1, counter: 5 },
    ops: [
      {
        type: "Insert at",
        props: 1,
        value: "reliable",
      },
    ],
    contentLength: 1,
    deps: new Map([
      [1, 4],
      [2, 1],
      // [2, 20],
    ]),
    lamport: 25,
    type: "List",
    expanded: false,
  },
];

export const peer2Changes: Change[] = [
  {
    id: { peer: 2, counter: 0 },
    ops: [
      {
        type: "Insert at",
        props: 0,
        value: "fast",
      },
    ],
    contentLength: 1,
    deps: new Map([
      [1, 0],
      [3, 0],
    ]),
    lamport: 4,
    type: "List",
    expanded: false,
  },
  {
    id: { peer: 2, counter: 1 },
    ops: [
      {
        type: "Insert at",
        props: 4,
        value: " is a CRDT framework",
      },
    ],
    contentLength: 20,
    deps: new Map([[2, 0]]),
    lamport: 5,
    type: "Text",
    expanded: false,
  },
];

export const peer3Changes: Change[] = [
  {
    id: { peer: 3, counter: 0 },
    ops: [
      {
        type: "Set key",
        props: "Advantage",
        value: "[]",
      },
    ],
    contentLength: 1,
    deps: new Map([]),
    lamport: 0,
    type: "Map",
    expanded: false,
  },
  {
    id: { peer: 3, counter: 1 },
    ops: [
      {
        type: "Insert at",
        props: 9,
        value: "blazing fast ",
      },
    ],
    contentLength: 13,
    deps: new Map([[1, 4]]),
    lamport: 6,
    type: "Text",
    expanded: false,
  },
];

export const frontiers = [
  new Map([[1, 3]]),
  new Map([[3, 0]]),
  new Map([
    [1, 3],
    [3, 0],
  ]),
  new Map([[2, 0]]),
  new Map([[2, 20]]),
  new Map([[1, 4]]),
  new Map([
    [1, 4],
    [2, 20],
  ]),
  new Map([[1, 5]]),
  new Map([[3, 13]]),

  new Map([
    [2, 20],
    [3, 13],
  ]),
  new Map([
    [1, 5],
    [3, 13],
  ]),
];

export const versions = [
  new Map([[1, 4]]),
  new Map([[3, 1]]),
  new Map([
    [1, 4],
    [3, 1],
  ]),
  new Map([
    [1, 4],
    [2, 1],
    [3, 1],
  ]),
  new Map([
    [1, 4],
    [2, 21],
    [3, 1],
  ]),
  new Map([
    [1, 5],
    [2, 1],
    [3, 1],
  ]),
  new Map([
    [1, 5],
    [2, 21],
    [3, 1],
  ]),
  new Map([
    [1, 6],
    [2, 21],
    [3, 1],
  ]),
  new Map([
    [1, 5],
    [2, 1],
    [3, 14],
  ]),
  new Map([
    [1, 5],
    [2, 21],
    [3, 14],
  ]),
  new Map([
    [1, 6],
    [2, 21],
    [3, 14],
  ]),
];

export const allChanges = [...peer1Changes, ...peer2Changes, ...peer3Changes];
export const currentVersion = atom(versions[versions.length - 1]);
export const frontiersLineIdx = atom((get) => {
  const ans = new Map([
    [1, -1],
    [2, -1],
    [3, -1],
  ]);
  const version = get(currentVersion);

  for (const [idx, changes] of [
    peer1Changes,
    peer2Changes,
    peer3Changes,
  ].entries()) {
    if (version.has(idx + 1)) {
      for (const c of changes) {
        if (c.id.counter < version.get(idx + 1)!) {
          ans.set(idx + 1, lamports.indexOf(c.lamport));
        } else {
          break;
        }
      }
    }
  }
  return ans;
});
export const lamports = [0, 4, 5, 6, 25];

export const getPointByPeerLamport = (
  peer: number,
  lamport: number,
  isStart: boolean
): { x: number; y: number } => {
  let x =
    lamports.indexOf(lamport!) * (changeWidth + 2 * changeMargin) +
    changeMargin;
  if (!isStart) {
    x += changeWidth;
  }
  const y =
    (peer - 1) * changeBaseHeight + changeMargin + 0.5 * changeBaseHeight;
  return { x, y };
};

export const getEndPointByID = (id: [number, number]) => {
  let peer = id[0];
  let lamport: any;
  switch (id[0]) {
    case 1:
      lamport = peer1Changes.find((c) => {
        return c.id.counter === id[1];
      })?.lamport!;
      break;
    case 2:
      lamport = peer2Changes.find((c) => {
        return c.id.counter === id[1];
      })?.lamport!;
      break;
    case 3:
      lamport = peer3Changes.find((c) => {
        return c.id.counter === id[1];
      })?.lamport!;
      break;
  }
  console.log(peer, lamport!);

  return getPointByPeerLamport(peer, lamport!, false);
};

export const versionContainsID = (
  version: Map<number, number>,
  id: [number, number]
): boolean => {
  const counter = version.get(id[0])!;
  return counter > id[1];
};
