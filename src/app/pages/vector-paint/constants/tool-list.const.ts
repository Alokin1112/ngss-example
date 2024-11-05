import { ToolItem } from "@pages/vector-paint/interfaces/vector-paint-tool-options.interface";

export const TOOL_LIST: ToolItem[] = [
  {
    icon: 'north_west',
    label: 'Cursor',
    value: 'CURSOR',
  },
  {
    icon: 'horizontal_rule',
    label: 'Line',
    value: 'LINE',
  },
  {
    icon: 'square',
    label: 'Rectangle',
    value: 'RECTANGLE',
  },
  {
    icon: 'circle',
    label: 'Circle',
    value: 'CIRCLE',
  },
  {
    icon: 'play_arrow',
    label: 'Triangle',
    value: 'TRIANGLE',
  },
]