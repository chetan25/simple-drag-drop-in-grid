import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/flex.module.css";
import { CanvasDimenstions } from "../utils/types";

// Draggable and droppable component
const Slot = (props: any) => {
  const customStyles = {
    ...props.box.styles,
  };

  return (
    <div
      id={`${props.box.nodeId}-${props.box.groupId}`}
      style={customStyles}
      draggable={props.draggable}
      onDragStart={props.onDragStart({ element: props.box })}
      className={`dropzone ${styles.zone}`}
      onDragOver={props.onDragOver({ element: props.box })}
      onDrop={props.onDrop({ element: props.box })}
      onDragEnter={props.onDragEnter({ element: props.box })}
      onDragLeave={props.onDragLeave({ element: props.box })}
    >
      <div
        className={styles.handle}
        id={`${props.box.nodeId}-${props.box.groupId}-handle`}
      ></div>
      <div
        className={` ${styles.content}`}
        style={{ backgroundColor: props.box.color }}
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
            <div style={{ width: "100%", height: "100%" }}>
              <h1>Two line long header example for your landing page</h1>
            </div>
          );
        },
      },
      {
        nodeId: 2,
        groupId: 1,
        children: () => {
          return (
            <p>
              Whether you’re a newbie landing page creator or a pro, Unbounce
              gives you the tools to not only build custom landing pages, but
              also get more conversions on your website.
            </p>
          );
        },
      },
      {
        nodeId: 3,
        groupId: 1,
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
              <div>
                <h4>Two line long header example for your landing page</h4>
              </div>
            </div>
          );
        },
      },
      {
        nodeId: 4,
        groupId: 1,
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
    ],
  },
  {
    id: 2,
    name: "Slot2",
    groupId: 2,
    groupType: "flexColumn",
    alignItems: "center",
    styles: {
      width: "60%",
      height: "100%",
      padding: "0px 0px 0px 0px",
    },
    nodes: [
      {
        groupId: 2,
        nodeId: 1,
        styles: {
          width: "60%",
          //   height: "100%",
          padding: "0px 0px 0px 0px",
        },
        children: () => {
          return (
            <div style={{ height: "80%" }}>
              <img
                src="https://user-assets-unbounce-com.s3.amazonaws.com/bb365067-415a-4ea4-ab60-9a8543ed09a5/805bfb1a-9d37-438b-b11e-269d5e3def17/575x375.original.jpg"
                className={styles.img}
              />
            </div>
          );
        },
      },
      {
        nodeId: 2,
        groupId: 2,
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
              <div>
                <h4>Second Group, is here</h4>
              </div>
            </div>
          );
        },
      },
      {
        nodeId: 3,
        groupId: 2,
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
              <div>
                <button>Second Group</button>
              </div>
            </div>
          );
        },
      },
    ],
  },
];

// we need this to reference the Handle bar
let target: any = null;

