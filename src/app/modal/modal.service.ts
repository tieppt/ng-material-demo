import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { Inject, Injectable, Injector, Optional, SkipSelf } from '@angular/core';
import {
  _MatDialogBase,
  MAT_DIALOG_DATA,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MAT_DIALOG_SCROLL_STRATEGY,
  MatDialogConfig,
  MatDialogRef
} from '@angular/material/dialog';
import { ModalContainerComponent } from './modal-container.component';

@Injectable()
export class ModalService extends _MatDialogBase<ModalContainerComponent> {
  constructor(
    overlay: Overlay,
    injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DEFAULT_OPTIONS) defaultOptions: MatDialogConfig,
    @Inject(MAT_DIALOG_SCROLL_STRATEGY) scrollStrategy: any,
    @Optional() @SkipSelf() parentDialog: ModalService,
    overlayContainer: OverlayContainer) {
    super(overlay, injector, defaultOptions, parentDialog, overlayContainer, scrollStrategy,
      MatDialogRef, ModalContainerComponent, MAT_DIALOG_DATA);
  }
}
