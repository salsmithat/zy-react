import React from "./react";
import ReactDOM from "./react-dom";
// import React from "react";
// import ReactDOM from "react-dom";

function TextInput(props, ref) {
  return <input type="text" ref={ref} />;
}
const ForwardedTextInput = React.forwardRef(TextInput);
class Form extends React.Component {
  inputRef;
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  getFormFocus = () => {
    this.inputRef.current.focus();
  };
  render() {
    return (
      <>
        <ForwardedTextInput ref={this.inputRef} />
        <button onClick={this.getFormFocus}>获得焦点</button>
      </>
    );
  }
}

let element = <Form />;
// console.log(element);
ReactDOM.render(element, document.getElementById("root"));
