import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { PlayerHttpService } from './player-http.service';

describe('PlayerHttpService', () => {
  let service: PlayerHttpService;

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const baseUrl = 'https://web-sandbox.onefootball.com';

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>(['get']);

    TestBed.configureTestingModule({
      providers: [{
        provide: HttpClient,
        useValue: httpClientSpy
      }]
    });

    service = TestBed.inject(PlayerHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get method with params on getPlayerByNamem call', () => {
    const name = 'name';

    service.getPlayerByName(name);

    expect(httpClientSpy.get).toHaveBeenCalledWith(`${baseUrl}/assignments/player/data/${name}.json`);
  });

  it('should call get method with params on getPlayerDetailsById call', () => {
    const id = 'id';

    service.getPlayerDetailsById(id);

    expect(httpClientSpy.get).toHaveBeenCalledWith(`${baseUrl}/assignments/player/profile/${id}`);
  });
});
