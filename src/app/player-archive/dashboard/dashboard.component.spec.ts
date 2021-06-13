import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { of } from 'rxjs';

import { PlayerDataService } from '../services/player-data.service';
import { DashboardComponent } from './dashboard.component';
import { CallState } from '../models/call-state.model';
import { PlayerInfo } from '../models/player.model';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let playerDataServiceStub: Partial<PlayerDataService>;

  beforeEach(() => {
    playerDataServiceStub = {
      playerInfo$: of({} as PlayerInfo),
      playerInfoCallState$: of(CallState.Loaded)
    };

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{
        provide: PlayerDataService,
        useValue: playerDataServiceStub
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
