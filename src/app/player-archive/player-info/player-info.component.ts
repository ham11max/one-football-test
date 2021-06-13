import { Component, Input } from '@angular/core';

import { PlayerInfo } from '../models/player.model';
import { CallState } from '../models/call-state.model';
import { PlayerDataService } from '../services/player-data.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent {
  @Input() playerInfo!: PlayerInfo | null;
  @Input() playerInfoCallState!: CallState | null;

  readonly callStates = CallState;
  readonly playerDetails$ = this.playerDataService.playerDetails$;
  readonly playerDetailsCallState$ = this.playerDataService.playerDetailsCallState$;

  constructor(private readonly playerDataService: PlayerDataService) {}

  get isActivePlayer(): boolean {
    return this.playerInfo?.active === 'true';
  }
}
