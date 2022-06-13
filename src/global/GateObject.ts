export interface GateBehavior {
  inputs: number,
  outputs: number,
  equations: string[],
  ttable: {
    [key: string]: number[]
  }
}

export enum GateType {
  AND = "and",
  NAND = "nand",
  OR = "or",
  NOR = "nor",
  XOR = "xor",
  NOT = "not"
}

export interface Position {
  x: number,
  y: number
}

export interface GateDetails {
  name: string,
  behavior: GateBehavior,
  type: GateType
}

export class GateObject {
  details: GateDetails;
  location: Position;

  constructor(location: Position, details: GateDetails) {
    this.details = details;
    this.location = location;
  }

  getName(): string {
    return this.details.name;
  }

  getOutput(input: number[], dimension?: number): number[] | number {
    if(dimension != undefined) {
      return this.details.behavior.ttable[input.join("")][dimension];
    }
    return this.details.behavior.ttable[input.join("")];
  }

  getLocation(): Position {
    return this.location;
  }
}