import { Component } from '@angular/core';
import { PlayerDataService } from '../services/player-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  readonly playerInfo$ = this.playerDataService.playerInfo$;
  readonly playerInfoCallState$ = this.playerDataService.playerInfoCallState$;

  constructor(private readonly playerDataService: PlayerDataService) {}
}
