import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlayerDataService } from '../services/player-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  readonly searchForm = new FormControl('');

  constructor(private readonly playerDataService: PlayerDataService) {}

  searchPlayer(): void {
    this.playerDataService.setSearchText(this.searchForm.value);
  }
}
