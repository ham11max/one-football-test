import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { PlayerDataService } from '../services/player-data.service';
import { PlayerInfoComponent } from './player-info.component';
import { PlayerDetails, PlayerInfo } from '../models/player.model';
import { CallState } from '../models/call-state.model';

describe('PlayerInfoComponent', () => {
  let component: PlayerInfoComponent;
  let fixture: ComponentFixture<PlayerInfoComponent>;

  let playerDataServiceStub: Partial<PlayerDataService>;

  const playerSectionEl = () => fixture.debugElement.query(By.css('[data-role="player-info-section"]'));

  beforeEach(() => {
    playerDataServiceStub = {
      playerDetails$: of({} as PlayerDetails),
      playerDetailsCallState$: of(CallState.Loaded)
    };

    TestBed.configureTestingModule({
      declarations: [PlayerInfoComponent],
      providers: [{
        provide: PlayerDataService,
        useValue: playerDataServiceStub
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(PlayerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display player info section for non active player', () => {
    component.playerInfo = {} as PlayerInfo;
    fixture.detectChanges();

    expect(playerSectionEl()).toBeFalsy();

    component.playerInfo = {active: 'false'} as PlayerInfo;
    fixture.detectChanges();

    expect(playerSectionEl()).toBeFalsy();
  });
});
