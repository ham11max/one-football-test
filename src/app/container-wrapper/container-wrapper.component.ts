import { Component, Input } from '@angular/core';

import { CallState } from '../player-archive/models/call-state.model';

@Component({
  selector: 'app-container-wrapper',
  templateUrl: './container-wrapper.component.html',
})
export class ContainerWrapperComponent {
  @Input() callState!: CallState | null;

  get isLoadingState(): boolean {
    return this.callState === CallState.Loading;
  }

  get isErrorState(): boolean {
    return this.callState === CallState.Error;
  }

  get isLoadedState(): boolean {
    return this.callState === CallState.Loaded;
  }
}
