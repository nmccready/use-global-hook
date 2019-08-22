import { Store } from '..';

export interface SomeState {
  a?: string;
}

export interface NestedState {
  a?: string;
  subset?: Subset;
}
export interface NestedOuterActions extends WithSubSetActions {
  setA: (_: string) => void;
}
export interface NestedInnerActions extends WithSubSetInnerActions {
  setA: (_: Store<NestedState, NestedOuterActions>, a: string) => void;
}

export interface Subset {
  b: string;
}

export interface WithSubSetActions {
  subset: SubsetOuterActions;
}

export interface WithSubSetInnerActions {
  subset: SubsetInnerActions;
}
export interface SubsetOuterActions {
  setB: (_: string) => void;
}

export interface SubsetInnerActions {
  setB: (s: Store<NestedState, NestedOuterActions>, _: string) => void;
}

export const subsetActions: NestedInnerActions = {
  setA(store: Store<NestedState, NestedOuterActions>, a: string) {
    store.setState({ a });
  },
  subset: {
    setB(store: Store<NestedState, NestedOuterActions>, b: string) {
      store.setState({ subset: { b } });
    },
  },
};
