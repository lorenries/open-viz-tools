import React from "react";

class Tool extends React.Component {
  state = {
    repo: ""
  };

  componentDidMount() {
    this.callApi()
      .then(res => {
        console.log(res);
        this.setState({ repo: res.repo });
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch(
      `/api/${this.props.tool.user}/${this.props.tool.repo}`
    );
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <a href={this.props.tool.link} target="_blank" className="tool">
        <div className="tool--container">
          <h1>{this.props.tool.name}</h1>
          <p>{this.props.tool.description}</p>
        </div>
      </a>
    );
  }
}

export default Tool;
