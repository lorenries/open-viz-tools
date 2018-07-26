import React from "react";
import ToolSection from "./components/ToolSection";
import { json } from "d3-fetch";
import { nest } from "d3-collection";
import styled, { injectGlobal, ThemeProvider } from "styled-components";
import styledNormalize from "styled-normalize";
import theme from "./theme";

injectGlobal`
  ${styledNormalize}
  body {
    color: #111;
    background-color: rgb(250, 250, 250);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
`;

const Wrapper = styled.div`
  max-width: 64rem;
  padding: 1rem;
  margin-left: auto;
  margin-right: auto;
`;

const Description = styled.p`
  font-size: 1rem;
  max-width: 34em;
  line-height: 1.5;
`

class App extends React.Component {
  state = {
    tools: []
  };

  componentDidMount() {
    json(
      "https://lries.s3.amazonaws.com/open-vis-tools/1IaJ9pPnkEVfIvirZacI7ozCM7N713w84Vhlk7xkFkrA"
    ).then(data => {
      const tools = nest()
        .key(function(d) {
          return d.category;
        })
        .entries(data);
      this.setState({ tools: tools });
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <header>
            <h1>Data Viz Tools</h1>
            <Description>An opinionated collection of tools for data visualization, exploration, and analysis. These are mostly things that I've used before and would recommend to other people. It's certainly not comprehensive.</Description>
          </header>
          {this.state.tools.map(tool => (
            <ToolSection
              tools={tool.values}
              category={tool.key}
              key={tool.key}
            />
          ))}
        </Wrapper>
      </ThemeProvider>
    );
  }
}

export default App;
