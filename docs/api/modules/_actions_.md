**[@znemz/use-global-hook](../README.md)**

[Globals](../globals.md) › ["actions"](_actions_.md)

# External module: "actions"

## Index

### Interfaces

* [InnerBaseActions](../interfaces/_actions_.innerbaseactions.md)
* [OuterBaseActions](../interfaces/_actions_.outerbaseactions.md)

### Functions

* [setRef](_actions_.md#const-setref)
* [setState](_actions_.md#const-setstate)

### Object literals

* [actions](_actions_.md#const-actions)

## Functions

### `Const` setRef

▸ **setRef**<**T**>(`store`: [Store](../interfaces/_index_.store.md)‹T, [OuterBaseActions](../interfaces/_actions_.outerbaseactions.md)‹T››, `newState`: T, `doDigest?`: boolean): *void*

*Defined in [actions.ts:21](https://github.com/nmccready/use-global-hook/blob/5f1dd17/src/actions.ts#L21)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`store` | [Store](../interfaces/_index_.store.md)‹T, [OuterBaseActions](../interfaces/_actions_.outerbaseactions.md)‹T›› |
`newState` | T |
`doDigest?` | boolean |

**Returns:** *void*

___

### `Const` setState

▸ **setState**<**T**>(`store`: [Store](../interfaces/_index_.store.md)‹T, [OuterBaseActions](../interfaces/_actions_.outerbaseactions.md)‹T››, `newState`: T, `doDigest?`: boolean): *void*

*Defined in [actions.ts:13](https://github.com/nmccready/use-global-hook/blob/5f1dd17/src/actions.ts#L13)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`store` | [Store](../interfaces/_index_.store.md)‹T, [OuterBaseActions](../interfaces/_actions_.outerbaseactions.md)‹T›› |
`newState` | T |
`doDigest?` | boolean |

**Returns:** *void*

## Object literals

### `Const` actions

### ▪ **actions**: *object*

*Defined in [actions.ts:29](https://github.com/nmccready/use-global-hook/blob/5f1dd17/src/actions.ts#L29)*

###  setRef

• **setRef**: *[setRef]()*

*Defined in [actions.ts:29](https://github.com/nmccready/use-global-hook/blob/5f1dd17/src/actions.ts#L29)*

###  setState

• **setState**: *[setState]()*

*Defined in [actions.ts:29](https://github.com/nmccready/use-global-hook/blob/5f1dd17/src/actions.ts#L29)*