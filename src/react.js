import { shallowEqual, wrapToVdom } from "./utils";
import { Component, PureComponent } from "./Component";
import {
  REACT_CONTEXT,
  REACT_FORWARD_REF_TYPE,
  REACT_MEMO,
  REACT_PROVIDER,
} from "./constants";
import {
  useState,
  useMemo,
  useCallback,
  useReducer,
  useEffect,
} from "./react-dom";

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
    if (typeof children !== "undefined") {
      props.children = wrapToVdom(children);
    }
  }
  return {
    type,
    props,
    ref,
    key,
  };
}
function cloneElement(oldElement, newProps, children) {
  if (arguments.length > 3) {
    children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
  } else {
    children = wrapToVdom(children);
  }
  let props = { ...oldElement.props, ...newProps, children };
  return { ...oldElement, props };
}
function createRef() {
  return { current: null };
}
function forwardRef(render) {
  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render,
  };
}
function createContext() {
  let context = { $$typeof: REACT_CONTEXT };
  context.Provider = {
    $$typeof: REACT_PROVIDER,
    _context: context,
  };
  context.Consumer = {
    $$typeof: REACT_CONTEXT,
    _context: context,
  };
  return context;
}
function memo(type, compare = shallowEqual) {
  return {
    $$typeof: REACT_MEMO,
    type,
    compare,
  };
}
function useContext(context) {
  return context._currentValue;
}
const React = {
  createElement,
  cloneElement,
  Component,
  createRef,
  forwardRef,
  createContext,
  PureComponent,
  memo,
  useState,
  useMemo,
  useCallback,
  useReducer,
  useContext,
  useEffect,
};
export default React;
