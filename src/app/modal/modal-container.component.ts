// tslint:disable:variable-name

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { _MatDialogContainerBase } from '@angular/material/dialog';
import { matDialogAnimations } from './dialog-animations';

@Component({
  selector: 'app-modal-container',
  templateUrl: 'dialog.html',
  styleUrls: ['dialog.scss'],
  encapsulation: ViewEncapsulation.None,
  // Using OnPush for dialogs caused some G3 sync issues. Disabled until we can track them down.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [matDialogAnimations.dialogContainer],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'mat-dialog-container',
    tabindex: '-1',
    'aria-modal': 'true',
    '[id]': '_id',
    '[attr.role]': '_config.role',
    '[attr.aria-labelledby]': '_config.ariaLabel ? null : _ariaLabelledBy',
    '[attr.aria-label]': '_config.ariaLabel',
    '[attr.aria-describedby]': '_config.ariaDescribedBy || null',
    '[@dialogContainer]': '_state',
    '(@dialogContainer.start)': '_onAnimationStart($event)',
    '(@dialogContainer.done)': '_onAnimationDone($event)',
  },
})
export class ModalContainerComponent extends _MatDialogContainerBase {
  /** State of the dialog animation. */
  _state: 'void' | 'enter' | 'exit' = 'enter';

  /** Callback, invoked whenever an animation on the host completes. */
  _onAnimationDone({toState, totalTime}: AnimationEvent): void {
    if (toState === 'enter') {
      this._trapFocus();
      this._animationStateChanged.next({state: 'opened', totalTime});
    } else if (toState === 'exit') {
      this._restoreFocus();
      this._animationStateChanged.next({state: 'closed', totalTime});
    }
  }

  /** Callback, invoked when an animation on the host starts. */
  _onAnimationStart({toState, totalTime}: AnimationEvent): void {
    if (toState === 'enter') {
      this._animationStateChanged.next({state: 'opening', totalTime});
    } else if (toState === 'exit' || toState === 'void') {
      this._animationStateChanged.next({state: 'closing', totalTime});
    }
  }

  /** Starts the dialog exit animation. */
  _startExitAnimation(): void {
    this._state = 'exit';

    // Mark the container for check so it can react if the
    // view container is using OnPush change detection.
    this._changeDetectorRef.markForCheck();
  }
}
