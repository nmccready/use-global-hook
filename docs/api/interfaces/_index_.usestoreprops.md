**[@znemz/use-global-hook](../README.md)**

[Globals](../globals.md) › ["index"](../modules/_index_.md) › [UseStoreProps](_index_.usestoreprops.md)

# Interface: UseStoreProps <**T, InnerA, OuterA, WorkR**>

## Type parameters

▪ **T**

▪ **InnerA**

▪ **OuterA**

▪ **WorkR**

## Hierarchy

* **UseStoreProps**

## Index

### Properties

* [React](_index_.usestoreprops.md#react)
* [actions](_index_.usestoreprops.md#optional-actions)
* [hookWork](_index_.usestoreprops.md#optional-hookwork)
* [initialState](_index_.usestoreprops.md#optional-initialstate)
* [initializer](_index_.usestoreprops.md#optional-initializer)

## Properties

###  React

• **React**: *[ReactLib](_index_.reactlib.md)*

*Defined in [index.ts:28](https://github.com/nmccready/use-global-hook/blob/5f1dd17/src/index.ts#L28)*

___

### `Optional` actions

• **actions**? : *InnerA | [InnerBaseActions](_actions_.innerbaseactions.md)‹T›*

*Defined in [index.ts:30](https://github.com/nmccready/use-global-hook/blob/5f1dd17/src/index.ts#L30)*

___

### `Optional` hookWork

• **hookWork**? : *function*

*Defined in [index.ts:32](https://github.com/nmccready/use-global-hook/blob/5f1dd17/src/index.ts#L32)*

#### Type declaration:

▸ (): *WorkR*

___

### `Optional` initialState

• **initialState**? : *T*

*Defined in [index.ts:29](https://github.com/nmccready/use-global-hook/blob/5f1dd17/src/index.ts#L29)*

___

### `Optional` initializer

• **initializer**? : *[Initializer](../modules/_index_.md#initializer)‹T, OuterA›*

*Defined in [index.ts:31](https://github.com/nmccready/use-global-hook/blob/5f1dd17/src/index.ts#L31)*