export type containerType = "Text" | "Map" | "List" | "Tree";
export type Frontiers = Map<number, number>;
export type VersionVector = Map<number, number>;
export type ID = {
  peer: number;
  counter: number;
};

export interface Op {
  type: string;
  props: string | number;
  value: string;
}

export interface Change {
  id: ID;
  deps: Frontiers;
  lamport: number;
  type: containerType;
  ops: Op[];
  contentLength: number;
  // timestamp: string;
  expanded: boolean;
}

export interface Lane {
  changes: Change[];
}

export interface DagNode {
  id: ID;
  data: any;
}

export interface Dag {
  nodes: DagNode[];
}
