import { Injectable } from '@angular/core';

import { BehaviorSubject, EMPTY } from 'rxjs';
import { catchError, filter, shareReplay, switchMap, tap } from 'rxjs/operators';

import { PlayerHttpService } from './player-http.service';
import { CallState } from '../models/call-state.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {
  private readonly searchText$$ = new BehaviorSubject<string>('');
  private readonly playerDetailsCallState$$ = new BehaviorSubject<CallState>(CallState.Initial);
  private readonly playerInfoCallState$$ = new BehaviorSubject<CallState>(CallState.Initial);

  readonly playerDetailsCallState$ = this.playerDetailsCallState$$.asObservable();
  readonly playerInfoCallState$ = this.playerInfoCallState$$.asObservable();

  readonly playerInfo$ = this.searchText$$.pipe(
    filter((text) => Boolean(text)),
    tap(() => this.playerInfoCallState$$.next(CallState.Loading)),
    switchMap((name) => this.playerHttpService.getPlayerByName(name).pipe(
      catchError(() => {
        this.playerInfoCallState$$.next(CallState.Error);

        return EMPTY;
      })
    )),
    tap(() => this.playerInfoCallState$$.next(CallState.Loaded)),
    shareReplay({bufferSize: 1, refCount: true}),
  );

  readonly playerDetails$ = this.playerInfo$.pipe(
    filter(({active}) => active === 'true'),
    tap(() => this.playerDetailsCallState$$.next(CallState.Loading)),
    switchMap((player) => this.playerHttpService.getPlayerDetailsById(player['profile-id']).pipe(
      catchError(() => {
        this.playerDetailsCallState$$.next(CallState.Error);

        return EMPTY;
      })
    )),
    tap(() => this.playerDetailsCallState$$.next(CallState.Loaded)),
    shareReplay({bufferSize: 1, refCount: true}),
  );

  constructor(private readonly playerHttpService: PlayerHttpService) {}

  setSearchText(value: string): void {
    this.searchText$$.next(value);
  }
}
