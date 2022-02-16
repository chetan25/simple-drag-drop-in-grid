export type CanvasDimenstions = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
};

export type ColumnsType = Record<string, { left: number; right: number }>;
export type RowType = Record<string, { top: number; bottom: number }>;
