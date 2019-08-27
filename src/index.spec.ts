import React, { useEffect } from 'react';
import Promise from 'bluebird';
import 'jest-extended';
import 'jest-expect-message';
import { renderHook, act } from '@testing-library/react-hooks';

import useGlobalHook, { HookWork, Store } from '.';
import {
  SomeState,
  NestedState,
  NestedOuterActions,
  NestedInnerActions,
  subsetActions,
} from './test';

describe('useGlobalHook', () => {
  describe('default actions', () => {
    describe('setState', () => {
      it('works - single listener', () => {
        const useTest = useGlobalHook<SomeState>({ React, initialState: { a: undefined } });
        const { result } = renderHook(() => useTest());

        act(() => {
          result.current[1].setState({ a: 'a' });
        });

        expect(result.current[0].a).toEqual('a');
      });

      it('skip digest', () => {
        const useTest = useGlobalHook<SomeState>({ React, initialState: { a: undefined } });
        const { result } = renderHook(() => useTest());

        act(() => {
          result.current[1].setState({ a: 'a' }, false);
        });

        expect(result.current[0].a).toEqual(undefined);
      });

      it('initializer', () => {
        const initializer = (store: Store<SomeState>) => {
          store.setState({ a: 'a' });
        };
        const useTest = useGlobalHook<SomeState>({
          React,
          initialState: { a: undefined },
          initializer,
        });
        const { result } = renderHook(() => useTest());

        expect(result.current[0].a).toEqual('a');
      });

      it('works - multi listener', () => {
        const useTest = useGlobalHook<SomeState>({ React, initialState: { a: undefined } });
        const { result } = renderHook(() => useTest());
        const { result: result2 } = renderHook(() => useTest());

        act(() => {
          result.current[1].setState({ a: 'a' });
        });

        expect(result.current[0].a).toEqual('a');
        expect(result2.current[0].a).toEqual('a');
      });

      it('works - multi destroy chase -- continue', () => {
        const useTest = useGlobalHook<SomeState>({ React, initialState: { a: undefined } });
        const { unmount } = renderHook(() => useTest());
        const promiseFns = [];
        for (let i; i < 20; i++) {
          promiseFns.push(() =>
            Promise.resolve(
              renderHook(() => {
                const hook = useTest();
                if (i === 10) {
                  // TODO: somehow produce the race condition
                  // TODO which will hit continue in setState
                  // attempt to call setState while listeners are being added
                  hook[1].setState({ a: 'b' });
                }
                return hook;
              })
            )
          );
        }

        const race = Promise.map(promiseFns, (fn) => fn());

        const promise = Promise.join(
          race,
          // @ts-ignore
          Promise.delay(10).then(() => {
            unmount();
          })
        );

        const { result: result2 } = renderHook(() => useTest());

        act(() => {
          result2.current[1].setState({ a: 'a' });
        });
        return promise.then(() => {
          expect(result2.current[0].a).toEqual('a');
        });
      });
    });

    describe('setRef', () => {
      it('works', () => {
        const useTest = useGlobalHook<SomeState>({ React, initialState: { a: undefined } });
        const { result } = renderHook(() => useTest());
        const ref = { a: 'a' };

        act(() => {
          result.current[1].setRef(ref);
        });

        expect(result.current[0], 'checks for reference not deep equal').toBe(ref);
      });

      it('skip digest', () => {
        const useTest = useGlobalHook<SomeState>({ React, initialState: { a: undefined } });
        const { result } = renderHook(() => useTest());

        act(() => {
          result.current[1].setRef({ a: 'a' }, false);
        });

        expect(result.current[0].a).toEqual(undefined);
      });
    });

    describe('hookWork', () => {
      it('does not complain for ts typing', () => {
        useGlobalHook<SomeState>({ React });
      });

      it('hookWork is called', () => {
        const useTest = useGlobalHook<SomeState>({ React });

        const hookWork = jest.fn();

        renderHook(() => {
          useTest(hookWork);
        });

        expect(hookWork).toHaveBeenCalled();
      });

      it('hookWork is called, other Hooks', () => {
        const useTest = useGlobalHook<SomeState>({ React });

        const effectFn = jest.fn();
        const hookWork = jest.fn(() => {
          useEffect(() => {
            effectFn();
          }, []);
        }) as HookWork;

        renderHook(() => {
          useTest(hookWork);
        });

        expect(hookWork).toHaveBeenCalled();
        expect(effectFn).toHaveBeenCalled();
      });
    });
  });
  describe('custom actions', () => {
    it('works - single listener', () => {
      const useTest = useGlobalHook<NestedState, NestedInnerActions, NestedOuterActions>({
        React,
        initialState: { a: undefined, subset: { b: 'hi' } },
        actions: subsetActions,
      });
      const { result } = renderHook(() => useTest());

      act(() => {
        result.current[1].setA('a');
        result.current[1].subset.setB('b');
      });

      expect(result.current[0].a).toEqual('a');
      expect(result.current[0].subset.b).toEqual('b');
    });
  });
});
