import { Injectable } from '@angular/core';
import { RevertChangesSavedStateCompressedWasmService } from 'projects/ngss/src/lib/revert-changes/revert-changes-saved-state/revert-changes-saved-state-compressed-wasm.service';
import { RevertChangesSavedStateCompressedService } from 'projects/ngss/src/lib/revert-changes/revert-changes-saved-state/revert-changes-saved-state-compressed.service';
import { RevertChangesSavedStateRawService } from 'projects/ngss/src/lib/revert-changes/revert-changes-saved-state/revert-changes-saved-state-raw.service';
import { RevertChangesSavedStateService, RevertChangesStateType } from 'projects/ngss/src/lib/revert-changes/revert-changes-service.interface';
import { WebAssemblyService } from 'projects/ngss/src/lib/web-assembly/web-assembly.service';

@Injectable()
export class RevertChangesSavedStateFactoryService {

  constructor(
    private wasmService: WebAssemblyService
  ) { }

  get<T>(type: RevertChangesStateType): RevertChangesSavedStateService<T> {
    switch (type) {
      case 'RAW':
        return new RevertChangesSavedStateRawService<T>();
      case 'COMPRESSED':
        return new RevertChangesSavedStateCompressedService<T>();
      case 'COMPRESSED_WEB_ASSEMBLY':
        return new RevertChangesSavedStateCompressedWasmService<T>(this.wasmService);
      default:
        throw new Error(`Unknown type of revert changes saved state: ${type}`);
    }
  }

}
