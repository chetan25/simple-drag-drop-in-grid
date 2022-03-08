import type { NextPage } from "next";
import { useEffect, useState } from "react";
// import { renderToString } from "react-dom/server";
import Head from "next/head";
import styles from "../styles/grid.module.css";
import { RowType, ColumnsType, CanvasDimenstions } from "../utils/types";
import { COLUMNS, getColumsPositions, getRowsPositions } from "../utils/helper";
// import Draggable from "../components/draggable";
// Draggable and droppable component
const Slot = (props: any) => {
  const customStyles = {
    // backgroundColor: props.box.color,
    ...props.box.styles,
    height: "100%",
  };
  return (
    <div
      id={props.box.id}
      // className={`dropzone `}
      style={customStyles}
      draggable={props.draggable}
      onDragStart={props.onDragStart({ element: props.box })}
      className={`dropzone `}
      onDragOver={props.onDragOver({ element: props.box })}
      onDrop={props.onDrop({ element: props.box })}
      onDragEnter={props.onDragEnter({ element: props.box })}
      onDragLeave={props.onDragLeave({ element: props.box })}
    >
      <div
        // id={props.box.id}
        className={` ${styles.content}`}
        style={{ backgroundColor: props.box.color, height: "100%" }}
      >
        {props.box.children()}
      </div>
    </div>
  );
};
// dummy list of elements in slots
const slots = [
  {
    id: 1, // id used to reference the element
    name: "Slot1",
    groupId: 1,
    groupType: "column",
    styles: {
      gridColumnStart: 1,
      gridColumnEnd: 7,
      height: "100%",
      order: 0,
      padding: "0px 0px 0px 0px",
      placeItems: "stretch stretch",
    },
    children: () => {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <h1>Two line long header example for your landing page</h1>
        </div>
      );
    },
  },
  {
    id: 2,
    name: "Slot2",
    groupId: 1,
    groupType: "column",
    styles: {
      gridColumnStart: 1,
      gridColumnEnd: 7,
      height: "100%",
      order: 1,
      padding: "0px 0px 0px 0px",
      placeItems: "stretch stretch",
    },
    children: () => {
      return (
        <p>
          Whether you’re a newbie landing page creator or a pro, Unbounce gives
          you the tools to not only build custom landing pages, but also get
          more conversions on your website.
        </p>
      );
    },
  },
  {
    id: 3,
    name: "Slot3",
    groupId: 1,
    groupType: "column",
    styles: {
      gridColumnStart: 1,
      gridColumnEnd: 2,
      height: "100%",
      order: 2,
      padding: "0px 0px 0px 0px",
      placeItems: "stretch stretch",
      margin: "1rem",
    },
    children: () => {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            padding: "1rem",
          }}
        >
          <button>Call to Action</button>
        </div>
      );
    },
  },
  {
    id: 4,
    name: "Slot4",
    groupId: 2,
    groupType: "column",
    styles: {
      gridColumnStart: 7,
      gridColumnEnd: 13,
      gridRowStart: 1,
      gridRowEnd: 6,
      height: "100%",
      order: 1,
      padding: "0px 0px 0px 0px",
      placeItems: "stretch stretch",
    },
    children: () => {
      return (
        <div style={{ height: "100%" }}>
          <img
            src="https://user-assets-unbounce-com.s3.amazonaws.com/bb365067-415a-4ea4-ab60-9a8543ed09a5/805bfb1a-9d37-438b-b11e-269d5e3def17/575x375.original.jpg"
            className={styles.img}
          />
        </div>
      );
    },
  },
];
// main grid that renders the slots
const SlotsGroup = ({
  columns,
  rows,
}: {
  columns: ColumnsType;
  rows: RowType;
}) => {
  console.log(rows);
  const [state, setState] = useState<{ slots: Record<any, any>[] }>({
    slots: slots,
  });
  const [renderCounter, setRenderCounter] = useState(0);
  let dropSection: string | null = null;
  let draggedEl: any | null = null;
  /**
   * Function to swap the elements.
   * Basically we swap the style and the children object.
   */
  const swapSlots = ({
    draggedEl,
    dropElGroup,
  }: {
    draggedEl: any;
    dropElGroup: any;
  }) => {
    // let slots = state.slots.slice();
  };
  const bumpOrderForElements = ({
    startingIndex,
    startOrder,
    skipIndex,
    slots,
    outputSlots,
  }: {
    startingIndex: number;
    startOrder: number;
    skipIndex: number;
    slots: any;
    outputSlots: any;
  }) => {
    console.log(startingIndex, skipIndex, startOrder);
    for (let i = startingIndex; i < slots.length; i++) {
      console.log(i, skipIndex, startOrder);
      if (i !== skipIndex) {
        console.log({ i });
        slots[i].styles.order = startOrder;
        const slot = {
          ...slots[i],
        };
        outputSlots.push(slot);
        startOrder++;
      }
    }
  };
  const insertSlot = ({
    draggedEl,
    dropElGroup,
    dropZone,
  }: {
    draggedEl: any;
    dropElGroup: any;
    dropZone: any;
  }) => {
    let slots = state.slots.slice();
    const dragElGroupId = draggedEl.groupId;
    const dropElementGroupId = dropElGroup.groupId;
    // console.log(dragElGroupId, dropElementGroupId);
    let dragGroup: any = [];
    let dropGroup: any = [];
    let restGroup: any = [];
    slots.forEach((slot) => {
      if (dragElGroupId === dropElementGroupId) {
        if (slot.groupId === dragElGroupId) {
          dropGroup.push({
            ...slot,
          });
        } else {
          restGroup.push({
            ...slot,
          });
        }
      } else {
        if (slot.groupId === dragElGroupId) {
          dragGroup.push({
            ...slot,
          });
        } else if (slot.groupId === dropElementGroupId) {
          dropGroup.push({
            ...slot,
          });
        } else {
          restGroup.push({
            ...slot,
          });
        }
      }
    });
    console.log(dropGroup, "dropGroup");
    let fromIndex = -1;
    let toIndex = -1;
    for (let i = 0; i < dropGroup.length; i++) {
      if (dropGroup[i].id === draggedEl.id) {
        fromIndex = i;
      }
      if (dropGroup[i].id === dropElGroup.id) {
        toIndex = i;
      }
    }
    console.log(fromIndex, toIndex);
    // lets get the order for destination element
    let elOrderDes = dropGroup[toIndex].styles.order;
    let elOrderSrc = dropGroup[fromIndex].styles.order;
    console.log(elOrderDes);
    if (dropZone === "top") {
      // newSlots = slots.slice(0, toIndex);
      dropGroup[fromIndex].styles.order = elOrderDes;
      let nextOrder = elOrderDes + 1;
      // loop from
      for (let i = 0; i < dropGroup.length; i++) {
        if (
          dropGroup[i].styles.order >= elOrderDes &&
          dropGroup[i].styles.order < elOrderSrc
        ) {
          if (i == fromIndex) {
            continue;
          }
          dropGroup[i].styles.order = nextOrder;
          nextOrder++;
        }
      }
    } else {
      dropGroup[fromIndex].styles.order = elOrderDes + 1;
      let nextOrder = elOrderDes + 2;
      // loop from
      for (let i = 0; i < dropGroup.length; i++) {
        if (
          dropGroup[i].styles.order >= elOrderDes &&
          dropGroup[i].styles.order < elOrderSrc
        ) {
          if (i == fromIndex || i == toIndex) {
            continue;
          }
          dropGroup[i].styles.order = nextOrder;
          nextOrder++;
        }
      }
    }
    let newSlots = [...restGroup, ...dropGroup, ...dragGroup];
    console.log({ newSlots });
    setState({ slots: newSlots });
    setRenderCounter((counter) => counter + 1);
  };
  /* The dragstart event is fired when the user starts dragging an element or text selection */
  /* event.target is the source element : that is dragged */
  /* Firefox requires calling dataTransfer.setData for the drag to properly work */
  const handleDragStart = (data: any) => (event: any) => {
    let draggedElement = JSON.stringify({ element: data.element });
    console.log({ draggedElement }, "handleDragStart");
    draggedEl = data.element;
    event.dataTransfer.setData("draggedElement", draggedElement);
  };
  /* The dragover event is fired when an element or text selection is being dragged */
  /* over a valid drop target (every few hundred milliseconds) */
  /* The event is fired on the drop target(s) */
  // data is for the element the valid drop zone or drag over on and not the dragged item
  const handleDragOver = (data: any) => (event: any) => {
    // console.log({ data }, "handleDragOver");
    // detect if the drop item is over the item from same group
    const dropElGroupId = data.element.groupId;
    // event.dataTransfer.getData("draggedElement") --- does not exit at this point
    const dragElGroupId = draggedEl.groupId;
    event.preventDefault(); // Necessary. Allows us to drop.
    // if not moved in same group return
    // if (!dropElGroupId == dragElGroupId) {
    console.log("dragovereeeeeee");
    const elmCoords = event.target.getBoundingClientRect();
    const topLimit = elmCoords.top;
    const bottomLimit = elmCoords.bottom;
    const middleLimit = Math.floor((topLimit + bottomLimit) / 2);
    const groupType = data.element.groupType;
    if (event.target.className.includes("dropzone")) {
      // console.log("inside dragover if");
      // since we calculated the middlePoint with getBoundingClientRect
      // we need to use the clientY, since ts based to top of screen
      if (groupType === "column") {
        if (event.clientY > middleLimit) {
          dropSection = "bottom";
          event.target.style.borderBottom = "5px solid purple";
          event.target.style.borderTop = "";
        } else {
          dropSection = "top";
          event.target.style.borderTop = "5px solid purple";
          event.target.style.borderBottom = "";
        }
      } else {
      }
    }
    // }
    return false;
  };
  const onDragEnter = (data: any) => (event: any) => {
    console.log({ data }, "onDragEnter");
    let children = document.getElementById(data.element.id)!.children;
    console.log({ children });
    // children.style.pointerEvents = "none";
    // to avoid the children from capturing the event on drag
    Array.from(children).forEach((child) => {
      child.style.pointerEvents = "none";
    });
    // let fromSlot = JSON.parse(event.dataTransfer.getData("dragContent"));
    // draggedEl = document.getElementById(fromSlot);
    // if (!draggedEl) {
    //   return false;
    // }
    // const domRect = draggedEl.getBoundingClientRect();
    // if (event.target.className.includes("dropzone")) {
    //   console.log(event);
    //   console.log(event.target.className);
    //   event.target.style.border = "5px solid purple";
    // }
    event.preventDefault();
    return false;
  };
  const onDragLeave = (data: any) => (event: any) => {
    console.log("leave");
    let children = document.getElementById(data.element.id)!.children;
    // children.style.pointerEvents = "auto";
    // re-setting the pointer event
    Array.from(children).forEach((child) => {
      child.style.pointerEvents = "auto";
    });
    if (event.target.className.includes("dropzone")) {
      // console.log("leave");
      // console.log(event.target.className);
      event.target.style.borderTop = "";
      event.target.style.borderBottom = "";
    }
    return false;
  };
  /* Fired when an element or text selection is dropped on a valid drop target */
  /* The event is fired on the drop target(s) */
  const handleDrop = (data: any) => (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    // detect if the drop item is over the item from same group
    const dropElGroupId = data.element.groupId;
    // event.dataTransfer.getData("draggedElement") --- does not exit at this point
    const dragElGroupId = draggedEl.groupId;
    if (dragElGroupId !== dropElGroupId) {
      return;
    }
    if (event.target.className.includes("dropzone")) {
      console.log(event.target.className);
      event.target.style.border = "";
    }
    // let draggedElement = JSON.parse(
    //   event.dataTransfer.getData("draggedElement")
    // );
    // swapSlots({
    //   draggedEl,
    //   dropElGroup,
    // });
    insertSlot({
      draggedEl,
      dropElGroup: data.element,
      dropZone: dropSection,
    });
    dropSection = null;
    return false;
  };
  const handleGridDrop = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    const dragContent = JSON.parse(event.dataTransfer.getData("dragContent"));
    console.log({ event });
    let column = { start: 0, end: 0 };
    Object.keys(columns).map((key) => {
      if (
        event.screenX >= columns[key]["left"] &&
        event.screenX < columns[key]["right"] + 8
      ) {
        column.start = Number(key);
        column.end = Number(key) + 1;
      }
    });
    console.log({ columns });
    console.log({ column });
    let row = { top: 0, bottom: 0 };
    console.log({ rows });
    // pageX and pageY remains same irrespective of scroll
    Object.keys(rows).map((key) => {
      if (
        event.pageY > rows[key]["top"] &&
        event.pageY <= rows[key]["bottom"] + 8
      ) {
        row.top = Number(key);
        row.bottom = Number(key) + 1;
      }
    });
    console.log({ row });
    console.log(dragContent.type == "Button");
    let slots = [...state.slots];
    // If we are dropping an element from outside the grid, we perfrom different logic
    // In this case we are droping a hardcoded button component
    if (dragContent.type == "Button") {
      // new Component
      const id = state.slots[state.slots.length - 1].id + 1;
      console.log({ id });
      const component = {
        id: id,
        name: `Slot${id}`,
        // color: "grey",
        styles: {
          // gridColumn: "1 / 3",
          gridColumnStart: column.start,
          gridColumnEnd: column.end,
          gridRowStart: row.top,
          gridRowEnd: row.bottom,
          // height: "100%",
          // display: "flex",
        },
        children: () => {
          return <Button />;
        },
      };
      slots = [...slots, component];
    } else {
      // return;
      // If we are dragging and dropping elements within the grid
      const dragElmId = dragContent.id;
      const dragElmIndex = state.slots.findIndex((slot) => {
        return slot.id === dragElmId;
      });
      console.log(state.slots, "slots");
      console.log("dragElmId");
      if (dragElmIndex >= 0) {
        const dragElm = { ...state.slots[dragElmIndex] };
        const OgRowGap =
          dragElm.styles.gridRowEnd - dragElm.styles.gridRowStart;
        const OgColGap =
          dragElm.styles.gridColumnEnd - dragElm.styles.gridColumnStart;
        console.log(OgRowGap, OgColGap);
        dragElm.styles = {
          ...dragElm.styles,
          gridColumnStart: column.start,
          gridColumnEnd: column.start + OgColGap,
          gridRowStart: row.top,
          gridRowEnd: row.top + OgRowGap,
        };
        console.log(dragElm);
        slots[dragElmIndex] = dragElm;
      }
    }
    // update state
    setState({
      slots: slots,
    });
    // This way we could manually update the DOM
    // var node = document.createElement("div"); // is a node
    // This 'renderToString' converts the component into string so that we can append it to DOM
    // node.innerHTML = renderToString(<Button />);
    // node.style.position = "absolute";
    // if (event.target.clientHeight + event.target.offsetTop < event.pageY) {
    //   event.target.clientHeight += event.pageY - event.target.clientHeight;
    // }
    // node.style.left = event.pageX + "px";
    // node.style.top = event.pageY + "px";
    // event.target.appendChild(node);
    return true;
  };
  const handleGridDragOver = (event: any) => {
    // console.log(event, "handleGridDragOver");
    event.preventDefault(); // Necessary. Allows us to drop.
    return false;
  };
  const makeSlots = () => {
    return state.slots.map((slot, index) => (
      <Slot
        box={slot}
        key={slot.id}
        draggable="true"
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        index={index}
      />
    ));
  };
  return (
    <div
      id="hero"
      className={styles.SlotsGroupv2}
      // onDrop={handleGridDrop}
      // onDragOver={handleGridDragOver}
    >
      {makeSlots()}
    </div>
  );
};
const GridV2: NextPage = () => {
  const [canvasDims, setCanvasDims] = useState<CanvasDimenstions | undefined>();
  const [columns, setColumns] = useState({});
  const [rows, setRows] = useState({});
  useEffect(() => {
    const el = document.getElementById("hero");
    // getBoundingClientRect output
    // {
    //   bottom: 609.40625;
    //   height: 545.40625;
    //   left: 32;
    //   right: 1190;
    //   top: 64;
    //   width: 1158;
    //   x: 32;
    //   y: 64;
    // }
    console.log(el?.getBoundingClientRect());
    const dimenstions = el?.getBoundingClientRect();
    setCanvasDims(dimenstions);
    // if (dimenstions) {
    // this will let us increase the height dynamically
    // el.style.height = dimenstions.height + 200 + "px";
    // }
  }, []);
  useEffect(() => {
    if (!canvasDims?.width) {
      return;
    }
    const columnWidth = (canvasDims.width - 8 * (COLUMNS - 1)) / COLUMNS;
    // set column left and right bound
    const columnsObj = getColumsPositions(
      parseInt(String(columnWidth)),
      canvasDims.x
    );
    // since the height auto increases so its fixed
    const columnHeight = 40;
    const rowPositions = getRowsPositions(columnHeight, canvasDims.y);
    setColumns(columnsObj);
    setRows(rowPositions);
  }, [canvasDims?.width, canvasDims?.x, canvasDims?.y]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <SlotsGroup columns={columns} rows={rows} />
      </main>
      <div>
        {/* <Draggable type="Button">
          <Button />
        </Draggable> */}
      </div>
      <footer className={styles.footer}></footer>
    </div>
  );
};
const Button = () => {
  const handleDragStart = (event: any) => {
    console.log("started");
    let dragElementType = JSON.stringify({ type: "Button" });
    event.dataTransfer.setData("dragContent", dragElementType);
  };
  return (
    <div className={styles.drag}>
      <button draggable="true" onDragStart={handleDragStart}>
        Click Me
      </button>
    </div>
  );
};
const Draggable = (props: React.PropsWithChildren<{ type: String }>) => {
  const handleDragStart = (event: any) => {
    console.log("started");
    let dragElementType = JSON.stringify({ type: props.type });
    event.dataTransfer.setData("dragContent", dragElementType);
  };
  return (
    <div className={styles.drag} draggable="true" onDragStart={handleDragStart}>
      {props.children}
    </div>
  );
};
export default GridV2;
