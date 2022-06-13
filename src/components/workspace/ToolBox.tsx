import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { GateObject, GateBehavior, GateDetails, GateType } from "../../global/GateObject";
import {getTruthTableInputCombinations, evaluateRPN, createRPN} from "../../global/GateUtils";
import { GatesQueryData } from "../../pages";
import { GateSVG } from "./GateSVG";

interface IProps {
  addGate: (gate: GateObject) => void,
  data: GatesQueryData
}

const GatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 50px 30px;
  width: 120px;
  gap: 20px;
  background-color: #F3F3F3;
  border: 1px solid #8c8c8c;
  border-radius: 25px;

  position: absolute;
  left: 20px;
  top: 20px;
`;

const GateItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  fill: #444;

  span {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 700;
    color: #55F;
  }
`;

const loadDefaultGates = (data: GatesQueryData): GateDetails[] => {
  return data.allGatesJson.edges.map(edge => {
    return {
      name: edge.node.name,
      behavior: {
        inputs: edge.node.behavior.inputs,
        outputs: edge.node.behavior.outputs,
        equations: edge.node.behavior.equations,
        ttable:  {}
      },
      type: GateType[edge.node.name.toUpperCase()]
    };
  });
};

const constructTruthTables = (gates: GateDetails[]): GateDetails[] => {
  gates.forEach(gate => {
    const inputCombinations: string[][] = getTruthTableInputCombinations(gate.behavior.inputs);

    inputCombinations.forEach(inputs => {
      const outputs: number[] = [];

      gate.behavior.equations.forEach(eq => {
        inputs.forEach((input, ind) => {
          eq = eq.replace(new RegExp(`\\$${ind + 1}`, "g"), input);
        });
        outputs.push(
          evaluateRPN(
            createRPN(eq)));
      });
      gate.behavior.ttable[inputs.join("")] = outputs;
    });
  });
  return gates;
};

export const ToolBox = ({addGate, data}: IProps): JSX.Element => {
  const [gates, setGates] = useState<GateDetails[]>([]);

  useEffect(() => {
    let tempGates: GateDetails[] = loadDefaultGates(data);
    tempGates = constructTruthTables(tempGates);
    setGates(tempGates);
  }, []);

  const gateComponents: JSX.Element[] = gates.map((gate, ind) => {
    return (
      <GateItem key={ind}>
        <span>{gate.name}</span>
        <GateSVG type={gate.type} />
      </GateItem>);
  });

  return (
    <GatesContainer>
      {gateComponents}
    </GatesContainer>
  );
};