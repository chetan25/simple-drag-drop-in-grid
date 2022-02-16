import type { NextPage } from "next";
import { useEffect, useState } from "react";
// import { renderToString } from "react-dom/server";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { RowType, ColumnsType, CanvasDimenstions } from "../utils/types";
import { COLUMNS, getColumsPositions, getRowsPositions } from "../utils/helper";
import Draggable from "../components/draggable";

// Draggable and droppable component
const Slot = (props: any) => {
  const customStyles = {
    backgroundColor: props.box.color,
    ...props.box.styles,
  };

  return (
    <div
      className={styles.box}
      style={customStyles}
      draggable={props.draggable}
      onDragStart={props.onDragStart({ id: props.box.id })}
      onDragOver={props.onDragOver({ id: props.box.id })}
      onDrop={props.onDrop({ id: props.box.id })}
    >
      <div className={styles.content}>{props.box.children()}</div>
    </div>
  );
};

// dummy list of elments in slots
const slots = [
  {
    id: 1, // id used to reference the element
    name: "Slot1",
    color: "red",
    styles: {
      gridColumnStart: 3,
      gridColumnEnd: 7,
      gridRowStart: 1,
      gridRowEnd: 3,
      height: "150px",
      display: "flex",
    },
    children: () => {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <img alt="dummy logo" src="/dummy.png" className={styles.img} />
        </div>
      );
    },
  },
  {
    id: 2,
    name: "Slot2",
    color: "green",
    styles: {
      // gridColumn: "3/ 7",
      gridColumnStart: 3,
      gridColumnEnd: 7,
      gridRowStart: 4,
      gridRowEnd: 9,
      // gridRow: "4 / 9",
      // height: "100%",
      display: "flex",
    },
    children: () => {
      return <h1>I am Slot 2</h1>;
    },
  },
  {
    id: 3,
    name: "Slot3",
    color: "blue",
    styles: {
      // gridColumn: "9/ 12",
      gridColumnStart: 9,
      gridColumnEnd: 12,
      gridRowStart: 5,
      gridRowEnd: 9,
      // gridRow: "5 / 9",
      // height: "100%",
      display: "flex",
    },
    children: () => {
      return <h1>I am Slot 3</h1>;
    },
  },
  {
    id: 4,
    name: "Slot4",
    color: "orange",
    styles: {
      // gridColumn: "11/ 13",
      gridColumnStart: 11,
      gridColumnEnd: 13,
      gridRowStart: 1,
      gridRowEnd: 3,
      // gridRow: "1 / 3",
      // height: "100%",
      display: "flex",
    },
    children: () => {
      return (
        <h4>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of
        </h4>
      );
    },
  },
  {
    id: 5,
    name: "Slot5",
    color: "pink",
    styles: {
      // gridColumn: "1 / 3",
      gridColumnStart: 1,
      gridColumnEnd: 3,
      gridRowStart: 8,
      gridRowEnd: 13,
      // gridRow: "8 / 13",
      height: "100%",
      display: "flex",
    },
    children: () => {
      return (
        <div>
          <input placeholder="Enter a Text" />
        </div>
      );
    },
  },
  {
    id: 6,
    name: "Slot6",
    color: "yellow",
    styles: {
      // gridColumn: "1 / 3",
      gridColumnStart: 1,
      gridColumnEnd: 3,
      gridRowStart: 1,
      gridRowEnd: 3,
      // gridRow: "1 / 3",
      // height: "100%",
      display: "flex",
    },
    children: () => {
      return (
        <div id="cta">
          <button>Call to Action</button>
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
  const [state, setState] = useState<{ slots: Record<any, any>[] }>({
    slots: slots,
  });

  /**
   * Function to swap the elements.
   * Basically we swap the style and the children object.
   */
  const swapSlotes = (fromSlot: any, toSlot: any) => {
    console.log(fromSlot);
    console.log(toSlot);
    let slots = state.slots.slice();
    let fromIndex = -1;
    let toIndex = -1;
    for (let i = 0; i < slots.length; i++) {
      if (slots[i].id === fromSlot.id) {
        fromIndex = i;
      }
      if (slots[i].id === toSlot.id) {
        toIndex = i;
      }
    }
    if (fromIndex != -1 && toIndex != -1) {
      let {
        id: fromId,
        children: fromChildren,
        color: fromColor,
        ...fromRest
      } = slots[fromIndex];
      let {
        id: toId,
        children: toChildren,
        color: toColor,
        ...toRest
      } = slots[toIndex];
      slots[fromIndex] = {
        ...slots[fromIndex],
        children: toChildren,
        color: toColor,
      };
      slots[toIndex] = {
        ...slots[toIndex],
        children: fromChildren,
        color: fromColor,
      };
    }
    console.log({ slots });

    setState({ slots: slots });
  };

  /* The dragstart event is fired when the user starts dragging an element or text selection */
  /* event.target is the source element : that is dragged */
  /* Firefox requires calling dataTransfer.setData for the drag to properly work */
  const handleDragStart = (data: any) => (event: any) => {
    let fromSlot = JSON.stringify({ id: data.id });
    event.dataTransfer.setData("dragContent", fromSlot);
  };

  /* The dragover event is fired when an element or text selection is being dragged */
  /* over a valid drop target (every few hundred milliseconds) */
  /* The event is fired on the drop target(s) */
  const handleDragOver = (data: any) => (event: any) => {
    event.preventDefault(); // Necessary. Allows us to drop.
    return false;
  };

  /* Fired when an element or text selection is dropped on a valid drop target */
  /* The event is fired on the drop target(s) */
  const handleDrop = (data: any) => (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    let fromSlot = JSON.parse(event.dataTransfer.getData("dragContent"));
    let toSlot = { id: data.id };
    console.log({ toSlot });
    swapSlotes(fromSlot, toSlot);
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
        color: "grey",
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
      // If we are dragging and droping elements within the grid
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
    event.preventDefault(); // Necessary. Allows us to drop.
    return false;
  };

  const makeSlotes = () => {
    return state.slots.map((slot, index) => (
      <Slot
        box={slot}
        key={slot.id}
        draggable="true"
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        index={index}
      />
    ));
  };
  return (
    <div
      id="hero"
      className={styles.SlotsGroup}
      onDrop={handleGridDrop}
      onDragOver={handleGridDragOver}
    >
      {makeSlotes()}
    </div>
  );
};

const Home: NextPage = () => {
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
        <Draggable type="Button">
          <Button />
        </Draggable>
      </div>
      <footer className={styles.footer}></footer>
    </div>
  );
};

const Button = () => {
  return <button>Click Me</button>;
};

export default Home;
