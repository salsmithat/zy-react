import React from "./react";
import ReactDOM from "./react-dom";
// import React from "react";
// import ReactDOM from "react-dom";

class App extends React.Component {
  render() {
    return (
      <h1 style={{ color: "red" }} className="title">
        <span>hello</span>
        {this.props.name}
      </h1>
    );
  }
}
let element = <App name="zy" />;
console.log(element);
ReactDOM.render(element, document.getElementById("root"));
