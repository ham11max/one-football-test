import { TestBed } from '@angular/core/testing';

import { PlayerHttpService } from './player-http.service';

describe('PlayerHttpService', () => {
  let service: PlayerHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
