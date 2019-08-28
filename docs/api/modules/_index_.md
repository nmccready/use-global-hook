**[@znemz/use-global-hook](../README.md)**

[Globals](../globals.md) › ["index"](_index_.md)

# External module: "index"

## Index

### Interfaces

* [ReactLib](../interfaces/_index_.reactlib.md)
* [Store](../interfaces/_index_.store.md)
* [UseStoreProps](../interfaces/_index_.usestoreprops.md)

### Type aliases

* [AssociateActionsFn](_index_.md#associateactionsfn)
* [HookWork](_index_.md#hookwork)
* [Initializer](_index_.md#initializer)
* [SetRefFn](_index_.md#setreffn)
* [SetStateFn](_index_.md#setstatefn)
* [UseCustomFn](_index_.md#usecustomfn)
* [UseEffect](_index_.md#useeffect)
* [UseState](_index_.md#usestate)
* [UseStoreFn](_index_.md#usestorefn)

### Functions

* [associateActions](_index_.md#associateactions)
* [setRef](_index_.md#setref)
* [setState](_index_.md#setstate)
* [useCustom](_index_.md#usecustom)
* [useStore](_index_.md#const-usestore)

## Type aliases

###  AssociateActionsFn

Ƭ **AssociateActionsFn**: *function*

*Defined in [index.ts:18](https://github.com/nmccready/use-global-hook/blob/078c8fb/src/index.ts#L18)*

#### Type declaration:

▸ <**T**, **A**>(`store`: [Store](../interfaces/_index_.store.md)‹T, A›, `actions`: A): *A*

**Type parameters:**

▪ **T**

▪ **A**

**Parameters:**

Name | Type |
------ | ------ |
`store` | [Store](../interfaces/_index_.store.md)‹T, A› |
`actions` | A |

___

###  HookWork

Ƭ **HookWork**: *function*

*Defined in [index.ts:74](https://github.com/nmccready/use-global-hook/blob/078c8fb/src/index.ts#L74)*

#### Type declaration:

▸ (): *T*

___

###  Initializer

Ƭ **Initializer**: *function*

*Defined in [index.ts:20](https://github.com/nmccready/use-global-hook/blob/078c8fb/src/index.ts#L20)*

#### Type declaration:

▸ (`_`: [Store](../interfaces/_index_.store.md)‹T, A›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`_` | [Store](../interfaces/_index_.store.md)‹T, A› |

___

###  SetRefFn

Ƭ **SetRefFn**: *function*

*Defined in [index.ts:14](https://github.com/nmccready/use-global-hook/blob/078c8fb/src/index.ts#L14)*

#### Type declaration:

▸ (`newState`: T, `doDigest?`: boolean): *void*

**Parameters:**

Name | Type |
------ | ------ |
`newState` | T |
`doDigest?` | boolean |

___

###  SetStateFn

Ƭ **SetStateFn**: *function*

*Defined in [index.ts:12](https://github.com/nmccready/use-global-hook/blob/078c8fb/src/index.ts#L12)*

#### Type declaration:

▸ (`newState`: T, `isRef?`: boolean, `doDigest?`: boolean): *void*

**Parameters:**

Name | Type |
------ | ------ |
`newState` | T |
`isRef?` | boolean |
`doDigest?` | boolean |

___

###  UseCustomFn

Ƭ **UseCustomFn**: *function*

*Defined in [index.ts:16](https://github.com/nmccready/use-global-hook/blob/078c8fb/src/index.ts#L16)*

#### Type declaration:

▸ (`React`: [ReactLib](../interfaces/_index_.reactlib.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`React` | [ReactLib](../interfaces/_index_.reactlib.md) |

___

###  UseEffect

Ƭ **UseEffect**: *function*

*Defined in [index.ts:4](https://github.com/nmccready/use-global-hook/blob/078c8fb/src/index.ts#L4)*

#### Type declaration:

▸ (`effect`: EffectCallback, `deps?`: DependencyList): *void*

**Parameters:**

Name | Type |
------ | ------ |
`effect` | EffectCallback |
`deps?` | DependencyList |

___

###  UseState

Ƭ **UseState**: *function*

*Defined in [index.ts:5](https://github.com/nmccready/use-global-hook/blob/078c8fb/src/index.ts#L5)*

#### Type declaration:

▸ <**S**>(`initialState?`: S | function): *[S, Dispatch‹SetStateAction‹S››]*

**Type parameters:**

▪ **S**

**Parameters:**

Name | Type |
------ | ------ |
`initialState?` | S \| function |

___

###  UseStoreFn

Ƭ **UseStoreFn**: *function*

*Defined in [index.ts:35](https://github.com/nmccready/use-global-hook/blob/078c8fb/src/index.ts#L35)*

#### Type declaration:

▸ <**T**, **InnerA**, **OuterA**, **WorkR**>(`_`: [UseStoreProps](../interfaces/_index_.usestoreprops.md)‹T, InnerA, OuterA, WorkR›): *function*

**Type parameters:**

▪ **T**

▪ **InnerA**

▪ **OuterA**

▪ **WorkR**

**Parameters:**

Name | Type |
------ | ------ |
`_` | [UseStoreProps](../interfaces/_index_.usestoreprops.md)‹T, InnerA, OuterA, WorkR› |

▸ (): *[T, OuterA, Array]*

## Functions

###  associateActions

▸ **associateActions**<**T**, **InnerA**, **OuterA**>(`store`: [Store](../interfaces/_index_.store.md)‹T, OuterA›, `actions`: InnerA): *OuterA*

*Defined in [index.ts:110](https://github.com/nmccready/use-global-hook/blob/078c8fb/src/index.ts#L110)*

**Type parameters:**

▪ **T**

▪ **InnerA**

▪ **OuterA**

**Parameters:**

Name | Type |
------ | ------ |
`store` | [Store](../interfaces/_index_.store.md)‹T, OuterA› |
`actions` | InnerA |

**Returns:** *OuterA*

___

###  setRef

▸ **setRef**<**T**, **A**>(`this`: [Store](../interfaces/_index_.store.md)‹T, A›, `newState`: T, `doDigest?`: boolean): *void*

*Defined in [index.ts:70](https://github.com/nmccready/use-global-hook/blob/078c8fb/src/index.ts#L70)*

**Type parameters:**

▪ **T**

▪ **A**

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Store](../interfaces/_index_.store.md)‹T, A› |
`newState` | T |
`doDigest?` | boolean |

**Returns:** *void*

___

###  setState

▸ **setState**<**T**, **A**>(`this`: [Store](../interfaces/_index_.store.md)‹T, A›, `newState`: T, `isRef?`: boolean, `doDigest`: boolean): *void*

*Defined in [index.ts:52](https://github.com/nmccready/use-global-hook/blob/078c8fb/src/index.ts#L52)*

**Type parameters:**

▪ **T**

▪ **A**

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`this` | [Store](../interfaces/_index_.store.md)‹T, A› | - |
`newState` | T | - |
`isRef?` | boolean | - |
`doDigest` | boolean | true |

**Returns:** *void*

___

###  useCustom

▸ **useCustom**<**T**, **A**, **WorkR**>(`this`: [Store](../interfaces/_index_.store.md)‹T, A›, `React`: [ReactLib](../interfaces/_index_.reactlib.md), `hookWork?`: [HookWork](_index_.md#hookwork)‹WorkR›): *[T, A]*

*Defined in [index.ts:76](https://github.com/nmccready/use-global-hook/blob/078c8fb/src/index.ts#L76)*

**Type parameters:**

▪ **T**

▪ **A**

▪ **WorkR**: *WorkR[]*

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Store](../interfaces/_index_.store.md)‹T, A› |
`React` | [ReactLib](../interfaces/_index_.reactlib.md) |
`hookWork?` | [HookWork](_index_.md#hookwork)‹WorkR› |

**Returns:** *[T, A]*

___

### `Const` useStore

▸ **useStore**<**T**, **InnerA**, **OuterA**, **WorkR**>(`__namedParameters`: object): *function*

*Defined in [index.ts:129](https://github.com/nmccready/use-global-hook/blob/078c8fb/src/index.ts#L129)*

**Type parameters:**

▪ **T**

▪ **InnerA**

▪ **OuterA**

▪ **WorkR**

**Parameters:**

▪`Default value`  **__namedParameters**: *object*=  {} as UseStoreProps<T, InnerA, OuterA, WorkR>

Name | Type | Default |
------ | ------ | ------ |
`React` | [ReactLib](../interfaces/_index_.reactlib.md) | - |
`actions` | InnerA \| [InnerBaseActions](../interfaces/_actions_.innerbaseactions.md)‹T› |  baseActions |
`initialState` | T | - |
`initializer` | function | - |

**Returns:** *function*

▸ (`_?`: [HookWork](_index_.md#hookwork)‹WorkR›): *[T, OuterA]*

**Parameters:**

Name | Type |
------ | ------ |
`_?` | [HookWork](_index_.md#hookwork)‹WorkR› |