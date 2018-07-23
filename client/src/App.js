import React, { Component } from "react";
import ToolSection from "./components/ToolSection";
import Menu from "./components/Menu";
import { json } from "d3-fetch";
import { nest } from "d3-collection";
import styled from "styled-components";

class App extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
  }

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

  handler(e) {
    e.preventDefault();
    console.log(e);
    // const filteredTools = tools.filter(category => category.hasOwnProperty(e.))
    this.setState({
      tools: []
    });
  }

  render() {
    return (
      <Wrapper>
        <header className="App-header">
          <Menu handler={this.handler} />
        </header>
        {this.state.tools.map(tool => (
          <ToolSection tools={tool.values} category={tool.key} key={tool.key} />
        ))}
      </Wrapper>
    );
  }
}

export default App;
