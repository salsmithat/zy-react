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
    if (typeof props.children === "object" && props.children.type) {
      render(props.children, dom);
    } else if (Array.isArray(props.children)) {
      reconcileChildren(props.children, dom);
    }
  }
  vdom.dom = dom;
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
  vdom.oldRenderVdom = renderVdom;
  return createDom(renderVdom);
}
function mountClassComponent(vdom) {
  let { type, props } = vdom;
  let classInstance = new type(props);
  let renderVdom = classInstance.render();
  vdom.oldRenderVdom = renderVdom;
  classInstance.oldRenderVdom = renderVdom;
  return createDom(renderVdom);
}
export function findDom(vdom) {
  let { type } = vdom;
  let dom;
  if (typeof type === "function") {
    dom = findDom(vdom.oldRenderVdom);
  } else {
    dom = vdom.dom;
  }
  return dom;
}
export function compareTwoVdom(parentDom, oldVdom, newVdom) {
  let oldDom = findDom(oldVdom);
  let newDom = createDom(newVdom);
  parentDom.replaceChild(newDom, oldDom);
}
const ReactDom = {
  render,
};
export default ReactDom;
