import { Component } from '@angular/core';
import { PlayerDataService } from '../services/player-data.service';
import { CallState } from '../models/call-state.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  readonly details$ = this.playerDataService.details$;
  readonly detailsCallState$ = this.playerDataService.detailsCallState$;
  readonly callStates = CallState;

  constructor(private readonly playerDataService: PlayerDataService) {}
}
