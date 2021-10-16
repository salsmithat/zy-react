import React from "./react";
import ReactDOM from "./react-dom";

class ChildCounter extends React.Component {
  state = {
    count: 0,
  };
  static defaultProps = {
    name: "zy-child",
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    const { count } = nextProps;
    return { ...prevState, count: count * 2 };
  }
  componentDidMount() {
    console.log("ChildCounter 3.componentDidMount");
  }
  componentWillUnmount() {
    console.log("ChildCounter 6.componentWillUnmount");
  }
  render() {
    console.log("ChildCounter 2.render");
    return <div>ChildCounter:{this.state.count}</div>;
  }
}
class Counter extends React.Component {
  static defaultProps = {
    name: "zy",
  };
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
  }
  componentDidMount() {
    console.log("4.组件挂载完成");
  }
  componentDidUpdate() {
    console.log("7.componentDidUpdate");
  }
  handleClick = (event) => {
    this.setState({
      number: this.state.number + 1,
    });
  };
  render() {
    return (
      <div>
        <p>
          Counter:
          {this.props.name}
          {this.state.number}
        </p>
        <ChildCounter count={this.state.number} />
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}

let element = <Counter />;
// console.log(element);
ReactDOM.render(element, document.getElementById("root"));
