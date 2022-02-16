# Simple Drag and Drop Implementation with Grid and React Component

- I have created a simple react app, to try out drag and drop in grid layout. Have used HTML drag and drop endpoints to implement it.
- What can be done:
  - We can swap elements within the grid.
  - We can drag and drop elements within the grid.
  - We can drag(only draggable elements) from outside the grid and drop it in exact column and row inside the grid.

**_ The code is not written to be optimized or production ready. It's just a POC _**

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## What's Happening

- We created a base grid element, which serves as our main dropping zone.
- We divided it into columns nd rows.
- Calculated the start/end for each row and column in the rows and columns object.
- Now we rendered the slots(elements) inside the grid and made them each a draggable and droppable zone.
- Making the slots droppable, helps us ion swapping them and draggable is used to make them drag.
- We also created an element outside the grid and made it draggable, so that we can drag it inside the grid.
- We have created the styles of the element as an object to help us modify them later

```js
   styles: {
      gridColumnStart: 3,
      gridColumnEnd: 7,
      gridRowStart: 1,
      gridRowEnd: 3,
      height: "150px",
      display: "flex",
    },
```

- Then we have define the children as a function, just to be bit flexible if we needed to pass anything to it. This could just be a reference to a Component.
  ```js
    children: () => {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <img alt="dummy logo" src="/dummy.png" className={styles.img} />
        </div>
      );
    },
  ```
