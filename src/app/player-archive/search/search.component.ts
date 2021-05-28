import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CallState } from '../models/call-state.model';
import { PlayerDataService } from '../services/player-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent  {
  readonly searchForm = new FormControl(this.playerDataService.searchText, {validators: Validators.required});

  constructor(private readonly playerDataService: PlayerDataService) {}

  searchPlayer(): void {
    this.playerDataService.setSearchText(this.searchForm.value);
  }

  clearInput(): void {
    this.searchForm.setValue('');
  }
}
