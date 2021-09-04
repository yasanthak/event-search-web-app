import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchEventsComponent } from './search-events.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { EventService } from '../../shared/services';
import { of, throwError } from 'rxjs';
import { SEARCH_EVENTS_BY_TEXT } from '../../shared/services/unit-dummy-data/event-service';
import { EventCardComponent } from '../event-card/event-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorAlertComponent } from '../../shared';


describe('SearchEventsComponent', () => {
  let component: SearchEventsComponent;
  let fixture: ComponentFixture<SearchEventsComponent>;
  let eventsSrv: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchEventsComponent, EventCardComponent, ErrorAlertComponent],
      providers: [EventService],
      imports: [FormsModule, CommonModule,
        HttpClientTestingModule, RouterTestingModule

      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEventsComponent);
    component = fixture.componentInstance;
    eventsSrv = TestBed.inject(EventService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('function should retieve events based on search, searchEvents()', () => {

    it("should call searchEvents and returns results as per the search", fakeAsync(() => {

      // @ts-ignore
      let searchEventsSpy = spyOn(eventsSrv, 'searchEvents').and.returnValue(of(SEARCH_EVENTS_BY_TEXT));
      const searchTerm = 'Portland Trail Blazers';
      component.searchEvents(searchTerm);
      fixture.detectChanges();
      tick();
      expect(searchEventsSpy).toHaveBeenCalledTimes(1);
      expect(searchEventsSpy).toHaveBeenCalledWith(searchTerm);
      expect(component.events).toEqual(SEARCH_EVENTS_BY_TEXT.events);

    }));

    it("should fail searcEvents", fakeAsync(() => {
      const searchTerm = 'Portland Trail Blazers';
      // @ts-ignore
      let searchErrorEventsSpy = spyOn(eventsSrv, 'searchEvents').
        and.returnValue(throwError('Error occured while searching'));

      component.searchEvents(searchTerm);
      tick();
      fixture.detectChanges();
      expect(searchErrorEventsSpy).toHaveBeenCalledTimes(1);
      expect(searchErrorEventsSpy).toHaveBeenCalledWith(searchTerm);
      expect(component.error).toEqual('Error occured while searching');


    }));

  });
});