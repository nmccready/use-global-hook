import { Store } from '.';

export interface OuterBaseActions<T> {
  setState: (newState: T) => void;
  setRef: (newState: T) => void;
}

export interface InnerBaseActions<T> {
  setState: (store: Store<T, OuterBaseActions<T>>, newState: T) => void;
  setRef: (store: Store<T, OuterBaseActions<T>>, newState: T) => void;
}

export const setState = <T>(store: Store<T, OuterBaseActions<T>>, newState: T) => {
  store.setState(newState);
};

export const setRef = <T>(store: Store<T, OuterBaseActions<T>>, newState: T) => {
  store.setRef(newState);
};

const actions = { setState, setRef };

export default actions;
