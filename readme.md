# @znemz/use-global-hook [![NPM version][npm-image]][npm-url] [![build status][travis-image]][travis-url] [![Test coverage][coveralls-image]][coveralls-url]

Easy state management for react using hooks in less than 1kb.

---

Minimal example:

```javascript
import React from 'react';
import useGlobalHook from '@znemz/use-global-hook';

const initialState = {
  counter: 0,
};

const actions = {
  addToCounter: (store, amount) => {
    const newCounterValue = store.state.counter + amount;
    store.setState({ counter: newCounterValue });
  },
};

const useGlobal = useGlobalHook({ React, initialState, actions });

const App = () => {
  const [globalState, globalActions] = useGlobal();
  return (
    <div>
      <p>
        counter:
        {globalState.counter}
      </p>
      <button type="button" onClick={() => globalActions.addToCounter(1)}>
        +1 to global
      </button>
    </div>
  );
};

export default App;
```

---

### Complete examples:

#### [Several counters, one value](https://codesandbox.io/s/v6zz2nwow5 'CodeSandBox')

Add as many counters as you want, it will all share the same global value.
Every time one counter add 1 to the global value, all counters will render.
The parent component won't render again.

---

#### [Asynchronous ajax requests](https://codesandbox.io/s/wqvykj5497 'CodeSandBox')

Search GitHub repos by username.
Handle the ajax request asynchronously with async/await.
Update the requests counter on every search.

[npm-image]: https://img.shields.io/npm/v/@znemz/use-global-hook.svg
[npm-url]: https://www.npmjs.com/package/@znemz/use-global-hook
[travis-image]: https://img.shields.io/travis/nmccready/use-global-hook.svg
[travis-url]: https://travis-ci.org/nmccready/use-global-hook
[coveralls-image]: https://coveralls.io/repos/github/nmccready/use-global-hook/badge.svg
[coveralls-url]: https://coveralls.io/github/nmccready/use-global-hook?branch=master
