import React from "./react";
import ReactDOM from "./react-dom";

class AntDesignButton extends React.Component {
  state = {
    name: "张三",
  };
  componentWillMount() {
    console.log("button componentWillMount");
  }
  componentDidMount() {
    console.log("button componentDidMount");
  }
  render() {
    console.log("button render");
    return <button name={this.state.name}>{this.props.title}</button>;
  }
}
const wrapper = (OldComponent) => {
  return class extends OldComponent {
    state = { number: 0 };
    componentWillMount() {
      console.log("wrapper componentWillMount");
      super.componentWillMount();
    }
    componentDidMount() {
      console.log("wrapper componentDidMount");
      super.componentDidMount();
    }
    handleClick = () => {
      this.setState({ number: this.state.number + 1 });
    };
    render() {
      console.log("wrapper render");
      let renderElement = super.render();
      let newProps = {
        ...renderElement.props,
        onClick: this.handleClick,
      };
      let cloneElement = React.cloneElement(
        renderElement,
        newProps,
        this.state.number
      );
      return cloneElement;
    }
  };
};
let WrappedAntDesignButton = wrapper(AntDesignButton);
ReactDOM.render(
  <WrappedAntDesignButton title="按钮标题" />,
  document.getElementById("root")
);
