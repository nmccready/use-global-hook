**[@znemz/use-global-hook](../README.md)**

[Globals](../globals.md) › ["actions"](../modules/_actions_.md) › [InnerBaseActions](_actions_.innerbaseactions.md)

# Interface: InnerBaseActions <**T**>

## Type parameters

▪ **T**

## Hierarchy

* **InnerBaseActions**

## Index

### Properties

* [setRef](_actions_.innerbaseactions.md#setref)
* [setState](_actions_.innerbaseactions.md#setstate)

## Properties

###  setRef

• **setRef**: *function*

*Defined in [actions.ts:10](https://github.com/nmccready/use-global-hook/blob/078c8fb/src/actions.ts#L10)*

#### Type declaration:

▸ (`store`: [Store](_index_.store.md)‹T, [OuterBaseActions](_actions_.outerbaseactions.md)‹T››, `newState`: T, `doDigest?`: boolean): *void*

**Parameters:**

Name | Type |
------ | ------ |
`store` | [Store](_index_.store.md)‹T, [OuterBaseActions](_actions_.outerbaseactions.md)‹T›› |
`newState` | T |
`doDigest?` | boolean |

___

###  setState

• **setState**: *function*

*Defined in [actions.ts:9](https://github.com/nmccready/use-global-hook/blob/078c8fb/src/actions.ts#L9)*

#### Type declaration:

▸ (`store`: [Store](_index_.store.md)‹T, [OuterBaseActions](_actions_.outerbaseactions.md)‹T››, `newState`: T, `doDigest?`: boolean): *void*

**Parameters:**

Name | Type |
------ | ------ |
`store` | [Store](_index_.store.md)‹T, [OuterBaseActions](_actions_.outerbaseactions.md)‹T›› |
`newState` | T |
`doDigest?` | boolean |