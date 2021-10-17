import React from "./react";
import ReactDOM from "./react-dom";

// class SubCounter extends React.PureComponent {
//   render() {
//     console.log("SubCounter render");
//     return <div>{this.props.count}</div>;
//   }
// }
function SubCounter(props) {
  console.log("SubCounter render");
  return <div>{props.count}</div>;
}
let MemoSubCounter = React.memo(SubCounter);
class Counter extends React.Component {
  state = {
    number: 0,
  };
  inputRef = React.createRef();
  handleClick = () => {
    let amount = isNaN(this.inputRef.current.value)
      ? 0
      : Number(this.inputRef.current.value);
    this.setState({ number: this.state.number + amount });
  };
  render() {
    console.log("counter render");
    return (
      <div>
        <p>{this.state.number}</p>
        <input type="text" ref={this.inputRef} />
        <button onClick={this.handleClick}>+</button>
        <MemoSubCounter count={this.state.number} />
      </div>
    );
  }
}
ReactDOM.render(<Counter />, document.getElementById("root"));
