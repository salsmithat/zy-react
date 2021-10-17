import React from "./react";
import ReactDOM from "./react-dom";

// class MouseTracker extends React.Component {
//   state = {
//     x: 0,
//     y: 0,
//   };
//   handleMouseMove = (event) => {
//     this.setState({
//       x: event.clientX,
//       y: event.clientY,
//     });
//   };
//   render() {
//     return (
//       <div onMouseMove={this.handleMouseMove} style={{ background: "red" }}>
//         {this.props.render(this.state)}
//       </div>
//     );
//   }
// }

// let element = (
//   <MouseTracker>
//     {(props) => (
//       <div>
//         <h1>移动鼠标</h1>
//         <p>
//           当前鼠标位置是x={props.x},y={props.y}
//         </p>
//       </div>
//     )}
//   </MouseTracker>
// );

// let element = (
//   <MouseTracker
//     render={(props) => (
//       <div>
//         <h1>移动鼠标</h1>
//         <p>
//           当前鼠标位置是x={props.x},y={props.y}
//         </p>
//       </div>
//     )}
//   />
// );
function Welcome(props) {
  return (
    <div>
      <h1>移动鼠标</h1>
      <p>
        当前鼠标位置是x={props.x},y={props.y}
      </p>
    </div>
  );
}
function withTracker(OldComponent) {
  return class MouseTracker extends React.Component {
    state = {
      x: 0,
      y: 0,
    };
    handleMouseMove = (event) => {
      this.setState({
        x: event.clientX,
        y: event.clientY,
      });
    };
    render() {
      return (
        <div onMouseMove={this.handleMouseMove} style={{ background: "red" }}>
          <OldComponent {...this.state} />
        </div>
      );
    }
  };
}
let Tracker = withTracker(Welcome);
ReactDOM.render(<Tracker />, document.getElementById("root"));
