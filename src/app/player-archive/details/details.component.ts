import { Component, Input } from '@angular/core';
import { PlayerDetails } from '../models/player.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  @Input() details!: PlayerDetails;
}
