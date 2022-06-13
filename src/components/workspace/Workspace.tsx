import React, { useState } from "react";
import styled from "styled-components";
import { ToolBox } from "./ToolBox";
import { SVGCanvas } from "./SVGCanvas";
import { GateDetails, GateObject } from "../../global/GateObject";
import { GatesQueryData } from "../../pages";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect } from "react";

const WorkspaceContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

interface WorkspaceProps {
  data: GatesQueryData
}
export const Workspace = ({data}: WorkspaceProps): JSX.Element => {
  const [gates, setGates] = useState<GateObject[]>([]);
  const details: GateDetails[] = [];
  console.log("WORKSPACE DATA", data);

  const addGate = (gate: GateObject) : void => {
    setGates([...gates, gate]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <WorkspaceContainer>
        <ToolBox addGate={addGate} data={data}/>
        <SVGCanvas gates={gates} />
      </WorkspaceContainer>
    </DndProvider>);
};
