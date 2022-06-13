// gets list of gates objects
// displays gate objects
import React from "react";
import styled from "styled-components";
import { GateObject } from "../../global/GateObject";

const SVGCanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  svg {
    width: 100%;
    height: 100%;
  }
`;

interface IProps {
  gates: GateObject[]
}

export const SVGCanvas = ({gates}: IProps): JSX.Element => {
  const list: JSX.Element[] = gates.map((gate, ind) => {
    return (<div key={ind}>h</div>);
  });
  return <SVGCanvasContainer>
    <svg>
      <defs>
        <pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(1) rotate(0)'>
          <rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,1)'/>
          <path d='M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z'  strokeWidth='0.5' stroke='hsla(232, 100%, 77%, 1)' fill='none'/>
        </pattern>
      </defs><rect width='800%' height='800%' transform='translate(-40,-40)' fill='url(#a)'/>
      {list}
    </svg>
  </SVGCanvasContainer>;
};
