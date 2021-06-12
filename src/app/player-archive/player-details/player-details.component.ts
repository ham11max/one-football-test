import { Component, Input } from '@angular/core';
import { PlayerDetails } from '../models/player.model';
import { CallState } from '../models/call-state.model';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent {
  @Input() playerDetails!: PlayerDetails;
  @Input() playerDetailsCallState!: CallState;

  readonly callStates = CallState;
}
