import { Store } from '.';

export interface OuterBaseActions<T> {
  setState: (newState: T, doDigest?: boolean) => void;
  setRef: (newState: T, doDigest?: boolean) => void;
}

export interface InnerBaseActions<T> {
  setState: (store: Store<T, OuterBaseActions<T>>, newState: T, doDigest?: boolean) => void;
  setRef: (store: Store<T, OuterBaseActions<T>>, newState: T, doDigest?: boolean) => void;
}

export const setState = <T>(
  store: Store<T, OuterBaseActions<T>>,
  newState: T,
  doDigest?: boolean
) => {
  store.setState(newState, false, doDigest);
};

export const setRef = <T>(
  store: Store<T, OuterBaseActions<T>>,
  newState: T,
  doDigest?: boolean
) => {
  store.setRef(newState, doDigest);
};

const actions = { setState, setRef };

export default actions;
