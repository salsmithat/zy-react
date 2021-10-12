import React from "./react";
import ReactDOM from "./react-dom";
// import React from "react";
// import ReactDOM from "react-dom";

function Count(props) {
  return <div>{props.count}</div>;
}
class App extends React.Component {
  state = {
    number: 0,
  };
  handleClick = () => {
    this.setState({ number: this.state.number + 1 }, () => {
      console.log("cb1", this.state.number);
    });
    console.log(this.state.number);
    this.setState({ number: this.state.number + 1 }, () => {
      console.log("cb2", this.state.number);
    });
    console.log(this.state.number);
    setTimeout(() => {
      this.setState({ number: this.state.number + 1 });
      console.log(this.state.number);
      this.setState({ number: this.state.number + 1 });
      console.log(this.state.number);
    }, 0);
  };
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
        <Count count={this.state.number} />
      </div>
    );
  }
}
let element = <App />;
// console.log(element);
ReactDOM.render(element, document.getElementById("root"));
