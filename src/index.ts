import { EffectCallback, DependencyList, Dispatch, SetStateAction } from 'react';
import baseActions, { InnerBaseActions, OuterBaseActions } from './actions';

export type UseEffect = (effect: EffectCallback, deps?: DependencyList) => void;
export type UseState = <S>(initialState?: S | (() => S)) => [S, Dispatch<SetStateAction<S>>];
export interface ReactLib {
  useEffect: UseEffect;
  useState: UseState;
}

/* since use-global-hook is not ts yet, might move this to it's index.d.ts file */
export type SetStateFn<T> = (newState: T, isRef?: boolean, doDigest?: boolean) => void;

export type SetRefFn<T> = (newState: T, doDigest?: boolean) => void;

export type UseCustomFn = (React: ReactLib) => void;

export type AssociateActionsFn = <T, A>(store: Store<T, A>, actions: A) => A;

export type Initializer<T, A> = (_: Store<T, A>) => void;

export type InnerAction<T, OuterA, R, A1 = undefined, A2 = undefined, A3 = undefined> = (
  store: Store<T, OuterA>,
  arg1?: A1,
  arg2?: A2,
  arg3?: A3
) => R;

export interface UseStoreProps<
  T,
  InnerA = InnerBaseActions<T>,
  OuterA = OuterBaseActions<T>,
  WorkR = undefined
> {
  React: ReactLib;
  initialState?: T;
  actions?: InnerA | InnerBaseActions<T>;
  initializer?: Initializer<T, OuterA>;
  hookWork?: () => WorkR;
}

export type UseStoreFn = <
  T,
  InnerA = InnerBaseActions<T>,
  OuterA = OuterBaseActions<T>,
  WorkR = undefined
>(
  _: UseStoreProps<T, InnerA, OuterA, WorkR>
) => () => [T, OuterA, ...WorkR[]];

export interface Store<T, OuterA = OuterBaseActions<T>> {
  setState: SetStateFn<T>;
  setRef: SetRefFn<T>;
  actions: OuterA;
  state: T;
  listeners: Dispatch<unknown>[];
  addAction: <NewAction, T, OuterA, R, A1, A2, A3>(
    key: string,
    action: InnerAction<T, OuterA, R, A1, A2, A3>
  ) => NewAction;
}

function setState<T, A>(
  this: Store<T, A>,
  newState: T,
  isRef?: boolean,
  doDigest: boolean = true
): void {
  const listenersLength = this.listeners.length;
  this.state = isRef ? newState : { ...this.state, ...newState };
  if (!doDigest) return;
  for (let i = 0; i < listenersLength; i++) {
    const fn = this.listeners[i];
    if (!fn || typeof fn !== 'function') {
      continue;
    }
    fn(this.state);
  }
}

function setRef<T, A>(this: Store<T, A>, newState: T, doDigest?: boolean): void {
  setState.call(this, newState, true, doDigest);
}

export type HookWork<T = undefined> = () => T;

function useCustom<T, A, WorkR extends WorkR[] = undefined>(
  this: Store<T, A>,
  React: ReactLib,
  hookWork?: HookWork<WorkR>
): [T, A] {
  const newListener = React.useState()[1];
  const oldState = this.state;
  React.useEffect(() => {
    this.listeners.push(newListener);
    if (oldState !== this.state) newListener(this.state);
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
  let workAdditions = [];
  if (hookWork) {
    workAdditions = hookWork() || [];
  }
  return [this.state, this.actions, ...workAdditions] as [T, A];
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
    addAction(store, associatedActions, key, actions[key]);
  }
  return associatedActions;
}

const createAction = <T, OuterA, R, A1 = undefined, A2 = undefined, A3 = undefined>(
  store: Store<T, OuterA>,
  action: InnerAction<T, OuterA, R, A1, A2, A3> | OuterA
) => {
  if (typeof action === 'function') {
    return action.bind(null, store);
  }
  if (typeof action === 'object') {
    return associateActions(store, action);
  }
};

const addAction = <
  NewAction,
  T,
  OuterA,
  InnerA,
  R,
  A1 = undefined,
  A2 = undefined,
  A3 = undefined
>(
  store: Store<T, OuterA>,
  actions: InnerA,
  key: string,
  action: InnerAction<T, OuterA, R, A1, A2, A3>
): NewAction => {
  const boundAction = createAction<T, OuterA, R, A1, A2, A3>(store, action);
  actions[key] = boundAction;
  return boundAction as NewAction;
};

const useStore = <
  T,
  InnerA = InnerBaseActions<T>,
  OuterA = OuterBaseActions<T>,
  WorkR = undefined
>(
  {
    React,
    initialState,
    actions = baseActions,
    initializer,
  }: UseStoreProps<T, InnerA, OuterA, WorkR> = {} as UseStoreProps<T, InnerA, OuterA, WorkR>
): ((_?: HookWork<WorkR>) => [T, OuterA]) => {
  const store = { state: initialState, listeners: [] } as Store<T, OuterA>;
  store.setState = setState.bind(store);
  store.setRef = setRef.bind(store);
  store.actions = associateActions(store, actions);
  store.addAction = addAction.bind(undefined, store, store.actions);

  if (initializer) {
    initializer(store);
  }
  return useCustom.bind(store, React);
};

export default useStore;
