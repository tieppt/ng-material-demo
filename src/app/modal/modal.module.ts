import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalContainerComponent } from './modal-container.component';
import { ModalService } from './modal.service';

@NgModule({
  declarations: [
    ModalContainerComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
  ],
  providers: [ModalService]
})
export class ModalModule { }
