import React from "./react";
import ReactDOM from "./react-dom";

function Counter() {
  const [number, setNumber] = React.useState(0);
  React.useEffect(() => {
    console.log("开启一个新的定时器");
    const timer = setInterval(() => {
      setNumber(number + 1);
    }, 1000);
    return () => {
      console.log("清空定时器");
      clearInterval(timer);
    };
  }, [number]);
  return <p>{number}</p>;
}
ReactDOM.render(<Counter />, document.getElementById("root"));
