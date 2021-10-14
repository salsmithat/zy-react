import React from "./react";
import ReactDOM from "./react-dom";

class ChildCounter extends React.Component {
  static defaultProps = {
    name: "zy-child",
  };
  componentWillMount() {
    console.log("ChildCounter 1.componentWillMount");
  }
  componentDidMount() {
    console.log("ChildCounter 3.componentDidMount");
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("ChildCounter 4.shouldComponentUpdate");
    return nextProps.count % 3 === 0;
  }
  componentWillReceiveProps() {
    console.log("ChildCounter 5.componentWillReceiveProps");
  }
  componentWillUnmount() {
    console.log("ChildCounter 6.componentWillUnmount");
  }
  render() {
    console.log("ChildCounter 2.render");
    return <div>ChildCounter:{this.props.count}</div>;
  }
}
function FunctionChildCounter(props) {
  return <div>{this.props.count}</div>;
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
    console.log("1.constructor");
  }
  componentWillMount() {
    console.log("2.组件将要挂载");
  }
  componentDidMount() {
    console.log("4.组件挂载完成");
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("5.shouldComponentUpdate");
    return nextState.number % 2 === 0;
  }
  componentWillUpdate() {
    console.log("6.componentWillUpdate");
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
    console.log("3.render");
    return (
      <div>
        <p>
          Counter:
          {this.props.name}
          {this.state.number}
        </p>
        {this.state.number === 4 ? null : (
          <ChildCounter count={this.state.number} />
        )}
        {/* <FunctionChildCounter count={this.state.number} /> */}
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}

let element = <Counter />;
// console.log(element);
ReactDOM.render(element, document.getElementById("root"));
/**
 * 1.constructor
index.js:41 2.组件将要挂载
index.js:62 3.render
index.js:9 ChildCounter 1.componentWillMount
index.js:25 ChildCounter 2.render
index.js:12 ChildCounter 3.componentDidMount
index.js:44 4.组件挂载完成
2index.js:47 5.shouldComponentUpdate
index.js:51 6.componentWillUpdate
index.js:62 3.render
index.js:19 ChildCounter 5.componentWillReceiveProps
index.js:15 ChildCounter 4.shouldComponentUpdate
index.js:54 7.componentDidUpdate
2index.js:47 5.shouldComponentUpdate
index.js:51 6.componentWillUpdate
index.js:62 3.render
index.js:22 ChildCounter 6.componentWillUnmount
index.js:54 7.componentDidUpdate
2index.js:47 5.shouldComponentUpdate
index.js:51 6.componentWillUpdate
index.js:62 3.render
index.js:9 ChildCounter 1.componentWillMount
index.js:25 ChildCounter 2.render
index.js:12 ChildCounter 3.componentDidMount
index.js:54 7.componentDidUpdate
2index.js:47 5.shouldComponentUpdate
index.js:51 6.componentWillUpdate
index.js:62 3.render
index.js:19 ChildCounter 5.componentWillReceiveProps
index.js:15 ChildCounter 4.shouldComponentUpdate
index.js:54 7.componentDidUpdate
2index.js:47 5.shouldComponentUpdate
index.js:51 6.componentWillUpdate
index.js:62 3.render
index.js:19 ChildCounter 5.componentWillReceiveProps
index.js:15 ChildCounter 4.shouldComponentUpdate
index.js:54 7.componentDidUpdate
2index.js:47 5.shouldComponentUpdate
index.js:51 6.componentWillUpdate
index.js:62 3.render
index.js:19 ChildCounter 5.componentWillReceiveProps
index.js:15 ChildCounter 4.shouldComponentUpdate
index.js:25 ChildCounter 2.render
index.js:54 7.componentDidUpdate
 */
