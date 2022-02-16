import { RowType, ColumnsType } from "./types";

export const COLUMNS = 12;

export const getColumsPositions = (
  columnWidth: number,
  canvasPositionX: number
) => {
  const columnsObj: ColumnsType = {};
  columnsObj["1"] = {
    left: canvasPositionX,
    right: columnWidth + canvasPositionX + 8,
  };
  // left: columnsObj["1"]["right"] + 8,
  columnsObj["2"] = {
    left: columnsObj["1"]["right"] + 8,
    right: columnWidth + columnsObj["1"]["right"] + 8,
  };
  columnsObj["3"] = {
    left: columnsObj["2"]["right"] + 8,
    right: columnWidth + columnsObj["2"]["right"] + 8,
  };
  columnsObj["4"] = {
    left: columnsObj["3"]["right"] + 8,
    right: columnWidth + columnsObj["3"]["right"] + 8,
  };
  columnsObj["5"] = {
    left: columnsObj["4"]["right"] + 8,
    right: columnWidth + columnsObj["4"]["right"] + 8,
  };

  columnsObj["6"] = {
    left: columnsObj["5"]["right"] + 8,
    right: columnWidth + columnsObj["5"]["right"] + 8,
  };

  columnsObj["7"] = {
    left: columnsObj["6"]["right"] + 8,
    right: columnWidth + columnsObj["6"]["right"] + 8,
  };
  columnsObj["8"] = {
    left: columnsObj["7"]["right"] + 8,
    right: columnWidth + columnsObj["7"]["right"] + 8,
  };

  columnsObj["9"] = {
    left: columnsObj["8"]["right"] + 8,
    right: columnWidth + columnsObj["8"]["right"] + 8,
  };

  columnsObj["10"] = {
    left: columnsObj["9"]["right"] + 8,
    right: columnWidth + columnsObj["9"]["right"] + 8,
  };

  columnsObj["11"] = {
    left: columnsObj["10"]["right"] + 8,
    right: columnWidth + columnsObj["10"]["right"] + 8,
  };

  columnsObj["12"] = {
    left: columnsObj["11"]["right"] + 8,
    right: columnWidth + columnsObj["11"]["right"] + 8,
  };

  return columnsObj;
};

export const getRowsPositions = (
  columnHeight: number,
  canvasPositionY: number
) => {
  console.log({ columnHeight });
  const rowObj: RowType = {};
  rowObj["1"] = {
    top: canvasPositionY,
    bottom: columnHeight + canvasPositionY,
  };
  //  top: rowObj["1"]["bottom"] + 8,
  rowObj["2"] = {
    top: rowObj["1"]["bottom"] + 8,
    bottom: columnHeight + rowObj["1"]["bottom"] + 8,
  };
  rowObj["3"] = {
    top: rowObj["2"]["bottom"] + 8,
    bottom: columnHeight + rowObj["2"]["bottom"] + 8,
  };
  rowObj["4"] = {
    top: rowObj["3"]["bottom"] + 8,
    bottom: columnHeight + rowObj["3"]["bottom"] + 8,
  };
  rowObj["5"] = {
    top: rowObj["4"]["bottom"] + 8,
    bottom: columnHeight + rowObj["4"]["bottom"] + 8,
  };

  rowObj["6"] = {
    top: rowObj["5"]["bottom"] + 8,
    bottom: columnHeight + rowObj["5"]["bottom"] + 8,
  };

  rowObj["7"] = {
    top: rowObj["6"]["bottom"] + 8,
    bottom: columnHeight + rowObj["6"]["bottom"] + 8,
  };
  rowObj["8"] = {
    top: rowObj["7"]["bottom"] + 8,
    bottom: columnHeight + rowObj["7"]["bottom"] + 8,
  };

  rowObj["9"] = {
    top: rowObj["8"]["bottom"] + 8,
    bottom: columnHeight + rowObj["8"]["bottom"] + 8,
  };

  rowObj["10"] = {
    top: rowObj["9"]["bottom"] + 8,
    bottom: columnHeight + rowObj["9"]["bottom"] + 8,
  };

  rowObj["11"] = {
    top: rowObj["10"]["bottom"] + 8,
    bottom: columnHeight + rowObj["10"]["bottom"] + 8,
  };

  rowObj["12"] = {
    top: rowObj["11"]["bottom"] + 8,
    bottom: columnHeight + rowObj["11"]["bottom"] + 8,
  };

  return rowObj;
};