// main flex that renders the slots
const Groups = () => {
  const [state, setState] = useState<{ slots: Record<any, any>[] }>({
    slots: slots,
  });

  const [renderCounter, setRenderCounter] = useState(0);
  let dropSection: string | null = null;
  let draggedEl: any | null = null;

  useEffect(() => {
    // we assign the mousedown targer to the target element for later reference
    document.onmousedown = function (e) {
      target = e.target;
    };
  }, []);

  /* The dragstart event is fired when the user starts dragging an element or text selection */
  /* event.target is the source element : that is dragged */
  /* Firefox requires calling dataTransfer.setData for the drag to properly work */
  const handleDragStart = (data: any) => (event: any) => {
    const handleId = `${data.element.nodeId}-${data.element.groupId}-handle`;
    const handleEl = document.getElementById(handleId);
    if (handleEl!.contains(target!)) {
      event.stopPropagation();
      let draggedElement = JSON.stringify({ element: data.element });
      draggedEl = data.element;
      event.dataTransfer.setData("draggedElement", draggedElement);
    } else {
      event.preventDefault();
    }
  };

  /* The dragover event is fired when an element or text selection is being dragged */
  /* over a valid drop target (every few hundred milliseconds) */
  /* The event is fired on the drop target(s) */
  // data is for the element the valid drop zone or drag over on and not the dragged item
  const handleDragOver = (data: any) => (event: any) => {
    // detect if the drop item is over the item from same group
    const dropElGroupId = data.element.groupId;
    // event.dataTransfer.getData("draggedElement") --- does not exit at this point
    const dragElGroupId = draggedEl.groupId;
    event.preventDefault(); // Necessary. Allows us to drop.

    const elmCoords = event.target.getBoundingClientRect();
    const topLimit = elmCoords.top;
    const bottomLimit = elmCoords.bottom;
    const middleLimit = Math.floor((topLimit + bottomLimit) / 2);

    const groupId = data.element.groupId;
    const group = state.slots.find((slot) => slot.groupId === groupId);
    if (!group) {
      return false;
    }
    const groupType = group.groupType;

    if (event.target.className.includes("dropzone")) {
      // since we calculated the middlePoint with getBoundingClientRect
      // we need to use the clientY, since ts based to top of screen
      if (groupType === "flexColumn") {
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

    return false;
  };

  const onDragEnter = (data: any) => (event: any) => {
    const el = document.getElementById(
      `${data.element.nodeId}-${data.element.groupId}`
    );
    el!.setAttribute("data-draggingOver", "true");

    // event.stopPropagation();
    event.preventDefault();
    return false;
  };

  const onDragLeave = (data: any) => (event: any) => {
    if (event.target.className.includes("dropzone")) {
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
    if (event.target.className.includes("dropzone")) {
      event.target.style.border = "";
    }

    let newSlots = [];
    if (dragElGroupId !== dropElGroupId) {
      // source
      const sourceGroupIndex = state.slots.findIndex(
        (slot) => slot.groupId === dragElGroupId
      );
      const sourceGroup = state.slots[sourceGroupIndex];

      // destination
      const destGroupIndex = state.slots.findIndex(
        (slot) => slot.groupId === dropElGroupId
      );
      const destGroup = state.slots[destGroupIndex];

      // group before and after
      let beforeGroups = [];
      let middleGroups = [];
      let afterGroups = [];
      if (destGroupIndex < sourceGroupIndex) {
        beforeGroups = state.slots.slice(0, destGroupIndex);
        middleGroups = state.slots.slice(destGroupIndex + 1, sourceGroupIndex);
        afterGroups = state.slots.slice(sourceGroupIndex + 1);
        newSlots = [
          ...beforeGroups,
          destGroup,
          ...middleGroups,
          sourceGroup,
          ...afterGroups,
        ];
      } else {
        beforeGroups = state.slots.slice(0, sourceGroupIndex);
        middleGroups = state.slots.slice(sourceGroupIndex + 1, destGroupIndex);
        afterGroups = state.slots.slice(destGroupIndex + 1);

        newSlots = [
          ...beforeGroups,
          sourceGroup,
          ...middleGroups,
          destGroup,
          ...afterGroups,
        ];
      }

      const dropElId = data.element.nodeId;
      const drgElId = draggedEl.nodeId;

      // source all nodes move up
      const sourceNodes = [...state.slots[sourceGroupIndex].nodes];
      const sourceDragIndex = sourceNodes.findIndex(
        (node: any) => node.nodeId == drgElId
      );
      const restSourceNodes = state.slots[sourceGroupIndex].nodes.slice(
        0,
        sourceDragIndex
      );
      const sourceNewNodes = [...restSourceNodes];
      // loop and decrement nodeIndex
      for (let i = sourceDragIndex + 1; i < sourceNodes.length; i++) {
        sourceNewNodes.push({
          ...sourceNodes[i],
          nodeId: sourceNodes[i].nodeId - 1,
        });
      }
      // source code ends

      // destination
      const destNodes = [...state.slots[destGroupIndex].nodes];
      const destDropIndex = destNodes.findIndex(
        (node: any) => node.nodeId == dropElId
      );
      let destNewNodes = [];
      let beforeNodes = [];
      let startIndex = destDropIndex;
      if (dropSection == "top") {
        beforeNodes = destNodes.slice(0, destDropIndex);
        destNewNodes = [...beforeNodes];
        const nextNodeId =
          beforeNodes.length > 0
            ? beforeNodes[beforeNodes.length - 1].nodeId + 1
            : 1;

        destNewNodes.push({
          ...draggedEl,
          groupId: data.element.groupId,
          nodeId: nextNodeId,
        });
      } else {
        beforeNodes = destNodes.slice(0, destDropIndex + 1);
        const nextNodeId = beforeNodes[beforeNodes.length - 1].nodeId + 1;
        destNewNodes = [...beforeNodes];
        destNewNodes.push({
          ...draggedEl,
          groupId: data.element.groupId,
          nodeId: nextNodeId,
        });
        startIndex = destDropIndex + 1;
      }
      // loop and increment nodeIndex
      for (let i = startIndex; i < destNodes.length; i++) {
        destNewNodes.push({
          ...destNodes[i],
          nodeId: destNodes[i].nodeId + 1,
        });
      }
      newSlots[sourceGroupIndex] = {
        ...sourceGroup,
        nodes: sourceNewNodes,
      };
      newSlots[destGroupIndex] = {
        ...destGroup,
        nodes: destNewNodes,
      };
    } else {
      // const group
      const selectedGroupIndex = state.slots.findIndex(
        (slot) => slot.groupId === dragElGroupId
      );
      if (selectedGroupIndex < 0) {
        return false;
      }
      const group = state.slots[selectedGroupIndex];
      // state.slots.filter(
      //     (slot) => slot.groupId !== dragElGroupId
      //   );
      const groupsBeforeSelected = state.slots.slice(0, selectedGroupIndex);
      const groupsAfterSelected = state.slots.slice(selectedGroupIndex + 1);

      const nodes = [...group.nodes];
      const dropElId = data.element.nodeId;
      const drgElId = draggedEl.nodeId;
      const dropIndex = nodes.findIndex((node: any) => node.nodeId == dropElId);
      const dragIndex = nodes.findIndex((node: any) => node.nodeId == drgElId);
      if (dropIndex < 0 || dragIndex < 0) {
        return;
      }
      let newNodes;
      if (dropSection == "top") {
        // scenario 1 - item moved up
        if (dropIndex < dragIndex) {
          //   const end = dropIndex === 0 ? dropIndex : dropIndex;
          newNodes = nodes.slice(0, dropIndex);
          let nextNodeId =
            dropIndex === 0 ? 1 : newNodes[newNodes.length - 1].nodeId + 1;
          newNodes.push({
            ...nodes[dragIndex],
            nodeId: nextNodeId,
          });
          nextNodeId++;
          console.log(dropIndex, dragIndex);
          for (let i = dropIndex; i < nodes.length; i++) {
            console.log(i, dropIndex, dragIndex);
            if (i !== dragIndex) {
              newNodes.push({
                ...nodes[i],
                nodeId: nextNodeId,
              });
              nextNodeId++;
            }
          }
        } else {
          // scenario 1 - item moved down
          newNodes = nodes.slice(0, dragIndex);
          let nextNodeId =
            dragIndex === 0 ? 1 : newNodes[newNodes.length - 1].nodeId + 1;
          console.log(dropIndex, dragIndex);
          for (let i = dragIndex + 1; i < dropIndex; i++) {
            console.log(i, dropIndex, dragIndex);
            newNodes.push({
              ...nodes[i],
              nodeId: nextNodeId,
            });
            nextNodeId++;
          }
          newNodes.push({
            ...nodes[dragIndex],
            nodeId: nextNodeId,
          });
          const resNodes = nodes.slice(dropIndex);
          newNodes = [...newNodes, ...resNodes];
        }
      } else {
        // scenario 1 - item moved up
        if (dropIndex < dragIndex) {
          newNodes = nodes.slice(0, dropIndex + 1);
          console.log({ newNodes });
          let nextNodeId = newNodes[newNodes.length - 1].nodeId + 1;
          newNodes.push({
            ...nodes[dragIndex],
            nodeId: nextNodeId,
          });
          nextNodeId++;
          for (let i = dropIndex + 1; i < nodes.length; i++) {
            if (i !== dragIndex) {
              newNodes.push({
                ...nodes[i],
                nodeId: nextNodeId,
              });
              nextNodeId++;
            }
          }
        } else {
          const nodesAboveDragZone = nodes.slice(0, dragIndex);
          const nodesBelowDropZone = nodes.slice(dropIndex + 1);
          // need to filter the dragged node
          newNodes = [...nodesAboveDragZone];
          let nextNodeId =
            newNodes.length === 0
              ? 1
              : newNodes[newNodes.length - 1].nodeId + 1;
          for (let i = dragIndex + 1; i < dropIndex + 1; i++) {
            newNodes.push({
              ...nodes[i],
              nodeId: nextNodeId,
            });
            nextNodeId++;
          }
          newNodes.push({
            ...nodes[dragIndex],
            nodeId: nextNodeId,
          });
          newNodes = [...newNodes, ...nodesBelowDropZone];
        }
      }
      newSlots = [
        ...groupsBeforeSelected,
        {
          ...group,
          nodes: newNodes,
        },
        ...groupsAfterSelected,
      ];
    }

    dropSection = null;

    setState({
      slots: newSlots,
    });
    return false;
  };

  const handleGridDrop = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    const dragContent = JSON.parse(event.dataTransfer.getData("dragContent"));
    let column = { start: 0, end: 0 };
    // update state
    setState({
      slots: slots,
    });

    return true;
  };

  const handleSectionDragEnter = (event: any) => {
    event.target!.setAttribute("data-draggingOver", "true");
    event.preventDefault(); // Necessary. Allows us to drop
    return false;
  };

  const handleSectionDragStart = (event: any) => {
    // to prevent parent handler from listening
    event.stopPropagation();
    event.target!.setAttribute("data-draggingOver", "true");

    event.dataTransfer.setData("sectionDragged", event.target.id);
    return false;
  };

  const handleSectionDragOver = (event: any) => {
    // to prevent parent handler from listening
    event.stopPropagation();
    return false;
  };

  const makeSlots = () => {
    return state.slots.map((slot, index) => (
      <div
        className={`${styles.flexContainer} ${styles[slot.groupType]} ${
          styles[slot.alignItems]
        }`}
        key={index}
        style={{ width: slot.styles.width }}
        draggable="true"
        id={slot.groupId}
        onDragStart={handleSectionDragStart}
        onDragOver={handleSectionDragOver}
        // onDrop={props.onDrop({ element: props.box })}
        onDragEnter={handleSectionDragEnter}
        // onDragLeave={props.onDragLeave({ element: props.box })}
      >
        {/* <div id="handle" className={styles.handle}></div> */}
        {slot.nodes.map((node, key) => {
          return (
            <Slot
              box={node}
              key={`${node.nodeId}-${node.groupId}`}
              draggable="true"
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              index={key}
            />
          );
        })}
      </div>
    ));
  };
  return (
    <div
      id="hero"
      className={styles.flexGroup}
      // onDrop={handleGridDrop}
      // onDragOver={handleGridDragOver}
    >
      {makeSlots()}
    </div>
  );
};

const FlexDrag: NextPage = () => {
  const [canvasDims, setCanvasDims] = useState<CanvasDimenstions | undefined>();

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
    const dimenstions = el?.getBoundingClientRect();
    setCanvasDims(dimenstions);
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2>Simple Flex Based Approach</h2>
        <Groups />
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

export default FlexDrag;
