# react-use-object-state

> React hooks for managing and creating reusable stateful object patterns.

[![NPM](https://img.shields.io/npm/v/react-use-object-state.svg)](https://www.npmjs.com/package/react-use-object-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/BenBrewerBowman/react-use-object-state.svg?branch=master)](https://travis-ci.org/BenBrewerBowman/react-use-object-state)

## Demo

[![Edit react-use-object-state](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-use-object-state-igj9r?file=/src/App.tsx)

## Install

```bash
npm install --save react-use-object-state
```

or

```bash
yarn add react-use-object-state
```

## Idea

How often do you find yourself creating a boolean `useState` flag? How often do you have a stateful array and implement the same manipulation methods (`slice`, `push`, `pop`, `shift`, etc) to modify the state? How about a generic counter state `1,2,3...` What about pagination state, or even anchored elements state?

What about memoization with these stateful object patterns? If you want to employ memoization, every stateful object needs to have any or all state updater methods memoized. This can both muddy up your code with lots of useCallbacks and useMemos, and even introduce bugs with missing or constantly changing dependencies.

`react-use-object-state` solves all of the above problems with several common reusable stateful objects right out of the box, and with tools helpful in creating your own stateful object patterns where all methods are memoized.

## State Hooks

- [Boolean](#usebooleanstate)
- [Array](#usearraystate)
- [Unique Array (Set)](#useuniquearraystate)
- [Map](#usemapstate)
- [Counter](#usecounterstate)
- [Anchor El](#useanchorelstate)
- [Pagination](#usepaginationstate)
- [Creating your own state objects](#creating-your-own-state-objects)

## useBooleanState

> State for Booleans

#### Example

```tsx
import React from "react";
import { useBooleanState } from "react-use-object-state";

const BooleanExample = () => {
  const lightSwitch = useBooleanState(false);

  return (
    <div>
      <button onClick={lightSwitch.setTrue}>Turn on</button>
      <button onClick={lightSwitch.setFalse}>Turn off</button>
      <button onClick={lightSwitch.toggle}>Toggle</button>

      <div>The light switch is turned {lightSwitch.state ? "on" : "off"}</div>
    </div>
  );
};

export default BooleanExample;
```

| Name     | Type                           | Default | Description                 |
| :------- | :----------------------------- | :------ | :-------------------------- |
| state    | Boolean                        |         | State of the boolean object |
| setState | Function(state: Boolean): void |         | Sets the boolean state      |
|          |                                |         |                             |
| setTrue  | Function(): void               |         | Sets state to true          |
| setFalse | Function(): void               |         | Sets state to false         |
| toggle   | Function(): void               |         | Toggles boolean state       |

## useArrayState

> State for Arrays

```tsx
import React from "react";
import { useArrayState } from "react-use-object-state";

const mockData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ArrayExample = () => {
  const list = useArrayState<number>(mockData);

  return (
    <div>
      <button onClick={list.clear}>Clear</button>
      <button onClick={() => list.push(list.state.length + 1)}>Push</button>
      <button onClick={list.pop}>Pop</button>
      <button onClick={list.reverse}>Reverse</button>

      {list.state.map((listItem) => (
        <div key={listItem}>{listItem} </div>
      ))}
    </div>
  );
};

export default ArrayExample;
```

| Name     | Type                                  | Default | Description                                                          |
| :------- | :------------------------------------ | :------ | :------------------------------------------------------------------- |
| state    | Array<T>                              |         | State of the array object                                            |
| setState | Function(state: Array<T>): void       |         | Sets the array state                                                 |
|          |                                       |         |
| clear    | Function(): void                      |         | Empty's the array ([])                                               |
| reverse  | Function(): void                      |         | Reverses the array                                                   |
|          |                                       |         |
| pop      | Function(): void                      |         | Pops value off of the end of the array (does nothing on empty array) |
| push     | Function(...vals: T[])                |         | Pushes values onto end of the array                                  |
| shift    | Function(): void                      |         | Removes value from beginning of array (does nothing on empty array)  |
| unshift  | Function(...vals: T[])                |         | Pushes values onto beginning of array                                |
|          |                                       |         |
| insertAt | Function(val: T, index: number): void |         | Inserts value at a given index (Does nothing out of bounds)          |
| upsertAt | Function(val: T, index: number): void |         | Removes value from beginning of array (Does nothing out of bounds)   |
| deleteAt | Function(index: number): void         |         | Removes value from beginning of array (Does nothing out of bounds)   |

## useUniqueArrayState

> State for Unique Arrays (Sets)

| Name     | Type                                  | Default | Description                                                                                       |
| :------- | :------------------------------------ | :------ | :------------------------------------------------------------------------------------------------ |
| state    | Array<T>                              |         | State of the array object with unique vals                                                        |
| setState | Function(state: Array<T>): void       |         | Sets the array state with unique vals                                                             |
|          |                                       |         |
| clear    | Function(): void                      |         | Empty's the array ([])                                                                            |
| reverse  | Function(): void                      |         | Reverses the array                                                                                |
|          |                                       |         |
| toggle   | Function(...vals: T[]): void          |         | For each val, either adds it to the array if it doesn't exist, or removes it if it already exists |
| pop      | Function(): void                      |         | Pops value off of the end of the array (does nothing on empty array)                              |
| push     | Function(...vals: T[])                |         | Pushes unique values onto end of the array                                                        |
| shift    | Function(): void                      |         | Removes value from beginning of array (does nothing on empty array)                               |
| unshift  | Function(...vals: T[])                |         | Pushes unique values onto beginning of array                                                      |
|          |                                       |         |
| insertAt | Function(val: T, index: number): void |         | Inserts unique value at a given index (Does nothing out of bounds or for nonunique vals)          |
| upsertAt | Function(val: T, index: number): void |         | Removes value from beginning of array (Does nothing out of bounds or for nonunique vals)          |
| deleteAt | Function(index: number): void         |         | Removes value from beginning of array (Does nothing out of bounds)                                |

## useMapState

> State for Maps

```tsx
import React from "react";
import { useMapState } from "react-use-object-state";

const CounterExample = () => {
  const map = useMapState();

  return (
    <div>
      <button onClick={map.clear} >
        Clear
      </Button>
      <button onClick={() => map.set('key', 'val')} >
        Set key val
      </Button>
      <button onClick={() => map.delete('key')} >
        Delete key val
      </Button>
      <h4>
        Value of key: {map.state.get('key')}
      </h4>
    </div>
  );
};
```

| Name        | Type                          | Default | Description                                     |
| :---------- | :---------------------------- | :------ | :---------------------------------------------- |
| state       | Map<K,V>                      |         | State of the Map object                         |
| setState    | (map: Map<K,V>) => void       |         | Set the state of the Map Object.                |
|             |                               |         |
| clear       | VoidFunction                  |         | Clears the Map state                            |
| set         | Function(min: Number): void   |         | Sets key value pair for Map state               |
| delete      | Function(max: Number): void   |         | Deletes key value pair from Map state           |

## useCounterState

> State for Counters

```tsx
import React from "react";
import { useCounterState } from "react-use-object-state";

const CounterExample = () => {
  const counter = useCounterState({ min: 0, max: 10, count: 0 });

  return (
    <div>
      <button onClick={counter.increment} >
        Increment
      </Button>
      <button onClick={counter.decrement} >
        Decrement
      </Button>

      <h4>
        Count: {counter.count}
      </h4>
    </div>
  );
};
```

| Name        | Type                          | Default | Description                                     |
| :---------- | :---------------------------- | :------ | :---------------------------------------------- |
| count       | Number                        |         | Value of the counter                            |
| min         | Number                        |         | Minimum possible value of the counter           |
| max         | Number                        |         | Maximum possible value of the counter           |
|             |                               |         |
| setCount    | Function(count: Number): void |         | Sets the counter count                          |
| setMin      | Function(min: Number): void   |         | Sets the counter min                            |
| setMax      | Function(max: Number): void   |         | Sets the counter max                            |
|             |                               |         |
| increment   | Function(): void              |         | Increment the count by 1 (won't go above max)   |
| incrementBy | Function(x: Number): void     |         | Increment the count by 'x' (won't go above max) |
|             |                               |         |
| decrement   | Function(): void              |         | Decrement the count by 1 (won't go below min)   |
| incrementBy | Function(x: Number): void     |         | Decrement the count by 'x' (won't go below min) |

## useAnchorElState

> State for Anchored Elements (ie a button that opens a menu in its location)

```tsx
import React from "react";
import { useAnchorElState } from "react-use-object-state";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const AnchorElExample = () => {
  const { anchorEl, setAnchorEl, clearAnchorEl } = useAnchorElState(null);

  return (
    <div>
      <Button onClick={setAnchorEl}>Open Menu</Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={clearAnchorEl}
      >
        <MenuItem onClick={clearAnchorEl}>Profile</MenuItem>
        <MenuItem onClick={clearAnchorEl}>My account</MenuItem>
        <MenuItem onClick={clearAnchorEl}>Logout</MenuItem>
      </Menu>
    </div>
  );
};
```

| Name          | Type                                                             | Default | Description                                               |
| :------------ | :--------------------------------------------------------------- | :------ | :-------------------------------------------------------- |
| anchorEl      | React.MouseEvent<HTMLElement> or null                            |         | Anchored element                                          |
| setAnchorEl   | Function(element: React.MouseEvent<HTMLElement> or null): void   |         | Sets the anchored element                                 |
| clearAnchorEl | Function(): void                                                 |         | Clears the anchored element (sets anchorEl state to null) |
| setState      | Function(state: {count: Number, min: Number, max: Number}): void |         | Sets the counter state                                    |

## usePaginationState

> State for Pagination

```tsx
import React from "react";
import { usePaginationState } from "react-use-object-state";

const PaginationExample = () => {
  const pagination = usePaginationState({ page: 0, rowsPerPage: 25 });

  return (
    <div>
      <button onClick={pagination.previousPage} >
        Prev
      </Button>
      <button onClick={pagination.nextPage} >
        Next
      </Button>

      <h4>
        Page: {pagination.page}
      </h4>
      <h4>
        Count: {pagination.rowsPerPage}
      </h4>
    </div>
  );
};
```

| Name           | Type                                                                               | Default | Description                                             |
| :------------- | :--------------------------------------------------------------------------------- | :------ | :------------------------------------------------------ |
| page           | Number                                                                             |         | Current page number                                     |
| rowsPerPage    | Number                                                                             |         | Number of rows to show per page.                        |
| order          | 'asc', 'desc', undefined                                                           |         | Order page data ascending or descending                 |
| orderBy        | String, undefined                                                                  |         | Field, column, or key by which to order data            |
|                |                                                                                    |         |
| setPage        | Function(page: Number): void                                                       |         | Sets the page number                                    |
| setRowsPerPage | Function(rowsPerPage: Number): void                                                |         | Sets the rows per page                                  |
| sort           | Function({order: 'asc' or 'desc' or undefined, orderBy: String or undefined): void |         | Sorts the pagination ascending or descending by a field |
| nextPage       | Function(): void                                                                   |         | Increments the page number by 1                         |
| previousPage   | Function(): void                                                                   |         | Decrements the page number by 1 (min 0)                 |

## Creating your own state objects

In addition to providing some common stateful object patterns out of the box, `useObjectState` can be used to build your own stateful object hooks. This library follows compositional factory patterns, where each stateful object has a factory describing the state interface. The `useObjectState` hook is the base of every state hook that takes a state factory as a first argument, and an initial state as a second argument.

```
useObjectState(<yourStateFactory>, <initialState>);
```

From there, it memoizes the state and state methods, and returns your state hook.

### useObjectState example

Below is an example of how you would use `useObjectState` to create a boolean stateful object using JS. If you are using TS, [here](https://github.com/BenBrewerBowman/react-use-object-state/blob/master/src/boolean/useBooleanState.ts) is the source code.

```js
// this is how to create useBooleanState is created using JS
import { useObjectState } from "react-use-object-state";

export const booleanStateFactory = (setState) => ({
  setTrue: () => setState(true),
  setFalse: () => setState(false),
  toggle: () => setState((state) => !state),
});

export const useBooleanState = (initialState) =>
  useState(booleanStateFactory, initialState);
```

## useState compositional architecture

For scalable architecture, `react-use-object-state` suggests using compositional factory patterns. This will help prevent architectural problems associated with classical inheritance, and will give you decoupled reusable factory methods.

```js

// mammalMethods.js
const play = (state) => {...}
const walk = (state) => {...}
const run = (state) => {...}


// useCatState.js
import { useObjectState } from 'react-use-object-state';
import { play, walk, run } from './mammalMethods';

export const catStateFactory = (setState) => {
  return {

    // these are methods imported from mammalMethods.
    // setState will pass the state into each function
    play: () => setState(play),
    walk: () => setState(walk),
    run: () => setState(run),

    // these are specific cat methods
    meow: () => {...}
    takeBath: () => {...}
  };
};

export const useCatState = (initialState) => useObjectState(catStateFactory, initialState);

// useDogState.js
import { useObjectState } from 'react-use-object-state';
import { play, walk, run } from './mammalMethods';

export const dogStateFactory = (setState) => ({

  // these are methods imported from mammalMethods
  // setState will pass the state into each function
  play: () => setState(play),
  walk: () => setState(walk),
  run: () => setState(run),

  // these are specific dog methods
  bark: () => {...}
  wagTail: () => {...}
});

export const useDogState = (initialState) => useObjectState(dogStateFactory, initialState);
```

## License

MIT © [BenBrewerBowman](https://github.com/BenBrewerBowman)
