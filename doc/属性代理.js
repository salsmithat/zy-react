import React from "./react";
import ReactDOM from "./react-dom";

const withLoading = (OldComponent) => {
  return class extends React.Component {
    show = () => {
      let loading = document.getElementById("loading");
      if (!loading) {
        loading = document.createElement("div");
        loading.innerHTML = `<p id='loading' style='position:absolute;top:100px;left:50%;z-index:10;background-color:black;color:white' >loading</p>`;
        document.body.appendChild(loading);
      }
    };
    hide = () => {
      const loading = document.getElementById("loading");
      if (loading) {
        loading.remove();
      }
    };
    render() {
      return <OldComponent {...this.props} show={this.show} hide={this.hide} />;
    }
  };
};
class Page extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.show}>显示</button>
        <button onClick={this.props.hide}>隐藏</button>
      </div>
    );
  }
}
let LoadingPanel = withLoading(Page);
ReactDOM.render(<LoadingPanel />, document.getElementById("root"));
