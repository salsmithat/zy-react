import {
  REACT_CONTEXT,
  REACT_FORWARD_REF_TYPE,
  REACT_MEMO,
  REACT_PROVIDER,
  REACT_TEXT,
} from "./constants";
import { addEvent } from "./event";

function render(vdom, container) {
  let newDom = createDom(vdom);
  container.appendChild(newDom);
  if (newDom.componentDidMount) {
    newDom.componentDidMount();
  }
}
function createDom(vdom) {
  // if (!vdom) {
  //   return document.createDocumentFragment();
  // }
  // if (typeof vdom === "string" || typeof vdom === "number") {
  //   return document.createTextNode(vdom);
  // }
  let { type, props, ref } = vdom;
  let dom;
  if (type && type.$$typeof === REACT_FORWARD_REF_TYPE) {
    return mountForwardComponent(vdom);
  } else if (type && type.$$typeof === REACT_MEMO) {
    return mountMemoComponent(vdom);
  } else if (type && type.$$typeof === REACT_PROVIDER) {
    return mountProviderComponent(vdom);
  } else if (type && type.$$typeof === REACT_CONTEXT) {
    return mountContextComponent(vdom);
  } else if (type === REACT_TEXT) {
    dom = document.createTextNode(props.content);
  } else if (typeof type === "function") {
    if (type.isReactComponent) {
      return mountClassComponent(vdom);
    }
    return mountFunctionComponent(vdom);
  } else if (typeof type === "string") {
    dom = document.createElement(type);
  } else {
    throw new Error("无法处理的元素类型", JSON.stringify(type, null, 2));
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
  if (ref) {
    ref.current = dom;
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
      addEvent(dom, key.toLowerCase(), newProps[key]);
    } else {
      if (newProps[key]) {
        dom[key] = newProps[key];
      }
    }
  }
}
function reconcileChildren(childrenVdom, parentDom) {
  for (let i = 0; i < childrenVdom.length; i++) {
    let childVdom = childrenVdom[i];
    render(childVdom, parentDom);
  }
}
function mountMemoComponent(vdom) {
  let { type, props } = vdom;
  let renderVdom = type.type(props);
  vdom.prevProps = props;
  vdom.oldRenderVdom = renderVdom;
  return createDom(renderVdom);
}
function mountContextComponent(vdom) {
  let { type, props } = vdom;
  let renderVdom = props.children(type._context._currentValue);
  vdom.oldRenderVdom = renderVdom;
  return createDom(renderVdom);
}
function mountProviderComponent(vdom) {
  let { type, props } = vdom;
  type._context._currentValue = props.value;
  let renderVdom = props.children;
  vdom.oldRenderVdom = renderVdom;
  return createDom(renderVdom);
}
function mountForwardComponent(vdom) {
  let { type, props, ref } = vdom;
  let renderVdom = type.render(props, ref);
  vdom.oldRenderVdom = renderVdom;
  return createDom(renderVdom);
}
function mountFunctionComponent(vdom) {
  let { type, props } = vdom;
  let renderVdom = type(props);
  vdom.oldRenderVdom = renderVdom;
  return createDom(renderVdom);
}
function mountClassComponent(vdom) {
  let { type, props, ref } = vdom;
  let defaultProps = type.defaultProps;
  let componentProps = { ...defaultProps, ...props };
  let classInstance = new type(componentProps);
  if (type.contextType) {
    classInstance.context = type.contextType._currentValue;
  }
  vdom.classInstance = classInstance;
  if (classInstance.componentWillMount) {
    classInstance.componentWillMount();
  }
  let renderVdom = classInstance.render();

  vdom.oldRenderVdom = renderVdom;
  classInstance.oldRenderVdom = renderVdom;
  if (ref) {
    ref.current = classInstance;
  }
  let dom = createDom(renderVdom);
  if (classInstance.componentDidMount) {
    dom.componentDidMount = classInstance.componentDidMount.bind(classInstance);
  }
  return dom;
}
export function findDom(vdom) {
  let type = vdom.type;
  let dom;
  if (typeof type === "string" || type === REACT_TEXT) {
    dom = vdom.dom;
  } else {
    dom = findDom(vdom.oldRenderVdom);
  }
  return dom;
}
export function compareTwoVdom(parentDom, oldVdom, newVdom, nextDom) {
  if (!oldVdom && !newVdom) {
  } else if (oldVdom && !newVdom) {
    let currentDom = findDom(oldVdom);
    currentDom.parentNode.removeChild(currentDom);
    if (oldVdom.classInstance && oldVdom.classInstance.componentWillUnmount) {
      oldVdom.classInstance.componentWillUnmount();
    }
  } else if (!oldVdom && newVdom) {
    let newDom = createDom(newVdom);
    if (nextDom) {
      parentDom.insertBefore(newDom, nextDom);
    } else {
      parentDom.appendChild(newDom);
    }
    if (newDom.componentDidMount) {
      newDom.componentDidMount();
    }
  } else if (oldVdom && newVdom && oldVdom.type !== newVdom.type) {
    let oldDom = findDom(oldVdom);
    let newDom = createDom(newVdom);
    oldDom.parentNode.replaceChild(newDom, oldDom);
    if (oldVdom.classInstance && oldVdom.classInstance.componentWillMount) {
      oldVdom.classInstance.componentWillMount();
    }
    if (newDom.componentDidMount) {
      newDom.componentDidMount();
    }
  } else {
    updateElement(oldVdom, newVdom);
  }
}
function updateElement(oldVdom, newVdom) {
  if (oldVdom.type && oldVdom.type.$$typeof === REACT_PROVIDER) {
    updateProviderComponent(oldVdom, newVdom);
  } else if (oldVdom.type && oldVdom.type.$$typeof === REACT_CONTEXT) {
    updateContextComponent(oldVdom, newVdom);
  } else if (oldVdom.type && oldVdom.type.$$typeof === REACT_MEMO) {
    updateMemoComponent(oldVdom, newVdom);
  } else if (oldVdom.type === REACT_TEXT && newVdom.type === REACT_TEXT) {
    let currentDom = (newVdom.dom = findDom(oldVdom));
    if (oldVdom.props.content !== newVdom.props.content) {
      currentDom.textContent = newVdom.props.content;
    }
  } else if (typeof oldVdom.type === "string") {
    let currentDom = (newVdom.dom = findDom(oldVdom));
    updateProps(currentDom, oldVdom.props, newVdom.props);
    updateChildren(currentDom, oldVdom.props.children, newVdom.props.children);
  } else if (typeof oldVdom.type === "function") {
    if (oldVdom.type.isReactComponent) {
      updateClassComponent(oldVdom, newVdom);
    } else {
      updateFunctionComponent(oldVdom, newVdom);
    }
  }
}
function updateMemoComponent(oldVdom, newVdom) {
  let { type, prevProps } = oldVdom;
  if (type.compare(prevProps, newVdom.props)) {
    newVdom.oldRenderVdom = oldVdom.oldRenderVdom;
    newVdom.prevProps = newVdom.props;
  } else {
    let parentDom = findDom(oldVdom).parentNode;
    let { type, props } = newVdom;
    let renderVdom = type.type(props);
    compareTwoVdom(parentDom, oldVdom.oldRenderVdom, renderVdom);
    newVdom.prevProps = props;
    newVdom.oldRenderVdom = renderVdom;
  }
}
function updateProviderComponent(oldVdom, newVdom) {
  let parentDom = findDom(oldVdom).parentNode;
  let { type, props } = newVdom;
  type._context._currentValue = props.value;
  let renderVdom = props.children;
  compareTwoVdom(parentDom, oldVdom.oldRenderVdom, renderVdom);
  newVdom.oldRenderVdom = renderVdom;
}
function updateContextComponent(oldVdom, newVdom) {
  let parentDom = findDom(oldVdom).parentNode;
  let { type, props } = newVdom;
  let renderVdom = props.children(type._context._currentValue);
  compareTwoVdom(parentDom, oldVdom.oldRenderVdom, renderVdom);
  newVdom.oldRenderVdom = renderVdom;
}
function updateFunctionComponent(oldVdom, newVdom) {
  let parentDom = findDom(oldVdom).parentNode;
  let { type, props } = newVdom;
  let renderVdom = type(props);
  compareTwoVdom(parentDom, oldVdom.oldRenderVdom, renderVdom);
  newVdom.oldRenderVdom = renderVdom;
}
function updateClassComponent(oldVdom, newVdom) {
  let classInstance = (newVdom.classInstance = oldVdom.classInstance);
  newVdom.oldRenderVdom = oldVdom.oldRenderVdom;
  if (classInstance.componentWillReceiveProps) {
    classInstance.componentWillReceiveProps();
  }
  classInstance.updater.emitUpdate(newVdom.props);
}
function updateChildren(parentDom, oldVChildren, newVChildren) {
  oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : [oldVChildren];
  newVChildren = Array.isArray(newVChildren) ? newVChildren : [newVChildren];
  let maxLength = Math.max(oldVChildren.length, newVChildren.length);
  for (let i = 0; i < maxLength; i++) {
    let nextVNode = oldVChildren.find(
      (item, index) => index > i && item && findDom(item)
    );
    compareTwoVdom(
      parentDom,
      oldVChildren[i],
      newVChildren[i],
      nextVNode && findDom(nextVNode)
    );
  }
}
const ReactDom = {
  render,
};
export default ReactDom;
