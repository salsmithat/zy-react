import React from "./react";
import ReactDOM from "./react-dom";

function Child(props, ref) {
  const ChildRef = React.useRef();
  React.useImperativeHandle(ref, () => {
    return {
      focus() {
        ChildRef.current.focus();
      },
    };
  });
  return <input type="text" ref={ChildRef} />;
}
let ForwardChild = React.forwardRef(Child);
function Parent() {
  let inputRef = React.useRef();
  const getFocus = () => {
    inputRef.current.focus();
    // inputRef.current.remove();
  };
  return (
    <div>
      <ForwardChild ref={inputRef} />
      <button onClick={getFocus}>获得焦点</button>
    </div>
  );
}
ReactDOM.render(<Parent />, document.getElementById("root"));
