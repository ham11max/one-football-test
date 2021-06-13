import { TestBed } from '@angular/core/testing';

import { of, Subscription, throwError } from 'rxjs';

import { PlayerDetails, PlayerInfo } from '../models/player.model';
import { PlayerDataService } from './player-data.service';
import { PlayerHttpService } from './player-http.service';
import { CallState } from '../models/call-state.model';

describe('PlayerDataService', () => {
  let service: PlayerDataService;
  let playerHttpServiceSpy: jasmine.SpyObj<PlayerHttpService>;

  let dataSubscriptionSpy: jasmine.Spy;
  let callStateSubscriptionSpy: jasmine.Spy;

  let subscriptions: Subscription[];

  const playerInfo: PlayerInfo = {
    id: '1',
    active: 'true',
    'profile-id': '11',
  };
  const playerDetails = {
    id: '1',
  } as PlayerDetails;

  beforeEach(() => {
    dataSubscriptionSpy = jasmine.createSpy('data subscription spy');
    callStateSubscriptionSpy = jasmine.createSpy('call stateSubscription spy');

    playerHttpServiceSpy = jasmine.createSpyObj<PlayerHttpService>(['getPlayerByName', 'getPlayerDetailsById']);

    subscriptions = [];

    TestBed.configureTestingModule({
      providers: [{
        provide: PlayerHttpService,
        useValue: playerHttpServiceSpy
      }]
    });

    service = TestBed.inject(PlayerDataService);
  });

  afterEach(() => subscriptions.forEach((item) => item.unsubscribe()));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('playerInfo$ stream', () => {
    describe('on success response from getPlayerByName', () => {

      beforeEach(() => {
        playerHttpServiceSpy.getPlayerByName.and.returnValue(of(playerInfo));

        subscriptions.push(
          service.playerInfo$.subscribe(dataSubscriptionSpy),
          service.playerInfoCallState$.subscribe(callStateSubscriptionSpy)
        );
      });

      it('should not emit on empty text emission', () => {
        service.setSearchText('');

        expect(dataSubscriptionSpy).not.toHaveBeenCalled();
      });

      it('should emit player info and update call state with Loaded', () => {
        service.setSearchText('fabio');

        expect(dataSubscriptionSpy).toHaveBeenCalledWith(playerInfo);
        expect(callStateSubscriptionSpy).toHaveBeenCalledWith(CallState.Loaded);
      });
    });


    it('should not emit on error and update call state with Error', () => {
      playerHttpServiceSpy.getPlayerByName.and.returnValue(throwError('Error'));

      subscriptions.push(
        service.playerInfo$.subscribe(dataSubscriptionSpy),
        service.playerInfoCallState$.subscribe(callStateSubscriptionSpy)
      );

      service.setSearchText('fabio');

      expect(dataSubscriptionSpy).not.toHaveBeenCalled();
      expect(callStateSubscriptionSpy).toHaveBeenCalledWith(CallState.Error);
    });
  });

  describe('playerDetails$ stream', () => {
    beforeEach(() => {
      playerHttpServiceSpy.getPlayerByName.and.returnValue(of(playerInfo));
      service.setSearchText('fabio');
    });

    describe('on success response from getPlayerDetailsById', () => {

      beforeEach(() => {
        playerHttpServiceSpy.getPlayerDetailsById.and.returnValue(of(playerDetails));

        subscriptions.push(
          service.playerDetails$.subscribe(dataSubscriptionSpy),
          service.playerDetailsCallState$.subscribe(callStateSubscriptionSpy)
        );
      });

      it('should emit player details and update call state with Loaded', () => {
        expect(dataSubscriptionSpy).toHaveBeenCalledWith(playerDetails);
        expect(callStateSubscriptionSpy).toHaveBeenCalledWith(CallState.Loaded);
      });
    });


    it('should not emit on error and update call state with error', () => {
      playerHttpServiceSpy.getPlayerDetailsById.and.returnValue(throwError('Error'));

      subscriptions.push(
        service.playerDetails$.subscribe(dataSubscriptionSpy),
        service.playerDetailsCallState$.subscribe(callStateSubscriptionSpy)
      );

      expect(dataSubscriptionSpy).not.toHaveBeenCalled();
      expect(callStateSubscriptionSpy).toHaveBeenCalledWith(CallState.Error);
    });

    it('should not emit value for non active player', () => {
      playerHttpServiceSpy.getPlayerByName.and.returnValue(of({...playerInfo, active: 'false'}));
      service.setSearchText('fabio');

      subscriptions.push(service.playerDetails$.subscribe(dataSubscriptionSpy));

      expect(dataSubscriptionSpy).not.toHaveBeenCalled();
    });
  });
});
