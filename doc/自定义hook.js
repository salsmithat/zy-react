import React from "react";
import ReactDOM from "react-dom";

function useCounter(initialState) {
  const [number, setNumber] = React.useState(initialState);
  const handleClick = () => {
    setNumber(number + 1);
  };
  return [number, handleClick];
}
function Counter1() {
  let [number, handleClick] = useCounter(100);
  return (
    <div>
      <p>{number}</p>
      <button onClick={handleClick}>+</button>
    </div>
  );
}
function Counter2() {
  let [number, handleClick] = useCounter(200);
  return (
    <div>
      <p>{number}</p>
      <button onClick={handleClick}>+</button>
    </div>
  );
}
function App() {
  return (
    <div>
      <Counter1 />
      <Counter2 />
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
