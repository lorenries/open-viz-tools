import React from "react";
import styled from "styled-components";
import icon from "../assets/github.svg";

const Wrapper = styled.div`
  align-self: start;
  padding: 0 1rem;
  border: 1px solid ${props => props.theme.colors.gray};
  background-color: #fff;
`;

const Title = styled.h1`
  margin: 1rem 0;
  font-size: 1.5rem;
`;

const Description = styled.p`
  margin: 1rem 0;
  line-height: 1.25;
  font-size: 1rem;
`;

const Github = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  color: #555;
  font-size: .875rem;
`;

const GithubIcon = styled.img`
  width: 1rem;
  height: auto;
  padding-right: 0.5rem;
`

const Link = styled.a`
  color: #111;
  text-decoration: none;
  opacity: 1;
  transition: opacity 0.15s ease-in;
  &:hover,
  &:focus {
    opacity: 0.5;
    transition: opacity 0.15s ease-in;
  }
  &:active {
    opacity: 0.5;
    transition: opacity 0.15s ease-out;
  }
`;

class Tool extends React.Component {
  state = {
    lastUpdated: ""
  };

  componentDidMount() {
    this.callApi()
      .then(res => {
        this.setState({ lastUpdated: res.updatedAt });
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
      <Wrapper>
          <Title>
            <Link href={this.props.tool.link} target="_blank" className="tool">
              {this.props.tool.name}
            </Link>
          </Title>
          <Description>{this.props.tool.description}</Description>
          <Github>
            <Link href={'https://github.com' + '/' + this.props.tool.user + '/' + this.props.tool.repo} target="_blank"><GithubIcon src={icon} alt="Github Icon" /></Link>Last Updated: {this.state.lastUpdated}
          </Github>
      </Wrapper>
    );
  }
}

export default Tool;
