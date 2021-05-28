import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Player, PlayerDetails } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerHttpService {
  constructor(private readonly http: HttpClient) {}

  getPlayerByName(name: string): Observable<Player> {
    return this.http.get<Player>(`https://web-sandbox.onefootball.com/assignments/player/data/${name}.json`);
  }

  getPlayerDetailsById(id: string): Observable<PlayerDetails> {
    return this.http.get<PlayerDetails>(`https://web-sandbox.onefootball.com/assignments/player/profile/${id}`);
  }
}
