/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var setState = function (store, newState) {
    store.setState(newState);
};
var setRef = function (store, newState) {
    store.setRef(newState);
};
var actions = { setState: setState, setRef: setRef };

function setState$1(newState, isRef) {
    var listenersLength = this.listeners.length;
    this.state = isRef ? newState : __assign({}, this.state, newState);
    for (var i = 0; i < listenersLength; i++) {
        var fn = this.listeners[i];
        if (!fn || typeof fn !== 'function') {
            continue;
        }
        fn(this.state);
    }
}
function setRef$1(newState) {
    setState$1.call(this, newState, true);
}
function useCustom(React, hookWork) {
    var _this = this;
    var newListener = React.useState()[1];
    React.useEffect(function () {
        _this.listeners.push(newListener);
        return function () {
            var listenersLength = _this.listeners.length;
            var filtered = [];
            for (var i = 0; i < listenersLength; i++) {
                var listener = _this.listeners[i];
                if (listener !== newListener) {
                    filtered.push(listener);
                }
            }
            /*
            This is dangerous as we could be in the middle of calling setState or setRef.
            setting the listeners should come after the dust has settled.
            Using an immutable store might protect this.
            */
            _this.listeners = filtered;
        };
    }, []);
    var workAdditions = [];
    if (hookWork) {
        workAdditions = hookWork() || [];
    }
    return [this.state, this.actions].concat(workAdditions);
}
function associateActions(store, actions) {
    var associatedActions = {};
    var actionsKeys = Object.keys(actions);
    var actionsKeysLength = actionsKeys.length;
    for (var i = 0; i < actionsKeysLength; i++) {
        var key = actionsKeys[i];
        if (typeof actions[key] === 'function') {
            associatedActions[key] = actions[key].bind(null, store);
        }
        if (typeof actions[key] === 'object') {
            associatedActions[key] = associateActions(store, actions[key]);
        }
    }
    return associatedActions;
}
var useStore = function (_a) {
    var _b = _a === void 0 ? {} : _a, React = _b.React, initialState = _b.initialState, _c = _b.actions, actions$1 = _c === void 0 ? actions : _c, initializer = _b.initializer;
    var store = { state: initialState, listeners: [] };
    store.setState = setState$1.bind(store);
    store.setRef = setRef$1.bind(store);
    store.actions = associateActions(store, actions$1);
    if (initializer) {
        initializer(store);
    }
    return useCustom.bind(store, React);
};

export default useStore;
