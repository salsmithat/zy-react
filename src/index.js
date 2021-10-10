import React from "./react";
import ReactDOM from "./react-dom";
// import React from "react";
// import ReactDOM from "react-dom";

function Welcome(props) {
  return (
    <h1>
      <span>hello</span>,{props.name}
    </h1>
  );
}
const element = <Welcome name="zy" />;
console.log(element);
ReactDOM.render(element, document.getElementById("root"));
