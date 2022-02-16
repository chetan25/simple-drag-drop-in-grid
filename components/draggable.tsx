import React from "react";
import styles from "../styles/Home.module.css";

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

export default Draggable;
