import { AnyShape } from "@pages/vector-paint/interfaces/vector-shapes.interface";
import { shuffle } from "@pages/vector-paint/tests/shuffle.const";
import { ExecutionAction } from "@pages/vector-paint/tests/test-actions-executor.const";


export const SEED: number = 2137;

export const AddTreeShapes: AnyShape[] = [
  {
    "type": "RECTANGLE",
    "properties": {
      "x": 163,
      "y": 482,
      "width": 31,
      "height": 171,
      "fill": "#6b0000",
      "rotateDeg": 0,
      "rotateX": 178,
      "rotateY": 567
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 174,
      "cy": 435,
      "rx": 0,
      "ry": 0,
      "fill": "#087a00",
      "rotateDeg": 0,
      "rotateX": 174,
      "rotateY": 435
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 156,
      "cy": 481,
      "rx": 25,
      "ry": 26,
      "fill": "#087a00",
      "rotateDeg": 0,
      "rotateX": 156,
      "rotateY": 481
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 205,
      "cy": 445,
      "rx": 25,
      "ry": 24,
      "fill": "#087a00",
      "rotateDeg": 0,
      "rotateX": 205,
      "rotateY": 445
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 169,
      "cy": 440,
      "rx": 23,
      "ry": 23,
      "fill": "#087a00",
      "rotateDeg": 0,
      "rotateX": 169,
      "rotateY": 440
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 206,
      "cy": 490,
      "rx": 26,
      "ry": 27,
      "fill": "#087a00",
      "rotateDeg": 0,
      "rotateX": 206,
      "rotateY": 490
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 186,
      "cy": 466,
      "rx": 25,
      "ry": 23,
      "fill": "#0d9603",
      "rotateDeg": 0,
      "rotateX": 186,
      "rotateY": 466
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 152,
      "cy": 462,
      "rx": 20,
      "ry": 22,
      "fill": "#0d9603",
      "rotateDeg": 0,
      "rotateX": 152,
      "rotateY": 462
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 136,
      "cy": 408,
      "rx": 1,
      "ry": 0,
      "fill": "#0d9603",
      "rotateDeg": 0,
      "rotateX": 136,
      "rotateY": 408
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 138,
      "cy": 434,
      "rx": 20,
      "ry": 23,
      "fill": "#0d9603",
      "rotateDeg": 0,
      "rotateX": 138,
      "rotateY": 434
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 195,
      "cy": 422,
      "rx": 23,
      "ry": 25,
      "fill": "#0d9603",
      "rotateDeg": 0,
      "rotateX": 195,
      "rotateY": 422
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 233,
      "cy": 472,
      "rx": 21,
      "ry": 20,
      "fill": "#0d9603",
      "rotateDeg": 0,
      "rotateX": 233,
      "rotateY": 472
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 142,
      "cy": 478,
      "rx": 0,
      "ry": 0,
      "fill": "#2cb422",
      "rotateDeg": 0,
      "rotateX": 142,
      "rotateY": 478
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 141,
      "cy": 484,
      "rx": 25,
      "ry": 27,
      "fill": "#2cb422",
      "rotateDeg": 0,
      "rotateX": 141,
      "rotateY": 484
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 137,
      "cy": 452,
      "rx": 13,
      "ry": 11,
      "fill": "#2cb422",
      "rotateDeg": 0,
      "rotateX": 137,
      "rotateY": 452
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 184,
      "cy": 494,
      "rx": 21,
      "ry": 24,
      "fill": "#2cb422",
      "rotateDeg": 0,
      "rotateX": 184,
      "rotateY": 494
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 238,
      "cy": 450,
      "rx": 23,
      "ry": 22,
      "fill": "#2cb422",
      "rotateDeg": 0,
      "rotateX": 238,
      "rotateY": 450
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 166,
      "cy": 418,
      "rx": 22,
      "ry": 22,
      "fill": "#2cb422",
      "rotateDeg": 0,
      "rotateX": 166,
      "rotateY": 418
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 236,
      "cy": 497,
      "rx": 19,
      "ry": 20,
      "fill": "#2cb422",
      "rotateDeg": 0,
      "rotateX": 236,
      "rotateY": 497
    }
  },
  {
    "type": "LINE",
    "properties": {
      "x1": 227,
      "y1": 527,
      "x2": 227,
      "y2": 527,
      "fill": "#2cb422",
      "width": 2,
      "rotateDeg": 0,
      "rotateX": 227,
      "rotateY": 527
    }
  },
  {
    "type": "LINE",
    "properties": {
      "x1": 193,
      "y1": 500,
      "x2": 194,
      "y2": 497,
      "fill": "#2cb422",
      "width": 2,
      "rotateDeg": 0,
      "rotateX": 193,
      "rotateY": 498
    }
  },
  {
    "type": "LINE",
    "properties": {
      "x1": 223,
      "y1": 495,
      "x2": 223,
      "y2": 495,
      "fill": "#4d0000",
      "width": 2,
      "rotateDeg": 0,
      "rotateX": 223,
      "rotateY": 495
    }
  },
  {
    "type": "LINE",
    "properties": {
      "x1": 126,
      "y1": 504,
      "x2": 126,
      "y2": 528,
      "fill": "#4d0000",
      "width": 2,
      "rotateDeg": 0,
      "rotateX": 126,
      "rotateY": 516
    }
  },
  {
    "type": "LINE",
    "properties": {
      "x1": 169,
      "y1": 448,
      "x2": 169,
      "y2": 467,
      "fill": "#4d0000",
      "width": 2,
      "rotateDeg": 0,
      "rotateX": 169,
      "rotateY": 457
    }
  },
  {
    "type": "LINE",
    "properties": {
      "x1": 236,
      "y1": 441,
      "x2": 236,
      "y2": 463,
      "fill": "#4d0000",
      "width": 2,
      "rotateDeg": 0,
      "rotateX": 236,
      "rotateY": 452
    }
  },
  {
    "type": "LINE",
    "properties": {
      "x1": 246,
      "y1": 502,
      "x2": 246,
      "y2": 525,
      "fill": "#4d0000",
      "width": 2,
      "rotateDeg": 0,
      "rotateX": 246,
      "rotateY": 513
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 125,
      "cy": 532,
      "rx": 14,
      "ry": 15,
      "fill": "#d10000",
      "rotateDeg": 0,
      "rotateX": 125,
      "rotateY": 532
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 171,
      "cy": 469,
      "rx": 9,
      "ry": 10,
      "fill": "#d10000",
      "rotateDeg": 0,
      "rotateX": 171,
      "rotateY": 469
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 236,
      "cy": 466,
      "rx": 9,
      "ry": 9,
      "fill": "#d10000",
      "rotateDeg": 0,
      "rotateX": 236,
      "rotateY": 466
    }
  },
  {
    "type": "ELLIPSE",
    "properties": {
      "cx": 245,
      "cy": 526,
      "rx": 14,
      "ry": 14,
      "fill": "#d10000",
      "rotateDeg": 0,
      "rotateX": 245,
      "rotateY": 526
    }
  }
]

