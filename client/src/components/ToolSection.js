import React from "react";
import Tool from "./Tool";

class ToolSection extends React.Component {
  render() {
    const tools = this.props.tools;
    const title =
      this.props.category.charAt(0).toUpperCase() +
      this.props.category.substr(1);
    return (
      <section className="section">
        <h1>{title}</h1>
        <div className="section--container">
          {tools.map(tool => <Tool tool={tool} />)}
        </div>
      </section>
    );
  }
}

export default ToolSection;
