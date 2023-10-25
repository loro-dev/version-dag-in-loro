import { Provider, atom, useAtom, useSetAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import { Change } from "./typed";

export const peer1Changes: Change[] = [
  {
    id: { peer: 1, counter: 0 },
    ops: [
      {
        type: "Insert",
        props: 0,
        value: "Loro",
      },
    ],
    deps: new Map(),
    lamport: 0,
    type: "Text",
    expanded: false,
  },
  {
    id: { peer: 1, counter: 4 },
    ops: [
      {
        type: "Insert",
        props: 1,
        value: "ergonomic",
      },
    ],
    deps: new Map([[2, 0]]),
    lamport: 5,
    type: "List",
    expanded: false,
  },
  {
    id: { peer: 1, counter: 5 },
    ops: [
      {
        type: "Insert",
        props: 1,
        value: "reliable",
      },
    ],
    deps: new Map([
      [1, 4],
      [2, 20],
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
        type: "Insert",
        props: 0,
        value: "fast",
      },
    ],
    deps: new Map([
      [1, 3],
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
        type: "Insert",
        props: 4,
        value: " is a CRDT framework",
      },
    ],
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
        type: "Add",
        props: "Advantage",
        value: "[]",
      },
    ],
    deps: new Map([]),
    lamport: 0,
    type: "Map",
    expanded: false,
  },
  {
    id: { peer: 3, counter: 1 },
    ops: [
      {
        type: "Insert",
        props: 9,
        value: "blazing fast ",
      },
    ],
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
    [1, 6],
    [2, 21],
    [3, 14],
  ]),
];

export const currentVersion = atom(new Map());
export const lamports = [0, 4, 5, 6, 25];
// const lamportAtom = atom<number[]>((get) => {
//   const changes = get(changeAtom);
//   const lamportSet = new Set<number>();
//   changes.forEach((c) => {
//     // const change = get(c);
//     lamportSet.add(c.lamport);
//   });
//   return Array.from(lamportSet).sort();
// });
