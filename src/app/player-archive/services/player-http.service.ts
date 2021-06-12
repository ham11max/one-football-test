import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PlayerInfo, PlayerDetails } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerHttpService {
  private readonly baseUrl = 'https://web-sandbox.onefootball.com';

  constructor(private readonly http: HttpClient) {}

  getPlayerByName(name: string): Observable<PlayerInfo> {
    return this.http.get<PlayerInfo>(`${this.baseUrl}/assignments/player/data/${name}.json`);
  }

  getPlayerDetailsById(id: string): Observable<PlayerDetails> {
    return this.http.get<PlayerDetails>(`${this.baseUrl}/assignments/player/profile/${id}`);
  }
}
