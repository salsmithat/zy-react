import { REACT_TEXT } from "./constants";

function render(vdom, container) {
  let newDom = createDom(vdom);
  container.appendChild(newDom);
}
function createDom(vdom) {
  if (typeof vdom === "string" || typeof vdom === "number") {
    return document.createTextNode(vdom);
  }
  let { type, props } = vdom;
  let dom;
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props.content);
  } else if (typeof type === "function") {
    if (type.isReactComponent) {
      return mountClassComponent(vdom);
    }
    return mountFunctionComponent(vdom);
  } else {
    dom = document.createElement(type);
  }
  if (props) {
    updateProps(dom, {}, props);
    console.log(props.children);
    if (typeof props.children === "object" && props.children.type) {
      render(props.children, dom);
    } else if (Array.isArray(props.children)) {
      reconcileChildren(props.children, dom);
    }
  }
  return dom;
}
function updateProps(dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === "children") {
      continue;
    }
    if (key === "style") {
      let styleObj = newProps[key];
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else if (key.startsWith("on")) {
      dom[key.toLowerCase()] = newProps[key];
    } else {
      dom[key] = newProps[key];
    }
  }
}
function reconcileChildren(childrenVdom, parentDom) {
  for (let i = 0; i < childrenVdom.length; i++) {
    let childVdom = childrenVdom[i];
    render(childVdom, parentDom);
  }
}
function mountFunctionComponent(vdom) {
  let { type, props } = vdom;
  let renderVdom = type(props);
  return createDom(renderVdom);
}
function mountClassComponent(vdom) {
  let { type, props } = vdom;
  let classInstance = new type(props);
  let renderVdom = classInstance.render();
  return createDom(renderVdom);
}
const ReactDom = {
  render,
};
export default ReactDom;
