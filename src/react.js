import { wrapToVdom } from "./utils";
import { Component } from "./Component";
import { REACT_FORWARD_REF_TYPE } from "./constants";

function createElement(type, config, children) {
  let ref;
  let key;
  if (config) {
    delete config.__source;
    delete config.__self;
    ref = config.ref;
    // delete config.ref;
    key = config.ref;
    delete config.key;
  }
  let props = { ...config };
  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
  } else {
    props.children = wrapToVdom(children);
  }
  return {
    type,
    props,
    ref,
    key,
  };
}
function createRef() {
  return { current: null };
}
// function forwardRef(functionComponent) {
//   return class extends Component {
//     render() {
//       return functionComponent(this.props, this.props.ref);
//     }
//   };
// }
function forwardRef(render) {
  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render,
  };
}
function createContext() {
  function Provider({ value, children }) {
    Provider._value = value;
    return children;
  }
  return { Provider };
}
const React = {
  createElement,
  Component,
  createRef,
  forwardRef,
  createContext,
};
export default React;
