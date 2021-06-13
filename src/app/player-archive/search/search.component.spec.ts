import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SearchComponent } from './search.component';
import { PlayerDataService } from '../services/player-data.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  let playerDataServiceSpy: jasmine.SpyObj<PlayerDataService>;

  beforeEach(() => {
    playerDataServiceSpy = jasmine.createSpyObj(['setSearchText']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SearchComponent],
      providers: [{
        provide: PlayerDataService,
        useValue: playerDataServiceSpy
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setSearchText on form submit', () => {
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('ngSubmit', undefined);

    expect(playerDataServiceSpy.setSearchText).toHaveBeenCalledWith('');
  });
});
