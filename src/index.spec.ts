import React from 'react';
import 'jest-extended';
import 'jest-expect-message';
import useGlobalHook, { Store } from '.';

describe('useGlobalHook', () => {
  it('not complain about hookWork', () => {
    interface SomeState {
      a?: string;
    }
    interface OuterActions<T> {
      setA: (newState: T) => void;
    }
    interface InnerActions<T> {
      setA: (_: Store<T, OuterActions<T>>, newState: T) => void;
    }
    useGlobalHook<SomeState, InnerActions<SomeState>, OuterActions<SomeState>>({ React });
  });
});
