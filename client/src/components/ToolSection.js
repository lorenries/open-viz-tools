import React from "react";
import Tool from "./Tool";
import styled from "styled-components";

const SectionWrapper = styled.section`
`;

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(1, 1fr);
  @media ${props => props.theme.breakpoints.medium} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${props => props.theme.breakpoints.large} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

class ToolSection extends React.Component {
  render() {
    const tools = this.props.tools;
    const title =
      this.props.category.charAt(0).toUpperCase() +
      this.props.category.substr(1);
    return (
      <SectionWrapper>
        <h1>{title}</h1>
        <GridWrapper>{tools.map(tool => <Tool tool={tool} />)}</GridWrapper>
      </SectionWrapper>
    );
  }
}

export default ToolSection;
