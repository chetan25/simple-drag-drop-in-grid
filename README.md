# Simple Drag and Drop Implementation with Grid + Flex and React.

- I have tried out different ways to implement the drag and drop feature from scratch with Grid and flex based approach.
- Below are my findings for different approaches.

#### Local Development

- npm ci
- nom run dev

### Grid Based

- Grid based approach is the tricky one as grid allow us to position elements in two direction.

##### Two Dimension Approach (Not Refined)

- The first simple approach I tried was to use the grid in two direction and implement drag and drop.
- This led to a lot of calculation, since every moved element we had to adjust the column/row start and end.
- The `pages\grid-2dm-drag.tsx` has this approach.
- The solution is not elegant and still a bit buggy as calculating the coordinates and then the column/row values still need some refinement.

**_ Note - I did also tried using order property but since it breaks the accessibility , had to abandon that approach _**

##### One Dimension Grid Approach

- In this approach I constraint the grid to be in one direction only, basically columns.
- This made things a bit simpler by avoiding one changing variable and we could imagine more like flex.
- But the biggest constraint with this approach is that we have to design the UI with the mindset that we have groups on the page and elements are placed inside the groups.
- For now the elements can be dragged and dropped within and between groups. But we can expand it to switch group positions or add a new element from outside too.
- The main glue for this to work is that we have to follow a specific data contract. As the page is built dynamically from the data.
- So our data is basically an array of object with each object specifying a group. Each group has children nodes specifying the element to render. And each group know how to lay them out, column or row wise.

```js
const slots = [
   {
    id: 1, // id used to reference the group
    name: "Slot1",
    groupId: 1,
    groupType: "flexColumn",
    gridColumnStart: 1,
    gridColumnEnd: 7,
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gridAutoFlow: "row", // flexColumn in flex - one column multiple row
    styles: {
      height: "100%",
      width: "100%",
      padding: "0px 0px 0px 0px",
    },
    nodes: [
      {
        nodeId: 1, // node referencing id
        groupId: 1, // parent id
        gridColumnStart: 1,
        gridColumnEnd: 7,
        children: () => {
          return (
            <Button />
          );
        },
      },
      .... other nodes
    ]
   }
   ... other groups
]
```

- The logic is based on the constrained that the group direction decides how the user can drag and drop element, example if the group is laid out in row format than we can only drop an element either top or bottom of other element.
- More logic can be found in `pages\grid-flex.tsx`.
- The result is good but still room to make things better.

### Flex Based

- This is a simple approach where we place items in a flex box and then just drop them relative to the other element based on parent flex box direction.
- We design the UI with the mindset that we have groups on the page and elements are placed inside the groups.
- For now the elements can be dragged and dropped within and between groups. But we can expand it to switch group positions or add a new element from outside too.
- The main glue for this to work is that we have to follow a specific data contract. As the page is built dynamically from the data.
- So our data is basically an array of object with each object specifying a group. Each group has children nodes specifying the element to render. And each group know how to lay them out, column or row wise.

```js
const slots = [
  {
    id: 1, // id used to reference the element
    name: "Slot1",
    groupId: 1,
    groupType: "flexColumn",
    alignItems: "stretch",
    styles: {
      height: "100%",
      width: "40%",
      order: 0,
      padding: "0px 0px 0px 0px",
    },
    nodes: [
      {
        nodeId: 1,
        groupId: 1,
        children: () => {
          return (
            <Button />
          );
        },
      },
     ...other nodes
    ]
  },
  ... other group
]
```

- More logic can be found in `pages\flex-drag.tsx`.
- The result is better than grid as we don't have the column based constraint.
