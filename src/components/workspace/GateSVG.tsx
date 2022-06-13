// gets list of gates objects
// displays gate objects
import React from "react";
import styled from "styled-components";
import AndSVG from "../../data/svgs/and.svg";
import NandSVG from "../../data/svgs/nand.svg";
import OrSVG from "../../data/svgs/or.svg";
import NorSVG from "../../data/svgs/nor.svg";
import XorSVG from "../../data/svgs/xor.svg";
import NotSVG from "../../data/svgs/not.svg";
import { GateType } from "../../global/GateObject";

import { useDrag }  from "react-dnd";

const SVGContainer = styled.svg`
  width: 50px;

  &:hover {
    fill: #55F;
    cursor: pointer;
  }
`;

interface GateSVGProps {
  type: GateType
}

const svgGroups: {[key: string]: JSX.Element} = {
  "and": <AndSVG />,
  "nand": <NandSVG />,
  "or": <OrSVG />,
  "nor": <NorSVG />,
  "xor": <XorSVG />,
  "not": <NotSVG />,
};

export const GateSVG = ({type}: GateSVGProps): JSX.Element => {
  console.log("!!!!");
  const [{isDragging}, drag] = useDrag(() => ({
    type: "svg",
    item: {type},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <div ref={drag}>
      <SVGContainer ref={drag} viewBox="0 0 43 34">
        {svgGroups[type]}
      </SVGContainer>
    </div>
  );
};