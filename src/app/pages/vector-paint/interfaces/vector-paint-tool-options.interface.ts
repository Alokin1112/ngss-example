
export type ToolItemType = 'CURSOR' | 'RECTANGLE' | 'CIRCLE' | 'TRIANGLE' | 'LINE';

export interface ToolItem {
  icon: string,
  label: string,
  value: ToolItemType,
}
