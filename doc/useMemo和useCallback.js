import React from "./react";
import ReactDOM from "./react-dom";

let lastData;
let MemoChild = React.memo(Child);
function App() {
  console.log("App render");
  const [name, setName] = React.useState("zy");
  const [number, setNumber] = React.useState(0);
  let data = React.useMemo(() => ({ number }), [number]);
  console.log(data === lastData);
  lastData = data;
  let handleClick = React.useCallback(() => setNumber(number + 1), [number]);
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <MemoChild data={data} handleClick={handleClick} />
    </div>
  );
}
function Child({ data, handleClick }) {
  console.log("child render");
  return (
    <div>
      <button onClick={handleClick}>{data.number}</button>
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
