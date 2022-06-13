import { graphql } from "gatsby";
import React from "react";
import { Workspace } from "../components/workspace/Workspace";
import "../scss/global.scss";

interface IndexProps {
  data: GatesQueryData
}

const Index = ({data}: IndexProps ): JSX.Element => {
  return <Workspace data={data}/>;
};
export default Index;

export interface GatesQueryData {
  allGatesJson: {
    edges: [
      {
        node: {
          name: string,
          behavior: {
            equations: string[],
            inputs: number,
            outputs: number
          },
          svg: {
            publicURL: string
          }
        }
      }
    ]
  }
}

export const query = graphql`
query {
  allGatesJson {
    edges {
      node {
        name
        behavior {
          equations
          inputs
          outputs
        }
        svg {
          publicURL
        }
      }
    }
  }
}
`;