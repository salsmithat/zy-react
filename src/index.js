import React from "./react";
import ReactDOM from "./react-dom";

let ThemeContext = React.createContext();
console.log(ThemeContext);
function Header() {
  return (
    <ThemeContext.Consumer>
      {(value) => (
        <div
          style={{
            margin: "10px",
            border: `5px solid ${value.color}`,
            padding: "5px",
          }}
        >
          头部
          <Title />
        </div>
      )}
    </ThemeContext.Consumer>
  );
}
class Title extends React.Component {
  static contextType = ThemeContext;
  render() {
    return (
      <div
        style={{
          margin: "10px",
          border: `5px solid ${this.context.color}`,
          padding: "5px",
        }}
      >
        标题
      </div>
    );
  }
}
class Content extends React.Component {
  static contextType = ThemeContext;
  render() {
    return (
      <div
        style={{
          margin: "10px",
          border: `5px solid ${this.context.color}`,
          padding: "5px",
        }}
      >
        <button
          onClick={() => {
            this.context.changeColor("red");
          }}
        >
          red
        </button>
        <button
          onClick={() => {
            this.context.changeColor("green");
          }}
        >
          greent
        </button>
        <div>内容</div>
      </div>
    );
  }
}
class Main extends React.Component {
  static contextType = ThemeContext;
  render() {
    return (
      <div
        style={{
          margin: "10px",
          border: `5px solid ${this.context.color}`,
          padding: "5px",
        }}
      >
        主体
        <Content />
      </div>
    );
  }
}
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "red" };
  }
  changeColor = (color) => {
    this.setState({ color });
  };
  render() {
    let value = { color: this.state.color, changeColor: this.changeColor };
    return (
      <ThemeContext.Provider value={value}>
        <div
          style={{
            margin: "10px",
            border: `5px solid ${this.state.color}`,
            padding: "5px",
            width: "200px",
          }}
        >
          主页
          <Header />
          <Main />
        </div>
      </ThemeContext.Provider>
    );
  }
}
let element = <Page />;
// console.log(element);
ReactDOM.render(element, document.getElementById("root"));
/**
 * Object
$$typeof: Symbol(react.context)
Consumer: {$$typeof: Symbol(react.context), _context: {…}, _calculateChangedBits: null, …}
Provider: {$$typeof: Symbol(react.provider), _context: {…}}
_calculateChangedBits: null
_currentRenderer: {}
_currentRenderer2: null
_currentValue: undefined
_currentValue2: undefined
_threadCount: 0
[[Prototype]]: Object
 */