export const TEST_MODIFY_ACTIONS_ONLY_ADD: ExecutionAction<AnyShape>[] = shuffle(
  AddTreeShapes.map(shape => ({ type: 'add', payload: shape })),
  SEED
);

export const UpdateTreeShapes: { index: number, shape: AnyShape }[] = [
  {
    index: 0,
    shape: {
      "type": "RECTANGLE",
      "properties": {
        "x": 330,
        "y": 641,
        "width": 0,
        "height": 0,
        "fill": "#66dd66",
        "rotateDeg": 0,
        "rotateX": 330,
        "rotateY": 641
      }
    },
  },
  {
    index: 1,
    shape: {
      "type": "RECTANGLE",
      "properties": {
        "x": 0,
        "y": 600,
        "width": 1395,
        "height": 114,
        "fill": "#66dd66",
        "rotateDeg": 0,
        "rotateX": 697,
        "rotateY": 657
      }
    },
  },
  {
    index: 4,
    shape: {
      "type": "RECTANGLE",
      "properties": {
        "x": 963,
        "y": 595,
        "width": 26,
        "height": 137,
        "fill": "#ffe565",
        "rotateDeg": 30,
        "rotateX": 974,
        "rotateY": 659
      }
    },
  },
  {
    index: 14,
    shape: {
      "type": "RECTANGLE",
      "properties": {
        "x": 1169,
        "y": 547,
        "width": 26,
        "height": 8,
        "fill": "#d01b21",
        "rotateDeg": 0,
        "rotateX": 1182,
        "rotateY": 551
      }
    },
  },
  {
    index: 23,
    shape: {
      "type": "TRIANGLE",
      "properties": {
        "baseStartX": 0,
        "baseStartY": 450,
        "baseWidth": 0,
        "height": 0,
        "fill": "#524c48",
        "rotateDeg": 0,
        "rotateX": 0,
        "rotateY": 450
      }
    },
  },
  {
    index: 31,
    shape: {
      "type": "TRIANGLE",
      "properties": {
        "baseStartX": 658,
        "baseStartY": 541,
        "baseWidth": 232,
        "height": 355,
        "fill": "#bbbbbb",
        "rotateDeg": 0,
        "rotateX": 701,
        "rotateY": 380
      }
    },
  },
  {
    index: 35,
    shape: {
      "type": "TRIANGLE",
      "properties": {
        "baseStartX": 860,
        "baseStartY": 450,
        "baseWidth": 421,
        "height": 125,
        "fill": "#634b42",
        "rotateDeg": 0,
        "rotateX": 1088,
        "rotateY": 538
      }
    },
  },
  {
    index: 7,
    shape: {
      "type": "RECTANGLE",
      "properties": {
        "x": 1078,
        "y": 493,
        "width": 74,
        "height": 66,
        "fill": "#24acf2",
        "rotateDeg": 0,
        "rotateX": 1015,
        "rotateY": 2010
      }
    },
  },
  {
    index: 8,
    shape: {
      "type": "LINE",
      "properties": {
        "x1": 975,
        "y1": 589,
        "x2": 983,
        "y2": 592,
        "fill": "#122112",
        "width": 3,
        "rotateDeg": 0,
        "rotateX": 978,
        "rotateY": 592
      }
    },
  },
  {
    index: 10,
    shape: {
      "type": "LINE",
      "properties": {
        "x1": 1070,
        "y1": 529,
        "x2": 1149,
        "y2": 529,
        "fill": "#303030",
        "width": 3,
        "rotateDeg": 0,
        "rotateX": 1114,
        "rotateY": 529
      }
    },
  },
  {
    index: 36,
    shape: {
      type: "ELLIPSE",
      properties: {
        cx: 1171,
        cy: 290,
        rx: 28,
        ry: 31,
        fill: "#7d7d7d",
        rotateDeg: 0,
        rotateX: 1171,
        rotateY: 290
      }
    }
  },
  {
    index: 37,
    shape: {
      type: "ELLIPSE",
      properties: {
        cx: 1193,
        cy: 272,
        rx: 21,
        ry: 21,
        fill: "#b0b0b0",
        rotateDeg: 0,
        rotateX: 1193,
        rotateY: 272
      }
    }
  },
  {
    index: 38,
    shape: {
      type: "ELLIPSE",
      properties: {
        cx: 1178,
        cy: 239,
        rx: 27,
        ry: 27,
        fill: "#7d7d7d",
        rotateDeg: 0,
        rotateX: 1178,
        rotateY: 239
      }
    }
  },
  {
    index: 39,
    shape: {
      type: "ELLIPSE",
      properties: {
        cx: 1217,
        cy: 236,
        rx: 20,
        ry: 19,
        fill: "#b3b3b3",
        rotateDeg: 0,
        rotateX: 1217,
        rotateY: 236
      }
    }
  },
  {
    index: 40,
    shape: {
      type: "ELLIPSE",
      properties: {
        cx: 1151,
        cy: 264,
        rx: 12,
        ry: 14,
        fill: "#b3b3b3",
        rotateDeg: 0,
        rotateX: 1151,
        rotateY: 264
      }
    }
  },
  {
    index: 41,
    shape: {
      type: "ELLIPSE",
      properties: {
        cx: 1207,
        cy: 208,
        rx: 21,
        ry: 21,
        fill: "#6b6b6b",
        rotateDeg: 0,
        rotateX: 1207,
        rotateY: 208
      }
    }
  },
  {
    index: 42,
    shape: {
      type: "ELLIPSE",
      properties: {
        cx: 1174,
        cy: 218,
        rx: 20,
        ry: 19,
        fill: "#949494",
        rotateDeg: 0,
        rotateX: 1174,
        rotateY: 218
      }
    }
  },
  {
    index: 43,
    shape: {
      type: "ELLIPSE",
      properties: {
        cx: 1155,
        cy: 226,
        rx: 30,
        ry: 22,
        fill: "#999994",
        rotateDeg: 0,
        rotateX: 1174,
        rotateY: 218
      }
    }
  },
  {
    index: 44,
    shape: {
      type: "ELLIPSE",
      properties: {
        cx: 1150,
        cy: 241,
        rx: 20,
        ry: 19,
        fill: "#646464",
        rotateDeg: 0,
        rotateX: 1174,
        rotateY: 218
      }
    }
  },
  {
    index: 19,
    shape: {
      type: "RECTANGLE",
      properties: {
        x: 992,
        y: 496,
        width: 38,
        height: 10,
        fill: "#ff7300",
        rotateDeg: 0,
        rotateX: 1011,
        rotateY: 501
      }
    }
  },
  {
    index: 20,
    shape: {
      type: "RECTANGLE",
      properties: {
        x: 1008,
        y: 510,
        width: 17,
        height: 8,
        fill: "#ff7300",
        rotateDeg: 0,
        rotateX: 1016,
        rotateY: 514
      }
    }
  },
  {
    index: 21,
    shape: {
      type: "RECTANGLE",
      properties: {
        x: 978,
        y: 509,
        width: 26,
        height: 11,
        fill: "#ff7300",
        rotateDeg: 0,
        rotateX: 988,
        rotateY: 512
      }
    }
  },
  {
    index: 22,
    shape: {
      type: "RECTANGLE",
      properties: {
        x: 972,
        y: 483,
        width: 31,
        height: 9,
        fill: "#ff7300",
        rotateDeg: 0,
        rotateX: 985,
        rotateY: 481
      }
    }
  },
  {
    index: 23,
    shape: {
      type: "RECTANGLE",
      properties: {
        x: 1010,
        y: 482,
        width: 33,
        height: 11,
        fill: "#ff7300",
        rotateDeg: 0,
        rotateX: 1026,
        rotateY: 481
      }
    }
  },
  {
    index: 24,
    shape: {
      type: "RECTANGLE",
      properties: {
        x: 0,
        y: 451,
        width: 0,
        height: 0,
        fill: "#8f8f8f",
        rotateDeg: 0,
        rotateX: 0,
        rotateY: 451
      }
    }
  },
  {
    index: 25,
    shape: {
      type: "RECTANGLE",
      properties: {
        x: 55,
        y: 527,
        width: 0,
        height: 0,
        fill: "#8f8f8f",
        rotateDeg: 0,
        rotateX: 55,
        rotateY: 527
      }
    }
  },
  {
    index: 26,
    shape: {
      type: "RECTANGLE",
      properties: {
        x: 44,
        y: 518,
        width: 0,
        height: 0,
        fill: "#8f8f8f",
        rotateDeg: 0,
        rotateX: 44,
        rotateY: 518
      }
    }
  },
  {
    index: 27,
    shape: {
      type: "RECTANGLE",
      properties: {
        x: 0,
        y: 541,
        width: 778,
        height: 502,
        fill: "#c7c7c7",
        rotateDeg: 0,
        rotateX: 460,
        rotateY: 290
      }
    }
  },
  {
    index: 28,
    shape: {
      type: "RECTANGLE",
      properties: {
        x: 0,
        y: 538,
        width: 473,
        height: 487,
        fill: "#8f8f8f",
        rotateDeg: 0,
        rotateX: 287,
        rotateY: 294
      }
    }
  },
  {
    index: 29,
    shape: {
      type: "RECTANGLE",
      properties: {
        x: 344,
        y: 541,
        width: 376,
        height: 458,
        fill: "#8f8f8f",
        rotateDeg: 0,
        rotateX: 694,
        rotateY: 312
      }
    }
  },
];

