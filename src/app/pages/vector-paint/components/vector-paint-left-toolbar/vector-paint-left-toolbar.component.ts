import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TOOL_LIST } from '@pages/vector-paint/constants/tool-list.const';
import { ToolItem, ToolItemType } from '@pages/vector-paint/interfaces/vector-paint-tool-options.interface';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'ds-vector-paint-left-toolbar',
  standalone: true,
  imports: [
    CommonModule, MatIconModule, MatButtonModule, MatTooltipModule
  ],
  templateUrl: './vector-paint-left-toolbar.component.html',
  styleUrl: './vector-paint-left-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VectorPaintLeftToolbarComponent {

  dsActiveTool = model.required<ToolItemType>();

  readonly toolsList = TOOL_LIST;


  changeTool(tool: ToolItem) {
    this.dsActiveTool.set(tool.value);
  }
}
