import { EffectCallback, DependencyList, Dispatch, SetStateAction } from 'react';

export type UseEffect = (effect: EffectCallback, deps?: DependencyList) => void;
export type UseState = <S>(initialState?: S | (() => S)) => [S, Dispatch<SetStateAction<S>>];
interface ReactLib {
  useEffect: UseEffect;
  useState: UseState;
}

/* since use-global-hook is not ts yet, might move this to it's index.d.ts file */
export type SetStateFn<T> = (newState: T, isRef?: boolean) => void;

export type SetRefFn<T> = (newState: T) => void;

export type UseCustomFn = (React: ReactLib) => void;

export type AssociateActionsFn = <T, A>(store: Store<T, A>, actions: A) => A;

export type Initializer<T, A> = (_: Store<T, A>) => void;

export type UseStoreFn = <T, InnerA, OuterA>(
  React: ReactLib,
  initialState: T,
  actions: InnerA,
  initializer?: Initializer<T, InnerA>
) => () => [T, OuterA];

export interface Store<T, OuterA> {
  setState: SetStateFn<T>;
  setRef: SetRefFn<T>;
  actions: OuterA;
  state: T;
  listeners: Dispatch<unknown>[];
}

function setState<T, A>(this: Store<T, A>, newState: T, isRef?: boolean): void {
  const listenersLength = this.listeners.length;
  this.state = isRef ? newState : { ...this.state, ...newState };
  for (let i = 0; i < listenersLength; i++) {
    const fn = this.listeners[i];
    if (!fn || typeof fn !== 'function') {
      continue;
    }
    fn(this.state);
  }
}

function setRef<T, A>(this: Store<T, A>, newState: T): void {
  setState.call(this, newState, true);
}

function useCustom<T, A>(this: Store<T, A>, React: ReactLib): [T, A] {
  const newListener = React.useState()[1];
  React.useEffect(() => {
    this.listeners.push(newListener);
    return () => {
      const listenersLength = this.listeners.length;
      const filtered = [];
      for (let i = 0; i < listenersLength; i++) {
        const listener = this.listeners[i];
        if (listener !== newListener) {
          filtered.push(listener);
        }
      }
      /*
      This is dangerous as we could be in the middle of calling setState or setRef.
      setting the listeners should come after the dust has settled.
      Using an immutable store might protect this.
      */
      this.listeners = filtered;
    };
  }, []);
  return [this.state, this.actions];
}

function associateActions<T, InnerA, OuterA>(
  store: Store<T, OuterA>,
  actions: InnerA
): OuterA {
  const associatedActions = {} as OuterA;
  const actionsKeys = Object.keys(actions);
  const actionsKeysLength = actionsKeys.length;
  for (let i = 0; i < actionsKeysLength; i++) {
    const key = actionsKeys[i];
    if (typeof actions[key] === 'function') {
      associatedActions[key] = actions[key].bind(null, store);
    }
    if (typeof actions[key] === 'object') {
      associatedActions[key] = associateActions(store, actions[key]);
    }
  }
  return associatedActions;
}

const useStore = <T, InnerA, OuterA>(
  React: ReactLib,
  initialState: T,
  actions: InnerA,
  initializer?: Initializer<T, OuterA>
) => {
  const store = { state: initialState, listeners: [] } as Store<T, OuterA>;
  store.setState = setState.bind(store);
  store.setRef = setRef.bind(store);
  store.actions = associateActions(store, actions);
  if (initializer) {
    initializer(store);
  }
  return useCustom.bind(store, React);
};

export default useStore;