export const TEST_MODIFY_ACTIONS_ONLY_UPDATE: ExecutionAction<{ index: number, shape: AnyShape }>[] = shuffle(
  UpdateTreeShapes.map(({ index, shape }) => ({ type: 'update', payload: { index, shape } })),
  SEED
);


export const RemoveTreeShapes: number[] = [
  0, 1, 4, 14, 23, 31, 35, 7, 8, 10, 36, 37, 38, 39, 40, 41, 42, 43, 44, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29
];

export const TEST_MODIFY_ACTIONS_ONLY_REMOVE: ExecutionAction<number>[] = shuffle(
  RemoveTreeShapes.map(index => ({ type: 'delete', payload: index })),
  SEED
);

export const TEST_MODIFY_ACTION_ADD_UPDATE = shuffle(
  [...TEST_MODIFY_ACTIONS_ONLY_ADD.slice(0, 15), ...TEST_MODIFY_ACTIONS_ONLY_UPDATE.slice(0, 15)],
  SEED
);

export const TEST_MODIFY_ACTION_ADD_REMOVE = shuffle(
  [...TEST_MODIFY_ACTIONS_ONLY_ADD.slice(0, 15), ...TEST_MODIFY_ACTIONS_ONLY_REMOVE.slice(0, 15)],
  SEED
);

const FIELDS_ALLOWED_TO_USE_WITH_UPDATE = TEST_MODIFY_ACTIONS_ONLY_REMOVE.filter(action => TEST_MODIFY_ACTIONS_ONLY_UPDATE.slice(0, 10).find(updateAction => updateAction?.payload?.index === action.payload) === undefined);

export const TEST_MODIFY_ADD_UPDATE_REMOVE = shuffle(
  [...TEST_MODIFY_ACTIONS_ONLY_ADD.slice(0, 10), ...TEST_MODIFY_ACTIONS_ONLY_UPDATE.slice(0, 10), ...FIELDS_ALLOWED_TO_USE_WITH_UPDATE.slice(0, 10)],
  SEED
);