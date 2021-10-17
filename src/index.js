import React from "./react";
import ReactDOM from "./react-dom";

class ScrollList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.wrapper = React.createRef();
  }
  addMessage = () => {
    this.setState((state) => ({
      messages: [`${state.messages.length}`, ...state.messages],
    }));
  };
  componentDidMount() {
    this.timer = setInterval(() => {
      this.addMessage();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  getSnapshotBeforeUpdate() {
    return {
      prevScrollTop: this.wrapper.current.scrollTop,
      prevScrollHeight: this.wrapper.current.scrollHeight,
    };
  }
  componentDidUpdate(
    prevProps,
    prevState,
    { prevScrollTop, prevScrollHeight }
  ) {
    this.wrapper.current.scrollTop =
      prevScrollTop + (this.wrapper.current.scrollHeight - prevScrollHeight);
  }
  render() {
    let style = {
      height: "100px",
      width: "200px",
      border: "1px solid   red",
      overflow: "auto",
    };
    return (
      <div style={style} ref={this.wrapper}>
        {this.state.messages.map((message, index) => {
          return <div key={index}>{message}</div>;
        })}
      </div>
    );
  }
}
let element = <ScrollList />;
// console.log(element);
ReactDOM.render(element, document.getElementById("root"));
