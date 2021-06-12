import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerWrapperComponent } from './container-wrapper.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ContainerWrapperComponent],
  exports: [ContainerWrapperComponent],
  imports: [CommonModule, MatProgressSpinnerModule]
})
export class ContainerWrapperModule {}
