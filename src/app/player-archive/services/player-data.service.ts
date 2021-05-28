import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, distinctUntilChanged, filter, shareReplay, switchMap, tap } from 'rxjs/operators';
import { PlayerHttpService } from './player-http.service';
import { CallState } from '../models/call-state.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {
  private readonly searchText$$ = new BehaviorSubject<string>('');
  private readonly detailsCallState$$ = new BehaviorSubject<CallState>(CallState.Initial);
  private readonly catchErrorHandler = this._catchErrorHandler.bind(this);

  readonly details$ = this.searchText$$.pipe(
    filter((text) => Boolean(text)),
    distinctUntilChanged(),
    tap(() => this.detailsCallState$$.next(CallState.Loading)),
    switchMap((name) => this.playerHttpService.getPlayerByName(name).pipe(
      filter(({active}) => active === 'true'),
      catchError(this.catchErrorHandler),
      switchMap((player) => this.playerHttpService.getPlayerDetailsById(player['profile-id']).pipe(
        catchError(this.catchErrorHandler)
      )),
    )),
    tap(() => this.detailsCallState$$.next(CallState.Loaded)),
    shareReplay({bufferSize: 1, refCount: true}),
  );
  readonly detailsCallState$ = this.detailsCallState$$.pipe(distinctUntilChanged());

  constructor(private readonly playerHttpService: PlayerHttpService) {
  }

  setSearchText(value: string): void {
    this.searchText$$.next(value);
  }

  get searchText(): string {
    return this.searchText$$.value;
  }

  private _catchErrorHandler(): Observable<never> {
    this.detailsCallState$$.next(CallState.Error);

    return EMPTY;
  }
}
